/* VIZKOR V2 — repository-driven full data sync. Branch-only preview build. */
(()=>{
  const BASE='../';
  const status={state:'loading',sources:{},counts:{}};
  window.VIZKOR_REPO_STATUS=status;
  const clean=s=>String(s??'').replace(/\s+/g,' ').trim();
  const fire=()=>window.dispatchEvent(new CustomEvent('vizkor:data-ready',{detail:status}));
  async function text(path){
    try{const r=await fetch(BASE+path+'?v='+Date.now(),{cache:'no-store'});if(!r.ok)throw Error('HTTP '+r.status);const t=await r.text();status.sources[path]={ok:true,bytes:t.length};return t}
    catch(e){status.sources[path]={ok:false,error:String(e)};return ''}
  }
  function balanced(t,marker,open='[',close=']'){
    const p=t.indexOf(marker); if(p<0)return '';
    const s=t.indexOf(open,p); if(s<0)return '';
    let d=0,q=null,esc=false,line=false,block=false;
    for(let i=s;i<t.length;i++){
      const c=t[i],n=t[i+1];
      if(line){if(c==='\n')line=false;continue}
      if(block){if(c==='*'&&n==='/'){block=false;i++}continue}
      if(q){if(esc){esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q)q=null;continue}
      if(c==='/'&&n==='/'){line=true;i++;continue}
      if(c==='/'&&n==='*'){block=true;i++;continue}
      if(c==='"'||c==="'"||c==='`'){q=c;continue}
      if(c===open)d++; else if(c===close&&--d===0)return t.slice(s,i+1);
    }
    return '';
  }
  function jsExpr(raw,fallback){if(!raw)return fallback;try{return Function('"use strict";return ('+raw+')')()}catch(e){return fallback}}
  function rawBlock(html){const m=html.match(/const\s+RAW\s*=\s*`([\s\S]*?)`\s*;/);return m?m[1]:''}
  function parseRaw(html,book){
    const raw=rawBlock(html),out=[];
    for(const line0 of raw.split(/\r?\n/)){
      const line=clean(line0); if(!line)continue;
      const m=line.match(/^(.*?)\s+(\d+)$/); if(!m)continue;
      const page=+m[2],body=m[1];
      const firstSpace=body.indexOf(' '); if(firstSpace<1)continue;
      const ko=clean(body.slice(0,firstSpace)),en=clean(body.slice(firstSpace+1));
      if(ko&&en)out.push({ko,en,tl:'',page,book,pos:'Vocabulary',source:book==='B1'?'book1.html':'book2.html'});
    }
    return out;
  }
  function parseNouns(t){
    const obj=jsExpr(balanced(t,'const CATEGORIZED_NOUNS','{','}'),{}),out=[];
    for(const [key,cat] of Object.entries(obj||{})){
      if(key==='all'||!Array.isArray(cat?.data))continue;
      for(const x of cat.data){if(!x?.ko||!x?.en)continue;out.push({ko:clean(x.ko),en:clean(x.en),tl:clean(x.tl),page:+x.page||0,book:'B'+(+x.book||1),pos:'Noun',category:cat?.name?.en||key,source:'noun.js'})}
    }
    return out;
  }
  function parseMaster(t,pos,source){
    const arr=jsExpr(balanced(t,'const WORDS_MASTER','[',']'),[]),out=[];
    for(const x of arr||[]){if(!x?.ko||!x?.en)continue;let en=clean(x.en),tl='';const slash=en.lastIndexOf(' / ');if(slash>0){tl=en.slice(slash+3).trim();en=en.slice(0,slash).trim()}
      out.push({ko:clean(x.ko),en,tl,page:+x.page||0,book:x.book?'B'+x.book:'GENERAL',pos,source,present:x.present||null,past:x.past||null,future:x.future||null});}
    return out;
  }
  function parseAdverbs(t){
    const arr=jsExpr(balanced(t,'const WORDS_MASTER','[',']'),[]);return (arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({ko:clean(x.ko),en:clean(x.en),tl:clean(x.tl),book:'GENERAL',page:0,pos:'Adverb',source:'adverb.html'}));
  }
  function parseGreetings(t){
    const obj=jsExpr(balanced(t,'const DATA','{','}'),{}),out=[];
    for(const [category,rows] of Object.entries(obj||{}))for(const row of rows||[]){if(Array.isArray(row)&&row[0]&&row[1])out.push({ko:clean(row[0]),en:clean(row[1]),tl:'',book:'GENERAL',page:0,pos:'Expression',category,source:'greetings.html'})}
    return out;
  }
  function parseSentences(t){
    const arr=jsExpr(balanced(t,'const CARDS','[',']'),[]);return (arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({level:clean(x.level||'basic'),ko:clean(x.ko),en:clean(x.en),tl:clean(x.tl),source:'sentence.html'}));
  }
  function parseKeywords(t){
    const arr=jsExpr(balanced(t,'const ITEMS','[',']'),[]);return (arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({ko:clean(x.ko),en:clean(x.en),tl:clean(x.tl),book:'GENERAL',page:0,pos:'EPS Keyword',source:'keyword.js',count:+x.count||0,koSentence:clean(x.koSentence),enSentence:clean(x.enSentence),tlSentence:clean(x.tlSentence)}));
  }
  function key(x){return clean(x.ko).replace(/\s+/g,'')}
  function merge(base,detailSets){
    const detail=[].concat(...detailSets),byKo=new Map();
    for(const d of detail){const k=key(d);if(!byKo.has(k))byKo.set(k,[]);byKo.get(k).push(d)}
    const out=[];
    for(const b of base){const matches=byKo.get(key(b))||[];const exact=matches.find(x=>x.book===b.book)||matches[0];out.push(exact?{...b,...exact,book:b.book,page:b.page||exact.page||0,en:b.en||exact.en}:b)}
    for(const d of detail){if(!out.some(x=>key(x)===key(d)&&x.book===d.book&&x.pos===d.pos))out.push(d)}
    const seen=new Set();return out.filter(x=>{if(!x.ko||!x.en)return false;const k=[clean(x.ko),clean(x.en),x.book,x.pos].join('|');if(seen.has(k))return false;seen.add(k);return true})
  }
  async function sync(){
    const paths=['book1.html','book2.html','noun.js','verb.js','adjective.js','adverb.html','greetings.html','sentence.html','keyword.js'];
    const [b1,b2,n,v,a,ad,g,s,k]=await Promise.all(paths.map(text));
    const raw=[...parseRaw(b1,'B1'),...parseRaw(b2,'B2')];
    const nouns=parseNouns(n),verbs=parseMaster(v,'Verb','verb.js'),adjs=parseMaster(a,'Adjective','adjective.js'),adverbs=parseAdverbs(ad),expressions=parseGreetings(g),keywords=parseKeywords(k),sentences=parseSentences(s);
    const vocab=merge(raw,[nouns,verbs,adjs,adverbs,expressions,keywords]);
    window.VIZKOR_DATA={vocab,sentences,nouns,verbs,adjectives:adjs,adverbs,expressions,keywords};
    status.counts={raw:raw.length,vocab:vocab.length,nouns:nouns.length,verbs:verbs.length,adjectives:adjs.length,adverbs:adverbs.length,expressions:expressions.length,keywords:keywords.length,sentences:sentences.length};
    status.state='ready';status.lastSync=new Date().toISOString();fire();
  }
  sync().catch(e=>{status.state='error';status.error=String(e);fire()});
})();
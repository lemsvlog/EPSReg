/* VIZKOR V2.1 — corrected repository-driven data sync. */
(()=>{
  'use strict';
  const BASE='../';
  const VERSION='2.1.0';
  const CACHE_KEY='vizkor_v21_data_cache';
  const status={state:'loading',version:VERSION,sources:{},counts:{},warnings:[],diagnostics:{}};
  window.VIZKOR_REPO_STATUS=status;

  const clean=s=>String(s??'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
  const koKey=s=>clean(s).replace(/\s+/g,'').replace(/[·•]/g,'').toLowerCase();
  const fire=()=>window.dispatchEvent(new CustomEvent('vizkor:data-ready',{detail:status}));

  async function text(path){
    try{
      const r=await fetch(BASE+path+'?v='+encodeURIComponent(VERSION),{cache:'no-cache'});
      if(!r.ok)throw new Error('HTTP '+r.status);
      const t=await r.text();
      status.sources[path]={ok:true,bytes:t.length};
      return t;
    }catch(e){
      status.sources[path]={ok:false,error:String(e)};
      status.warnings.push(`${path}: ${String(e)}`);
      return '';
    }
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
      if(c===open)d++;
      else if(c===close){d--;if(d===0)return t.slice(s,i+1)}
    }
    return '';
  }

  function jsExpr(raw,fallback,label='data'){
    if(!raw)return fallback;
    try{return Function('"use strict";return ('+raw+')')()}
    catch(e){status.warnings.push(`${label} parse: ${String(e)}`);return fallback}
  }

  function rawBlock(html){
    const m=html.match(/const\s+RAW\s*=\s*`([\s\S]*?)`\s*;/);
    return m?m[1]:'';
  }

  // Splits: [Korean term/phrase] [English meaning] [page].
  // Unlike the previous parser, Korean phrases may contain spaces (피해를 주다, 몇 시, ...).
  function splitRawLine(line0){
    const line=clean(line0); if(!line)return null;
    const pm=line.match(/^(.*?)\s+(\d+)$/); if(!pm)return null;
    const page=Number(pm[2]), body=clean(pm[1]);
    let parts=body.split(/\s+/);
    // Remove accidental standalone Hangul-jamo prefixes found in some legacy RAW lines (e.g. "ㅋ 칼", "ㅈ 자다").
    if(parts.length>2 && /^[ㄱ-ㅎㅏ-ㅣ]$/.test(parts[0]))parts=parts.slice(1);
    let split=-1;
    for(let i=1;i<parts.length;i++){
      if(/[A-Za-z]/.test(parts[i])){split=i;break}
    }
    // Most entries are Hangul + English. For rare mixed/Latin terms, retain the first token as the headword.
    if(split<0){
      if(parts.length<2)return null;
      split=1;
    }
    const ko=clean(parts.slice(0,split).join(' '));
    const en=clean(parts.slice(split).join(' '));
    if(!ko||!en)return null;
    return {ko,en,page};
  }

  function parseRaw(html,book){
    const raw=rawBlock(html),out=[];let skipped=0;
    for(const line of raw.split(/\r?\n/)){
      const x=splitRawLine(line);
      if(!x){if(clean(line))skipped++;continue}
      out.push({...x,tl:'',book,pos:'Vocabulary',source:book==='B1'?'book1.html':'book2.html'});
    }
    status.diagnostics[book]={rawLines:out.length,skipped};
    return out;
  }

  function parseNouns(t){
    const obj=jsExpr(balanced(t,'const CATEGORIZED_NOUNS','{','}'),{},'noun.js'),out=[];
    for(const [id,cat] of Object.entries(obj||{})){
      if(id==='all'||!Array.isArray(cat?.data))continue;
      for(const x of cat.data||[]){
        if(!x?.ko||!x?.en)continue;
        out.push({ko:clean(x.ko),en:clean(x.en),tl:clean(x.tl),page:Number(x.page)||0,book:x.book?`B${Number(x.book)}`:'GENERAL',pos:'Noun',category:clean(cat?.name?.en||id),source:'noun.js'});
      }
    }
    return dedupe(out,x=>[koKey(x.ko),x.book,x.page,x.en].join('|'));
  }

  function splitBilingualMeaning(value,explicitTl=''){
    let en=clean(value),tl=clean(explicitTl);
    if(!tl){
      const slash=en.lastIndexOf(' / ');
      if(slash>0){tl=clean(en.slice(slash+3));en=clean(en.slice(0,slash))}
    }
    return {en,tl};
  }

  function parseMaster(t,pos,source){
    const arr=jsExpr(balanced(t,'const WORDS_MASTER','[',']'),[],source),out=[];
    for(const x of arr||[]){
      if(!x?.ko||!x?.en)continue;
      const meaning=splitBilingualMeaning(x.en,x.tl);
      out.push({
        ko:clean(x.ko),en:meaning.en,tl:meaning.tl,page:Number(x.page)||0,
        book:x.book?`B${Number(x.book)}`:'GENERAL',pos,source,
        present:x.present||null,past:x.past||null,future:x.future||null
      });
    }
    return dedupe(out,x=>[koKey(x.ko),x.book,x.page].join('|'));
  }

  function parseAdverbs(t){
    const arr=jsExpr(balanced(t,'const WORDS_MASTER','[',']'),[],'adverb.html');
    return dedupe((arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({ko:clean(x.ko),en:clean(x.en),tl:clean(x.tl),book:'GENERAL',page:0,pos:'Adverb',source:'adverb.html'})),x=>koKey(x.ko));
  }

  function parseGreetings(t){
    const obj=jsExpr(balanced(t,'const DATA','{','}'),{},'greetings.html'),out=[];
    for(const [category,rows] of Object.entries(obj||{})){
      for(const row of rows||[]){
        if(Array.isArray(row)&&row[0]&&row[1])out.push({ko:clean(row[0]),en:clean(row[1]),tl:'',book:'GENERAL',page:0,pos:'Expression',category:clean(category),source:'greetings.html'});
      }
    }
    return dedupe(out,x=>[koKey(x.ko),x.en].join('|'));
  }

  function parseSentences(t){
    const arr=jsExpr(balanced(t,'const CARDS','[',']'),[],'sentence.html');
    return dedupe((arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({level:clean(x.level||'basic').toLowerCase(),ko:clean(x.ko),en:clean(x.en),tl:clean(x.tl),source:'sentence.html'})),x=>[koKey(x.ko),x.level].join('|'));
  }

  function parseKeywords(t){
    const arr=jsExpr(balanced(t,'const ITEMS','[',']'),[],'keyword.js');
    return dedupe((arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({ko:clean(x.ko),en:clean(x.en),tl:clean(x.tl),book:'GENERAL',page:0,pos:'EPS Keyword',source:'keyword.js',count:Number(x.count)||0,koSentence:clean(x.koSentence),enSentence:clean(x.enSentence),tlSentence:clean(x.tlSentence)})),x=>[koKey(x.ko),x.en].join('|'));
  }

  function dedupe(arr,keyFn){
    const seen=new Set();
    return arr.filter(x=>{const k=keyFn(x);if(seen.has(k))return false;seen.add(k);return true});
  }

  const commonWords=s=>new Set(clean(s).toLowerCase().replace(/[^a-z0-9\s]/g,' ').split(/\s+/).filter(w=>w.length>2&&!['the','and','with','for','from','into','one','this','that','thing','thing'].includes(w)));
  function overlap(a,b){const A=commonWords(a),B=commonWords(b);let n=0;for(const w of A)if(B.has(w))n++;return n}
  function candidateScore(base,d){
    let score=0;
    if(d.book===base.book)score+=30;
    if(base.page&&d.page===base.page)score+=18;
    score+=overlap(base.en,d.en)*7;
    const en=base.en.toLowerCase();
    if(/^to be\b/.test(en)&&d.pos==='Adjective')score+=20;
    else if(/^to\b/.test(en)&&d.pos==='Verb')score+=16;
    if(!/^to\b/.test(en)&&d.pos==='Noun')score+=5;
    return score;
  }

  function merge(base,detailSets){
    const detail=[].concat(...detailSets),byKo=new Map();
    for(const d of detail){const k=koKey(d.ko);if(!byKo.has(k))byKo.set(k,[]);byKo.get(k).push(d)}
    const out=[];
    for(const b of base){
      const matches=byKo.get(koKey(b.ko))||[];
      const exact=matches.length?[...matches].sort((x,y)=>candidateScore(b,y)-candidateScore(b,x))[0]:null;
      if(exact){
        out.push({...b,...exact,ko:b.ko,en:b.en,book:b.book,page:b.page||exact.page||0,source:b.source,detailSource:exact.source});
      }else out.push(b);
    }
    // Keep useful supplemental records that do not exist in the official RAW lists.
    for(const d of detail){
      const exists=out.some(x=>koKey(x.ko)===koKey(d.ko)&&x.book===d.book&&x.pos===d.pos&&(!x.page||!d.page||x.page===d.page));
      if(!exists)out.push(d);
    }
    return dedupe(out,x=>[koKey(x.ko),clean(x.en).toLowerCase(),x.book,x.pos,x.page||0].join('|'));
  }

  async function sync(){
    const paths=['book1.html','book2.html','noun.js','verb.js','adjective.js','adverb.html','greetings.html','sentence.html','keyword.js'];
    const [b1,b2,n,v,a,ad,g,s,k]=await Promise.all(paths.map(text));
    const b1raw=parseRaw(b1,'B1'),b2raw=parseRaw(b2,'B2'),raw=[...b1raw,...b2raw];
    const nouns=parseNouns(n);
    const verbs=parseMaster(v,'Verb','verb.js');
    let adjectives=parseMaster(a,'Adjective','adjective.js');
    // Prevent action verbs accidentally duplicated in adjective.js from appearing as adjectives.
    const verbIdentity=new Set(verbs.map(x=>[koKey(x.ko),x.book,x.page].join('|')));
    adjectives=adjectives.filter(x=>!verbIdentity.has([koKey(x.ko),x.book,x.page].join('|'))||/^to be\b/i.test(x.en));
    const adverbs=parseAdverbs(ad),expressions=parseGreetings(g),keywords=parseKeywords(k),sentences=parseSentences(s);
    const vocab=merge(raw,[nouns,verbs,adjectives,adverbs,expressions,keywords]);

    const byBook={B1:vocab.filter(x=>x.book==='B1').length,B2:vocab.filter(x=>x.book==='B2').length,GENERAL:vocab.filter(x=>x.book==='GENERAL').length};
    const byPos={};for(const x of vocab)byPos[x.pos]=(byPos[x.pos]||0)+1;
    let payload={vocab,sentences,nouns,verbs,adjectives,adverbs,expressions,keywords,meta:{version:VERSION,byBook,byPos}};
    if(raw.length){
      window.VIZKOR_DATA=payload;
      try{const encoded=JSON.stringify(payload);if(encoded.length<4000000)localStorage.setItem(CACHE_KEY,encoded)}catch(_e){}
      status.state='ready';
    }else{
      try{const cached=JSON.parse(localStorage.getItem(CACHE_KEY)||'null');if(cached?.vocab?.length){payload=cached;window.VIZKOR_DATA=cached;status.state='ready';status.cached=true;status.warnings.push('Using the last successful V2 data cache because Book 1/2 could not be fetched.')}}catch(_e){}
      if(!window.VIZKOR_DATA){window.VIZKOR_DATA=payload;status.state='error';status.warnings.push('Book 1/Book 2 RAW vocabulary did not load.')}
    }
    status.counts={raw:raw.length,b1Raw:b1raw.length,b2Raw:b2raw.length,vocab:window.VIZKOR_DATA.vocab?.length||0,nouns:window.VIZKOR_DATA.nouns?.length||0,verbs:window.VIZKOR_DATA.verbs?.length||0,adjectives:window.VIZKOR_DATA.adjectives?.length||0,adverbs:window.VIZKOR_DATA.adverbs?.length||0,expressions:window.VIZKOR_DATA.expressions?.length||0,keywords:window.VIZKOR_DATA.keywords?.length||0,sentences:window.VIZKOR_DATA.sentences?.length||0};
    status.lastSync=new Date().toISOString();
    fire();
  }

  sync().catch(e=>{status.state='error';status.error=String(e);status.warnings.push(String(e));fire()});
})();

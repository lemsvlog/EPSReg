import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const CLEAN=s=>String(s??'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
const KO_KEY=s=>CLEAN(s).replace(/\s+/g,'').replace(/[·•]/g,'').toLowerCase();
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
function balanced(t,marker,open='[',close=']'){const p=t.indexOf(marker);if(p<0)return'';const s=t.indexOf(open,p);if(s<0)return'';let d=0,q=null,esc=false,line=false,block=false;for(let i=s;i<t.length;i++){const c=t[i],n=t[i+1];if(line){if(c==='\n')line=false;continue}if(block){if(c==='*'&&n==='/'){block=false;i++}continue}if(q){if(esc){esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q)q=null;continue}if(c==='/'&&n==='/'){line=true;i++;continue}if(c==='/'&&n==='*'){block=true;i++;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c===open)d++;else if(c===close){d--;if(d===0)return t.slice(s,i+1)}}return''}
function jsExpr(raw,fallback){if(!raw)return fallback;try{return Function('"use strict";return ('+raw+')')()}catch{return fallback}}
function rawBlock(html){const m=html.match(/const\s+RAW\s*=\s*`([\s\S]*?)`\s*;/);return m?m[1]:''}
function splitRawLine(line0){const line=CLEAN(line0);if(!line)return null;const pm=line.match(/^(.*?)\s+(\d+)$/);if(!pm)return null;const page=Number(pm[2]);let parts=CLEAN(pm[1]).split(/\s+/);if(parts.length>2&&/^[ㄱ-ㅎㅏ-ㅣ]$/.test(parts[0]))parts=parts.slice(1);let split=-1;for(let i=1;i<parts.length;i++){if(/[A-Za-z]/.test(parts[i])){split=i;break}}if(split<0){if(parts.length<2)return null;split=1}const ko=CLEAN(parts.slice(0,split).join(' ')),en=CLEAN(parts.slice(split).join(' '));return ko&&en?{ko,en,page}:null}
function parseRaw(html,book){const out=[];for(const line of rawBlock(html).split(/\r?\n/)){const x=splitRawLine(line);if(x)out.push({...x,book})}return out}
function splitMeaning(value,explicitTl=''){let en=CLEAN(value),tl=CLEAN(explicitTl);if(!tl){const slash=en.lastIndexOf(' / ');if(slash>0){tl=CLEAN(en.slice(slash+3));en=CLEAN(en.slice(0,slash))}}return{en,tl}}
function dedupe(arr,keyFn){const seen=new Set();return arr.filter(x=>{const k=keyFn(x);if(seen.has(k))return false;seen.add(k);return true})}
function parseNouns(t){const obj=jsExpr(balanced(t,'const CATEGORIZED_NOUNS','{','}'),{}),cats=[];for(const[id,cat]of Object.entries(obj||{})){if(id==='all'||!Array.isArray(cat?.data))continue;const rows=dedupe(cat.data.filter(x=>x?.ko&&x?.en).map(x=>({ko:CLEAN(x.ko),en:CLEAN(x.en),tl:CLEAN(x.tl),page:Number(x.page)||0,book:Number(x.book)||0})),x=>[KO_KEY(x.ko),x.en,x.book,x.page].join('|'));cats.push({id,name:CLEAN(cat?.name?.en||id),koName:CLEAN(cat?.name?.ko||''),tlName:CLEAN(cat?.name?.tl||''),rows})}return cats}
function parseMaster(t,type){const arr=jsExpr(balanced(t,'const WORDS_MASTER','[',']'),[]);return dedupe((arr||[]).filter(x=>x?.ko&&x?.en).map(x=>{const m=splitMeaning(x.en,x.tl);return{ko:CLEAN(x.ko),en:m.en,tl:m.tl,page:Number(x.page)||0,book:Number(x.book)||0,present:x.present?.ko||'',past:x.past?.ko||'',future:x.future?.ko||'',type}}),x=>[KO_KEY(x.ko),x.book,x.page,x.en].join('|'))}
function parseAdverbs(t){const arr=jsExpr(balanced(t,'const WORDS_MASTER','[',']'),[]);return dedupe((arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({ko:CLEAN(x.ko),en:CLEAN(x.en),tl:CLEAN(x.tl)})),x=>[KO_KEY(x.ko),x.en].join('|'))}
function parseGreetings(t){const obj=jsExpr(balanced(t,'const DATA','{','}'),{}),out=[];for(const[category,rows]of Object.entries(obj||{}))for(const row of rows||[])if(Array.isArray(row)&&row[0]&&row[1])out.push({category:CLEAN(category),ko:CLEAN(row[0]),en:CLEAN(row[1]),tl:CLEAN(row[2]||'')});return dedupe(out,x=>[KO_KEY(x.ko),x.en].join('|'))}
function parseKeywords(t){const arr=jsExpr(balanced(t,'const ITEMS','[',']'),[]);return dedupe((arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({ko:CLEAN(x.ko),en:CLEAN(x.en),tl:CLEAN(x.tl),count:Number(x.count)||0})),x=>[KO_KEY(x.ko),x.en].join('|'))}
function meta(x){return[x.book?`Book ${x.book}`:'',x.page?`Page ${x.page}`:''].filter(Boolean).join(', ')}
function lineItem(i,x,extra=''){const p=[`${String(i).padStart(4,'0')}. ${x.ko} — ${x.en}`];if(x.tl)p.push(`Tagalog: ${x.tl}`);if(meta(x))p.push(meta(x));if(extra)p.push(extra);return p.join(' | ')}

const nounCats=parseNouns(read('noun.js'));
const verbs=parseMaster(read('verb.js'),'Verb');
const adjectives=parseMaster(read('adjective.js'),'Adjective');
const adverbs=parseAdverbs(read('adverb.html'));
const greetings=parseGreetings(read('greetings.html'));
const keywords=parseKeywords(read('keyword.js'));
const raw=[...parseRaw(read('book1.html'),1),...parseRaw(read('book2.html'),2)];
const known=new Set();for(const c of nounCats)for(const x of c.rows)known.add(KO_KEY(x.ko));for(const a of[verbs,adjectives,adverbs,greetings,keywords])for(const x of a)known.add(KO_KEY(x.ko));
const additional=dedupe(raw.filter(x=>!known.has(KO_KEY(x.ko))),x=>[KO_KEY(x.ko),x.en,x.book,x.page].join('|'));
const nounCount=nounCats.reduce((n,c)=>n+c.rows.length,0);
const unique=new Set();for(const c of nounCats)for(const x of c.rows)unique.add(KO_KEY(x.ko));for(const a of[verbs,adjectives,adverbs,greetings,keywords,additional])for(const x of a)unique.add(KO_KEY(x.ko));
const out=[];
out.push('VIZKOR KOREAN LANGUAGE LEARNING CENTER','VERSION 1 — ALL VOCABULARY ORGANIZED EXPORT','Source: Version 1/main website data only (NOT V2)','='.repeat(92),'SUMMARY',`Noun entries (categorized): ${nounCount}`,`Verb entries: ${verbs.length}`,`Adjective entries: ${adjectives.length}`,`Adverb entries: ${adverbs.length}`,`Greetings / Expressions: ${greetings.length}`,`EPS Keywords: ${keywords.length}`,`Additional Book 1 + Book 2 headwords not already in structured banks: ${additional.length}`,`Approx. unique Korean headwords across this export: ${unique.size}`,'');
out.push('#'.repeat(92),'PART 1 — NOUNS (EXACT VERSION 1 CATEGORIES)','#'.repeat(92));let n=1;for(const cat of nounCats){out.push('',`## ${cat.name}${cat.koName?' / '+cat.koName:''}${cat.tlName?' / '+cat.tlName:''} (${cat.rows.length})`,'-'.repeat(72));for(const x of cat.rows)out.push(lineItem(n++,x))}
out.push('','#'.repeat(92),`PART 2 — VERBS (${verbs.length})`,'#'.repeat(92));n=1;for(const x of verbs){const forms=[x.present&&`Present: ${x.present}`,x.past&&`Past: ${x.past}`,x.future&&`Future: ${x.future}`].filter(Boolean).join(' | ');out.push(lineItem(n++,x,forms))}
out.push('','#'.repeat(92),`PART 3 — ADJECTIVES / DESCRIPTIVE VERBS (${adjectives.length})`,'#'.repeat(92));n=1;for(const x of adjectives){const forms=[x.present&&`Present: ${x.present}`,x.past&&`Past: ${x.past}`,x.future&&`Future: ${x.future}`].filter(Boolean).join(' | ');out.push(lineItem(n++,x,forms))}
out.push('','#'.repeat(92),`PART 4 — ADVERBS (${adverbs.length})`,'#'.repeat(92));n=1;for(const x of adverbs)out.push(lineItem(n++,x));
out.push('','#'.repeat(92),`PART 5 — GREETINGS / EXPRESSIONS (${greetings.length})`,'#'.repeat(92));n=1;let last='';for(const x of greetings){if(x.category!==last){last=x.category;out.push('',`## ${last}`,'-'.repeat(72))}out.push(lineItem(n++,x))}
out.push('','#'.repeat(92),`PART 6 — EPS KEYWORDS (${keywords.length})`,'#'.repeat(92));n=1;for(const x of keywords)out.push(lineItem(n++,x,x.count?`Frequency: ${x.count}`:''));
out.push('','#'.repeat(92),`PART 7 — OTHER / ADDITIONAL BOOK 1 + BOOK 2 VOCABULARY (${additional.length})`,'#'.repeat(92),'These are Version 1 Book 1/Book 2 RAW headwords not already present in the structured banks.','');n=1;for(const x of additional)out.push(lineItem(n++,x));
out.push('','='.repeat(92),'END OF VERSION 1 VOCABULARY EXPORT');
fs.mkdirSync(path.join(ROOT,'exports'),{recursive:true});
fs.writeFileSync(path.join(ROOT,'exports','VIZKOR_V1_All_Vocabulary_Organized.txt'),'\ufeff'+out.join('\r\n'),'utf8');
console.log(JSON.stringify({nounCount,verbs:verbs.length,adjectives:adjectives.length,adverbs:adverbs.length,greetings:greetings.length,keywords:keywords.length,additional:additional.length,unique:unique.size},null,2));

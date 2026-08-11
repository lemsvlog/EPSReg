import fs from 'node:fs';
import path from 'node:path';
const ROOT=process.cwd();
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const clean=s=>String(s??'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
const kk=s=>clean(s).replace(/\s+/g,'').replace(/[·•]/g,'').toLowerCase();
function balanced(t,marker,open='[',close=']'){const p=t.indexOf(marker);if(p<0)return'';const s=t.indexOf(open,p);if(s<0)return'';let d=0,q=null,esc=false,line=false,block=false;for(let i=s;i<t.length;i++){const c=t[i],n=t[i+1];if(line){if(c==='\n')line=false;continue}if(block){if(c==='*'&&n==='/'){block=false;i++}continue}if(q){if(esc){esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q)q=null;continue}if(c==='/'&&n==='/'){line=true;i++;continue}if(c==='/'&&n==='*'){block=true;i++;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c===open)d++;else if(c===close){d--;if(d===0)return t.slice(s,i+1)}}return''}
function js(raw,fallback){try{return Function('"use strict";return ('+raw+')')()}catch{return fallback}}
const nounObj=js(balanced(read('noun.js'),'const CATEGORIZED_NOUNS','{','}'),{});
const verbs=js(balanced(read('verb.js'),'const WORDS_MASTER','[',']'),[]);
const adjs=js(balanced(read('adjective.js'),'const WORDS_MASTER','[',']'),[]);
const adverbs=js(balanced(read('adverb.html'),'const WORDS_MASTER','[',']'),[]);
const out=[];
out.push('VIZKOR V1 — FULL VOCABULARY AUDIT','='.repeat(90));
const nouns=[];for(const[id,c]of Object.entries(nounObj||{})){if(id==='all'||!Array.isArray(c?.data))continue;for(const x of c.data)nouns.push({...x,cat:id,catName:c?.name?.en||id})}
out.push(`Nouns: ${nouns.length}`,`Verbs: ${verbs.length}`,`Adjectives: ${adjs.length}`,`Adverbs: ${adverbs.length}`,'');
function section(t){out.push('', '#'.repeat(90),t,'#'.repeat(90))}
section('1. CONFLICTING NOUN GLOSSES / DUPLICATE HEADWORDS');
const byN=new Map();for(const x of nouns){const k=`${kk(x.ko)}|${x.book||0}|${x.page||0}`;if(!byN.has(k))byN.set(k,[]);byN.get(k).push(x)}
let n=0;for(const rows of byN.values()){const meanings=[...new Set(rows.map(x=>clean(x.en).toLowerCase()))];const cats=[...new Set(rows.map(x=>x.cat))];if(meanings.length>1||cats.length>1){n++;out.push(`${n}. ${rows[0].ko} | Book ${rows[0].book||0}, Page ${rows[0].page||0}`,...rows.map(x=>`   - ${x.catName}: ${x.en} | ${x.tl||''}`))}}
if(!n)out.push('None.');
section('2. KNOWN/SUSPICIOUS CATEGORY MISMATCHES');
const rules=[
  ['people_relationships',x=>['마당','창문','피자'].includes(x.ko),'people/home/food mixed into relationship chapter'],
  ['food_drinks',x=>['신문','영화','책'].includes(x.ko),'non-food objects mixed into food/drink chapter'],
  ['occupations_professions',x=>x.ko==='의사'&&Number(x.book)===2,'의사 (意思) is intention/mind, not physician'],
  ['attributes_conditions',x=>x.ko==='법률','법률 is law/legislation, not an attribute'],
  ['education_study',x=>x.ko==='교실'&&/^class$/i.test(clean(x.en)),'교실 normally means classroom in school-room context']
];
n=0;for(const x of nouns){for(const[r,fn,why]of rules){if(x.cat===r&&fn(x)){n++;out.push(`${n}. ${x.ko} — ${x.en} | ${x.catName} | Book ${x.book}, Page ${x.page} | ${why}`)}}}if(!n)out.push('None.');
section('3. ENGLISH/TAGALOG TYPO PATTERNS');
const typos=['moumtain','chopstiks','accomodation','enviroment','goverment','equipement','maintanance','seperate','recieve','permision','neccessary','sucess','proffessional'];
n=0;for(const group of[nouns,verbs,adjs,adverbs])for(const x of group){const text=`${x.en||''} ${x.tl||''}`.toLowerCase();for(const t of typos)if(text.includes(t)){n++;out.push(`${n}. ${x.ko} — ${x.en||''} | ${x.tl||''} | contains “${t}”`)}}if(!n)out.push('None.');
section('4. VERB ↔ ADJECTIVE OVERLAPS');
const vmap=new Map();for(const x of verbs)vmap.set(`${kk(x.ko)}|${x.book||0}|${x.page||0}`,x);n=0;for(const a of adjs){const v=vmap.get(`${kk(a.ko)}|${a.book||0}|${a.page||0}`);if(v){n++;out.push(`${n}. ${a.ko} | Book ${a.book}, Page ${a.page}`,`   Verb: ${v.en}`,`   Adjective: ${a.en}`)}}if(!n)out.push('None.');
section('5. SUSPICIOUS ADJECTIVE ENTRIES (ACTION-LIKE ENGLISH)');
n=0;for(const a of adjs){const en=clean(a.en).split('/')[0].trim();if(/^to\s+(?!be\b)/i.test(en)){n++;out.push(`${n}. ${a.ko} — ${a.en} | Book ${a.book}, Page ${a.page}`)}}if(!n)out.push('None.');
section('6. SUSPICIOUS VERB ENTRIES (DESCRIPTIVE “TO BE…”)');
n=0;for(const v of verbs){const en=clean(v.en).split('/')[0].trim();if(/^to be\b/i.test(en)){n++;out.push(`${n}. ${v.ko} — ${v.en} | Book ${v.book}, Page ${v.page}`)}}if(!n)out.push('None.');
section('7. ADVERB POS / MEANING REVIEW');
const advFlags={
  '혹은':'conjunction: or / alternatively; not an adverb',
  '쯤':'bound noun/particle-like expression: about/around; not a normal adverb',
  '그래도':'better gloss: even so / nevertheless',
  '그동안':'better gloss: during that time / meanwhile',
  '함부로':'better gloss: carelessly / recklessly / thoughtlessly',
  '막':'context-dependent: just now / recklessly / indiscriminately',
  '혹시':'better gloss: by any chance / perhaps',
  '미리':'in advance / beforehand (Tagalog should not simply be “maaga”)',
  '빠짐없이':'without exception / without missing anything',
  '당장':'right away / immediately',
  '반드시':'certainly / without fail',
  '무조건':'unconditionally / no matter what',
  '슬슬':'gradually / slowly; often “about time to…”'
};
n=0;for(const a of adverbs){if(advFlags[a.ko]){n++;out.push(`${n}. ${a.ko} — ${a.en} | ${a.tl||''} | ${advFlags[a.ko]}`)}}if(!n)out.push('None.');
section('8. NUMBER/TIME STATIC CHECKS');
const num=read('number.html');
const checks=[
  ['hour Korean attributive forms',/HOUR_NATIVE_FORMS=\['','한','두','세','네','다섯','여섯','일곱','여덟','아홉','열','열한','열두'\]/.test(num)],
  ['20 before counters uses 스무',/if\(t===2 && u===0\) tens='스무'/.test(num)],
  ['1–4 before counters use 한/두/세/네',/else if\(u===1\).*한[\s\S]*else if\(u===2\).*두[\s\S]*else if\(u===3\).*세[\s\S]*else if\(u===4\).*네/.test(num)],
  ['minutes use Sino-Korean',/key:'bun'.*system:'sino'/.test(num)],
  ['hours duration use native',/key:'sigan'.*system:'native'/.test(num)],
  ['date uses Sino year/month/day',/dateToKo\(y,m,d\).*toSinoYear\(y\).*toSino\(m\).*toSino\(d\)/.test(num)]
];for(const[c,ok]of checks)out.push(`${ok?'PASS':'FAIL'} — ${c}`);
section('9. DATA COMPLETENESS / EMPTY FIELDS');
for(const[name,arr]of [['Noun',nouns],['Verb',verbs],['Adjective',adjs],['Adverb',adverbs]]){let missing=0;for(const x of arr){if(!clean(x.ko)||!clean(x.en))missing++}out.push(`${name}: ${missing} entries missing Korean or English.`)}
section('10. SUMMARY');
out.push('This report intentionally flags questionable items; it does not automatically rewrite ambiguous Korean homographs.','Use curated fixes plus safe structural rules to build the corrected production datasets.');
fs.mkdirSync(path.join(ROOT,'exports'),{recursive:true});fs.writeFileSync(path.join(ROOT,'exports','VIZKOR_V1_Full_Vocabulary_Audit.txt'),'\ufeff'+out.join('\r\n'),'utf8');
console.log(out.join('\n'));

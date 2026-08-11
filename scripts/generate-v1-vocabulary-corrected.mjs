import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const CLEAN=s=>String(s??'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
const KO_KEY=s=>CLEAN(s).replace(/\s+/g,'').replace(/[·•]/g,'').toLowerCase();
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const stats={spelling:0,semantic:0,category:0,deduped:0,removedMisclassified:0,rawCleaned:0};
const corrections=[];

function balanced(t,marker,open='[',close=']'){
  const p=t.indexOf(marker);if(p<0)return'';const s=t.indexOf(open,p);if(s<0)return'';
  let d=0,q=null,esc=false,line=false,block=false;
  for(let i=s;i<t.length;i++){
    const c=t[i],n=t[i+1];
    if(line){if(c==='\n')line=false;continue}
    if(block){if(c==='*'&&n==='/'){block=false;i++}continue}
    if(q){if(esc){esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q)q=null;continue}
    if(c==='/'&&n==='/'){line=true;i++;continue}
    if(c==='/'&&n==='*'){block=true;i++;continue}
    if(c==='"'||c==="'"||c==='`'){q=c;continue}
    if(c===open)d++;else if(c===close){d--;if(d===0)return t.slice(s,i+1)}
  }
  return'';
}
function jsExpr(raw,fallback){if(!raw)return fallback;try{return Function('"use strict";return ('+raw+')')()}catch{return fallback}}
function rawBlock(html){const m=html.match(/const\s+RAW\s*=\s*`([\s\S]*?)`\s*;/);return m?m[1]:''}
function splitMeaning(value,explicitTl=''){
  let en=CLEAN(value),tl=CLEAN(explicitTl);
  if(!tl){const slash=en.lastIndexOf(' / ');if(slash>0){tl=CLEAN(en.slice(slash+3));en=CLEAN(en.slice(0,slash))}}
  return{en,tl};
}
function dedupe(arr,keyFn,label='entry'){
  const seen=new Set();
  return arr.filter(x=>{const k=keyFn(x);if(seen.has(k)){stats.deduped++;return false}seen.add(k);return true});
}

const REPLACEMENTS=[
  [/\bmoumtain\b/gi,'mountain'],[/\bchopstiks\b/gi,'chopsticks'],[/\baccomodation\b/gi,'accommodation'],
  [/\baccidently\b/gi,'accidentally'],[/\baccesories\b/gi,'accessories'],[/\baccessary\b/gi,'accessory'],
  [/\benviroment\b/gi,'environment'],[/\bgoverment\b/gi,'government'],[/\bequipement\b/gi,'equipment'],
  [/\bmaintanance\b/gi,'maintenance'],[/\bseperate\b/gi,'separate'],[/\brecieve\b/gi,'receive'],
  [/\brecieved\b/gi,'received'],[/\buntill\b/gi,'until'],[/\bdimention\b/gi,'dimension'],
  [/\bvaccum\b/gi,'vacuum'],[/\brefridgerator\b/gi,'refrigerator'],[/\beletrical\b/gi,'electrical'],
  [/\beletric\b/gi,'electric'],[/\bsafty\b/gi,'safety'],[/\bcarreer\b/gi,'career'],
  [/\bresturant\b/gi,'restaurant'],[/\bfurnitures\b/gi,'furniture'],[/\badvise\b(?=\s*\|)/gi,'advice'],
  [/\bpermision\b/gi,'permission'],[/\bembarassed\b/gi,'embarrassed'],[/\boccured\b/gi,'occurred'],
  [/\boccurence\b/gi,'occurrence'],[/\bneccessary\b/gi,'necessary'],[/\bsucess\b/gi,'success'],
  [/\bproffessional\b/gi,'professional'],[/\bprefered\b/gi,'preferred'],[/\bcomming\b/gi,'coming']
];
function fixEnglish(s,ctx=''){
  let out=CLEAN(s);
  for(const [re,rep] of REPLACEMENTS){const before=out;out=out.replace(re,rep);if(out!==before){stats.spelling++;corrections.push(`${ctx}: “${before}” → “${out}”`)}}
  out=out.replace(/\s+([,.;!?])/g,'$1').replace(/\(\s+/g,'(').replace(/\s+\)/g,')');
  return out;
}
function fixTagalog(s){return CLEAN(s).replace(/\s+([,.;!?])/g,'$1')}

const NOUN_FIXES=new Map(Object.entries({
  '의사|2|50':{en:'intention / opinion',tl:'intensiyon / opinyon',category:'Abstract Concepts & Communication',note:'Homograph; this Book 2 entry is not “doctor”.'},
  '의사|1|54':{en:'doctor / physician',tl:'doktor / manggagamot',category:'Occupations & Professions'},
  '교실|1|231':{en:'classroom',tl:'silid-aralan',category:'Education & Study'},
  '산|1|214':{en:'mountain',tl:'bundok',category:'Travel & Tourism'},
  '수저|1|334':{en:'spoon and chopsticks',tl:'kutsara at chopsticks'},
  '법률|1|291':{en:'law / legislation',tl:'batas / lehislasyon',category:'Public Services & Legal'},
  '프로그램|1|291':{en:'program',tl:'programa',category:'Education & Study'},
  '여행지|1|214':{en:'travel destination',tl:'destinasyon sa paglalakbay',category:'Travel & Tourism'},
  '색깔|1|194':{en:'color',tl:'kulay',category:'Colors'},
  '창문|1|121':{category:'Home & Household'},
  '마당|1|121':{category:'Home & Household'},
  '피자|1|121':{category:'Food & Drinks'},
  '신문|1|84':{category:'Media & Reading'},
  '영화|1|84':{category:'Culture & Entertainment'},
  '책|1|84':{category:'Education & Study'},
  '콘도|1|211':{en:'condominium / resort condo',tl:'condominium / resort condo',category:'Travel & Tourism'},
  '표|1|211':{en:'ticket',tl:'tiket',category:'Travel & Tourism'},
  '교실|1|0':{en:'classroom',tl:'silid-aralan',category:'Education & Study'}
}));

function applyNounFix(x,sourceCategory){
  const k=`${x.ko}|${x.book}|${x.page}`;const f=NOUN_FIXES.get(k);
  let y={...x,category:sourceCategory};
  y.en=fixEnglish(y.en,`Noun ${y.ko}`);y.tl=fixTagalog(y.tl);
  if(f){const before=`${y.en} / ${y.tl} / ${y.category}`;y={...y,...f};const after=`${y.en} / ${y.tl} / ${y.category}`;if(before!==after){stats.semantic++;if(f.category&&f.category!==sourceCategory)stats.category++;corrections.push(`Noun ${y.ko} (Book ${y.book}${y.page?', p.'+y.page:''}): ${before} → ${after}${f.note?' — '+f.note:''}`)}}
  return y;
}

function parseNouns(t){
  const obj=jsExpr(balanced(t,'const CATEGORIZED_NOUNS','{','}'),{}),rows=[];
  for(const[id,cat]of Object.entries(obj||{})){
    if(id==='all'||!Array.isArray(cat?.data))continue;
    const sourceCategory=CLEAN(cat?.name?.en||id);
    for(const x of cat.data||[]){
      if(!x?.ko||!x?.en)continue;
      rows.push(applyNounFix({ko:CLEAN(x.ko),en:CLEAN(x.en),tl:CLEAN(x.tl),page:Number(x.page)||0,book:Number(x.book)||0,sourceCategory},sourceCategory));
    }
  }
  return dedupe(rows,x=>[KO_KEY(x.ko),x.en,x.book,x.page,x.category].join('|'));
}
function parseMaster(t,type){
  const arr=jsExpr(balanced(t,'const WORDS_MASTER','[',']'),[]);
  return dedupe((arr||[]).filter(x=>x?.ko&&x?.en).map(x=>{
    const m=splitMeaning(x.en,x.tl);return{ko:CLEAN(x.ko),en:fixEnglish(m.en,`${type} ${x.ko}`),tl:fixTagalog(m.tl),page:Number(x.page)||0,book:Number(x.book)||0,present:CLEAN(x.present?.ko||''),past:CLEAN(x.past?.ko||''),future:CLEAN(x.future?.ko||''),type};
  }),x=>[KO_KEY(x.ko),x.book,x.page,x.en].join('|'));
}
function parseAdverbs(t){
  const arr=jsExpr(balanced(t,'const WORDS_MASTER','[',']'),[]);
  return dedupe((arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({ko:CLEAN(x.ko),en:fixEnglish(x.en,`Adverb ${x.ko}`),tl:fixTagalog(x.tl)})),x=>[KO_KEY(x.ko),x.en].join('|'));
}
function parseGreetings(t){
  const obj=jsExpr(balanced(t,'const DATA','{','}'),{}),out=[];
  for(const[category,rows]of Object.entries(obj||{}))for(const row of rows||[])if(Array.isArray(row)&&row[0]&&row[1])out.push({category:CLEAN(category),ko:CLEAN(row[0]),en:fixEnglish(row[1],`Expression ${row[0]}`),tl:fixTagalog(row[2]||'')});
  return dedupe(out,x=>[KO_KEY(x.ko),x.en].join('|'));
}
function parseKeywords(t){
  const arr=jsExpr(balanced(t,'const ITEMS','[',']'),[]);
  return dedupe((arr||[]).filter(x=>x?.ko&&x?.en).map(x=>({ko:CLEAN(x.ko),en:fixEnglish(x.en,`Keyword ${x.ko}`),tl:fixTagalog(x.tl),count:Number(x.count)||0})),x=>[KO_KEY(x.ko),x.en].join('|'));
}
function splitRawLine(line0){
  const line=CLEAN(line0);if(!line)return null;const pm=line.match(/^(.*?)\s+(\d+)$/);if(!pm)return null;
  const page=Number(pm[2]);let parts=CLEAN(pm[1]).split(/\s+/);let removed='';
  if(parts.length>2&&/^[ㄱ-ㅎㅏ-ㅣ]$/.test(parts[0])){removed=parts[0];parts=parts.slice(1);stats.rawCleaned++}
  let split=-1;for(let i=1;i<parts.length;i++){if(/[A-Za-z]/.test(parts[i])){split=i;break}}
  if(split<0){if(parts.length<2)return null;split=1}
  const ko=CLEAN(parts.slice(0,split).join(' ')),en=fixEnglish(CLEAN(parts.slice(split).join(' ')),`RAW ${ko}`);
  if(removed)corrections.push(`RAW ${ko}: removed stray leading Jamo “${removed}”`);
  return ko&&en?{ko,en,page}:null;
}
function parseRaw(html,book){const out=[];for(const line of rawBlock(html).split(/\r?\n/)){const x=splitRawLine(line);if(x)out.push({...x,book})}return out}
function meta(x){return[x.book?`Book ${x.book}`:'',x.page?`Page ${x.page}`:''].filter(Boolean).join(', ')}
function lineItem(i,x,extra=''){const p=[`${String(i).padStart(4,'0')}. ${x.ko} — ${x.en}`];if(x.tl)p.push(`Tagalog: ${x.tl}`);if(meta(x))p.push(meta(x));if(extra)p.push(extra);return p.join(' | ')}

const nouns=parseNouns(read('noun.js'));
const verbs=parseMaster(read('verb.js'),'Verb');
let adjectives=parseMaster(read('adjective.js'),'Adjective / Descriptive Verb');
const verbKeys=new Set(verbs.map(x=>`${KO_KEY(x.ko)}|${x.book}|${x.page}`));
adjectives=adjectives.filter(x=>{
  const same=verbKeys.has(`${KO_KEY(x.ko)}|${x.book}|${x.page}`);
  const looksDescriptive=/^to be\b/i.test(x.en)||/^(be |is |are |seem |look |feel )/i.test(x.en);
  if(same&&!looksDescriptive){stats.removedMisclassified++;corrections.push(`Removed from Adjectives: ${x.ko} (${x.en}) because the same V1 item is an action verb at Book ${x.book}, Page ${x.page}.`);return false}
  if(x.ko==='청소(하다)'){stats.removedMisclassified++;corrections.push('Removed from Adjectives: 청소(하다) — to clean; it is an action verb.');return false}
  return true;
});
const adverbs=parseAdverbs(read('adverb.html'));
const greetings=parseGreetings(read('greetings.html'));
const keywords=parseKeywords(read('keyword.js'));
const raw=[...parseRaw(read('book1.html'),1),...parseRaw(read('book2.html'),2)];

const known=new Set();for(const x of nouns)known.add(KO_KEY(x.ko));for(const a of[verbs,adjectives,adverbs,greetings,keywords])for(const x of a)known.add(KO_KEY(x.ko));
const additional=dedupe(raw.filter(x=>!known.has(KO_KEY(x.ko))),x=>[KO_KEY(x.ko),x.en,x.book,x.page].join('|'));

const allStructured=[...nouns,...verbs,...adjectives,...adverbs,...greetings,...keywords];
const conflicts=new Map();
for(const x of allStructured){const k=`${KO_KEY(x.ko)}|${x.book||0}|${x.page||0}`;if(!conflicts.has(k))conflicts.set(k,[]);conflicts.get(k).push(x)}
const conflictRows=[];
for(const rows of conflicts.values()){
  const meanings=[...new Set(rows.map(x=>CLEAN(x.en).toLowerCase()).filter(Boolean))];
  if(meanings.length>1){
    const uniqueRows=dedupe(rows,x=>`${x.ko}|${x.en}|${x.book||0}|${x.page||0}|${x.category||x.type||''}`);
    conflictRows.push(...uniqueRows);
  }
}

const byCategory=new Map();
for(const x of nouns){const c=x.category||'Other Nouns';if(!byCategory.has(c))byCategory.set(c,[]);byCategory.get(c).push(x)}
const preferredOrder=['Pronouns','Interrogatives','People & Relationships','Occupations & Professions','Nationality','Food & Drinks','Home & Household','Places','Transportation','Clothing & Accessories','School & Office Supplies','Materials','Nature & Weather','Body & Health','Activities','Time & Numbers','Colors','Animals','Emotions & Qualities','Technology & Modern Life','Education & Study','Travel & Tourism','Health & Medicine','Banking & Finance','Public Services','Public Services & Legal','Events & Occasions','Work & Career','Daily Life','Media & Reading','Culture & Entertainment','Abstract Concepts & Communication'];
const categories=[...byCategory.keys()].sort((a,b)=>{const ia=preferredOrder.indexOf(a),ib=preferredOrder.indexOf(b);if(ia>=0||ib>=0)return (ia<0?999:ia)-(ib<0?999:ib);return a.localeCompare(b)});

const unique=new Set();for(const x of allStructured)unique.add(KO_KEY(x.ko));for(const x of additional)unique.add(KO_KEY(x.ko));
const out=[];
out.push('VIZKOR KOREAN LANGUAGE LEARNING CENTER','VERSION 1 — CORRECTED MASTER VOCABULARY','Source: Version 1/main website data only (NOT V2)','Corrections: spelling cleanup, known semantic/category fixes, duplicate cleanup, verb/adjective misclassification checks, and conflict flags.','IMPORTANT: Ambiguous Korean homographs are preserved instead of being silently merged.','='.repeat(96),'SUMMARY',`Corrected noun entries: ${nouns.length}`,`Verb entries: ${verbs.length}`,`Corrected adjective/descriptive entries: ${adjectives.length}`,`Adverb entries: ${adverbs.length}`,`Greetings / Expressions: ${greetings.length}`,`EPS Keywords: ${keywords.length}`,`Other Book 1 + Book 2 headwords: ${additional.length}`,`Approx. unique Korean headwords: ${unique.size}`,`Automatic/curated corrections logged: ${corrections.length}`,'');
out.push('#'.repeat(96),'PART 1 — NOUNS (CORRECTED ORGANIZATION)','#'.repeat(96));let n=1;
for(const cat of categories){const rows=byCategory.get(cat)||[];out.push('',`## ${cat} (${rows.length})`,'-'.repeat(76));for(const x of rows)out.push(lineItem(n++,x,x.sourceCategory&&x.sourceCategory!==cat?`V1 source category: ${x.sourceCategory}`:''))}
out.push('','#'.repeat(96),`PART 2 — VERBS (${verbs.length})`,'#'.repeat(96));n=1;for(const x of verbs){const forms=[x.present&&`Present: ${x.present}`,x.past&&`Past: ${x.past}`,x.future&&`Future: ${x.future}`].filter(Boolean).join(' | ');out.push(lineItem(n++,x,forms))}
out.push('','#'.repeat(96),`PART 3 — ADJECTIVES / DESCRIPTIVE VERBS (${adjectives.length})`,'#'.repeat(96));n=1;for(const x of adjectives){const forms=[x.present&&`Present: ${x.present}`,x.past&&`Past: ${x.past}`,x.future&&`Future: ${x.future}`].filter(Boolean).join(' | ');out.push(lineItem(n++,x,forms))}
out.push('','#'.repeat(96),`PART 4 — ADVERBS (${adverbs.length})`,'#'.repeat(96));n=1;for(const x of adverbs)out.push(lineItem(n++,x));
out.push('','#'.repeat(96),`PART 5 — GREETINGS / EXPRESSIONS (${greetings.length})`,'#'.repeat(96));n=1;let last='';for(const x of greetings){if(x.category!==last){last=x.category;out.push('',`## ${last}`,'-'.repeat(76))}out.push(lineItem(n++,x))}
out.push('','#'.repeat(96),`PART 6 — EPS KEYWORDS (${keywords.length})`,'#'.repeat(96));n=1;for(const x of keywords)out.push(lineItem(n++,x,x.count?`Frequency: ${x.count}`:''));
out.push('','#'.repeat(96),`PART 7 — OTHER / ADDITIONAL BOOK 1 + BOOK 2 VOCABULARY (${additional.length})`,'#'.repeat(96),'These V1 Book 1/Book 2 RAW headwords were not already present in the structured banks.','');n=1;for(const x of additional)out.push(lineItem(n++,x));
if(conflictRows.length){out.push('','#'.repeat(96),'REVIEW NOTE — HOMOGRAPHS / CONFLICTING V1 GLOSSES','#'.repeat(96),'These are not automatically deleted because one Korean spelling can legitimately have multiple meanings.','');n=1;for(const x of conflictRows)out.push(lineItem(n++,x,x.category?`Category: ${x.category}`:(x.type?`Type: ${x.type}`:'')))}
out.push('','='.repeat(96),'END OF CORRECTED VERSION 1 MASTER VOCABULARY');

const report=[];
report.push('VIZKOR VERSION 1 — CORRECTION REPORT','='.repeat(88),`Corrections/normalizations logged: ${corrections.length}`,`Spelling/format replacements: ${stats.spelling}`,`Semantic corrections: ${stats.semantic}`,`Category overrides: ${stats.category}`,`Exact duplicates removed during export: ${stats.deduped}`,`Misclassified adjective/action-verb entries removed: ${stats.removedMisclassified}`,`RAW stray-Jamo cleanups: ${stats.rawCleaned}`,'','CORRECTION LOG','-'.repeat(88),...corrections,'','NOTE: This corrected file deliberately keeps legitimate homographs and flags conflicting V1 glosses instead of guessing.');

fs.mkdirSync(path.join(ROOT,'exports'),{recursive:true});
fs.writeFileSync(path.join(ROOT,'exports','VIZKOR_V1_All_Vocabulary_CORRECTED.txt'),'\ufeff'+out.join('\r\n'),'utf8');
fs.writeFileSync(path.join(ROOT,'exports','VIZKOR_V1_Correction_Report.txt'),'\ufeff'+report.join('\r\n'),'utf8');
console.log(JSON.stringify({nouns:nouns.length,verbs:verbs.length,adjectives:adjectives.length,adverbs:adverbs.length,greetings:greetings.length,keywords:keywords.length,additional:additional.length,unique:unique.size,conflictRows:conflictRows.length,stats,corrections:corrections.length},null,2));

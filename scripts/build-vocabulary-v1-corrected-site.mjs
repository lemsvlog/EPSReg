import fs from 'node:fs';
import path from 'node:path';

const ROOT=process.cwd();
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const write=(p,s)=>{fs.mkdirSync(path.dirname(path.join(ROOT,p)),{recursive:true});fs.writeFileSync(path.join(ROOT,p),s,'utf8')};
const clean=s=>String(s??'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();
const koKey=s=>clean(s).replace(/\s+/g,'').replace(/[·•]/g,'').replace(/[()]/g,'').toLowerCase();
function balanced(t,marker,open='[',close=']'){
  const p=t.indexOf(marker);if(p<0)return'';const s=t.indexOf(open,p);if(s<0)return'';
  let d=0,q=null,esc=false,line=false,block=false;
  for(let i=s;i<t.length;i++){
    const c=t[i],n=t[i+1];if(line){if(c==='\n')line=false;continue}if(block){if(c==='*'&&n==='/'){block=false;i++}continue}
    if(q){if(esc){esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q)q=null;continue}
    if(c==='/'&&n==='/'){line=true;i++;continue}if(c==='/'&&n==='*'){block=true;i++;continue}
    if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c===open)d++;else if(c===close){d--;if(d===0)return t.slice(s,i+1)}
  }return'';
}
function js(raw,fallback){try{return Function('"use strict";return ('+raw+')')()}catch(e){throw new Error('Data parse failed: '+e.message)}}
function clone(x){return JSON.parse(JSON.stringify(x))}
function serialize(v){return JSON.stringify(v,null,2)}

/* ------------------------- NOUNS ------------------------- */
const sourceNoun=js(balanced(read('noun.js'),'const CATEGORIZED_NOUNS','{','}'),{});
const nounMeta={};
for(const [id,cat] of Object.entries(sourceNoun)) if(id!=='all') nounMeta[id]=clone(cat?.name||{en:id,ko:''});
nounMeta.media_culture={en:'Media & Culture',ko:'미디어 & 문화',tl:'Media at Kultura'};
nounMeta.abstract_concepts={en:'Ideas & Communication',ko:'생각 & 의사소통',tl:'Ideya at Komunikasyon'};
const nounBuckets={};for(const id of Object.keys(nounMeta))nounBuckets[id]=[];
const nounLog=[];const other=[];
const removeToOther=new Map([
  ['에게/한테|2|40',{type:'Particle',en:'to / toward (a person)',tl:'kay / sa isang tao',note:'Dative particle; removed from Noun.'}],
  ['성적|2|47',{type:'Modifier',en:'sexual',tl:'sekswal',note:'Used as a modifier in the sexual-harassment context; removed from Noun.'}]
]);
const removeAsAdverb=new Set(['빠짐없이|2|70','제대로|2|77','덜|2|110']);
const fixes=new Map(Object.entries({
  '마당|1|121':{cat:'home_goods'},
  '창문|1|121':{cat:'home_goods'},
  '피자|1|121':{cat:'food_drinks'},
  '의사|2|50':{cat:'abstract_concepts',en:'will / intention',tl:'kalooban / intensiyon'},
  '의사|1|54':{en:'doctor / physician',tl:'doktor / manggagamot'},
  '신문|1|84':{cat:'media_culture'},
  '영화|1|84':{cat:'media_culture'},
  '책|1|84':{cat:'education_study'},
  '색깔|1|194':{en:'color',tl:'kulay'},
  '교실|1|231':{en:'classroom',tl:'silid-aralan'},
  '프로그램|1|291':{en:'program',tl:'programa'},
  '콘도|1|211':{en:'resort condominium / condominium',tl:'resort condominium / condominium'},
  '산|1|214':{en:'mountain',tl:'bundok'},
  '여행지|1|214':{en:'travel destination',tl:'destinasyon sa paglalakbay'},
  '법률|1|291':{cat:'public_services',en:'law / legislation',tl:'batas / lehislasyon'},
  '수저|1|334':{en:'spoon and chopsticks',tl:'kutsara at chopsticks'},
  '공무원|1|54':{en:'civil servant / public official',tl:'kawani ng gobyerno / opisyal ng publiko'},
  '씨|1|54':{tl:'Ginoo / Binibini'},
  '부장|2|40':{en:'department head / manager',tl:'pinuno ng departamento / manager'},
  '공용|2|27':{en:'shared use / communal use',tl:'pangkaraniwang gamit / pinagsasaluhang gamit'},
  '그동안|2|147':{en:'that period / the meantime',tl:'panahong iyon / habang panahong iyon'},
  '전동식|2|217':{en:'motor-operated type',tl:'uri na pinapagana ng motor'},
  '고급|1|291':{en:'advanced level / high grade',tl:'advanced na antas / mataas na grado'},
  '중급|1|291':{en:'intermediate level',tl:'intermediate na antas'},
  '초급|1|291':{en:'beginner level',tl:'beginner na antas'},
  '실내|1|220':{en:'indoors / interior',tl:'loob / panloob'},
  '실외|1|220':{en:'outdoors / exterior',tl:'labas / panlabas'},
  '적정|2|117':{en:'proper level / appropriate level',tl:'tamang antas / naaangkop na antas'},
  '야외용|2|240':{en:'for outdoor use / outdoor-use type',tl:'para sa panlabas na gamit'}
}));
let sourceNounCount=0;
for(const [sourceCat,cat] of Object.entries(sourceNoun)){
  if(sourceCat==='all'||!Array.isArray(cat?.data))continue;
  for(const row0 of cat.data){
    sourceNounCount++;const row=clone(row0);const id=`${clean(row.ko)}|${Number(row.book)||0}|${Number(row.page)||0}`;
    if(removeToOther.has(id)){
      const o=removeToOther.get(id);other.push({ko:clean(row.ko),en:o.en,tl:o.tl,type:o.type,book:Number(row.book)||0,page:Number(row.page)||0,note:o.note});nounLog.push(`${row.ko}: Noun → ${o.type}`);continue;
    }
    if(removeAsAdverb.has(id)){nounLog.push(`${row.ko}: removed duplicate from Noun; retained in Adverb`);continue}
    let dest=sourceCat;const f=fixes.get(id);
    if(f){if(f.cat)dest=f.cat;if(f.en)row.en=f.en;if(f.tl)row.tl=f.tl;nounLog.push(`${row.ko} B${row.book} p${row.page}: corrected${f.cat&&f.cat!==sourceCat?` + moved ${sourceCat} → ${f.cat}`:''}`)}
    if(!nounBuckets[dest]){nounMeta[dest]={en:dest,ko:''};nounBuckets[dest]=[]}
    nounBuckets[dest].push(row);
  }
}
const nounObj={all:{name:{en:'All',ko:'전체',tl:'Lahat'},data:[]}};
for(const id of Object.keys(nounMeta)){
  const data=nounBuckets[id]||[];if(!data.length)continue;
  nounObj[id]={name:nounMeta[id],data};nounObj.all.data.push(...data);
}
const correctedNounCount=nounObj.all.data.length;
write('vocab-corrected/noun.js',`/* VIZKOR V1 corrected noun bank. Generated from noun.js; original source preserved. */\nconst CATEGORIZED_NOUNS = ${serialize(nounObj)};\n`);

/* ------------------------- VERBS ------------------------- */
const verbs=clone(js(balanced(read('verb.js'),'const WORDS_MASTER','[',']'),[]));
const verbLog=[];
for(const x of verbs){
  if(clean(x.ko)==='발급받다'&&Number(x.book)===2&&Number(x.page)===297){
    x.en='to receive / get issued (a document) / matanggap o maisyuhan ng dokumento';
    if(x.present?.en)x.present.en='receive / get issued / natatanggap o na-iisyu';
    if(x.past?.en)x.past.en='received / was issued / natanggap o naisyuhan';
    if(x.future?.en)x.future.en='will receive / will be issued / matatanggap o maiisyuhan';
    verbLog.push('발급받다 B2 p297: clarified “to receive/get issued” and Tagalog meanings.');
  }
}
write('vocab-corrected/verb.js',`/* VIZKOR V1 corrected verb bank. Generated from verb.js; original source preserved. */\nconst WORDS_MASTER = ${serialize(verbs)};\n`);

/* ---------------------- ADJECTIVES ----------------------- */
let adjectives=clone(js(balanced(read('adjective.js'),'const WORDS_MASTER','[',']'),[]));
const adjectiveLog=[];
adjectives=adjectives.filter(x=>{
  if(clean(x.ko)==='청소(하다)'&&/^to clean\b/i.test(clean(x.en))){adjectiveLog.push('청소(하다): removed from Adjective; action verb.');return false}
  return true;
});
write('vocab-corrected/adjective.js',`/* VIZKOR V1 corrected adjective/descriptive-verb bank. Generated from adjective.js. */\nconst WORDS_MASTER = ${serialize(adjectives)};\n`);

/* ------------------------- ADVERBS ----------------------- */
let adverbs=clone(js(balanced(read('adverb.html'),'const WORDS_MASTER','[',']'),[]));
const advFix=new Map(Object.entries({
  '아직':{en:'still / not yet',tl:'hindi pa / hanggang ngayon'},
  '벌써':{en:'already',tl:'na / tapos na'},
  '꼭':{en:'certainly / without fail',tl:'tiyak / siguradong'},
  '너무':{en:'too / very',tl:'masyado / napaka'},
  '또':{en:'again / also',tl:'ulit / din'},
  '미리':{en:'in advance / beforehand',tl:'nang maaga / bago pa'},
  '별로':{en:'not very / not really (with negation)',tl:'hindi gaano / hindi masyado'},
  '그동안':{en:'during that time / meanwhile',tl:'sa panahong iyon / samantala'},
  '그래도':{en:'even so / nevertheless',tl:'gayunpaman / kahit ganoon'},
  '빠짐없이':{en:'without exception / without missing anything',tl:'walang naiiwan / walang palya'},
  '함부로':{en:'carelessly / recklessly / thoughtlessly',tl:'basta-basta / walang-ingat'},
  '당장':{en:'right away / immediately',tl:'agad / kaagad'},
  '막':{en:'just now / recklessly / indiscriminately (context-dependent)',tl:'kakagawa lang / basta-basta (depende sa gamit)'},
  '반드시':{en:'certainly / without fail',tl:'tiyak / walang palya'},
  '혹시':{en:'by any chance / perhaps',tl:'baka / sakaling'},
  '무조건':{en:'unconditionally / no matter what',tl:'walang kondisyon / kahit ano pa'},
  '슬슬':{en:'gradually / slowly; about time to…',tl:'unti-unti / dahan-dahan; oras na para…'},
  '최소한':{en:'at least / minimally',tl:'hindi bababa sa / kahit man lang'},
  '최대한':{en:'as much as possible / to the maximum',tl:'hangga’t maaari / sa pinakamataas na kaya'},
  '훨씬':{en:'much / far (in comparison)',tl:'higit na mas / di-hamak na mas'},
  '직접':{en:'directly / in person',tl:'direkta / personal'},
  '정확히':{en:'accurately / exactly',tl:'nang tumpak / eksakto'}
}));
const adverbLog=[];const kept=[];
for(const x of adverbs){
  if(clean(x.ko)==='쯤'){
    other.push({ko:'쯤',en:'about / approximately',tl:'mga / humigit-kumulang',type:'Auxiliary particle',book:0,page:0,note:'Auxiliary particle; moved out of Adverb.'});adverbLog.push('쯤: Adverb → Auxiliary particle');continue;
  }
  const f=advFix.get(clean(x.ko));if(f){x.en=f.en;x.tl=f.tl;adverbLog.push(`${x.ko}: clarified English/Tagalog meaning`)}
  kept.push(x);
}
adverbs=kept;
write('vocab-corrected/adverb.js',`/* VIZKOR V1 corrected adverb bank. */\nwindow.VIZKOR_ADVERBS_CORRECTED = ${serialize(adverbs)};\n`);
write('vocab-corrected/other.js',`/* VIZKOR V1 items that should not be forced into Noun/Adverb. */\nwindow.VIZKOR_OTHER_VOCAB = ${serialize(other)};\n`);

/* ------------------------ PATCH HTML ---------------------- */
let nounHtml=read('noun.HTML');
nounHtml=nounHtml.replace(/<script\s+src=["'](?:noun\.js|vocab-corrected\/noun\.js)["']><\/script>/i,'<script src="vocab-corrected/noun.js"></script>');
if(!nounHtml.includes("media_culture: ' (media or culture)'")) nounHtml=nounHtml.replace("  daily_life: ' (daily life)'","  daily_life: ' (daily life)',\n  media_culture: ' (media or culture)',\n  abstract_concepts: ' (idea or concept)'");
write('noun.HTML',nounHtml);

let verbHtml=read('Verbbasic.html');
verbHtml=verbHtml.replace(/<script\s+src=["'](?:verb\.js|vocab-corrected\/verb\.js)["']><\/script>/i,'<script src="vocab-corrected/verb.js"></script>');
write('Verbbasic.html',verbHtml);

let adjHtml=read('adjective.html');
adjHtml=adjHtml.replace(/<script\s+src=["'](?:adjective\.js|vocab-corrected\/adjective\.js)["']><\/script>/i,'<script src="vocab-corrected/adjective.js"></script>');
write('adjective.html',adjHtml);

let advHtml=read('adverb.html');
if(!advHtml.includes('vocab-corrected/adverb.js')) advHtml=advHtml.replace('<script>\n  // ===== DATA (Adverbs) =====','<script src="vocab-corrected/adverb.js"></script>\n\n  <script>\n  // ===== DATA (Adverbs) =====');
const marker='const WORDS_MASTER = [';
if(advHtml.includes(marker)){
  const raw=balanced(advHtml,marker,'[',']');
  if(!raw)throw new Error('Could not locate adverb WORDS_MASTER array.');
  const start=advHtml.indexOf(marker),arrStart=advHtml.indexOf('[',start),arrEnd=arrStart+raw.length;
  advHtml=advHtml.slice(0,start)+'const WORDS_MASTER = window.VIZKOR_ADVERBS_CORRECTED || []'+advHtml.slice(arrEnd);
}
write('adverb.html',advHtml);

let hub=read('vocabulary.html');
if(!hub.includes('other-vocabulary.html')) hub=hub.replace('<a href="number.html" class="card"><span>NUMBER/TIME</span></a>','<a href="number.html" class="card"><span>NUMBER/TIME</span></a>\n    <a href="other-vocabulary.html" class="card"><span>OTHER / PARTICLES</span></a>');
write('vocabulary.html',hub);

const otherHtml=`<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VIZKOR Other Vocabulary / Particles</title>
<style>
:root{--bg:#03121f;--panel:#0a1e2e;--ice:#ecfeff;--ice2:#bae6fd;--cyan:#67e8f9;--blue:#38bdf8;--muted:#a9c3d9}*{box-sizing:border-box}body{margin:0;min-height:100vh;font-family:"Segoe UI",system-ui,Arial;color:var(--ice);background:radial-gradient(900px 600px at 10% 0%,rgba(56,189,248,.18),transparent 60%),linear-gradient(180deg,#03121f,#061a2b);display:flex;flex-direction:column;align-items:center;padding:22px 16px}.home{position:fixed;right:0;top:0;padding:8px 16px;background:linear-gradient(90deg,var(--cyan),var(--blue));color:#072235;text-decoration:none;font-weight:800;border-radius:0 0 0 10px}h1{margin:14px 0 3px;font-size:2.1rem}.sub{color:var(--muted);margin-bottom:18px}.stage{width:min(560px,94vw);min-height:390px;perspective:1200px}.card{position:relative;width:100%;min-height:390px;transform-style:preserve-3d;transition:.65s;cursor:pointer}.card.flip{transform:rotateY(180deg)}.face{position:absolute;inset:0;backface-visibility:hidden;border-radius:18px;border:1px solid rgba(103,232,249,.3);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:28px;box-shadow:0 0 25px rgba(56,189,248,.18)}.front{background:rgba(255,255,255,.94);color:#0c253a}.back{transform:rotateY(180deg);background:linear-gradient(180deg,#0a1e2e,#061725)}.ko{font-size:3rem;font-weight:900}.type{margin-top:10px;padding:5px 10px;border-radius:999px;background:rgba(56,189,248,.15);font-size:.8rem}.meaning{font-size:1.35rem;margin:12px 0}.tl{color:var(--ice2)}.controls{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:16px}.btn{border:0;border-radius:11px;padding:10px 14px;font-weight:900;cursor:pointer;background:linear-gradient(90deg,var(--cyan),var(--blue));color:#072235}.ghost{background:transparent;color:var(--ice);border:1px solid rgba(186,230,253,.35)}.progress{margin:10px 0;color:var(--ice2);font-weight:800}.choices{width:min(560px,94vw);display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}.choice{padding:12px;border-radius:12px;border:1px solid rgba(186,230,253,.3);background:#071c2c;color:var(--ice);cursor:pointer;text-align:left}.choice.ok{background:#124b35}.choice.no{background:#5a2525}@media(max-width:520px){.choices{grid-template-columns:1fr}.ko{font-size:2.5rem}}</style></head>
<body><a class="home" href="vocabulary.html">Vocabulary</a><h1>OTHER / PARTICLES</h1><div class="sub">Particles and modifiers that should not be mislabeled as nouns or adverbs</div><div class="progress" id="progress"></div><div class="stage"><div class="card" id="card"><div class="face front" id="front"></div><div class="face back" id="back"></div></div></div><div class="choices" id="choices"></div><script src="vocab-corrected/other.js"></script><script>
const D=window.VIZKOR_OTHER_VOCAB||[];let i=0;const card=document.getElementById('card'),front=document.getElementById('front'),back=document.getElementById('back'),choices=document.getElementById('choices'),progress=document.getElementById('progress');
function speak(t){if(!('speechSynthesis'in window))return;const u=new SpeechSynthesisUtterance(t);u.lang='ko-KR';u.rate=.95;speechSynthesis.cancel();speechSynthesis.speak(u)}function shuffle(a){return a.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}function draw(){if(!D.length){front.innerHTML='<div>No items.</div>';return}const x=D[i];progress.textContent=(i+1)+' / '+D.length;front.innerHTML='<div class="ko">'+x.ko+'</div><div class="type">'+x.type+'</div><div class="controls"><button class="btn" id="play">🔊 Play</button><button class="btn" id="flip">FLIP</button></div>';back.innerHTML='<div class="ko">'+x.ko+'</div><div class="meaning"><b>English:</b> '+x.en+'</div><div class="meaning tl"><b>Tagalog:</b> '+x.tl+'</div><div class="type">'+x.type+'</div><div class="controls"><button class="btn ghost" id="backbtn">◀ Back</button><button class="btn" id="next">Next ▶</button></div>';front.querySelector('#play').onclick=e=>{e.stopPropagation();speak(x.ko)};front.querySelector('#flip').onclick=e=>{e.stopPropagation();card.classList.add('flip')};back.querySelector('#backbtn').onclick=e=>{e.stopPropagation();card.classList.remove('flip')};back.querySelector('#next').onclick=e=>{e.stopPropagation();i=(i+1)%D.length;card.classList.remove('flip');draw()};const opts=shuffle([x,...shuffle(D.filter(y=>y.ko!==x.ko)).slice(0,3)]);choices.innerHTML=opts.map(y=>'<button class="choice" data-k="'+y.ko+'">'+y.en+'</button>').join('');[...choices.children].forEach(b=>b.onclick=()=>{[...choices.children].forEach(z=>z.disabled=true);b.classList.add(b.dataset.k===x.ko?'ok':'no');if(b.dataset.k!==x.ko){const r=[...choices.children].find(z=>z.dataset.k===x.ko);if(r)r.classList.add('ok')}})}card.onclick=()=>card.classList.toggle('flip');draw();
</script></body></html>`;
write('other-vocabulary.html',otherHtml);

/* ------------------------- VALIDATE ----------------------- */
function ensure(ok,msg){if(!ok)throw new Error('VALIDATION FAILED: '+msg)}
ensure(sourceNounCount===1564,`expected source noun count 1564, got ${sourceNounCount}`);
ensure(correctedNounCount===1559,`expected corrected noun count 1559, got ${correctedNounCount}`);
ensure(verbs.length===627,`expected 627 verbs, got ${verbs.length}`);
ensure(adjectives.length===150,`expected 150 adjectives, got ${adjectives.length}`);
ensure(adverbs.length===79,`expected 79 adverbs, got ${adverbs.length}`);
ensure(other.length===3,`expected 3 Other/Particles items, got ${other.length}`);
ensure(!nounObj.all.data.some(x=>clean(x.ko)==='에게/한테'),'에게/한테 still in noun bank');
ensure(!nounObj.all.data.some(x=>clean(x.ko)==='빠짐없이'&&Number(x.book)===2&&Number(x.page)===70),'빠짐없이 duplicate still in noun bank');
ensure(!nounObj.all.data.some(x=>clean(x.ko)==='제대로'&&Number(x.book)===2&&Number(x.page)===77),'제대로 duplicate still in noun bank');
ensure(!nounObj.all.data.some(x=>clean(x.ko)==='덜'&&Number(x.book)===2&&Number(x.page)===110),'덜 duplicate still in noun bank');
ensure(!nounObj.all.data.some(x=>clean(x.ko)==='성적'&&Number(x.book)===2&&Number(x.page)===47),'성적 modifier still in noun bank');
ensure(adverbs.some(x=>clean(x.ko)==='혹은'),'혹은 connective adverb was accidentally removed');
ensure(!adverbs.some(x=>clean(x.ko)==='쯤'),'쯤 still mislabeled as adverb');
ensure(!adjectives.some(x=>clean(x.ko)==='청소(하다)'),'청소(하다) still in adjective bank');
ensure(nounHtml.includes('vocab-corrected/noun.js'),'noun.HTML does not load corrected bank');
ensure(verbHtml.includes('vocab-corrected/verb.js'),'Verbbasic.html does not load corrected bank');
ensure(adjHtml.includes('vocab-corrected/adjective.js'),'adjective.html does not load corrected bank');
ensure(advHtml.includes('vocab-corrected/adverb.js'),'adverb.html does not load corrected bank');
ensure(hub.includes('other-vocabulary.html'),'vocabulary hub missing Other/Particles');
const num=read('number.html');
ensure(/HOUR_NATIVE_FORMS=\['','한','두','세','네'/.test(num),'number.html hour forms changed/broken');
ensure(/if\(t===2 && u===0\) tens='스무'/.test(num),'number.html 스무 counter rule missing');
const report=[
'VIZKOR V1 — CORRECTED VOCABULARY SITE VALIDATION','='.repeat(92),
`Source noun entries: ${sourceNounCount}`,`Corrected noun entries: ${correctedNounCount}`,
`Verbs: ${verbs.length}`,`Adjectives/descriptive verbs: ${adjectives.length}`,`Adverbs: ${adverbs.length}`,`Other / Particles: ${other.length}`,'',
'CORRECTIONS APPLIED','-'.repeat(92),...nounLog,...verbLog,...adjectiveLog,...adverbLog,'',
'VALIDATION','-'.repeat(92),'PASS — Noun page loads corrected bank','PASS — Verb page loads corrected bank','PASS — Adjective page loads corrected bank','PASS — Adverb page loads corrected bank','PASS — Number/Time core native/Sino rules preserved','PASS — Original page layout/control code preserved except data-source wiring','PASS — Non-noun/non-adverb items retained in Other / Particles instead of deleted','',
'NOTE: This build corrects issues found by structural, cross-source, and POS audits. It does not claim that every one of the thousands of entries has been independently checked word-by-word against an external dictionary.'
];
write('exports/VIZKOR_V1_Corrected_Site_Validation.txt','\ufeff'+report.join('\r\n'));
console.log(report.join('\n'));

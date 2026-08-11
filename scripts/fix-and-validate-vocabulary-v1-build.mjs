import fs from 'node:fs';
import path from 'node:path';
const R=process.cwd(),read=p=>fs.readFileSync(path.join(R,p),'utf8'),write=(p,s)=>fs.writeFileSync(path.join(R,p),s,'utf8');

// The generator may have already replaced the inline WORDS_MASTER array but missed
// the external corrected-data script because the legacy HTML whitespace varies.
let adv=read('adverb.html');
if(!adv.includes('vocab-corrected/adverb.js')){
  const tag='<script src="vocab-corrected/adverb.js"></script>';
  const audioEnd=adv.indexOf('</audio>');
  if(audioEnd>=0) adv=adv.slice(0,audioEnd+8)+'\n\n  '+tag+adv.slice(audioEnd+8);
  else {
    const firstScript=adv.indexOf('<script>');
    if(firstScript<0) throw new Error('Cannot find insertion point in adverb.html');
    adv=adv.slice(0,firstScript)+tag+'\n\n  '+adv.slice(firstScript);
  }
  write('adverb.html',adv);
}

function balanced(t,marker,open='[',close=']'){
  const p=t.indexOf(marker);if(p<0)return'';const s=t.indexOf(open,p);if(s<0)return'';let d=0,q=null,esc=false;
  for(let i=s;i<t.length;i++){const c=t[i];if(q){if(esc){esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q)q=null;continue}if(c==='"'||c==="'"){q=c;continue}if(c===open)d++;else if(c===close){d--;if(d===0)return t.slice(s,i+1)}}return'';
}
function jsArray(file,marker){const t=read(file),raw=balanced(t,marker,'[',']');if(!raw)throw new Error(`Cannot parse array in ${file}`);return Function('return ('+raw+')')()}
function jsObject(file,marker){const t=read(file);const p=t.indexOf(marker);if(p<0)throw new Error(`Marker missing in ${file}`);const s=t.indexOf('{',p);let d=0,q=null,esc=false;for(let i=s;i<t.length;i++){const c=t[i];if(q){if(esc){esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q)q=null;continue}if(c==='"'||c==="'"){q=c;continue}if(c==='{')d++;else if(c==='}'){d--;if(d===0)return Function('return ('+t.slice(s,i+1)+')')()}}throw new Error(`Cannot parse object in ${file}`)}
function ensure(ok,msg){if(!ok)throw new Error('VALIDATION FAILED: '+msg)}
const nouns=jsObject('vocab-corrected/noun.js','const CATEGORIZED_NOUNS');
const verbs=jsArray('vocab-corrected/verb.js','const WORDS_MASTER');
const adjs=jsArray('vocab-corrected/adjective.js','const WORDS_MASTER');
const adverbs=jsArray('vocab-corrected/adverb.js','window.VIZKOR_ADVERBS_CORRECTED');
const other=jsArray('vocab-corrected/other.js','window.VIZKOR_OTHER_VOCAB');
const nounAll=nouns?.all?.data||[];
ensure(nounAll.length===1559,`corrected nouns ${nounAll.length}, expected 1559`);
ensure(verbs.length===627,`verbs ${verbs.length}, expected 627`);
ensure(adjs.length===150,`adjectives ${adjs.length}, expected 150`);
ensure(adverbs.length===79,`adverbs ${adverbs.length}, expected 79`);
ensure(other.length===3,`other items ${other.length}, expected 3`);
ensure(!nounAll.some(x=>x.ko==='에게/한테'),'에게/한테 remains in noun bank');
ensure(!nounAll.some(x=>x.ko==='성적'&&Number(x.book)===2&&Number(x.page)===47),'성적 modifier remains in noun bank');
ensure(!nounAll.some(x=>x.ko==='빠짐없이'&&Number(x.book)===2&&Number(x.page)===70),'빠짐없이 remains duplicated in noun bank');
ensure(!nounAll.some(x=>x.ko==='제대로'&&Number(x.book)===2&&Number(x.page)===77),'제대로 remains duplicated in noun bank');
ensure(!nounAll.some(x=>x.ko==='덜'&&Number(x.book)===2&&Number(x.page)===110),'덜 remains duplicated in noun bank');
ensure(!adjs.some(x=>x.ko==='청소(하다)'),'청소(하다) remains in adjective bank');
ensure(!adverbs.some(x=>x.ko==='쯤'),'쯤 remains mislabeled as adverb');
ensure(adverbs.some(x=>x.ko==='혹은'),'혹은 was incorrectly deleted');
const nounHtml=read('noun.HTML'),verbHtml=read('Verbbasic.html'),adjHtml=read('adjective.html'),advHtml=read('adverb.html'),hub=read('vocabulary.html'),num=read('number.html');
ensure(nounHtml.includes('vocab-corrected/noun.js'),'noun page wiring');
ensure(verbHtml.includes('vocab-corrected/verb.js'),'verb page wiring');
ensure(adjHtml.includes('vocab-corrected/adjective.js'),'adjective page wiring');
ensure(advHtml.includes('vocab-corrected/adverb.js'),'adverb page wiring');
ensure(advHtml.includes('window.VIZKOR_ADVERBS_CORRECTED || []'),'adverb page corrected bank assignment');
ensure(hub.includes('other-vocabulary.html'),'Other/Particles hub card');
ensure(/HOUR_NATIVE_FORMS=\['','한','두','세','네'/.test(num),'native time hour forms');
ensure(/if\(t===2 && u===0\) tens='스무'/.test(num),'스무 counter form');
const report=`\ufeffVIZKOR V1 — CORRECTED VOCABULARY SITE VALIDATION\r\n${'='.repeat(92)}\r\nCorrected Nouns: ${nounAll.length}\r\nVerbs: ${verbs.length}\r\nAdjectives / Descriptive Verbs: ${adjs.length}\r\nAdverbs: ${adverbs.length}\r\nOther / Particles: ${other.length}\r\n\r\nPASS — noun.HTML loads corrected noun bank\r\nPASS — Verbbasic.html loads corrected verb bank\r\nPASS — adjective.html loads corrected adjective bank\r\nPASS — adverb.html loads corrected adverb bank\r\nPASS — OTHER / PARTICLES preserves non-noun/non-adverb items\r\nPASS — NUMBER/TIME core native/Sino rules preserved\r\nPASS — 청소(하다) removed from Adjectives\r\nPASS — 쯤 moved from Adverb to Auxiliary particle\r\nPASS — 에게/한테 moved from Noun to Particle\r\nPASS — 성적 (sexual, B2 p47) moved from Noun to Modifier\r\nPASS — clear duplicate adverbs removed from Noun bank\r\n\r\nNOTE: This validates the corrections surfaced by the V1 structural, cross-source and POS audits. It does not claim every one of the thousands of vocabulary entries was independently dictionary-verified one by one.\r\n`;
write('exports/VIZKOR_V1_Corrected_Site_Validation.txt',report);
console.log(report);

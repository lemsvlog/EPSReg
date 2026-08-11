import fs from 'node:fs';
import path from 'node:path';
const ROOT=process.cwd();const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const clean=s=>String(s??'').replace(/\u00a0/g,' ').replace(/\s+/g,' ').trim();const kk=s=>clean(s).replace(/\s+/g,'').replace(/[·•]/g,'').toLowerCase();
function balanced(t,marker,open='[',close=']'){const p=t.indexOf(marker);if(p<0)return'';const s=t.indexOf(open,p);if(s<0)return'';let d=0,q=null,esc=false,line=false,block=false;for(let i=s;i<t.length;i++){const c=t[i],n=t[i+1];if(line){if(c==='\n')line=false;continue}if(block){if(c==='*'&&n==='/'){block=false;i++}continue}if(q){if(esc){esc=false;continue}if(c==='\\'){esc=true;continue}if(c===q)q=null;continue}if(c==='/'&&n==='/'){line=true;i++;continue}if(c==='/'&&n==='*'){block=true;i++;continue}if(c==='"'||c==="'"||c==='`'){q=c;continue}if(c===open)d++;else if(c===close){d--;if(d===0)return t.slice(s,i+1)}}return''}
function js(raw,fallback){try{return Function('"use strict";return ('+raw+')')()}catch{return fallback}}
function rawBlock(html){const m=html.match(/const\s+RAW\s*=\s*`([\s\S]*?)`\s*;/);return m?m[1]:''}
function splitRawLine(line0){const line=clean(line0);if(!line)return null;const pm=line.match(/^(.*?)\s+(\d+)$/);if(!pm)return null;const page=Number(pm[2]);let parts=clean(pm[1]).split(/\s+/);if(parts.length>2&&/^[ㄱ-ㅎㅏ-ㅣ]$/.test(parts[0]))parts=parts.slice(1);let split=-1;for(let i=1;i<parts.length;i++){if(/[A-Za-z]/.test(parts[i])){split=i;break}}if(split<0){if(parts.length<2)return null;split=1}const ko=clean(parts.slice(0,split).join(' ')),en=clean(parts.slice(split).join(' '));return ko&&en?{ko,en,page}:null}
function parseRaw(file,book){const out=[];for(const line of rawBlock(read(file)).split(/\r?\n/)){const x=splitRawLine(line);if(x)out.push({...x,book})}return out}
const raw=[...parseRaw('book1.html',1),...parseRaw('book2.html',2)];
const nounObj=js(balanced(read('noun.js'),'const CATEGORIZED_NOUNS','{','}'),{});const nouns=[];for(const[id,c]of Object.entries(nounObj||{})){if(id==='all'||!Array.isArray(c?.data))continue;for(const x of c.data)nouns.push({...x,kind:'Noun',cat:c?.name?.en||id})}
const verbs=js(balanced(read('verb.js'),'const WORDS_MASTER','[',']'),[]).map(x=>({...x,kind:'Verb'}));
const adjs=js(balanced(read('adjective.js'),'const WORDS_MASTER','[',']'),[]).map(x=>({...x,kind:'Adjective'}));
function engOnly(s){return clean(s).split(/\s+\/\s+/)[0].replace(/^to be\s+/i,'').replace(/^to\s+/i,'').toLowerCase()}
const stop=new Set(['the','a','an','to','be','of','and','or','for','in','on','at','with','from','into','is','are','as']);
function toks(s){return new Set(engOnly(s).replace(/[^a-z0-9\s-]/g,' ').split(/\s+/).filter(w=>w&&w.length>1&&!stop.has(w)))}
function sim(a,b){const A=toks(a),B=toks(b);if(!A.size||!B.size)return 0;let i=0;for(const w of A)if(B.has(w))i++;return i/Math.max(A.size,B.size)}
const rawMap=new Map();for(const r of raw){const k=`${kk(r.ko)}|${r.book}|${r.page}`;if(!rawMap.has(k))rawMap.set(k,[]);rawMap.get(k).push(r)}
const out=[];out.push('VIZKOR V1 — CROSS-SOURCE AUDIT (Structured banks vs Book 1/2 RAW)','='.repeat(96),`RAW rows: ${raw.length}`,'');
let exact=0,missing=0,mismatch=[];
for(const x of [...nouns,...verbs,...adjs]){if(!x.ko||!x.en||!x.book||!x.page)continue;const k=`${kk(x.ko)}|${Number(x.book)}|${Number(x.page)}`;const rows=rawMap.get(k)||[];if(!rows.length){missing++;continue}exact++;let best=rows.map(r=>({r,s:sim(x.en,r.en)})).sort((a,b)=>b.s-a.s)[0];if(best&&best.s<0.34)mismatch.push({x,r:best.r,s:best.s})}
out.push(`Structured entries with same Korean+Book+Page RAW match: ${exact}`,`Structured entries without exact RAW match: ${missing}`,`Low lexical-overlap matches needing review: ${mismatch.length}`,'');
out.push('#'.repeat(96),'LOW-OVERLAP STRUCTURED ↔ RAW MEANINGS','#'.repeat(96));
mismatch.sort((a,b)=>a.x.kind.localeCompare(b.x.kind)||Number(a.x.book)-Number(b.x.book)||Number(a.x.page)-Number(b.x.page));let n=1;for(const m of mismatch){out.push(`${n++}. [${m.x.kind}] ${m.x.ko} | Book ${m.x.book}, Page ${m.x.page} | similarity ${m.s.toFixed(2)}`,`   Structured: ${m.x.en}${m.x.tl?' | '+m.x.tl:''}`,`   RAW:        ${m.r.en}`,m.x.cat?`   Category:   ${m.x.cat}`:'')}
out.push('','#'.repeat(96),'CONJUGATION SHAPE CHECK','#'.repeat(96));
function checkForms(arr,label){let miss=0,oddFuture=0,oddPast=0;const rows=[];for(const x of arr){if(!x.present?.ko||!x.past?.ko||!x.future?.ko){miss++;rows.push(`${label} ${x.ko}: missing one or more forms`);continue}if(!/거예요$/.test(clean(x.future.ko))&&!/겠습니다$/.test(clean(x.future.ko))){oddFuture++;rows.push(`${label} ${x.ko}: unusual future “${x.future.ko}”`)}if(!/(았어요|었어요|했어요|였어요|했었습니다|았습니다|었습니다)$/.test(clean(x.past.ko))){oddPast++;rows.push(`${label} ${x.ko}: unusual past “${x.past.ko}”`)}}out.push(`${label}: missing forms ${miss}, unusual future ${oddFuture}, unusual past ${oddPast}`,...rows.slice(0,250));if(rows.length>250)out.push(`... ${rows.length-250} more shape flags omitted`)}
checkForms(verbs,'Verb');checkForms(adjs,'Adjective');
out.push('','#'.repeat(96),'RAW DUPLICATE / CONFLICT CHECK','#'.repeat(96));
const by=new Map();for(const r of raw){const k=`${kk(r.ko)}|${r.book}|${r.page}`;if(!by.has(k))by.set(k,[]);by.get(k).push(r)}n=1;for(const rows of by.values()){const es=[...new Set(rows.map(x=>clean(x.en).toLowerCase()))];if(es.length>1){out.push(`${n++}. ${rows[0].ko} | Book ${rows[0].book}, Page ${rows[0].page}`,...rows.map(r=>`   - ${r.en}`))}}if(n===1)out.push('None.');
fs.mkdirSync(path.join(ROOT,'exports'),{recursive:true});fs.writeFileSync(path.join(ROOT,'exports','VIZKOR_V1_Cross_Source_Audit.txt'),'\ufeff'+out.join('\r\n'),'utf8');console.log(out.join('\n'));

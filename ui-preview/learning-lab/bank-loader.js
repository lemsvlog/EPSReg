(() => {
  'use strict';
  const MARK='vizkor_lab_existing_bank_v1';
  const SESSION='vizkor_lab_bank_attempted';
  if(localStorage.getItem(MARK)==='1' || sessionStorage.getItem(SESSION)==='1') return;
  sessionStorage.setItem(SESSION,'1');
  const STORE='vizkor_learning_lab_v1';
  const cleanEn=v=>String(v||'').trim();
  const stable=(prefix,row,i)=>`${prefix}|${row.book||0}|${row.page||0}|${row.ko||''}|${i}`;
  async function readConst(path,name){
    const res=await fetch(path,{cache:'no-store'});
    if(!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    const text=await res.text();
    return new Function(`${text}\n;return (typeof ${name}!=="undefined")?${name}:null;`)();
  }
  async function run(){
    let state={};
    try{state=JSON.parse(localStorage.getItem(STORE)||'{}')||{};}catch{}
    state.srs=state.srs||{}; state.mistakes=state.mistakes||[]; state.activity=state.activity||[]; state.stats=state.stats||{};
    let added=0;
    try{
      const nouns=await readConst('../../noun.js','CATEGORIZED_NOUNS');
      const seen=new Set(); let i=0;
      for(const [key,cat] of Object.entries(nouns||{})){
        if(key==='all'||!Array.isArray(cat?.data)) continue;
        for(const row of cat.data){
          const uniq=`${row.ko}|${row.en}|${row.book}|${row.page}`; if(seen.has(uniq)) continue; seen.add(uniq);
          const id=stable('noun',row,i++); if(state.srs[id]) continue;
          state.srs[id]={id,ko:row.ko,en:cleanEn(row.en)+(row.tl?` · ${row.tl}`:''),type:'noun',box:0,due:0,seen:0,correct:0,book:row.book,page:row.page}; added++;
        }
      }
    }catch(e){console.warn('Noun bank sync skipped',e);}
    for(const [path,prefix,type] of [['../../verb.js','verb','verb'],['../../adjective.js','adj','adjective']]){
      try{
        const rows=await readConst(path,'WORDS_MASTER'); let i=0;
        for(const row of rows||[]){const id=stable(prefix,row,i++);if(state.srs[id])continue;state.srs[id]={id,ko:row.ko,en:cleanEn(row.en),type,box:0,due:0,seen:0,correct:0,book:row.book,page:row.page};added++;}
      }catch(e){console.warn(`${prefix} bank sync skipped`,e);}
    }
    if(added){state.activity.unshift({type:'Bank Sync',detail:`Added ${added} existing VIZKOR vocabulary items`,ts:Date.now()});state.activity=state.activity.slice(0,80);localStorage.setItem(STORE,JSON.stringify(state));}
    localStorage.setItem(MARK,'1');
    if(added) location.reload();
  }
  run();
})();
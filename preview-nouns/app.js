(() => {
  'use strict';
  const TTS_RATE = 0.85;
  const CACHE_PREFIX = 'vizkor_noun_img_v1_';
  const ids=['search','category','book','review','limit','page','selectedPrompt','copySelected','clearCache','reload','status','loadError','cards','empty','sTotal','sCat','sReview','sB1','sB2'];
  const els=Object.fromEntries(ids.map(id=>[id,document.getElementById(id)]));
  let nouns=[], filtered=[], voices=[];

  const ambiguousSenses={
    '배':['pear','boat','ship','stomach'],'눈':['eye','snow'],'말':['horse','speech','word'],'밤':['night','chestnut'],'굴':['cave','oyster'],'병':['bottle','illness','disease'],'장':['chapter','market','sheet','piece'],'금':['gold','Friday'],'일':['work','job','day','one'],'의사':['doctor','physician','opinion','intention'],'차':['car','tea','difference'],'사과':['apple','apology'],'기사':['driver','engineer','article','knight'],'약':['medicine','approximately'],'방':['room','method','direction'],'표':['ticket','table','chart','mark'],'풀':['grass','glue'],'김':['steam','seaweed']
  };

  const categoryRules={
    'Pronouns':'Use a simple educational concept illustration representing a person or referent. Avoid text labels.',
    'Interrogatives':'Use a simple educational concept illustration representing the question concept. Avoid written text unless absolutely necessary.',
    'People & Relationships':'Show a realistic Korean/Asian person or relationship scene that clearly represents the exact meaning, with minimal background clutter.',
    'Occupations & Professions':'Show one realistic Korean/Asian worker clearly performing the exact profession, with recognizable uniform, workplace, or tools.',
    'Nationality':'Use a respectful educational scene representing nationality through neutral cultural or geographic context.',
    'Food & Drinks':'Show the exact food or drink as the main subject, realistic, centered, easy to recognize, simple background.',
    'Home & Household':'Show the exact household item or home feature as the main subject, realistic, centered, easy to recognize.',
    'Places':'Show the exact place or building type clearly, realistic, with enough context to identify it but no unnecessary clutter.',
    'Transportation':'Show the exact vehicle or transport object clearly, realistic, full object visible, side or three-quarter view.',
    'Clothing & Accessories':'Show the exact clothing or accessory item alone or on a neutral mannequin/person, realistic, easy to identify.',
    'School & Office Supplies':'Show the exact school or office item alone, realistic, centered, clean background.',
    'Materials':'Show the exact material as a clearly recognizable sample or object made primarily from that material.',
    'Nature & Weather':'Show a realistic natural scene or weather condition that directly represents the exact meaning.',
    'Body & Health':'Use a clear educational medical or anatomical image for the exact body part or health concept; non-graphic and easy to understand.',
    'Activities':'Show one person clearly performing the exact activity, realistic, action easy to recognize.',
    'Time & Numbers':'Use a simple educational visual of the exact time, number, or calendar concept; avoid decorative text.',
    'Colors':'Show one simple familiar object dominated by the exact color, clean neutral background.',
    'Animals':'Show the exact animal only, realistic, full body visible when possible, centered, clean natural or plain background.',
    'Emotions & Qualities':'Show a clear human facial expression or simple scene that directly conveys the exact emotion or quality.',
    'Technology & Modern Life':'Show the exact modern device, service, or technology object clearly, realistic, minimal background.',
    'Education & Study':'Show the exact school or study object or learning setting clearly, realistic, educational context.',
    'Travel & Tourism':'Show the exact travel object, destination type, or tourism context clearly, realistic.',
    'Health & Medicine':'Show the exact medical object, professional, facility, or non-graphic health concept clearly and realistically.',
    'Banking & Finance':'Use a clear educational visual of the exact banking or finance object or action; realistic, minimal clutter.',
    'Public Services':'Show the exact public service, office, facility, or civic object clearly and realistically.',
    'Events & Occasions':'Show a simple realistic scene of the exact event or occasion, culturally neutral unless Korean context is required.',
    'Work & Career':'Show the exact workplace, worker role, career object, or work concept clearly and realistically.',
    'Daily Life':'Show a simple realistic everyday scene that directly represents the exact noun.',
    'Attributes & Conditions':'Use a simple educational concept image that visually demonstrates the exact condition or attribute without text.'
  };

  const exactOverrides={
    '사과|apple':'One fresh red apple fruit, single subject, realistic educational product photo, clean white background.',
    '사과|apology':'A respectful person apologizing with a slight bow, realistic Korean daily-life scene, no text.',
    '배|pear':'One ripe Korean pear fruit, round pale-golden Asian pear, realistic, centered, clean background.',
    '배|boat':'One small boat floating on calm water, full boat visible, realistic, clean composition.',
    '배|ship':'One large ship at sea, full vessel visible, realistic side view.',
    '배|stomach':'Educational non-graphic illustration of the human stomach organ and upper abdominal area, clean medical style.',
    '눈|eye':'Close-up educational image of one human eye, realistic, clean neutral background.',
    '눈|snow':'Fresh white snow falling and covering the ground in winter, realistic natural scene.',
    '말|horse':'One horse, full body, realistic, clean natural background.',
    '말|speech':'One person speaking to another, clear speech communication scene, realistic, no written words.',
    '밤|night':'A clear nighttime outdoor scene with dark sky and moonlight, realistic.',
    '밤|chestnut':'Several edible chestnuts with brown shells, realistic product-style food image.',
    '굴|cave':'Natural cave entrance and interior, realistic, clearly recognizable.',
    '굴|oyster':'Fresh oyster shell with oyster meat visible, realistic food image.',
    '병|bottle':'One empty bottle, full object visible, realistic, plain background.',
    '병|illness':'A sick person resting with a thermometer, non-graphic realistic health scene.',
    '의사|doctor':'A Korean doctor in a white coat with stethoscope in a clinic, realistic educational scene.',
    '의사|physician':'A Korean physician in a white coat with stethoscope in a clinic, realistic educational scene.',
    '의사|opinion':'Two people calmly discussing and sharing viewpoints, educational concept scene, no written text.',
    '교실|classroom':'A Korean-style classroom interior with desks, chairs, teacher desk and board, realistic, no students required.',
    '수저|spoon':'A Korean spoon and metal chopsticks set placed together on a clean table, realistic product photo.',
    '피자|pizza':'One whole pizza clearly visible from a slight top angle, realistic food photo, simple background.',
    '창문|window':'One household window clearly visible in a simple room wall, realistic interior image.',
    '마당|yard':'A small residential yard outside a house, realistic, uncluttered.',
    '산|mountain':'A clearly recognizable mountain landscape, realistic daytime natural scene.',
    '강아지|puppy':'One cute domestic puppy, full body, realistic, clean natural background.',
    '고양이|cat':'One domestic cat, full body, realistic, clean background.',
    '돼지|pig':'One domestic pig, full body, realistic farm setting, uncluttered.',
    '소|cow':'One cow, full body, realistic farm setting, uncluttered.',
    '닭|chicken':'One domestic chicken, full body, realistic farm setting.',
    '오리|duck':'One duck, full body, realistic, near simple water or clean natural background.',
    '토끼|rabbit':'One rabbit, full body, realistic, clean natural background.',
    '물고기|fish':'One fish, full body visible underwater, realistic, simple aquatic background.',
    '어류|fish':'A small group of clearly visible fish representing the category of fish, realistic underwater educational image.'
  };

  function clean(v=''){return String(v??'').replace(/\s+/g,' ').trim()}
  function lower(v=''){return clean(v).toLowerCase()}
  function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function slug(v=''){return clean(v).replace(/[^0-9A-Za-z가-힣]+/g,'_').replace(/^_+|_+$/g,'').slice(0,90)}

  function flatten(data){
    const out=[];
    for(const [categoryKey,group] of Object.entries(data||{})){
      if(categoryKey==='all'||!group||!Array.isArray(group.data))continue;
      const category=clean(group.name?.en||categoryKey);
      for(const row of group.data){if(!row||!clean(row.ko))continue;out.push({...row,ko:clean(row.ko),en:clean(row.en),tl:clean(row.tl),category,categoryKey})}
    }
    return out;
  }

  function parseNounScript(text){
    const fn=new Function(`${text}\n;return typeof CATEGORIZED_NOUNS !== 'undefined' ? CATEGORIZED_NOUNS : null;`);
    const data=fn(); if(!data)throw new Error('CATEGORIZED_NOUNS was not found in noun.js'); return flatten(data);
  }

  function senseFor(item){
    const en=lower(item.en),choices=ambiguousSenses[item.ko]||[];
    const hit=choices.find(s=>en.includes(s)); if(hit)return hit;
    return en.split(/[\/,;(]/)[0].trim()||en;
  }

  function reviewFlags(item){
    const flags=[],en=lower(item.en);
    if(ambiguousSenses[item.ko])flags.push({type:'warn',label:'Ambiguous Korean word'});
    if(item.category==='Occupations & Professions'&&/opinion|intention/.test(en))flags.push({type:'bad',label:'Likely category mismatch'});
    if(item.category==='People & Relationships'&&/^(yard|window|pizza)$/.test(en))flags.push({type:'bad',label:'Likely category mismatch'});
    if(item.ko==='교실'&&!en.includes('classroom'))flags.push({type:'warn',label:'Meaning should be checked'});
    if(/moumtain|chopstiks/.test(en))flags.push({type:'bad',label:'English spelling issue'});
    if(!item.en)flags.push({type:'bad',label:'Missing English meaning'});
    if(!categoryRules[item.category])flags.push({type:'info',label:'Generic category prompt'});
    return flags;
  }

  function promptFor(item){
    const sense=senseFor(item),override=exactOverrides[`${item.ko}|${sense}`];
    const rule=categoryRules[item.category]||'Show a clear realistic educational image of the exact physical object, person, place, animal, food, or concept described by the meaning. Keep the composition simple and immediately recognizable.';
    const ambiguity=ambiguousSenses[item.ko]?`IMPORTANT DISAMBIGUATION: Korean “${item.ko}” has multiple meanings. In this card it means “${sense}” / “${item.en}”. Depict ONLY this meaning and not the other meanings.`:`Depict the exact meaning “${item.en}”.`;
    const base=override||`${rule} ${ambiguity}`;
    return `${base} Korean vocabulary card target: ${item.ko}. English meaning: ${item.en||'unknown'}. ${item.tl?`Tagalog meaning: ${item.tl}.`:''} Category: ${item.category}. ${item.book?`Source: Book ${item.book}${item.page?`, page ${item.page}`:''}.`:''} One clear main subject or one simple scene only. Realistic educational image. No captions, no Korean letters, no English text, no watermark, no logo, no collage, no unrelated objects, no decorative typography. White, light neutral, or simple natural background unless context is necessary.`;
  }

  function cacheKey(item){return `${CACHE_PREFIX}${slug(item.ko)}__${slug(item.en)}__b${item.book||0}p${item.page||0}`}
  function getCached(item){try{return localStorage.getItem(cacheKey(item))}catch{return null}}
  function setCached(item,dataUrl){try{localStorage.setItem(cacheKey(item),dataUrl)}catch{}}
  function removeCached(item){try{localStorage.removeItem(cacheKey(item))}catch{}}

  function placeholder(item){
    const icons={'Animals':'🐾','Food & Drinks':'🍎','Places':'🏢','Transportation':'🚌','Clothing & Accessories':'👕','Home & Household':'🏠','Occupations & Professions':'🧑‍🔧','Body & Health':'🩺','Nature & Weather':'🌤️','School & Office Supplies':'✏️','Technology & Modern Life':'💻'};
    return `<div class="image-placeholder"><div class="emoji">${icons[item.category]||'🖼️'}</div><b>Generate accurate image</b><span>${esc(item.ko)} · ${esc(item.en)}</span></div>`;
  }

  function refreshVoices(){try{voices=speechSynthesis.getVoices()||[]}catch{voices=[]}}
  function speak(text){
    if(!('speechSynthesis'in window))return; try{speechSynthesis.cancel()}catch{}
    const u=new SpeechSynthesisUtterance(clean(text).replace(/[()]/g,''));u.lang='ko-KR';u.rate=TTS_RATE;u.pitch=1;u.volume=1;
    const voice=voices.find(v=>lower(v.lang)==='ko-kr')||voices.find(v=>lower(v.lang).startsWith('ko'));if(voice)u.voice=voice;speechSynthesis.speak(u);
  }

  async function generateImage(item,button,imageBox){
    const prompt=promptFor(item);button.disabled=true;const old=button.textContent;button.textContent='Generating…';
    try{
      const r=await fetch('/api/ai-image',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,width:768,height:768,style:'realistic educational photography'})});
      const data=await r.json().catch(()=>({}));if(!r.ok||!data.dataUrl)throw new Error(data.error||`HTTP ${r.status}`);
      setCached(item,data.dataUrl);imageBox.querySelector('.image-content').innerHTML=`<img src="${data.dataUrl}" alt="${esc(item.en)}" loading="lazy">`;button.textContent='Regenerate';
    }catch(err){console.error(err);alert(`Image generation failed: ${err.message}. The preview prompt is still available and no main-site data was changed.`);button.textContent=old}
    finally{button.disabled=false}
  }

  function applyFilters(resetPage=false){
    const q=lower(els.search.value),category=els.category.value,book=els.book.value,mode=els.review.value;if(resetPage)els.page.value='1';
    filtered=nouns.filter(item=>{
      if(q&&!lower(`${item.ko} ${item.en} ${item.tl} ${item.category}`).includes(q))return false;
      if(category&&item.category!==category)return false;if(book&&String(item.book)!==book)return false;
      const needs=reviewFlags(item).some(f=>f.type==='warn'||f.type==='bad');if(mode==='review'&&!needs)return false;if(mode==='clear'&&needs)return false;return true;
    });
    const per=Number(els.limit.value||12),pages=Math.max(1,Math.ceil(filtered.length/per)),current=Math.min(Number(els.page.value||1),pages);
    els.page.innerHTML=Array.from({length:pages},(_,i)=>`<option value="${i+1}"${i+1===current?' selected':''}>${i+1}</option>`).join('');render();
  }

  function render(){
    const per=Number(els.limit.value||12),page=Number(els.page.value||1),start=(page-1)*per,rows=filtered.slice(start,start+per);els.cards.innerHTML='';els.empty.style.display=rows.length?'none':'block';els.status.textContent=`${filtered.length.toLocaleString()} matched · page ${page} of ${Math.max(1,Math.ceil(filtered.length/per))}`;
    for(const item of rows){
      const flags=reviewFlags(item),prompt=promptFor(item),cached=getCached(item),card=document.createElement('article');card.className='card';
      card.innerHTML=`<div class="imagebox"><div class="image-content" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center">${cached?`<img src="${cached}" alt="${esc(item.en)}" loading="lazy">`:placeholder(item)}</div><div class="image-actions">${cached?'<button class="mini remove">Remove</button>':''}<button class="mini gen">${cached?'Regenerate':'Generate Image'}</button></div></div><div class="cardbody"><div class="ko-row"><div class="ko">${esc(item.ko)}</div><button class="speak" title="Speak slowly">🔊</button></div><div class="en">${esc(item.en||'—')}</div><div class="tl">${esc(item.tl||'')}</div><div class="meta">${esc(item.category)}${item.book?` · Book ${item.book}`:''}${item.page?` · Page ${item.page}`:''}</div><div class="tags">${flags.map(f=>`<span class="tag ${f.type}">${esc(f.label)}</span>`).join('')||'<span class="tag good">Image-ready</span>'}<span class="tag info">Sense: ${esc(senseFor(item))}</span></div><div class="prompt">${esc(prompt)}</div><div class="cardfoot"><button class="btn copy">Copy Prompt</button><button class="btn select">Show Prompt</button></div></div>`;
      const imageBox=card.querySelector('.imagebox');card.querySelector('.speak').addEventListener('click',()=>speak(item.ko));card.querySelector('.gen').addEventListener('click',e=>generateImage(item,e.currentTarget,imageBox));
      const remove=card.querySelector('.remove');if(remove)remove.addEventListener('click',()=>{removeCached(item);render()});
      card.querySelector('.copy').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(prompt);e.currentTarget.textContent='Copied ✓';setTimeout(()=>e.currentTarget.textContent='Copy Prompt',1000)}catch{}});
      card.querySelector('.select').addEventListener('click',()=>{els.selectedPrompt.value=prompt;els.selectedPrompt.scrollIntoView({behavior:'smooth',block:'center'})});els.cards.appendChild(card);
    }
  }

  function updateStats(){
    const cats=[...new Set(nouns.map(n=>n.category).filter(Boolean))].sort();els.category.innerHTML='<option value="">All categories</option>'+cats.map(c=>`<option>${esc(c)}</option>`).join('');els.sTotal.textContent=nouns.length.toLocaleString();els.sCat.textContent=cats.length.toLocaleString();els.sReview.textContent=nouns.filter(n=>reviewFlags(n).some(f=>f.type==='warn'||f.type==='bad')).length.toLocaleString();els.sB1.textContent=nouns.filter(n=>Number(n.book)===1).length.toLocaleString();els.sB2.textContent=nouns.filter(n=>Number(n.book)===2).length.toLocaleString();
  }

  async function loadNouns(){
    els.loadError.style.display='none';els.status.textContent='Loading Version 1 noun.js…';
    try{const r=await fetch('../noun.js?preview='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error(`noun.js HTTP ${r.status}`);nouns=parseNounScript(await r.text());if(!nouns.length)throw new Error('No noun entries were parsed.');updateStats();applyFilters(true)}
    catch(err){console.error(err);els.status.textContent='Could not load noun.js';els.loadError.textContent=`Preview load error: ${err.message}`;els.loadError.style.display='block'}
  }

  ['input','change'].forEach(evt=>{els.search.addEventListener(evt,()=>applyFilters(true));els.category.addEventListener(evt,()=>applyFilters(true));els.book.addEventListener(evt,()=>applyFilters(true));els.review.addEventListener(evt,()=>applyFilters(true));els.limit.addEventListener(evt,()=>applyFilters(true))});
  els.page.addEventListener('change',render);els.reload.addEventListener('click',loadNouns);
  els.copySelected.addEventListener('click',async()=>{if(!els.selectedPrompt.value)return;try{await navigator.clipboard.writeText(els.selectedPrompt.value);els.copySelected.textContent='Copied ✓';setTimeout(()=>els.copySelected.textContent='Copy selected prompt',1000)}catch{}});
  els.clearCache.addEventListener('click',()=>{if(!confirm('Clear all AI noun images cached in this browser for the preview?'))return;try{for(let i=localStorage.length-1;i>=0;i--){const k=localStorage.key(i);if(k?.startsWith(CACHE_PREFIX))localStorage.removeItem(k)}}catch{}render()});
  if('speechSynthesis'in window){refreshVoices();speechSynthesis.addEventListener?.('voiceschanged',refreshVoices)}
  loadNouns();
})();
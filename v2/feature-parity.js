/* VIZKOR V2 — exact main-feature parity center. Original root modules remain untouched. */
(()=>{
  'use strict';
  const MODULES=[
    {id:'vocabulary',icon:'🗂️',name:'Vocabulary Hub',path:'../vocabulary.html',desc:'Original NOUN / VERB / ADJECTIVE / ADVERB / NUMBER-TIME hub.'},
    {id:'book1',icon:'📘',name:'Book 1 Vocabulary',path:'../book1.html',desc:'Original Book 1 trainer with search, Clear, Play All, Stop, Random Play and audio.'},
    {id:'book2',icon:'📙',name:'Book 2 Vocabulary',path:'../book2.html',desc:'Original Book 2 trainer with search, Clear, Play All, Stop, Random Play and audio.'},
    {id:'nouns',icon:'🧰',name:'Nouns — Original Full Feature',path:'../noun.HTML',desc:'Original category + Book filter, pictures, 4 choices, flip cards, audio and shuffle. V2 adds supplemental Animals.'},
    {id:'verbs-basic',icon:'⚙️',name:'Verb Basic',path:'../Verbbasic.html',desc:'Original verb flip cards with choices, Korean audio and present/past/future conjugations.'},
    {id:'verbs-master',icon:'🔩',name:'Verb Master',path:'../VERB.html',desc:'Original verb practice module.'},
    {id:'verbs-2',icon:'⚙️',name:'Verb Practice 2',path:'../verb2.html',desc:'Additional original verb practice.'},
    {id:'verbs-3',icon:'⚙️',name:'Verb Practice 3',path:'../verb3.html',desc:'Additional original verb practice.'},
    {id:'adjective',icon:'🎨',name:'Adjectives',path:'../adjective.html',desc:'Original adjective trainer with audio and conjugations.'},
    {id:'adjective-basic',icon:'🖌️',name:'Adjective Basic',path:'../adjectivebasic.html',desc:'Original basic adjective flip-card trainer.'},
    {id:'adjective-2',icon:'🎨',name:'Adjective Practice 2',path:'../adjective2.html',desc:'Additional original adjective practice.'},
    {id:'adverb',icon:'⚡',name:'Adverbs',path:'../adverb.html',desc:'Original 80-adverb trainer with audio, meaning and examples.'},
    {id:'numbers',icon:'🔢',name:'Number Trainer',path:'../number.html',desc:'Original Native/Sino numbers, time, counters and date practice.'},
    {id:'greetings',icon:'💬',name:'Greetings & Phrases',path:'../greetings.html',desc:'Original situational phrases, search, Show English and Practice Random.'},
    {id:'sentences',icon:'📝',name:'Sentence Flip Cards',path:'../sentence.html',desc:'Original Basic / Intermediate / Advanced sentence cards with Korean audio.'},
    {id:'guide',icon:'📚',name:'Reading/Vocabulary Guide',path:'../guide.html',desc:'Original Korean learning hub / guide.'},
    {id:'reading',icon:'📖',name:'EPS Reading Master Guide',path:'../readingguide.html',desc:'Original EPS-TOPIK reading patterns, keywords and exam strategy.'},
    {id:'keywords',icon:'🔑',name:'EPS Keyword List',path:'../keyword.html',desc:'Original EPS keyword list with audio.'},
    {id:'skill-command',icon:'🗣️',name:'Skill Test — Commands',path:'../skilltest-command.html',desc:'Original workplace command practice.'},
    {id:'skill-interview',icon:'🎤',name:'Skill Test — Interview',path:'../skilltest-interview.html',desc:'Original EPS interview practice.'},
    {id:'skill-sign',icon:'⚠️',name:'Skill Test — Signs',path:'../skilltest-sign.html',desc:'Original safety/workplace sign practice.'},
    {id:'skill-tools',icon:'🛠️',name:'Skill Test — Tools',path:'../skilltest-tools.html',desc:'Original tools/equipment recognition practice.'}
  ];

  const EXTRA_ANIMALS=[
    {ko:'새',en:'bird',tl:'ibon'},
    {ko:'개',en:'dog',tl:'aso'},
    {ko:'강아지',en:'puppy',tl:'tuta'},
    {ko:'송아지',en:'calf',tl:'guya'},
    {ko:'병아리',en:'chick',tl:'sisiw'},
    {ko:'고양이',en:'cat',tl:'pusa'},
    {ko:'원숭이',en:'monkey',tl:'unggoy'},
    {ko:'사자',en:'lion',tl:'leon'},
    {ko:'염소',en:'goat',tl:'kambing'},
    {ko:'양',en:'sheep',tl:'tupa'},
    {ko:'생선',en:'fish (as food)',tl:'isda'},
    {ko:'새우',en:'shrimp',tl:'hipon'},
    {ko:'게',en:'crab',tl:'alimango/alimasag'},
    {ko:'뱀',en:'snake',tl:'ahas'}
  ];

  function injectAnimalSupplement(frame){
    try{
      const doc=frame.contentDocument;if(!doc)return;
      const payload=JSON.stringify(EXTRA_ANIMALS);
      const s=doc.createElement('script');
      s.textContent=`(()=>{try{const extra=${payload};if(typeof CATEGORIZED_NOUNS==='undefined'||!CATEGORIZED_NOUNS.animals)return;const animals=CATEGORIZED_NOUNS.animals.data;const all=CATEGORIZED_NOUNS.all.data;const seen=new Set(animals.map(x=>x.ko));for(const x of extra){if(seen.has(x.ko))continue;const item={...x,page:0,book:0,v2Supplement:true};animals.push(item);all.push(item);seen.add(x.ko);}window.VIZKOR_V2_ANIMAL_COUNT=animals.length;}catch(e){console.warn('V2 animal supplement',e)}})();`;
      doc.body.appendChild(s);
      const note=doc.createElement('div');
      note.textContent='V2: Animals expanded with supplemental Korean vocabulary.';
      note.style.cssText='position:fixed;left:10px;bottom:10px;z-index:99999;background:#082b55;color:#fff;padding:7px 10px;border-radius:10px;font:700 11px system-ui;box-shadow:0 6px 18px rgba(0,0,0,.25)';
      doc.body.appendChild(note);
      setTimeout(()=>note.remove(),5000);
    }catch(e){console.warn('Could not augment noun module',e)}
  }

  function css(){
    const st=document.createElement('style');
    st.textContent=`
      .parity-launch{position:relative;overflow:hidden}
      .parity-launch:after{content:'EXACT MAIN';float:right;font-size:8px;padding:2px 5px;border-radius:99px;background:rgba(255,255,255,.16);margin-top:2px}
      .parity-head{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-bottom:14px}
      .parity-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
      .parity-card{padding:16px;cursor:pointer}
      .parity-card:hover{transform:translateY(-2px)}
      .parity-card .pi{font-size:25px}.parity-card h3{margin:7px 0 5px}.parity-card p{margin:0;line-height:1.45}
      .parity-frame-wrap{height:calc(100vh - 150px);min-height:620px;border:1px solid var(--line);border-radius:16px;overflow:hidden;background:#fff;box-shadow:var(--shadow)}
      .parity-frame{width:100%;height:100%;border:0;background:#fff}
      @media(max-width:900px){.parity-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.parity-frame-wrap{height:calc(100vh - 132px);min-height:560px}}
      @media(max-width:620px){.parity-grid{grid-template-columns:1fr}.parity-frame-wrap{height:calc(100vh - 118px);min-height:520px;border-radius:10px}}
    `;
    document.head.appendChild(st);
  }

  function showHub(){
    document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));
    const content=document.querySelector('#content'),title=document.querySelector('#pageTitle'),sub=document.querySelector('#pageSub');
    if(title)title.textContent='Main Features — Exact';if(sub)sub.textContent='Original VIZKOR modules preserved inside V2';
    content.innerHTML=`<div class="parity-head"><div><h2 style="margin:0">All Main-Site Features</h2><div class="muted small">These launch the original modules, so their buttons and behavior are preserved.</div></div><button class="btn sec" id="parityBackV2">← V2 Dashboard</button></div><div class="notice" style="margin-bottom:14px"><b>Feature parity mode:</b> Book trainers, picture noun cards, choices, audio, conjugations, greetings, numbers, sentences, reading and skill tests are the same original modules. The Noun module gets a V2-only Animals supplement.</div><div class="parity-grid">${MODULES.map(m=>`<div class="card parity-card" data-parity-id="${m.id}"><div class="pi">${m.icon}</div><h3>${m.name}</h3><p class="muted small">${m.desc}</p></div>`).join('')}</div>`;
    document.querySelector('#parityBackV2').onclick=()=>document.querySelector('[data-view="dashboard"]')?.click();
    content.querySelectorAll('[data-parity-id]').forEach(el=>el.onclick=()=>openModule(el.dataset.parityId));
    document.querySelector('#sidebar')?.classList.remove('open');document.querySelector('#backdrop')?.classList.remove('show');
  }

  function openModule(id){
    const m=MODULES.find(x=>x.id===id);if(!m)return;
    const content=document.querySelector('#content'),title=document.querySelector('#pageTitle'),sub=document.querySelector('#pageSub');
    if(title)title.textContent=m.name;if(sub)sub.textContent='Original main-site feature inside V2';
    content.innerHTML=`<div class="parity-head"><div><b>${m.icon} ${m.name}</b><div class="muted small">${m.desc}</div></div><div><button class="btn sec" id="backParity">← All Main Features</button> <a class="btn" href="${m.path}" target="_blank" rel="noopener">Open Full Screen</a></div></div><div class="parity-frame-wrap"><iframe class="parity-frame" id="parityFrame" src="${m.path}" title="${m.name}"></iframe></div>`;
    document.querySelector('#backParity').onclick=showHub;
    const frame=document.querySelector('#parityFrame');
    if(id==='nouns')frame.addEventListener('load',()=>injectAnimalSupplement(frame),{once:true});
  }

  function init(){
    if(document.querySelector('#mainFeatureParityBtn'))return;
    css();
    const sidebar=document.querySelector('#sidebar');if(!sidebar)return;
    const title=document.createElement('div');title.className='navTitle';title.textContent='Original Feature Parity';
    const nav=document.createElement('div');nav.className='nav';nav.innerHTML='<button id="mainFeatureParityBtn" class="parity-launch">🧩 Main Features — Exact</button>';
    sidebar.appendChild(title);sidebar.appendChild(nav);
    nav.querySelector('button').onclick=showHub;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

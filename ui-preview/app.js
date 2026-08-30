(() => {
  'use strict';

  const ROUTES = {
    home:{title:'Dashboard',url:null,group:'Overview',desc:'VIZKOR learning dashboard',icon:'⌂'},
    lab:{title:'Learning Lab',url:'learning-lab/index.html',group:'Smart Study',desc:'Smart review, Korean analyzer, 1K+ sentence ladder, grammar, listening and progress',icon:'★'},
    guide:{title:'Reading Exam Guide',url:'../guide.html',group:'Learn',desc:'Read this first for exam preparation',icon:'◉'},
    vocabulary:{title:'Flipcard Vocabulary',url:'../vocabulary.html',group:'Learn',desc:'Vocabulary hub with all existing flipcard categories',icon:'▦'},
    book1:{title:'EPS Book 1 Vocabulary',url:'../book1.html',group:'Learn',desc:'Existing EPS Book 1 vocabulary list',icon:'1'},
    book2:{title:'EPS Book 2 Vocabulary',url:'../book2.html',group:'Learn',desc:'Existing EPS Book 2 vocabulary list',icon:'2'},
    greetings:{title:'Greetings & Situational Phrases',url:'../greetings.html',group:'Learn',desc:'Popular Korean greetings and situational phrases',icon:'✦'},
    sentence:{title:'Sentence Analyzer',url:'../sentence.html',group:'Learn',desc:'Existing Korean sentence analyzer',icon:'한'},
    noun:{title:'Nouns',url:'../noun.HTML',group:'Vocabulary',desc:'Existing categorized Korean noun flipcards',icon:'N'},
    verb:{title:'Verbs',url:'../Verbbasic.html',group:'Vocabulary',desc:'Existing Korean verb practice',icon:'V'},
    adjective:{title:'Adjectives',url:'../adjective.html',group:'Vocabulary',desc:'Existing Korean adjective practice',icon:'A'},
    adverb:{title:'Adverbs',url:'../adverb.html',group:'Vocabulary',desc:'Existing Korean adverb practice',icon:'D'},
    number:{title:'Numbers & Time',url:'../number.html',group:'Vocabulary',desc:'Existing Korean number and time practice',icon:'#'},
    readingguide:{title:'Exam Reading Guide',url:'../readingguide.html',group:'Exam Prep',desc:'Existing reading guide for exam questions',icon:'✓'},
    keyword:{title:'Exam Keywords',url:'../keyword.html',group:'Exam Prep',desc:'Existing exam keyword reviewer',icon:'K'},
    skillInterview:{title:'Skill Test Interview',url:'../skilltest-interview.html',group:'Skill Test',desc:'Existing skill test interview practice',icon:'Q'},
    skillCommand:{title:'Skill Test Commands',url:'../skilltest-command.html',group:'Skill Test',desc:'Existing skill test command practice',icon:'⌁'},
    skillTools:{title:'Skill Test Tools',url:'../skilltest-tools.html',group:'Skill Test',desc:'Existing skill test tools reviewer',icon:'⚒'},
    skillSigns:{title:'Skill Test Signs / Prohibitions',url:'../skilltest-sign.html',group:'Skill Test',desc:'Existing signs and prohibitions reviewer',icon:'!'}
  };

  const CORE_ROUTES = Object.keys(ROUTES).filter(k => k !== 'home');
  const STORAGE_KEY = 'vizkor_modern_preview_progress_v1';
  const $ = id => document.getElementById(id);
  const els = {
    sidebar:$('sidebar'),sidebarBackdrop:$('sidebarBackdrop'),menuBtn:$('menuBtn'),sidebarClose:$('sidebarClose'),
    dashboardView:$('dashboardView'),moduleView:$('moduleView'),pageTitle:$('pageTitle'),moduleCrumb:$('moduleCrumb'),
    frame:$('moduleFrame'),frameLoading:$('frameLoading'),reloadFrame:$('reloadFrame'),openOriginal:$('openOriginal'),
    continueBtn:$('continueBtn'),visitedCount:$('visitedCount'),progressPercent:$('progressPercent'),lastActivity:$('lastActivity'),
    progressRing:$('progressRing'),ringPercent:$('ringPercent'),recentList:$('recentList'),
    searchTrigger:$('searchTrigger'),searchModal:$('searchModal'),moduleSearch:$('moduleSearch'),searchResults:$('searchResults'),searchClose:$('searchClose'),
    accountBtn:$('accountBtn'),accountModal:$('accountModal'),accountClose:$('accountClose'),mobileMore:$('mobileMore')
  };

  let currentRoute = 'home';
  let state = loadState();

  function loadState(){
    try{
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {lastRoute:raw.lastRoute || 'lab', visited:raw.visited || {}, history:Array.isArray(raw.history)?raw.history:[]};
    }catch{return {lastRoute:'lab',visited:{},history:[]};}
  }
  function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{}}
  function nowLabel(ts){
    if(!ts) return '—';
    const d = new Date(ts), today = new Date();
    const same = d.toDateString() === today.toDateString();
    return same ? d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : d.toLocaleDateString([], {month:'short',day:'numeric'});
  }

  function markVisited(route){
    if(route === 'home') return;
    const ts = Date.now();
    const existing = state.visited[route] || {count:0};
    state.visited[route] = {count:(existing.count||0)+1,last:ts};
    state.lastRoute = route;
    state.history = [{route,ts},...state.history.filter(x=>x.route!==route)].slice(0,6);
    saveState();
    renderProgress();
  }

  function renderProgress(){
    const visitedKeys = CORE_ROUTES.filter(k => state.visited[k]);
    const pct = Math.round((visitedKeys.length / CORE_ROUTES.length) * 100);
    els.visitedCount.textContent = visitedKeys.length;
    els.progressPercent.textContent = pct + '%';
    els.ringPercent.textContent = pct + '%';
    els.progressRing.style.setProperty('--progress',pct);
    const last = state.history[0];
    els.lastActivity.textContent = last ? nowLabel(last.ts) : '—';
    if(!state.history.length){els.recentList.innerHTML='<div class="recent-empty">Open a module and it will appear here.</div>';return;}
    els.recentList.innerHTML = state.history.slice(0,4).map(item=>{
      const r=ROUTES[item.route]; if(!r) return '';
      return `<button class="recent-item" data-route="${item.route}" style="width:100%;background:#fff;text-align:left"><span class="recent-dot"></span><span><strong>${escapeHtml(r.title)}</strong><span>${escapeHtml(nowLabel(item.ts))}</span></span></button>`;
    }).join('');
    bindRouteButtons(els.recentList);
  }

  function escapeHtml(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function normalizePath(href=''){
    try{
      const u=new URL(href,location.href);
      if(u.pathname.includes('/learning-lab/')) return 'lab';
      const name=u.pathname.split('/').pop().toLowerCase();
      const map={
        'index.html':'home','guide.html':'guide','vocabulary.html':'vocabulary','book1.html':'book1','book2.html':'book2','greetings.html':'greetings','sentence.html':'sentence',
        'noun.html':'noun','verbbasic.html':'verb','adjective.html':'adjective','adverb.html':'adverb','number.html':'number','readingguide.html':'readingguide','keyword.html':'keyword',
        'skilltest-interview.html':'skillInterview','skilltest-command.html':'skillCommand','skilltest-tools.html':'skillTools','skilltest-sign.html':'skillSigns'
      };
      return map[name] || null;
    }catch{return null;}
  }

  function setActive(route){
    document.querySelectorAll('[data-route]').forEach(el=>el.classList.toggle('active',el.dataset.route===route));
    document.querySelectorAll('.mobile-nav-item[data-route]').forEach(el=>el.classList.toggle('active',el.dataset.route===route));
  }

  function showRoute(route,{push=true}={}){
    if(!ROUTES[route]) route='home';
    currentRoute=route; setActive(route); closeSidebar(); closeSearch();
    const info=ROUTES[route]; els.pageTitle.textContent=info.title;
    if(push){history.replaceState(null,'', route==='home' ? '#home' : '#'+route);}
    if(route==='home'){
      els.dashboardView.hidden=false; els.moduleView.hidden=true;
      els.frame.removeAttribute('src');
      renderProgress();
      return;
    }
    els.dashboardView.hidden=true; els.moduleView.hidden=false; els.moduleCrumb.textContent=info.title;
    els.frameLoading.style.display='flex';
    const target = info.url + (info.url.includes('?')?'&':'?') + 'uiPreview=1';
    if(els.frame.getAttribute('src') !== target) els.frame.src=target; else injectFrameTheme();
    markVisited(route);
  }

  function injectFrameTheme(){
    els.frameLoading.style.display='none';
    try{
      const doc=els.frame.contentDocument; if(!doc) return;
      if(currentRoute==='lab') return;
      doc.documentElement.classList.add('vizkor-modern-module');
      if(!doc.getElementById('vizkorPreviewTheme')){
        const link=doc.createElement('link');link.id='vizkorPreviewTheme';link.rel='stylesheet';link.href=new URL('module-theme.css',location.href).href;doc.head.appendChild(link);
      }
      doc.addEventListener('click',e=>{
        const a=e.target.closest?.('a[href]'); if(!a) return;
        const route=normalizePath(a.href); if(route){e.preventDefault();showRoute(route);}
      },true);
      const title=doc.title?.trim(); if(title && currentRoute!=='home') els.moduleCrumb.textContent=ROUTES[currentRoute]?.title || title;
    }catch(err){console.warn('Preview frame theming skipped:',err);}
  }

  function injectLearningLabEntry(){
    const nav = document.getElementById('navGroups');
    if(nav && !nav.querySelector('[data-route="lab"]')){
      const group=document.createElement('div');group.className='nav-group';
      group.innerHTML='<div class="nav-label">Smart Study</div><button class="nav-item" data-route="lab"><span class="nav-icon">★</span><span>Learning Lab</span></button>';
      const overview=nav.querySelector('.nav-group');
      if(overview?.nextSibling) nav.insertBefore(group,overview.nextSibling); else nav.appendChild(group);
    }
    const grid=document.querySelector('.module-grid');
    if(grid && !grid.querySelector('[data-route="lab"]')){
      const card=document.createElement('button');card.className='module-card';card.dataset.route='lab';
      card.innerHTML='<div class="module-icon blue-bg">★</div><div><strong>Learning Lab</strong><span>Smart review, analyzer, 1K+ sentences & grammar</span></div><i>→</i>';
      grid.prepend(card);
    }
    const heroActions=document.querySelector('.hero-actions');
    if(heroActions && !heroActions.querySelector('[data-route="lab"]')){
      const btn=document.createElement('button');btn.className='secondary-btn';btn.dataset.route='lab';btn.textContent='Open Learning Lab';heroActions.appendChild(btn);
    }
  }

  function openSidebar(){els.sidebar.classList.add('open');els.sidebarBackdrop.classList.add('show');}
  function closeSidebar(){els.sidebar.classList.remove('open');els.sidebarBackdrop.classList.remove('show');}
  function bindRouteButtons(root=document){root.querySelectorAll('[data-route]').forEach(btn=>{if(btn.dataset.bound)return;btn.dataset.bound='1';btn.addEventListener('click',()=>showRoute(btn.dataset.route));});}

  function openSearch(){els.searchModal.hidden=false;els.moduleSearch.value='';renderSearch('');setTimeout(()=>els.moduleSearch.focus(),30);}
  function closeSearch(){els.searchModal.hidden=true;}
  function renderSearch(query){
    const q=query.trim().toLowerCase();
    const rows=Object.entries(ROUTES).filter(([k])=>k!=='home').filter(([,r])=>!q || `${r.title} ${r.group} ${r.desc}`.toLowerCase().includes(q));
    els.searchResults.innerHTML=rows.map(([k,r])=>`<button class="search-result" data-route="${k}"><span class="search-result-icon">${escapeHtml(r.icon)}</span><span><strong>${escapeHtml(r.title)}</strong><span>${escapeHtml(r.group)} · ${escapeHtml(r.desc)}</span></span></button>`).join('');
    bindRouteButtons(els.searchResults);
  }

  els.frame.addEventListener('load',injectFrameTheme);
  els.reloadFrame.addEventListener('click',()=>{if(currentRoute!=='home'){els.frameLoading.style.display='flex';els.frame.contentWindow?.location.reload();}});
  els.openOriginal.addEventListener('click',()=>{const r=ROUTES[currentRoute];if(r?.url)window.open(r.url,'_blank','noopener');});
  els.continueBtn.addEventListener('click',()=>showRoute(state.lastRoute && ROUTES[state.lastRoute] ? state.lastRoute : 'lab'));
  els.menuBtn.addEventListener('click',openSidebar);els.sidebarClose.addEventListener('click',closeSidebar);els.sidebarBackdrop.addEventListener('click',closeSidebar);els.mobileMore.addEventListener('click',openSidebar);
  els.searchTrigger.addEventListener('click',openSearch);els.searchClose.addEventListener('click',closeSearch);els.moduleSearch.addEventListener('input',e=>renderSearch(e.target.value));
  els.searchModal.addEventListener('click',e=>{if(e.target===els.searchModal)closeSearch();});
  els.accountBtn.addEventListener('click',()=>els.accountModal.hidden=false);els.accountClose.addEventListener('click',()=>els.accountModal.hidden=true);els.accountModal.addEventListener('click',e=>{if(e.target===els.accountModal)els.accountModal.hidden=true;});
  window.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();}if(e.key==='Escape'){closeSearch();els.accountModal.hidden=true;closeSidebar();}});
  window.addEventListener('hashchange',()=>{const route=location.hash.replace('#','')||'home';if(route!==currentRoute)showRoute(route,{push:false});});

  injectLearningLabEntry();bindRouteButtons();renderProgress();
  const initial=location.hash.replace('#','');showRoute(ROUTES[initial]?initial:'home',{push:false});
})();
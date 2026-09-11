(function () {
  const load = src => new Promise((resolve, reject) => { const s=document.createElement('script'); s.src=src; s.onload=resolve; s.onerror=reject; document.head.appendChild(s); });
  const originalText=new WeakMap(), originalHTML=new WeakMap(), originalAttrs=new WeakMap(), originalTitle=new WeakMap();

  function ensureLanguageSelector(){
    const nav=document.querySelector('.nav-links'); if(!nav)return null;
    let sw=nav.querySelector('.language-switcher'); if(sw)return sw;
    sw=document.createElement('div'); sw.className='language-switcher'; sw.setAttribute('aria-label','Idioma');
    sw.innerHTML='<button type="button" data-lang="ca">CA</button><button type="button" data-lang="es">ES</button><button type="button" data-lang="en">EN</button>';
    const cta=nav.querySelector('.nav-cta'); if(cta)nav.insertBefore(sw,cta); else nav.appendChild(sw); return sw;
  }

  function buildDictionary(lang){
    const d=Object.assign({},window.MirabentTranslations?.[lang]||{},window.MirabentPageTranslations?.[lang]||{});
    if(lang==='en')Object.keys(d).forEach(k=>{if(typeof d[k]==='string')d[k]=d[k].replace(/\bCompetition\b/g,'Contest').replace(/\bcompetition\b/g,'contest');});
    return d;
  }

  const H={
    es:{
      'L’any':'En el año','l’any':'el año','1972 va fundar les Joventuts Musicals de Sitges':'1972 fundó las Joventuts Musicals de Sitges',
      'Concerts d’Estiu':'Concerts d’Estiu','Racó de la Calma':'Racó de la Calma','l’any 1976':'el año 1976','música de cambra i cant':'música de cámara y canto',
      'Director d’orquestra i compositor':'Director de orquesta y compositor','Director d\'orquestra i compositor':'Director de orquesta y compositor','Pianista i compositora':'Pianista y compositora','Musicòleg':'Musicólogo','Cantant':'Cantante',
      'Fer de la música<br>una part de Sitges':'Hacer de la música<br>una parte de Sitges','Una trajectòria<br>al servei de la cultura':'Una trayectoria<br>al servicio de la cultura',
      'Una història que<br>continua a través de la música':'Una historia que<br>continúa a través de la música','Una vida vinculada<br>a la música de Sitges':'Una vida vinculada<br>a la música de Sitges',
      'La persona que dona nom al concurs':'La persona que da nombre al concurso','Tornar a la història':'Volver a la historia','Tornar a Història →':'Volver a Historia →'
    },
    en:{
      'L’any':'In','l’any':'in','1972 va fundar les Joventuts Musicals de Sitges':'1972 he founded Joventuts Musicals de Sitges',
      'Concerts d’Estiu':'Concerts d’Estiu','Racó de la Calma':'Racó de la Calma','l’any 1976':'in 1976','música de cambra i cant':'chamber music and singing',
      'Director d’orquestra i compositor':'Orchestra conductor and composer','Director d\'orquestra i compositor':'Orchestra conductor and composer','Pianista i compositora':'Pianist and composer','Musicòleg':'Musicologist','Cantant':'Singer',
      'Fer de la música<br>una part de Sitges':'Making music<br>part of Sitges','Una trajectòria<br>al servei de la cultura':'A career<br>in the service of culture',
      'Una història que<br>continua a través de la música':'A story that<br>continues through music','Una vida vinculada<br>a la música de Sitges':'A life connected<br>to the music of Sitges',
      'La persona que dona nom al concurs':'The person who gives the contest its name','Tornar a la història':'Back to the history','Tornar a Història →':'Back to History →'
    }
  };

  function tokenTranslate(value,lang,isHistory){
    if(!value||lang==='ca')return value;
    if(isHistory&&H[lang]?.[value])return H[lang][value];
    const t=lang==='es' ? [
      ['1r Premi','1er Premio'],['2n Premi','2º Premio'],['3r Premi','3er Premio'],['1r premi','1er premio'],['2n premi','2º premio'],['3r premi','3er premio'],
      ['Fotografia del guanyador','Fotografía del ganador'],['Fotografia','Fotografía'],['fotografia','fotografía'],['Foto del membre','Foto del miembro'],['Foto del jurat','Foto del jurado'],
      ['Palmarès pendent de completar','Palmarés pendiente de completar'],['Premis especials','Premios especiales'],['Premi especial','Premio especial'],['Premi AOS','Premio AOS'],
      ['Edició','Edición'],['edició','edición'],['Jurat','Jurado'],['jurat','jurado'],['Història','Historia'],['història','historia'],['Concurs','Concurso'],['concurs','concurso'],
      ['Música de cambra','Música de cámara'],['música de cambra','música de cámara'],['Cant','Canto'],['cant','canto'],['Trajectòria','Trayectoria'],['trajectòria','trayectoria'],['Memòria','Memoria'],['memòria','memoria'],['Arxiu','Archivo'],['arxiu','archivo'],['Imatge','Imagen'],['imatge','imagen'],['Fotografies','Fotografías'],['fotografies','fotografías'],['guanyadors','ganadores'],['guanyador','ganador'],
      ['setembre','septiembre'],['novembre','noviembre'],['d\'octubre','de octubre'],['octubre','octubre'],['Imatge anterior','Imagen anterior'],['Imatge següent','Imagen siguiente'],['Fotografia anterior','Fotografía anterior'],['Fotografia següent','Fotografía siguiente']
    ] : [
      ['1r Premi','1st Prize'],['2n Premi','2nd Prize'],['3r Premi','3rd Prize'],['1r premi','1st prize'],['2n premi','2nd prize'],['3r premi','3rd prize'],
      ['Fotografia del guanyador','Winner’s photograph'],['Fotografia','Photograph'],['fotografia','photograph'],['Foto del membre','Member photo'],['Foto del jurat','Jury photo'],
      ['Palmarès pendent de completar','Prize record to be completed'],['Premis especials','Special prizes'],['Premi especial','Special prize'],['Premi AOS','AOS Prize'],
      ['Edició','Edition'],['edició','edition'],['Jurat','Jury'],['jurat','jury'],['Història','History'],['història','history'],['Concurs','Contest'],['concurs','contest'],
      ['Música de cambra','Chamber Music'],['música de cambra','chamber music'],['Cant','Singing'],['cant','singing'],['Trajectòria','History'],['trajectòria','history'],['Memòria','Memory'],['memòria','memory'],['Arxiu','Archive'],['arxiu','archive'],['Imatge','Image'],['imatge','image'],['Fotografies','Photographs'],['fotografies','photographs'],['guanyadors','winners'],['guanyador','winner'],
      ['setembre','September'],['novembre','November'],['d\'octubre','of October'],['octubre','October'],['Imatge anterior','Previous image'],['Imatge següent','Next image'],['Fotografia anterior','Previous photograph'],['Fotografia següent','Next photograph']
    ];
    let r=value;t.forEach(([a,b])=>r=r.split(a).join(b));return r;
  }

  function translatePage(lang){
    const dict=buildDictionary(lang); if(!Object.keys(dict).length)return;
    const path=location.pathname.replace(/\\/g,'/');
    const isHistory=path.endsWith('/historia.html')||path.includes('/historia/');
    document.documentElement.lang=lang;
    document.body.querySelectorAll('*').forEach(el=>{
      if(el.closest('.language-switcher'))return;
      if(!originalHTML.has(el))originalHTML.set(el,el.innerHTML);
      const original=originalHTML.get(el), translated=dict[original];
      if(translated!=null&&original.includes('<')){el.innerHTML=translated;el.setAttribute('data-i18n-html','true');}
      else if(el.hasAttribute('data-i18n-html')){el.innerHTML=original;el.removeAttribute('data-i18n-html');}
    });
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
    while((n=walker.nextNode())){
      const p=n.parentElement;if(!p||['SCRIPT','STYLE','NOSCRIPT'].includes(p.tagName)||p.closest('.language-switcher')||p.closest('[data-i18n-html="true"]'))continue;
      if(!originalText.has(n))originalText.set(n,n.nodeValue);
      const raw=originalText.get(n),trim=raw.trim();if(!trim)continue;
      const translated=dict[raw]??dict[trim]??tokenTranslate(trim,lang,isHistory);if(translated==null)continue;
      const s=raw.indexOf(trim),e=s+trim.length;n.nodeValue=raw.slice(0,s)+translated+raw.slice(e);
    }
    document.querySelectorAll('[aria-label],[alt],[title]').forEach(el=>{
      if(!originalAttrs.has(el))originalAttrs.set(el,{'aria-label':el.getAttribute('aria-label'),alt:el.getAttribute('alt'),title:el.getAttribute('title')});
      Object.entries(originalAttrs.get(el)).forEach(([a,o])=>{if(!o)return;const tr=dict[o]??tokenTranslate(o,lang,isHistory);if(tr!=null)el.setAttribute(a,tr);});
    });
    document.querySelectorAll('title').forEach(el=>{if(!originalTitle.has(el))originalTitle.set(el,el.textContent.trim());const o=originalTitle.get(el),tr=dict[o]??tokenTranslate(o,lang,isHistory);if(tr)el.textContent=tr;});
    document.querySelectorAll('meta[name="description"]').forEach(el=>{const o=el.getAttribute('data-i18n-original')||el.getAttribute('content');if(!el.hasAttribute('data-i18n-original'))el.setAttribute('data-i18n-original',o);const tr=dict[o]??tokenTranslate(o,lang,isHistory);if(tr)el.setAttribute('content',tr);});
  }

  function setup(){
    const sw=ensureLanguageSelector();if(!sw)return;const bs=sw.querySelectorAll('button[data-lang]');
    const active=l=>bs.forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
    bs.forEach(b=>{if(b.dataset.bound==='true')return;b.dataset.bound='true';b.addEventListener('click',()=>{const l=b.dataset.lang;localStorage.setItem('mirabent-language',l);translatePage(l);active(l);});});
    const saved=localStorage.getItem('mirabent-language'),initial=['ca','es','en'].includes(saved)?saved:'ca';translatePage(initial);active(initial);
  }
  const style=document.createElement('style');style.textContent='.language-switcher{display:flex;align-items:center;gap:2px;margin-left:4px}.language-switcher button{border:0;background:transparent;color:#20201d;font:500 10px "DM Sans",Arial,sans-serif;letter-spacing:.08em;padding:5px 3px;cursor:pointer;opacity:.45}.language-switcher button:hover,.language-switcher button.active{opacity:1}.language-switcher button.active{text-decoration:underline;text-underline-offset:4px}@media(max-width:850px){.language-switcher{margin-left:0}.language-switcher button{padding:0 3px}}';document.head.appendChild(style);
  const base=new URL('translations.js',document.currentScript?.src||new URL('js/i18n.js',document.baseURI)).href,page=new URL('page-translations.js',document.currentScript?.src||new URL('js/i18n.js',document.baseURI)).href;
  load(base).then(()=>load(page)).then(setup).catch(()=>{});
})();

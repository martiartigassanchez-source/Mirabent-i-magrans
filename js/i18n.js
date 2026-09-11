(function () {
  const load = src => new Promise((resolve, reject) => { const s = document.createElement('script'); s.src = src; s.onload = resolve; s.onerror = reject; document.head.appendChild(s); });
  const originalText = new WeakMap(), originalHTML = new WeakMap(), originalAttrs = new WeakMap(), originalTitle = new WeakMap();

  function ensureLanguageSelector() {
    const navLinks = document.querySelector('.nav-links'); if (!navLinks) return null;
    let switcher = navLinks.querySelector('.language-switcher');
    if (switcher) return switcher;
    switcher = document.createElement('div'); switcher.className = 'language-switcher'; switcher.setAttribute('aria-label', 'Idioma');
    switcher.innerHTML = '<button type="button" data-lang="ca">CA</button><button type="button" data-lang="es">ES</button><button type="button" data-lang="en">EN</button>';
    const cta = navLinks.querySelector('.nav-cta'); if (cta) navLinks.insertBefore(switcher, cta); else navLinks.appendChild(switcher);
    return switcher;
  }

  function buildDictionary(lang) {
    const dict = Object.assign({}, window.MirabentTranslations?.[lang] || {}, window.MirabentPageTranslations?.[lang] || {});
    if (lang === 'en') Object.keys(dict).forEach(key => { if (typeof dict[key] === 'string') dict[key] = dict[key].replace(/\bCompetition\b/g, 'Contest').replace(/\bcompetition\b/g, 'contest'); });
    return dict;
  }

  function tokenTranslate(value, lang) {
    if (!value || lang === 'ca') return value;
    const tokens = lang === 'es' ? [
      ['1r Premi','1er Premio'],['2n Premi','2º Premio'],['3r Premi','3er Premio'],['1r premi','1er premio'],['2n premi','2º premio'],['3r premi','3er premio'],
      ['Fotografia del guanyador','Fotografía del ganador'],['Fotografia','Fotografía'],['fotografia','fotografía'],['Foto del membre','Foto del miembro'],['Foto del jurat','Foto del jurado'],
      ['Palmarès pendent de completar','Palmarés pendiente de completar'],['Premis especials','Premios especiales'],['Premi especial','Premio especial'],['Premi AOS','Premio AOS'],
      ['Edició','Edición'],['edició','edición'],['Jurat','Jurado'],['jurat','jurado'],['setembre','septiembre'],['novembre','noviembre'],['d\'octubre','de octubre'],['octubre','octubre'],
      ['Imatge anterior','Imagen anterior'],['Imatge següent','Imagen siguiente'],['Fotografia anterior','Fotografía anterior'],['Fotografia següent','Fotografía siguiente'],['guanyadors','ganadores'],['guanyador','ganador']
    ] : [
      ['1r Premi','1st Prize'],['2n Premi','2nd Prize'],['3r Premi','3rd Prize'],['1r premi','1st prize'],['2n premi','2nd prize'],['3r premi','3rd prize'],
      ['Fotografia del guanyador','Winner’s photograph'],['Fotografia','Photograph'],['fotografia','photograph'],['Foto del membre','Member photo'],['Foto del jurat','Jury photo'],
      ['Palmarès pendent de completar','Prize record to be completed'],['Premis especials','Special prizes'],['Premi especial','Special prize'],['Premi AOS','AOS Prize'],
      ['Edició','Edition'],['edició','edition'],['Jurat','Jury'],['jurat','jury'],['setembre','September'],['novembre','November'],['d\'octubre','of October'],['octubre','October'],
      ['Imatge anterior','Previous image'],['Imatge següent','Next image'],['Fotografia anterior','Previous photograph'],['Fotografia següent','Next photograph'],['guanyadors','winners'],['guanyador','winner']
    ];
    let result = value;
    tokens.forEach(([from, to]) => { result = result.split(from).join(to); });
    return result;
  }

  function translatePage(lang) {
    const dict = buildDictionary(lang); if (!Object.keys(dict).length) return;
    document.documentElement.lang = lang;

    document.body.querySelectorAll('*').forEach(el => {
      if (el.closest('.language-switcher')) return;
      if (!originalHTML.has(el)) originalHTML.set(el, el.innerHTML);
      const original = originalHTML.get(el), translated = dict[original];
      if (translated != null && original.includes('<')) { el.innerHTML = translated; el.setAttribute('data-i18n-html','true'); }
      else if (el.hasAttribute('data-i18n-html')) { el.innerHTML = original; el.removeAttribute('data-i18n-html'); }
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName) || parent.closest('.language-switcher') || parent.closest('[data-i18n-html="true"]')) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const raw = originalText.get(node), trimmed = raw.trim(); if (!trimmed) continue;
      const translated = dict[raw] ?? dict[trimmed] ?? tokenTranslate(trimmed, lang);
      if (translated == null) continue;
      const start = raw.indexOf(trimmed), end = start + trimmed.length; node.nodeValue = raw.slice(0,start) + translated + raw.slice(end);
    }

    document.querySelectorAll('[aria-label],[alt],[title]').forEach(el => {
      if (!originalAttrs.has(el)) originalAttrs.set(el, {'aria-label':el.getAttribute('aria-label'),alt:el.getAttribute('alt'),title:el.getAttribute('title')});
      Object.entries(originalAttrs.get(el)).forEach(([attr, original]) => { if (!original) return; const translated = dict[original] ?? tokenTranslate(original, lang); if (translated != null) el.setAttribute(attr, translated); });
    });

    document.querySelectorAll('title').forEach(el => { if (!originalTitle.has(el)) originalTitle.set(el, el.textContent.trim()); const original = originalTitle.get(el); const translated = dict[original] ?? tokenTranslate(original, lang); if (translated) el.textContent = translated; });
    document.querySelectorAll('meta[name="description"]').forEach(el => { const original = el.getAttribute('data-i18n-original') || el.getAttribute('content'); if (!el.hasAttribute('data-i18n-original')) el.setAttribute('data-i18n-original', original); const translated = dict[original] ?? tokenTranslate(original, lang); if (translated) el.setAttribute('content', translated); });
  }

  function setupLanguageSelector() {
    const switcher = ensureLanguageSelector(); if (!switcher) return;
    const buttons = switcher.querySelectorAll('button[data-lang]');
    const updateActive = lang => buttons.forEach(button => button.classList.toggle('active', button.dataset.lang === lang));
    buttons.forEach(button => { if (button.dataset.bound === 'true') return; button.dataset.bound='true'; button.addEventListener('click', () => { const lang=button.dataset.lang; localStorage.setItem('mirabent-language',lang); translatePage(lang); updateActive(lang); }); });
    const saved = localStorage.getItem('mirabent-language'), initial = ['ca','es','en'].includes(saved) ? saved : 'ca';
    translatePage(initial); updateActive(initial);
  }

  const style = document.createElement('style'); style.textContent = `.language-switcher{display:flex;align-items:center;gap:2px;margin-left:4px}.language-switcher button{border:0;background:transparent;color:#20201d;font:500 10px 'DM Sans',Arial,sans-serif;letter-spacing:.08em;padding:5px 3px;cursor:pointer;opacity:.45}.language-switcher button:hover,.language-switcher button.active{opacity:1}.language-switcher button.active{text-decoration:underline;text-underline-offset:4px}@media(max-width:850px){.language-switcher{margin-left:0}.language-switcher button{padding:0 3px}}`; document.head.appendChild(style);

  const scriptBase = document.currentScript?.src || new URL('js/i18n.js', document.baseURI);
  const base = new URL('translations.js', scriptBase).href, page = new URL('page-translations.js', scriptBase).href;
  load(base).then(() => load(page)).then(setupLanguageSelector).catch(() => {});
})();

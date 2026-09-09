(function () {
  const load = (src) => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  const originalText = new WeakMap();
  const originalAria = new WeakMap();
  const originalTitle = new WeakMap();

  function ensureLanguageSelector() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return null;
    let switcher = navLinks.querySelector('.language-switcher');
    if (switcher) return switcher;

    switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.setAttribute('aria-label', 'Idioma');
    switcher.innerHTML = '<button type="button" data-lang="ca">CA</button><button type="button" data-lang="es">ES</button><button type="button" data-lang="en">EN</button>';
    const cta = navLinks.querySelector('.nav-cta');
    if (cta) navLinks.insertBefore(switcher, cta);
    else navLinks.appendChild(switcher);
    return switcher;
  }

  function translatePage(lang) {
    const dict = window.MirabentTranslations?.[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName) || parent.closest('.language-switcher')) continue;

      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const raw = originalText.get(node);
      const trimmed = raw.trim();
      if (!trimmed) continue;

      const translated = dict[raw] ?? dict[trimmed];
      if (translated == null) continue;

      const start = raw.indexOf(trimmed);
      const end = start + trimmed.length;
      node.nodeValue = raw.slice(0, start) + translated + raw.slice(end);
    }

    document.querySelectorAll('[aria-label]').forEach(el => {
      if (!originalAria.has(el)) originalAria.set(el, el.getAttribute('aria-label'));
      const original = originalAria.get(el);
      const translated = dict[original];
      if (translated) el.setAttribute('aria-label', translated);
    });

    document.querySelectorAll('title').forEach(el => {
      if (!originalTitle.has(el)) originalTitle.set(el, el.textContent.trim());
      const original = originalTitle.get(el);
      const translated = dict[original];
      if (translated) el.textContent = translated;
    });
  }

  function setupLanguageSelector() {
    const switcher = ensureLanguageSelector();
    if (!switcher) return;

    const buttons = switcher.querySelectorAll('button[data-lang]');
    const updateActive = lang => {
      buttons.forEach(button => button.classList.toggle('active', button.dataset.lang === lang));
    };

    buttons.forEach(button => {
      if (button.dataset.bound === 'true') return;
      button.dataset.bound = 'true';
      button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        localStorage.setItem('mirabent-language', lang);
        translatePage(lang);
        updateActive(lang);
      });
    });

    const saved = localStorage.getItem('mirabent-language');
    const initial = ['ca', 'es', 'en'].includes(saved) ? saved : 'ca';
    translatePage(initial);
    updateActive(initial);
  }

  const style = document.createElement('style');
  style.textContent = `
    .language-switcher{display:flex;align-items:center;gap:2px;margin-left:4px}
    .language-switcher button{border:0;background:transparent;color:#20201d;font:500 10px 'DM Sans',Arial,sans-serif;letter-spacing:.08em;padding:5px 3px;cursor:pointer;opacity:.45}
    .language-switcher button:hover,.language-switcher button.active{opacity:1}
    .language-switcher button.active{text-decoration:underline;text-underline-offset:4px}
    @media(max-width:850px){.language-switcher{margin-left:0}.language-switcher button{padding:0 3px}}
  `;
  document.head.appendChild(style);

  const translationsUrl = new URL('translations.js', document.currentScript?.src || new URL('js/i18n.js', document.baseURI)).href;
  load(translationsUrl).then(setupLanguageSelector).catch(() => {});
})();
(function () {
  const load = (src) => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  function translatePage(lang) {
    const dict = window.MirabentTranslations?.[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;
      nodes.push(node);
    }

    nodes.forEach(textNode => {
      const raw = textNode.nodeValue;
      const trimmed = raw.trim();
      const translated = dict[raw] ?? dict[trimmed];
      if (translated == null) return;
      const start = raw.indexOf(trimmed);
      const end = start + trimmed.length;
      textNode.nodeValue = raw.slice(0, start) + translated + raw.slice(end);
    });

    document.querySelectorAll('[aria-label]').forEach(el => {
      const translated = dict[el.getAttribute('aria-label')];
      if (translated) el.setAttribute('aria-label', translated);
    });
    document.querySelectorAll('title').forEach(el => {
      const translated = dict[el.textContent.trim()];
      if (translated) el.textContent = translated;
    });
  }

  function setupLanguageSelector() {
    const nav = document.querySelector('.nav');
    if (!nav || nav.querySelector('.language-switcher')) return;

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.setAttribute('aria-label', 'Idioma');

    ['ca', 'es', 'en'].forEach(lang => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.lang = lang;
      button.textContent = lang.toUpperCase();
      button.addEventListener('click', () => {
        localStorage.setItem('mirabent-language', lang);
        translatePage(lang);
        updateActive(lang);
      });
      switcher.appendChild(button);
    });

    nav.appendChild(switcher);

    const updateActive = lang => {
      switcher.querySelectorAll('button').forEach(button => {
        button.classList.toggle('active', button.dataset.lang === lang);
      });
    };

    const saved = localStorage.getItem('mirabent-language');
    const initial = ['ca', 'es', 'en'].includes(saved) ? saved : 'ca';
    translatePage(initial);
    updateActive(initial);
  }

  const style = document.createElement('style');
  style.textContent = `
    .language-switcher{position:absolute;right:6vw;display:flex;align-items:center;gap:4px;margin-left:20px}
    .language-switcher button{border:0;background:transparent;color:#20201d;font:500 10px 'DM Sans',Arial,sans-serif;letter-spacing:.08em;padding:5px 4px;cursor:pointer;opacity:.45}
    .language-switcher button:hover,.language-switcher button.active{opacity:1}
    .language-switcher button.active{text-decoration:underline;text-underline-offset:4px}
    @media(max-width:850px){.language-switcher{right:62px}}
  `;
  document.head.appendChild(style);

  const translationsUrl = new URL('translations.js', document.currentScript?.src || new URL('js/i18n.js', document.baseURI)).href;
  load(translationsUrl).then(setupLanguageSelector).catch(() => {});
})();
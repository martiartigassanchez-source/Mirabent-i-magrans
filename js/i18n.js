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

  const historyExact = {
    es: {
      'Josep Mirabent i Magrans va tenir un paper destacat en la vida cultural de Sitges. El seu llegat està especialment lligat a la música i a la voluntat d’apropar-la a la vila.':'Josep Mirabent i Magrans tuvo un papel destacado en la vida cultural de Sitges. Su legado está especialmente ligado a la música y a la voluntad de acercarla a la localidad.',
      'L’any 1972 va fundar les Joventuts Musicals de Sitges, entitat de la qual va ser primer president. Des d’aquesta plataforma va impulsar iniciatives per difondre la música clàssica i fomentar-ne la presència en la vida cultural de Sitges.':'En 1972 fundó las Joventuts Musicals de Sitges, entidad de la que fue primer presidente. Desde esta plataforma impulsó iniciativas para difundir la música clásica y fomentar su presencia en la vida cultural de Sitges.',
      'Entre les iniciatives que va promoure destaquen els Concerts d’Estiu, que es van començar a celebrar al Racó de la Calma l’any 1976. Aquests cicles van portar la música a un dels espais més emblemàtics de Sitges i van reforçar la seva dimensió cultural i ciutadana.':'Entre las iniciativas que promovió destacan los Concerts d’Estiu, que comenzaron a celebrarse en el Racó de la Calma en 1976. Estos ciclos llevaron la música a uno de los espacios más emblemáticos de Sitges y reforzaron su dimensión cultural y ciudadana.',
      'La seva vinculació amb el Casino Prado Suburense també forma part del context cultural sitgetà en què va desenvolupar la seva tasca.':'Su vinculación con el Casino Prado Suburense también forma parte del contexto cultural de Sitges en el que desarrolló su labor.',
      'La seva dedicació a la música i a la cultura de Sitges explica el llegat que avui porta el seu nom.':'Su dedicación a la música y a la cultura de Sitges explica el legado que hoy lleva su nombre.',
      'Com a fundador de les Joventuts Musicals de Sitges, Mirabent va treballar per crear espais de divulgació i escolta de la música clàssica, contribuint a consolidar una activitat musical estable a la vila.':'Como fundador de las Joventuts Musicals de Sitges, Mirabent trabajó para crear espacios de divulgación y escucha de la música clásica, contribuyendo a consolidar una actividad musical estable en la localidad.',
      'Entre les iniciatives que va promoure destaquen els Concerts d’Estiu, que es van començar a celebrar al Racó de la Calma l’any 1976. Aquests cicles van portar la música a un dels espais més emblemàtics de Sitges i van reforçar la seva dimensió cultural i ciutadana.':'Entre las iniciativas que promovió destacan los Concerts d’Estiu, que comenzaron a celebrarse en el Racó de la Calma en 1976. Estos ciclos llevaron la música a uno de los espacios más emblemáticos de Sitges y reforzaron su dimensión cultural y ciudadana.',
      'La seva activitat cultural també va estar vinculada al Casino Prado Suburense, entitat que va presidir entre 1970 i 1975. El Prado va ser, alhora, un espai important de la seva trajectòria teatral i de la vida cultural sitgetana.':'Su actividad cultural también estuvo vinculada al Casino Prado Suburense, entidad que presidió entre 1970 y 1975. El Prado fue, a la vez, un espacio importante de su trayectoria teatral y de la vida cultural de Sitges.',
      'Aquesta mirada àmplia sobre la cultura —i especialment la seva dedicació a la música— és la que explica el llegat que avui porta el seu nom.':'Esta mirada amplia sobre la cultura —y especialmente su dedicación a la música— es la que explica el legado que hoy lleva su nombre.',
      'La família de Josep Mirabent i Magrans va impulsar el concurs en memòria seva, amb el suport de les Joventuts Musicals de Sitges, entitat de la qual havia estat fundador i primer president.':'La familia de Josep Mirabent i Magrans impulsó el concurso en su memoria, con el apoyo de las Joventuts Musicals de Sitges, entidad de la que había sido fundador y primer presidente.',
      'Des de 1993, el concurs manté aquesta vinculació amb la música clàssica i dona suport a joves intèrprets en les modalitats de música de cambra i cant, mantenint viva a través de noves generacions la vocació musical que Mirabent va impulsar a Sitges.':'Desde 1993, el concurso mantiene esta vinculación con la música clásica y apoya a jóvenes intérpretes en las modalidades de música de cámara y canto, manteniendo viva a través de nuevas generaciones la vocación musical que Mirabent impulsó en Sitges.',
      'El Casino Prado Suburense és la seu del Concurs Josep Mirabent i Magrans. L\'adreça que figura a la documentació del concurs és C/ Francesc Gumà 6-14, 08870 Sitges.':'El Casino Prado Suburense es la sede del Concurso Josep Mirabent i Magrans. La dirección que figura en la documentación del concurso es C/ Francesc Gumà 6-14, 08870 Sitges.',
      'El concurs hi celebra les seves proves i activitats, mantenint la vinculació entre la música, la vida cultural de Sitges i aquest espai emblemàtic.':'El concurso celebra allí sus pruebas y actividades, manteniendo el vínculo entre la música, la vida cultural de Sitges y este espacio emblemático.',
      'El cartell és una part de la memòria de cada edició del concurs. Aquesta secció recull l\'historial dels cartells i permetrà consultar-ne la trajectòria al llarg dels anys.':'El cartel es una parte de la memoria de cada edición del concurso. Esta sección recoge el historial de los carteles y permitirá consultar su trayectoria a lo largo de los años.',
      'Les imatges dels cartells s\'aniran incorporant a partir del material de l\'antic espai del concurs.':'Las imágenes de los carteles se irán incorporando a partir del material del antiguo espacio del concurso.',
      'Concerts Concertante forma part de l\'entorn musical vinculat al Concurs Josep Mirabent i Magrans. Aquesta secció recull aquesta activitat i el seu vincle amb la trajectòria del concurs.':'Concerts Concertante forma parte del entorno musical vinculado al Concurso Josep Mirabent i Magrans. Esta sección recoge esta actividad y su vínculo con la trayectoria del concurso.',
      'El contingut detallat i el material gràfic de les activitats s\'aniran incorporant a partir de la documentació de l\'antic espai del concurs.':'El contenido detallado y el material gráfico de las actividades se irán incorporando a partir de la documentación del antiguo espacio del concurso.',
      'L\'hemeroteca conserva les referències documentals i periodístiques relacionades amb el concurs i les seves diferents edicions.':'La hemeroteca conserva las referencias documentales y periodísticas relacionadas con el concurso y sus diferentes ediciones.',
      'Els documents i les referències de l\'antic espai del concurs s\'aniran incorporant aquí de manera ordenada, mantenint-ne el contingut original.':'Los documentos y las referencias del antiguo espacio del concurso se irán incorporando aquí de manera ordenada, manteniendo su contenido original.',
      'Director d\'orquestra i compositor':'Director de orquesta y compositor','Pianista i compositora':'Pianista y compositora','Violinista':'Violinista','Musicòleg':'Musicólogo','Cantant':'Cantante',
      'La persona que dona nom al concurs':'La persona que da nombre al concurso','Joventuts Musicals':'Joventuts Musicals','Cultura de Sitges':'Cultura de Sitges','El seu llegat':'Su legado'
    },
    en: {
      'Josep Mirabent i Magrans va tenir un paper destacat en la vida cultural de Sitges. El seu llegat està especialment lligat a la música i a la voluntat d’apropar-la a la vila.':'Josep Mirabent i Magrans played a prominent role in the cultural life of Sitges. His legacy is especially connected with music and with the desire to bring it closer to the town.',
      'L’any 1972 va fundar les Joventuts Musicals de Sitges, entitat de la qual va ser primer president. Des d’aquesta plataforma va impulsar iniciatives per difondre la música clàssica i fomentar-ne la presència en la vida cultural de Sitges.':'In 1972 he founded Joventuts Musicals de Sitges, of which he was the first president. Through this organisation, he promoted initiatives to spread classical music and strengthen its presence in the cultural life of Sitges.',
      'Entre les iniciatives que va promoure destaquen els Concerts d’Estiu, que es van començar a celebrar al Racó de la Calma l’any 1976. Aquests cicles van portar la música a un dels espais més emblemàtics de Sitges i van reforçar la seva dimensió cultural i ciutadana.':'Among the initiatives he promoted were the Concerts d’Estiu, which began to take place at the Racó de la Calma in 1976. These concert cycles brought music to one of Sitges’ most emblematic spaces and strengthened its cultural and civic dimension.',
      'La seva vinculació amb el Casino Prado Suburense també forma part del context cultural sitgetà en què va desenvolupar la seva tasca.':'His connection with the Casino Prado Suburense is also part of the cultural context of Sitges in which he carried out his work.',
      'La seva dedicació a la música i a la cultura de Sitges explica el llegat que avui porta el seu nom.':'His dedication to music and to the culture of Sitges explains the legacy that bears his name today.',
      'Com a fundador de les Joventuts Musicals de Sitges, Mirabent va treballar per crear espais de divulgació i escolta de la música clàssica, contribuint a consolidar una activitat musical estable a la vila.':'As the founder of Joventuts Musicals de Sitges, Mirabent worked to create spaces for the dissemination and appreciation of classical music, helping to establish a stable musical activity in the town.',
      'La seva activitat cultural també va estar vinculada al Casino Prado Suburense, entitat que va presidir entre 1970 i 1975. El Prado va ser, alhora, un espai important de la seva trajectòria teatral i de la vida cultural sitgetana.':'His cultural activity was also connected with the Casino Prado Suburense, an organisation he chaired from 1970 to 1975. The Prado was also an important part of his theatrical career and of cultural life in Sitges.',
      'Aquesta mirada àmplia sobre la cultura —i especialment la seva dedicació a la música— és la que explica el llegat que avui porta el seu nom.':'This broad view of culture — and especially his dedication to music — is what explains the legacy that bears his name today.',
      'La família de Josep Mirabent i Magrans va impulsar el concurs en memòria seva, amb el suport de les Joventuts Musicals de Sitges, entitat de la qual havia estat fundador i primer president.':'The family of Josep Mirabent i Magrans established the contest in his memory, with the support of Joventuts Musicals de Sitges, of which he had been founder and first president.',
      'Des de 1993, el concurs manté aquesta vinculació amb la música clàssica i dona suport a joves intèrprets en les modalitats de música de cambra i cant, mantenint viva a través de noves generacions la vocació musical que Mirabent va impulsar a Sitges.':'Since 1993, the contest has maintained this connection with classical music and supported young performers in chamber music and singing, keeping alive through new generations the musical vocation that Mirabent fostered in Sitges.',
      'El Casino Prado Suburense és la seu del Concurs Josep Mirabent i Magrans. L\'adreça que figura a la documentació del concurs és C/ Francesc Gumà 6-14, 08870 Sitges.':'Casino Prado Suburense is the venue of the Josep Mirabent i Magrans Contest. The address listed in the contest documentation is C/ Francesc Gumà 6-14, 08870 Sitges.',
      'El concurs hi celebra les seves proves i activitats, mantenint la vinculació entre la música, la vida cultural de Sitges i aquest espai emblemàtic.':'The contest holds its rounds and activities there, maintaining the connection between music, the cultural life of Sitges and this emblematic venue.',
      'El cartell és una part de la memòria de cada edició del concurs. Aquesta secció recull l\'historial dels cartells i permetrà consultar-ne la trajectòria al llarg dels anys.':'The poster is part of the memory of each edition of the contest. This section records the history of the posters and allows their development over the years to be consulted.',
      'Les imatges dels cartells s\'aniran incorporant a partir del material de l\'antic espai del concurs.':'Images of the posters will be added from material preserved from the former contest website.',
      'Concerts Concertante forma part de l\'entorn musical vinculat al Concurs Josep Mirabent i Magrans. Aquesta secció recull aquesta activitat i el seu vincle amb la trajectòria del concurs.':'Concerts Concertante is part of the musical environment connected with the Josep Mirabent i Magrans Contest. This section documents this activity and its connection with the contest’s musical history.',
      'El contingut detallat i el material gràfic de les activitats s\'aniran incorporant a partir de la documentació de l\'antic espai del concurs.':'Detailed content and graphic material from the activities will be added from the documentation of the former contest website.',
      'L\'hemeroteca conserva les referències documentals i periodístiques relacionades amb el concurs i les seves diferents edicions.':'The archive preserves documentary and press references related to the contest and its different editions.',
      'Els documents i les referències de l\'antic espai del concurs s\'aniran incorporant aquí de manera ordenada, mantenint-ne el contingut original.':'Documents and references from the former contest website will be added here in an organised way, preserving their original content.',
      'Director d\'orquestra i compositor':'Orchestra conductor and composer','Pianista i compositora':'Pianist and composer','Violinista':'Violinist','Musicòleg':'Musicologist','Cantant':'Singer',
      'La persona que dona nom al concurs':'The person who gives the contest its name','Joventuts Musicals':'Joventuts Musicals','Cultura de Sitges':'Culture of Sitges','El seu llegat':'His legacy'
    }
  };

  function tokenTranslate(value, lang) {
    if (!value || lang === 'ca') return value;
    const exact = historyExact[lang]?.[value];
    if (exact) return exact;
    const tokens = lang === 'es' ? [
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

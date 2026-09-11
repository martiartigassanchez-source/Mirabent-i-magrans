(function () {
  const load = (src) => new Promise((resolve, reject) => { const s = document.createElement('script'); s.src = src; s.onload = resolve; s.onerror = reject; document.head.appendChild(s); });
  const originalText = new WeakMap();
  const originalHTML = new WeakMap();
  const originalAttrs = new WeakMap();

  const extra = {
    ca: {},
    es: {
      'Història<br>del concurs':'Historia<br>del concurso',
      'Una memòria<br>que continua':'Una memoria<br>que continúa',
      'Parlem del<br>Concurs':'Hablemos del<br>concurso',
      'Som a la teva<br>disposició':'Estamos a tu<br>disposición',
      'El concurs<br>en imatges':'El concurso<br>en imágenes',
      'Participa al<br>Concurs':'Participa en el<br>concurso',
      'Informació<br>general':'Información<br>general',
      'Què cal<br>presentar?':'¿Qué hay que<br>presentar?',
      'Formalitza<br>la inscripció':'Formaliza<br>la inscripción',
      'Historial<br>del jurat':'Historial<br>del jurado',
      'El Prado<br>en imatges':'El Prado<br>en imágenes',
      'Una trajectòria<br>al servei de la cultura':'Una trayectoria<br>al servicio de la cultura',
      'Una història que<br>continua a través de la música':'Una historia que<br>continúa a través de la música',
      'Un espai vinculat<br>a la història del concurs':'Un espacio vinculado<br>a la historia del concurso',
      'Una vida vinculada<br>a la música de Sitges':'Una vida vinculada<br>a la música de Sitges',
      'Fer de la música<br>una part de Sitges':'Hacer de la música<br>una parte de Sitges',
      'Música de Cambra 2025':'Música de cámara 2025','Cant 2025':'Canto 2025','Música de Cambra 2024':'Música de cámara 2024','Cant 2024':'Canto 2024','Música de Cambra 2023':'Música de cámara 2023','Cant 2023':'Canto 2023','Música de Cambra 2022':'Música de cámara 2022','Cant 2022':'Canto 2022',
      'El concurs conserva una trajectòria que es remunta a 1993 i que ha anat reunint intèrprets, jurats, institucions i públic al voltant de la música.':'El concurso conserva una trayectoria que se remonta a 1993 y que ha reunido a intérpretes, jurados, instituciones y público alrededor de la música.',
      "La nova web manté la memòria i els continguts de l'antic espai del concurs, presentats ara amb una estructura renovada.":'La nueva web mantiene la memoria y los contenidos del antiguo espacio del concurso, presentados ahora con una estructura renovada.',
      'Josep Mirabent i Magrans va tenir un paper destacat en la vida cultural de Sitges. El seu llegat està especialment lligat a la música i a la voluntat d’apropar-la a la vila.':'Josep Mirabent i Magrans tuvo un papel destacado en la vida cultural de Sitges. Su legado está especialmente ligado a la música y a la voluntad de acercarla a la localidad.',
      'L’any 1972 va fundar les Joventuts Musicals de Sitges, entitat de la qual va ser primer president. Des d’aquesta plataforma va impulsar iniciatives per difondre la música clàssica i fomentar-ne la presència en la vida cultural de Sitges.':'En 1972 fundó las Joventuts Musicals de Sitges, entidad de la que fue primer presidente. Desde esta plataforma impulsó iniciativas para difundir la música clásica y fomentar su presencia en la vida cultural de Sitges.',
      'Entre les iniciatives que va promoure destaquen els Concerts d’Estiu, que es van començar a celebrar al Racó de la Calma l’any 1976.':'Entre las iniciativas que promovió destacan los Concerts d’Estiu, que comenzaron a celebrarse en el Racó de la Calma en 1976.',
      'La seva vinculació amb el Casino Prado Suburense també forma part del context cultural sitgetà en què va desenvolupar la seva tasca.':'Su vinculación con el Casino Prado Suburense también forma parte del contexto cultural de Sitges en el que desarrolló su actividad.',
      'La seva dedicació a la música i a la cultura de Sitges explica el llegat que avui porta el seu nom.':'Su dedicación a la música y a la cultura de Sitges explica el legado que hoy lleva su nombre.',
      'El Casino Prado Suburense és la seu del Concurs Josep Mirabent i Magrans. L\'adreça que figura a la documentació del concurs és C/ Francesc Gumà 6-14, 08870 Sitges.':'El Casino Prado Suburense es la sede del Concurso Josep Mirabent i Magrans. La dirección que figura en la documentación del concurso es C/ Francesc Gumà 6-14, 08870 Sitges.',
      'El concurs hi celebra les seves proves i activitats, mantenint la vinculació entre la música, la vida cultural de Sitges i aquest espai emblemàtic.':'El concurso celebra allí sus pruebas y actividades, manteniendo el vínculo entre la música, la vida cultural de Sitges y este espacio emblemático.',
      'Com a fundador de les Joventuts Musicals de Sitges, Mirabent va treballar per crear espais de divulgació i escolta de la música clàssica, contribuint a consolidar una activitat musical estable a la vila.':'Como fundador de las Joventuts Musicals de Sitges, Mirabent trabajó para crear espacios de divulgación y escucha de la música clásica, contribuyendo a consolidar una actividad musical estable en la localidad.',
      'Aquests cicles van portar la música a un dels espais més emblemàtics de Sitges i van reforçar la seva dimensió cultural i ciutadana.':'Estos ciclos llevaron la música a uno de los espacios más emblemáticos de Sitges y reforzaron su dimensión cultural y ciudadana.',
      'La seva activitat cultural també va estar vinculada al Casino Prado Suburense, entitat que va presidir entre 1970 i 1975. El Prado va ser, alhora, un espai important de la seva trajectòria teatral i de la vida cultural sitgetana.':'Su actividad cultural también estuvo vinculada al Casino Prado Suburense, entidad que presidió entre 1970 y 1975. El Prado fue, asimismo, un espacio importante de su trayectoria teatral y de la vida cultural de Sitges.',
      'Aquesta mirada àmplia sobre la cultura —i especialment la seva dedicació a la música— és la que explica el llegat que avui porta el seu nom.':'Esta visión amplia de la cultura —y especialmente su dedicación a la música— explica el legado que hoy lleva su nombre.',
      'La família de Josep Mirabent i Magrans va impulsar el concurs en memòria seva, amb el suport de les Joventuts Musicals de Sitges, entitat de la qual havia estat fundador i primer president.':'La familia de Josep Mirabent i Magrans impulsó el concurso en su memoria, con el apoyo de las Joventuts Musicals de Sitges, entidad de la que había sido fundador y primer presidente.',
      'Des de 1993, el concurs manté aquesta vinculació amb la música clàssica i dona suport a joves intèrprets en les modalitats de música de cambra i cant, mantenint viva a través de noves generacions la vocació musical que Mirabent va impulsar a Sitges.':'Desde 1993, el concurso mantiene este vínculo con la música clásica y apoya a jóvenes intérpretes en las modalidades de música de cámara y canto, manteniendo viva a través de nuevas generaciones la vocación musical que Mirabent impulsó en Sitges.',
      'El jurat de cada modalitat, amb la composició de l\'edició actual i el registre de les personalitats que han format part del concurs.':'El jurado de cada modalidad, con la composición de la edición actual y el registro de las personalidades que han formado parte del concurso.',
      'Cada modalitat té el seu propi jurat. L\'edició actual permetrà mostrar el nom i la fotografia dels cinc membres de cada categoria; el registre històric queda separat en una llista més simple.':'Cada modalidad tiene su propio jurado. La edición actual muestra el nombre y la fotografía de los cinco miembros de cada categoría; el registro histórico queda separado en una lista más sencilla.',
      'L\'arxiu històric de la web antiga no assigna cada nom a una edició concreta; per això aquí es conserva el registre de noms sense inventar anys ni composicions.':'El archivo histórico de la web antigua no asigna cada nombre a una edición concreta; por eso aquí se conserva el registro de nombres sin inventar años ni composiciones.',
      'El cartell és una part de la memòria de cada edició del concurs. Aquesta secció recull l\'historial dels cartells i permetrà consultar-ne la trajectòria al llarg dels anys.':'El cartel es una parte de la memoria de cada edición del concurso. Esta sección recoge el historial de los carteles y permitirá consultar su trayectoria a lo largo de los años.',
      'Les imatges dels cartells s\'aniran incorporant a partir del material de l\'antic espai del concurs.':'Las imágenes de los carteles se irán incorporando a partir del material del antiguo espacio del concurso.',
      'Activitats i concerts vinculats a la trajectòria musical del concurs.':'Actividades y conciertos vinculados a la trayectoria musical del concurso.',
      'Concerts Concertante forma part de l\'entorn musical vinculat al Concurs Josep Mirabent i Magrans. Aquesta secció recull aquesta activitat i el seu vincle amb la trajectòria del concurs.':'Concerts Concertante forma parte del entorno musical vinculado al Concurso Josep Mirabent i Magrans. Esta sección recoge esta actividad y su vínculo con la trayectoria del concurso.',
      'Aquesta secció recull aquesta activitat i el seu vincle amb la trajectòria del concurs.':'Esta sección recoge esta actividad y su vínculo con la trayectoria del concurso.',
      'El contingut detallat i el material gràfic de les activitats s\'aniran incorporant a partir de la documentació de l\'antic espai del concurs.':'El contenido detallado y el material gráfico de las actividades se irán incorporando a partir de la documentación del antiguo espacio del concurso.',
      'Notícies, publicacions i documents relacionats amb la trajectòria del Concurs Josep Mirabent i Magrans.':'Noticias, publicaciones y documentos relacionados con la trayectoria del Concurso Josep Mirabent i Magrans.',
      'L\'hemeroteca conserva les referències documentals i periodístiques relacionades amb el concurs i les seves diferents edicions.':'La hemeroteca conserva las referencias documentales y periodísticas relacionadas con el concurso y sus diferentes ediciones.',
      'Els documents i les referències de l\'antic espai del concurs s\'aniran incorporant aquí de manera ordenada, mantenint-ne el contingut original.':'Los documentos y las referencias del antiguo espacio del concurso se irán incorporando aquí de manera ordenada, manteniendo su contenido original.',
      'Una memòria musical':'Una memoria musical','Una activitat<br>que continua':'Una actividad<br>que continúa','El concurs<br>a través del temps':'El concurso<br>a través del tiempo','Una memòria que es conserva':'Una memoria que se conserva',
      'Historial<br>dels guanyadors':'Historial<br>de los ganadores','Una història<br>de músics premiats':'Una historia<br>de músicos premiados','Els premiats de les diferents edicions del Concurs Josep Mirabent i Magrans.':'Los premiados de las diferentes ediciones del Concurso Josep Mirabent i Magrans.','Obre cada any per consultar els guanyadors. Les fotografies només apareixen en les edicions de les quals disposem d\'imatges.':'Abre cada año para consultar los ganadores. Las fotografías solo aparecen en las ediciones de las que disponemos de imágenes.','Palmarès':'Palmarés','Fotografia del guanyador':'Fotografía del ganador','Palmarès pendent de completar':'Palmarés pendiente de completar','Fotografia':'Fotografía','Premis especials: Victoria dels Àngels · Jardí dels Tarongers':'Premios especiales: Victoria dels Àngels · Jardí dels Tarongers'
    },
    en: {
      'Història<br>del concurs':'History<br>of the contest','Una memòria<br>que continua':'A legacy<br>that continues','Parlem del<br>Concurs':'Let’s talk about the<br>contest','Som a la teva<br>disposició':'We are at your<br>disposal','El concurs<br>en imatges':'The contest<br>in pictures','Participa al<br>Concurs':'Take part in the<br>contest','Informació<br>general':'General<br>information','Què cal<br>presentar?':'What must<br>be submitted?','Formalitza<br>la inscripció':'Complete<br>your registration','Historial<br>del jurat':'Jury<br>history','El Prado<br>en imatges':'El Prado<br>in pictures','Una trajectòria<br>al servei de la cultura':'A life devoted<br>to culture','Una història que<br>continua a través de la música':'A story that<br>continues through music','Un espai vinculat<br>a la història del concurs':'A space linked<br>to the contest’s history','Una vida vinculada<br>a la música de Sitges':'A life linked<br>to the music of Sitges','Fer de la música<br>una part de Sitges':'Making music<br>part of Sitges',
      'Música de Cambra 2025':'Chamber Music 2025','Cant 2025':'Singing 2025','Música de Cambra 2024':'Chamber Music 2024','Cant 2024':'Singing 2024','Música de Cambra 2023':'Chamber Music 2023','Cant 2023':'Singing 2023','Música de Cambra 2022':'Chamber Music 2022','Cant 2022':'Singing 2022',
      'El concurs conserva una trajectòria que es remunta a 1993 i que ha anat reunint intèrprets, jurats, institucions i públic al voltant de la música.':'The contest has a history dating back to 1993, bringing together performers, juries, institutions and audiences around music.',
      "La nova web manté la memòria i els continguts de l'antic espai del concurs, presentats ara amb una estructura renovada.":'The new website preserves the memory and content of the former contest website, now presented within a renewed structure.',
      'Josep Mirabent i Magrans va tenir un paper destacat en la vida cultural de Sitges. El seu llegat està especialment lligat a la música i a la voluntat d’apropar-la a la vila.':'Josep Mirabent i Magrans played a prominent role in the cultural life of Sitges. His legacy is especially linked to music and to the wish to bring it closer to the local community.',
      'L’any 1972 va fundar les Joventuts Musicals de Sitges, entitat de la qual va ser primer president. Des d’aquesta plataforma va impulsar iniciatives per difondre la música clàssica i fomentar-ne la presència en la vida cultural de Sitges.':'In 1972 he founded Joventuts Musicals de Sitges, serving as its first president. From this platform he promoted initiatives to spread classical music and strengthen its presence in the cultural life of Sitges.',
      'Entre les iniciatives que va promoure destaquen els Concerts d’Estiu, que es van començar a celebrar al Racó de la Calma l’any 1976.':'Among the initiatives he promoted were the Concerts d’Estiu, which began at the Racó de la Calma in 1976.',
      'La seva vinculació amb el Casino Prado Suburense també forma part del context cultural sitgetà en què va desenvolupar la seva tasca.':'His connection with Casino Prado Suburense was also part of the cultural context of Sitges in which he carried out his work.',
      'La seva dedicació a la música i a la cultura de Sitges explica el llegat que avui porta el seu nom.':'His dedication to music and to the culture of Sitges explains the legacy that bears his name today.',
      'El Casino Prado Suburense és la seu del Concurs Josep Mirabent i Magrans. L\'adreça que figura a la documentació del concurs és C/ Francesc Gumà 6-14, 08870 Sitges.':'Casino Prado Suburense is the venue of the Josep Mirabent i Magrans contest. The address listed in the contest documentation is C/ Francesc Gumà 6-14, 08870 Sitges.',
      'El concurs hi celebra les seves proves i activitats, mantenint la vinculació entre la música, la vida cultural de Sitges i aquest espai emblemàtic.':'The contest holds its rounds and activities there, maintaining the connection between music, the cultural life of Sitges and this emblematic venue.',
      'Com a fundador de les Joventuts Musicals de Sitges, Mirabent va treballar per crear espais de divulgació i escolta de la música clàssica, contribuint a consolidar una activitat musical estable a la vila.':'As founder of Joventuts Musicals de Sitges, Mirabent worked to create spaces for sharing and listening to classical music, helping to establish a stable musical activity in the town.',
      'Aquests cicles van portar la música a un dels espais més emblemàtics de Sitges i van reforçar la seva dimensió cultural i ciutadana.':'These series brought music to one of Sitges’ most emblematic spaces and strengthened its cultural and civic dimension.',
      'La seva activitat cultural també va estar vinculada al Casino Prado Suburense, entitat que va presidir entre 1970 i 1975. El Prado va ser, alhora, un espai important de la seva trajectòria teatral i de la vida cultural sitgetana.':'His cultural activity was also linked to Casino Prado Suburense, which he chaired from 1970 to 1975. The Prado was also an important part of his theatre career and of Sitges’ cultural life.',
      'Aquesta mirada àmplia sobre la cultura —i especialment la seva dedicació a la música— és la que explica el llegat que avui porta el seu nom.':'This broad view of culture —and especially his dedication to music— explains the legacy that bears his name today.',
      'La família de Josep Mirabent i Magrans va impulsar el concurs en memòria seva, amb el suport de les Joventuts Musicals de Sitges, entitat de la qual havia estat fundador i primer president.':'Josep Mirabent i Magrans’ family established the contest in his memory, with the support of Joventuts Musicals de Sitges, which he had founded and served as its first president.',
      'Des de 1993, el concurs manté aquesta vinculació amb la música clàssica i dona suport a joves intèrprets en les modalitats de música de cambra i cant, mantenint viva a través de noves generacions la vocació musical que Mirabent va impulsar a Sitges.':'Since 1993, the contest has maintained this connection with classical music and supported young performers in chamber music and singing, keeping Mirabent’s musical vision alive through new generations in Sitges.',
      'El jurat de cada modalitat, amb la composició de l\'edició actual i el registre de les personalitats que han format part del concurs.':'The jury for each category, with the current edition’s composition and a record of the personalities who have been part of the contest.',
      'Cada modalitat té el seu propi jurat. L\'edició actual permetrà mostrar el nom i la fotografia dels cinc membres de cada categoria; el registre històric queda separat en una llista més simple.':'Each category has its own jury. The current edition shows the names and photographs of its five members; the historical record is kept separately in a simpler list.',
      'L\'arxiu històric de la web antiga no assigna cada nom a una edició concreta; per això aquí es conserva el registre de noms sense inventar anys ni composicions.':'The historical archive of the former website does not assign each name to a specific edition; the names are therefore preserved here without inventing years or jury compositions.',
      'El cartell és una part de la memòria de cada edició del concurs. Aquesta secció recull l\'historial dels cartells i permetrà consultar-ne la trajectòria al llarg dels anys.':'The poster is part of the memory of each edition of the contest. This section records the poster archive and will allow its visual history to be explored over the years.',
      'Les imatges dels cartells s\'aniran incorporant a partir del material de l\'antic espai del concurs.':'Poster images will be added from material preserved from the former contest website.',
      'Activitats i concerts vinculats a la trajectòria musical del concurs.':'Activities and concerts linked to the musical history of the contest.',
      'Concerts Concertante forma part de l\'entorn musical vinculat al Concurs Josep Mirabent i Magrans. Aquesta secció recull aquesta activitat i el seu vincle amb la trajectòria del concurs.':'Concerts Concertante is part of the musical environment linked to the Josep Mirabent i Magrans contest. This section presents this activity and its connection with the contest’s history.',
      'Aquesta secció recull aquesta activitat i el seu vincle amb la trajectòria del concurs.':'This section presents this activity and its connection with the contest’s history.',
      'El contingut detallat i el material gràfic de les activitats s\'aniran incorporant a partir de la documentació de l\'antic espai del concurs.':'Detailed content and visual material from the activities will be added from documentation preserved from the former contest website.',
      'Notícies, publicacions i documents relacionats amb la trajectòria del Concurs Josep Mirabent i Magrans.':'News, publications and documents related to the history of the Josep Mirabent i Magrans contest.',
      'L\'hemeroteca conserva les referències documentals i periodístiques relacionades amb el concurs i les seves diferents edicions.':'The archive preserves documentary and press references related to the contest and its different editions.',
      'Els documents i les referències de l\'antic espai del concurs s\'aniran incorporant aquí de manera ordenada, mantenint-ne el contingut original.':'Documents and references from the former contest website will be added here in an organised way, preserving their original content.',
      'Una memòria musical':'A musical legacy','Una activitat<br>que continua':'An activity<br>that continues','El concurs<br>a través del temps':'The contest<br>through time','Una memòria que es conserva':'A legacy that is preserved',
      'Historial<br>dels guanyadors':'Winners’<br>history','Una història<br>de músics premiats':'A history<br>of award-winning musicians','Els premiats de les diferents edicions del Concurs Josep Mirabent i Magrans.':'The prize winners from different editions of the Josep Mirabent i Magrans contest.','Obre cada any per consultar els guanyadors. Les fotografies només apareixen en les edicions de les quals disposem d\'imatges.':'Open each year to see the winners. Photographs appear only for editions for which images are available.','Palmarès':'Winners','Fotografia del guanyador':'Winner photograph','Palmarès pendent de completar':'Winners to be completed','Fotografia':'Photograph','Premis especials: Victoria dels Àngels · Jardí dels Tarongers':'Special prizes: Victoria dels Àngels · Jardí dels Tarongers'
    }
  };

  function ensureLanguageSelector() {
    const navLinks = document.querySelector('.nav-links'); if (!navLinks) return null;
    let switcher = navLinks.querySelector('.language-switcher');
    if (switcher) return switcher;
    switcher = document.createElement('div'); switcher.className = 'language-switcher'; switcher.setAttribute('aria-label','Idioma');
    switcher.innerHTML = '<button type="button" data-lang="ca">CA</button><button type="button" data-lang="es">ES</button><button type="button" data-lang="en">EN</button>';
    const cta = navLinks.querySelector('.nav-cta'); if (cta) navLinks.insertBefore(switcher, cta); else navLinks.appendChild(switcher);
    return switcher;
  }

  function applyDictionary(dict, lang) {
    const elements = document.body.querySelectorAll('*');
    elements.forEach(el => {
      if (el.closest('.language-switcher')) return;
      if (!originalHTML.has(el)) originalHTML.set(el, el.innerHTML);
      const rawHTML = originalHTML.get(el);
      const translatedHTML = dict[rawHTML];
      if (translatedHTML != null && rawHTML.includes('<')) {
        el.innerHTML = translatedHTML;
        el.dataset.i18nHtml = 'true';
      }
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName) || parent.closest('.language-switcher') || parent.closest('[data-i18n-html="true"]')) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const raw = originalText.get(node), trimmed = raw.trim(); if (!trimmed) continue;
      const translated = dict[raw] ?? dict[trimmed]; if (translated == null) continue;
      const start = raw.indexOf(trimmed), end = start + trimmed.length;
      node.nodeValue = raw.slice(0,start) + translated + raw.slice(end);
    }

    document.querySelectorAll('[aria-label],[alt],[title]').forEach(el => {
      if (!originalAttrs.has(el)) originalAttrs.set(el, {
        'aria-label': el.getAttribute('aria-label'),
        alt: el.getAttribute('alt'),
        title: el.getAttribute('title')
      });
      const attrs = originalAttrs.get(el);
      Object.keys(attrs).forEach(attr => {
        const value = attrs[attr];
        if (!value) return;
        const translated = dict[value];
        if (translated != null) el.setAttribute(attr, translated);
      });
    });
  }

  function translatePage(lang) {
    const dict = Object.assign({}, window.MirabentTranslations?.[lang] || {}, extra[lang] || {});
    if (lang === 'en') {
      Object.keys(dict).forEach(key => {
        if (typeof dict[key] === 'string') dict[key] = dict[key].replace(/\bcompetition\b/gi, 'contest');
      });
    }
    document.documentElement.lang = lang;
    applyDictionary(dict, lang);

    document.querySelectorAll('title').forEach(el => {
      if (!originalText.has(el)) originalText.set(el, el.textContent.trim());
      const original = originalText.get(el);
      const translated = dict[original];
      if (translated) el.textContent = translated;
    });
    document.querySelectorAll('meta[name="description"]').forEach(el => {
      const original = el.getAttribute('data-i18n-original') || el.getAttribute('content');
      if (!el.hasAttribute('data-i18n-original')) el.setAttribute('data-i18n-original', original);
      if (dict[original]) el.setAttribute('content', dict[original]);
    });
  }

  function setupLanguageSelector() {
    const switcher = ensureLanguageSelector(); if (!switcher) return;
    const buttons = switcher.querySelectorAll('button[data-lang]');
    const updateActive = lang => buttons.forEach(button => button.classList.toggle('active', button.dataset.lang === lang));
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
    const initial = ['ca','es','en'].includes(saved) ? saved : 'ca';
    translatePage(initial); updateActive(initial);
  }

  const style = document.createElement('style');
  style.textContent = `.language-switcher{display:flex;align-items:center;gap:2px;margin-left:4px}.language-switcher button{border:0;background:transparent;color:#20201d;font:500 10px 'DM Sans',Arial,sans-serif;letter-spacing:.08em;padding:5px 3px;cursor:pointer;opacity:.45}.language-switcher button:hover,.language-switcher button.active{opacity:1}.language-switcher button.active{text-decoration:underline;text-underline-offset:4px}@media(max-width:850px){.language-switcher{margin-left:0}.language-switcher button{padding:0 3px}}`;
  document.head.appendChild(style);

  const translationsUrl = new URL('translations.js', document.currentScript?.src || new URL('js/i18n.js', document.baseURI)).href;
  load(translationsUrl).then(setupLanguageSelector).catch(() => {});
})();
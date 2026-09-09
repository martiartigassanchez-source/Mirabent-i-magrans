(function () {
  const load = (src) => new Promise((resolve, reject) => { const s = document.createElement('script'); s.src = src; s.onload = resolve; s.onerror = reject; document.head.appendChild(s); });
  const originalText = new WeakMap(), originalAria = new WeakMap(), originalTitle = new WeakMap();

  const extra = {
    ca: {},
    es: {
      'El concurs conserva una trajectòria que es remunta a 1993 i que ha anat reunint intèrprets, jurats, institucions i públic al voltant de la música.':'El concurso conserva una trayectoria que se remonta a 1993 y que ha reunido a intérpretes, jurados, instituciones y público alrededor de la música.',
      "La nova web manté la memòria i els continguts de l'antic espai del concurs, presentats ara amb una estructura renovada.":'La nueva web mantiene la memoria y los contenidos del antiguo espacio del concurso, presentados ahora con una estructura renovada.',
      'Josep Mirabent i Magrans va tenir un paper destacat en la vida cultural de Sitges. El seu llegat està especialment lligat a la música i a la voluntat d’apropar-la a la vila.':'Josep Mirabent i Magrans tuvo un papel destacado en la vida cultural de Sitges. Su legado está especialmente ligado a la música y a la voluntad de acercarla a la localidad.',
      'L’any 1972 va fundar les Joventuts Musicals de Sitges, entitat de la qual va ser primer president. Des d’aquesta plataforma va impulsar iniciatives per difondre la música clàssica i fomentar-ne la presència en la vida cultural de Sitges.':'En 1972 fundó las Joventuts Musicals de Sitges, entidad de la que fue primer presidente. Desde esta plataforma impulsó iniciativas para difundir la música clásica y fomentar su presencia en la vida cultural de Sitges.',
      'Entre les iniciatives que va promoure destaquen els Concerts d’Estiu, que es van començar a celebrar al Racó de la Calma l’any 1976.':'Entre las iniciativas que promovió destacan los Concerts d’Estiu, que comenzaron a celebrarse en el Racó de la Calma en 1976.',
      'La seva vinculació amb el Casino Prado Suburense també forma part del context cultural sitgetà en què va desenvolupar la seva tasca.':'Su vinculación con el Casino Prado Suburense también forma parte del contexto cultural de Sitges en el que desarrolló su actividad.',
      'La seva dedicació a la música i a la cultura de Sitges explica el llegat que avui porta el seu nom.':'Su dedicación a la música y a la cultura de Sitges explica el legado que hoy lleva su nombre.',
      'El Casino Prado Suburense és la seu del Concurs Josep Mirabent i Magrans. L’adreça que figura a la documentació del concurs és C/ Francesc Gumà 6-14, 08870 Sitges.':'El Casino Prado Suburense es la sede del Concurso Josep Mirabent i Magrans. La dirección que figura en la documentación del concurso es C/ Francesc Gumà 6-14, 08870 Sitges.',
      'El concurs hi celebra les seves proves i activitats, mantenint la vinculació entre la música, la vida cultural de Sitges i aquest espai emblemàtic.':'El concurso celebra allí sus pruebas y actividades, manteniendo el vínculo entre la música, la vida cultural de Sitges y este espacio emblemático.',
      "El jurat de cada modalitat, amb la composició de l'edició actual i el registre de les personalitats que han format part del concurs.":'El jurado de cada modalidad, con la composición de la edición actual y el registro de las personalidades que han formado parte del concurso.',
      "Cada modalitat té el seu propi jurat. L'edició actual permetrà mostrar el nom i la fotografia dels cinc membres de cada categoria; el registre històric queda separat en una llista més simple.":'Cada modalidad tiene su propio jurado. La edición actual permite mostrar el nombre y la fotografía de los cinco miembros de cada categoría; el registro histórico queda separado en una lista más sencilla.',
      "L'arxiu històric de la web antiga no assigna cada nom a una edició concreta; per això aquí es conserva el registre de noms sense inventar anys ni composicions.":'El archivo histórico de la web antigua no asigna cada nombre a una edición concreta; por eso aquí se conserva el registro de nombres sin inventar años ni composiciones.',
      'Aquestes són les fotografies del jurat en el concurs.':'Estas son las fotografías del jurado en el concurso.',
      'Per a qualsevol consulta relacionada amb el Concurs Josep Mirabent i Magrans, pots posar-te en contacte amb nosaltres.':'Para cualquier consulta relacionada con el Concurso Josep Mirabent i Magrans, puedes ponerte en contacto con nosotros.',
      'Si necessites informació sobre el concurs, les seves activitats o qualsevol altre aspecte, pots contactar amb l’organització a través de les dades següents.':'Si necesitas información sobre el concurso, sus actividades o cualquier otro aspecto, puedes contactar con la organización mediante los siguientes datos.',
      'La inscripció continuarà fent-se per correu electrònic. Les instruccions i la documentació de la convocatòria es mostraran aquí.':'La inscripción continuará realizándose por correo electrónico. Las instrucciones y la documentación de la convocatoria se mostrarán aquí.'
    },
    en: {
      'El concurs conserva una trajectòria que es remunta a 1993 i que ha anat reunint intèrprets, jurats, institucions i públic al voltant de la música.':'The competition has a history dating back to 1993, bringing together performers, juries, institutions and audiences around music.',
      "La nova web manté la memòria i els continguts de l'antic espai del concurs, presentats ara amb una estructura renovada.":'The new website preserves the memory and content of the former competition website, now presented within a renewed structure.',
      'Josep Mirabent i Magrans va tenir un paper destacat en la vida cultural de Sitges. El seu llegat està especialment lligat a la música i a la voluntat d’apropar-la a la vila.':'Josep Mirabent i Magrans played a prominent role in the cultural life of Sitges. His legacy is especially linked to music and to the wish to bring it closer to the local community.',
      'L’any 1972 va fundar les Joventuts Musicals de Sitges, entitat de la qual va ser primer president. Des d’aquesta plataforma va impulsar iniciatives per difondre la música clàssica i fomentar-ne la presència en la vida cultural de Sitges.':'In 1972 he founded Joventuts Musicals de Sitges, serving as its first president. From this platform he promoted initiatives to spread classical music and strengthen its presence in the cultural life of Sitges.',
      'Entre les iniciatives que va promoure destaquen els Concerts d’Estiu, que es van començar a celebrar al Racó de la Calma l’any 1976.':'Among the initiatives he promoted were the Concerts d’Estiu, which began at the Racó de la Calma in 1976.',
      'La seva vinculació amb el Casino Prado Suburense també forma part del context cultural sitgetà en què va desenvolupar la seva tasca.':'His connection with Casino Prado Suburense was also part of the cultural context of Sitges in which he carried out his work.',
      'La seva dedicació a la música i a la cultura de Sitges explica el llegat que avui porta el seu nom.':'His dedication to music and to the culture of Sitges explains the legacy that bears his name today.',
      'El Casino Prado Suburense és la seu del Concurs Josep Mirabent i Magrans. L’adreça que figura a la documentació del concurs és C/ Francesc Gumà 6-14, 08870 Sitges.':'Casino Prado Suburense is the venue of the Josep Mirabent i Magrans Competition. The address listed in the competition documentation is C/ Francesc Gumà 6-14, 08870 Sitges.',
      'El concurs hi celebra les seves proves i activitats, mantenint la vinculació entre la música, la vida cultural de Sitges i aquest espai emblemàtic.':'The competition holds its rounds and activities there, maintaining the connection between music, the cultural life of Sitges and this emblematic venue.',
      "El jurat de cada modalitat, amb la composició de l'edició actual i el registre de les personalitats que han format part del concurs.":'The jury for each category, with the current edition’s composition and a record of the personalities who have been part of the competition.',
      "Cada modalitat té el seu propi jurat. L'edició actual permetrà mostrar el nom i la fotografia dels cinc membres de cada categoria; el registre històric queda separat en una llista més simple.":'Each category has its own jury. The current edition shows the names and photographs of its five members; the historical record is kept separately in a simpler list.',
      "L'arxiu històric de la web antiga no assigna cada nom a una edició concreta; per això aquí es conserva el registre de noms sense inventar anys ni composicions.":'The historical archive of the former website does not assign each name to a specific edition; the names are therefore preserved here without inventing years or jury compositions.',
      'Aquestes són les fotografies del jurat en el concurs.':'These are photographs of the competition jury.',
      'Per a qualsevol consulta relacionada amb el Concurs Josep Mirabent i Magrans, pots posar-te en contacte amb nosaltres.':'For any enquiry about the Josep Mirabent i Magrans Competition, please contact us.',
      'Si necessites informació sobre el concurs, les seves activitats o qualsevol altre aspecte, pots contactar amb l’organització a través de les dades següents.':'If you need information about the competition, its activities or any other aspect, you can contact the organisation using the details below.',
      'La inscripció continuarà fent-se per correu electrònic. Les instruccions i la documentació de la convocatòria es mostraran aquí.':'Registration will continue to be completed by email. Instructions and competition documents will be provided here.'
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

  function translatePage(lang) {
    const dict = Object.assign({}, window.MirabentTranslations?.[lang] || {}, extra[lang] || {}); if (!Object.keys(dict).length) return;
    document.documentElement.lang = lang;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement; if (!parent || ['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName) || parent.closest('.language-switcher')) continue;
      if (!originalText.has(node)) originalText.set(node,node.nodeValue);
      const raw = originalText.get(node), trimmed = raw.trim(); if (!trimmed) continue;
      const translated = dict[raw] ?? dict[trimmed]; if (translated == null) continue;
      const start = raw.indexOf(trimmed), end = start + trimmed.length; node.nodeValue = raw.slice(0,start) + translated + raw.slice(end);
    }
    document.querySelectorAll('[aria-label]').forEach(el => { if (!originalAria.has(el)) originalAria.set(el,el.getAttribute('aria-label')); const original = originalAria.get(el); const translated = dict[original]; if (translated) el.setAttribute('aria-label',translated); });
    document.querySelectorAll('title').forEach(el => { if (!originalTitle.has(el)) originalTitle.set(el,el.textContent.trim()); const original = originalTitle.get(el); const translated = dict[original]; if (translated) el.textContent = translated; });
  }

  function setupLanguageSelector() {
    const switcher = ensureLanguageSelector(); if (!switcher) return;
    const buttons = switcher.querySelectorAll('button[data-lang]');
    const updateActive = lang => buttons.forEach(button => button.classList.toggle('active',button.dataset.lang === lang));
    buttons.forEach(button => { if (button.dataset.bound === 'true') return; button.dataset.bound='true'; button.addEventListener('click',()=>{ const lang=button.dataset.lang; localStorage.setItem('mirabent-language',lang); translatePage(lang); updateActive(lang); }); });
    const saved = localStorage.getItem('mirabent-language'), initial = ['ca','es','en'].includes(saved) ? saved : 'ca'; translatePage(initial); updateActive(initial);
  }

  const style = document.createElement('style'); style.textContent = `.language-switcher{display:flex;align-items:center;gap:2px;margin-left:4px}.language-switcher button{border:0;background:transparent;color:#20201d;font:500 10px 'DM Sans',Arial,sans-serif;letter-spacing:.08em;padding:5px 3px;cursor:pointer;opacity:.45}.language-switcher button:hover,.language-switcher button.active{opacity:1}.language-switcher button.active{text-decoration:underline;text-underline-offset:4px}@media(max-width:850px){.language-switcher{margin-left:0}.language-switcher button{padding:0 3px}}`; document.head.appendChild(style);
  const translationsUrl = new URL('translations.js', document.currentScript?.src || new URL('js/i18n.js',document.baseURI)).href;
  load(translationsUrl).then(setupLanguageSelector).catch(()=>{});
})();
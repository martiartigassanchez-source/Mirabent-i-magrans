(function () {
  const translations = {
    ca: {
      label: 'Participa',
      title: 'Inscripcions',
      text: 'La inscripció continuarà fent-se per correu electrònic. Les instruccions i la documentació de la convocatòria es mostraran aquí.',
      button: 'Veure inscripcions'
    },
    es: {
      label: 'Participa',
      title: 'Inscripciones',
      text: 'La inscripción continuará realizándose por correo electrónico. Las instrucciones y la documentación de la convocatoria se mostrarán aquí.',
      button: 'Ver inscripciones'
    },
    en: {
      label: 'Participate',
      title: 'Registration',
      text: 'Registration will continue to be carried out by email. The instructions and application documentation for the call will be shown here.',
      button: 'View registration'
    }
  };

  function apply() {
    const section = document.querySelector('.registration');
    if (!section) return;
    const lang = localStorage.getItem('mirabent-language') || 'ca';
    const t = translations[lang] || translations.ca;
    const label = section.querySelector('.section-label');
    const title = section.querySelector('h2');
    const text = section.querySelector('div > p');
    const button = section.querySelector('a.button');
    if (label) label.textContent = t.label;
    if (title) title.textContent = t.title;
    if (text) text.textContent = t.text;
    if (button) button.textContent = t.button;
  }

  function setup() {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher) return false;
    if (switcher.dataset.registrationI18nBound !== 'true') {
      switcher.dataset.registrationI18nBound = 'true';
      switcher.querySelectorAll('button[data-lang]').forEach(button => {
        button.addEventListener('click', () => setTimeout(apply, 0));
      });
    }
    apply();
    return true;
  }

  if (!setup()) {
    const timer = setInterval(() => {
      if (setup()) clearInterval(timer);
    }, 50);
    setTimeout(() => clearInterval(timer), 10000);
  }
})();

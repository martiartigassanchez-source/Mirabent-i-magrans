(function () {
  const translations = {
    ca: 'La inscripció continuarà fent-se per correu electrònic. Les instruccions i la documentació de la convocatòria es mostraran aquí.',
    es: 'La inscripción continuará realizándose por correo electrónico. Las instrucciones y la documentación de la convocatoria se mostrarán aquí.',
    en: 'Registration will continue to be carried out by email. The instructions and application documentation for the call will be shown here.'
  };

  function apply() {
    const section = document.querySelector('.registration');
    if (!section) return;
    const text = section.querySelector('div > p');
    if (!text) return;
    const lang = localStorage.getItem('mirabent-language') || 'ca';
    text.textContent = translations[lang] || translations.ca;
  }

  function setup() {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher) return false;
    if (switcher.dataset.registrationTextI18nBound !== 'true') {
      switcher.dataset.registrationTextI18nBound = 'true';
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

const header = document.getElementById('site-header');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
window.addEventListener('scroll', () => { header?.classList.toggle('scrolled', window.scrollY > 20); });
toggle?.addEventListener('click', () => { const open = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
links?.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { links.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }); });
document.querySelectorAll('.nav-links a[href$="el-concurs.html"]').forEach(link => link.remove());
const instagramIcon = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
const facebookIcon = '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false"><path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v4h4v-4h3.2l.8-4H13V9c0-.7.3-1 1-1Z" fill="currentColor"/></svg>';
function applySocialIcons(root = document) {
  root.querySelectorAll('.footer-contact > div, .contact-detail').forEach(item => {
    const label = item.querySelector('span')?.textContent.trim().toLowerCase();
    const link = item.querySelector('a');
    if (!link || !label || (label !== 'instagram' && label !== 'facebook')) return;
    link.innerHTML = label === 'instagram' ? instagramIcon : facebookIcon;
    link.setAttribute('aria-label', label === 'instagram' ? 'Instagram' : 'Facebook');
    link.setAttribute('title', label === 'instagram' ? 'Instagram' : 'Facebook');
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.style.display = 'inline-flex'; link.style.alignItems = 'center'; link.style.width = 'max-content'; link.style.height = '17px'; link.style.lineHeight = '0';
  });
}
document.querySelectorAll('.info-item > summary, .document-item > summary').forEach(summary => {
  summary.addEventListener('click', event => event.preventDefault());
  summary.querySelector('b')?.remove();
  if (summary.closest('.info-item')) summary.style.gridTemplateColumns = '70px 1fr';
  if (summary.closest('.document-item')) summary.style.gridTemplateColumns = '50px 1fr';
});
document.querySelector('.document-item')?.setAttribute('open', '');

const registrationHoverFix = document.createElement('style');
registrationHoverFix.textContent = `
  .info-menu .info-item,
  .info-menu .info-item:hover,
  .info-menu .info-item:focus,
  .info-menu .info-item:active {
    width: 100% !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    transform: none !important;
    background: transparent !important;
    transition: none !important;
  }
  .info-menu .info-item > summary,
  .info-menu .info-item > summary:hover,
  .info-menu .info-item > summary:focus,
  .info-menu .info-item > summary:active {
    width: 100% !important;
    max-width: none !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    transform: none !important;
    transition: none !important;
  }
`;
document.head.appendChild(registrationHoverFix);

const specialAwards = {
  '2023': ['Premi Cambra Romànica — Trio Nacedo'],
  '2019': ['Premi Victoria dels Àngels — Lalit Worathepnitinian', 'Premi Jardí dels Tarongers — Marta Bauzá'],
  '2017': ['Premi AOS — Hélène Walter i Daniela Vega'],
  '2014': ['Premi Fundació Mas i Mas — Tulam Duo', 'Premi Joventuts Musicals — Fukio Ensemble', 'Premi Associació Eduard Toldrà — Cosmos Quartet', 'Premi Fundació Mas i Mas — Verónica Tello', 'Premi Joventuts Musicals Sitges — Dania Rodríguez'],
  '2013': ['Premi Fundació Mas i Mas — Blooming Duo', 'Premi Joventuts Musicals — Trio Pedrell', 'Premi Fundació Mas i Mas — Anna Puche', 'Premi Joventuts Musicals Sitges — Anna Puche'],
  '2012': ['Premi Montserrat Mirabent — Duo Rey-Rodiles', 'Premi Fundació Mas i Mas — Biel Quartet', 'Premi Fundació Callís — Francisco Fernández-Rueda', 'Premi Fundació Mas i Mas — Xavier Aguilar'],
  '2011': ['Premi Casa Parramon — Alicia Salas i Lara Fernández', 'Premi Cançó catalana — Duo Alfageme', 'Premi Fundació Mas i Mas — Trio Baroja', 'Menció d’honor — Beñat Egiarte i Miguel Borrallo', 'Premi Cançó catalana — Mar Jordana', 'Premi Fundació Callís — Josep Ramon Olivé', 'Premi Fundació Mas i Mas — Gabriel Blanco'],
  '2010': ['Premi Casa Parramon — Madeleine Przybyl', 'Premi Cançó catalana — Duo A+A', 'Premi Associació Concertante — Duo Santor-Gilort i Duo Przybyl-Schube', 'Premi Fundació Mas i Mas — Quartet Tetrauk', 'Premi Jaume Callís cançó catalana — Eduard Moreno', 'Premi Associació Concertante — Maria Miró i Marta Huarte', 'Premi Academia BCN Concertante — Abdellah Lasri'],
  '2009': ['Premi Casa Parramon — Teresa Lli Rumbau', 'Premi Jaume Callís, Cançó catalana — Duo Aromes', 'Menció d’Honor — Ensemble ILMA', 'Premi Cançó catalana — Mireia Dolç', 'Menció d’Honor — Eugènia Montenegro, Maria Escobar'],
  '2008': ['Premi Casa Parramon — Javier Cárdenas', 'Premi Jaume Callís, Cançó catalana — Quintet de Vent “Dada”', 'Menció d’Honor — La Ritirata', 'Premi Cançó catalana — Eugènia Montenegro', 'Menció d’Honor — Cristina Herreras, Maria Miró, Ilona Mataradze'],
  '2007': ['Premi Cançó catalana — Alícia Ferrer'],
  '2006': ['Premi Cançó catalana — Inés Moraleda']
};
function setupWinnerHistory() {
  const years = document.querySelector('.winner-years');
  if (!years) return;
  document.querySelectorAll('main img').forEach(img => { if (!img.closest('.winner-years')) img.remove(); });
  years.querySelectorAll('details').forEach(detail => {
    const year = detail.querySelector('summary')?.textContent.trim();
    if (!year) return;
    detail.querySelectorAll('.special-note').forEach(note => note.remove());
    const awards = specialAwards[year];
    if (!awards?.length) return;
    const note = document.createElement('div');
    note.className = 'special-note';
    note.innerHTML = '<span>Premis especials i mencions</span>' + awards.map(award => `<p>${award}</p>`).join('');
    detail.appendChild(note);
  });
}

function normalizeJuryPhotos() {
  const style = document.createElement('style');
  style.textContent = `
    .jury-home-photo, .jury-photo {
      width: 100% !important;
      height: 220px !important;
      min-height: 220px !important;
      max-height: 220px !important;
      aspect-ratio: auto !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }
    .jury-home-card, .jury-current-card {
      padding-left: 18px !important;
      padding-right: 18px !important;
    }
    .jury-home-card strong, .jury-current-card strong {
      font-size: 18px !important;
    }
    .jury-home-photo img, .jury-photo img {
      width: 100% !important;
      height: 100% !important;
      min-width: 100% !important;
      min-height: 100% !important;
      max-width: none !important;
      max-height: none !important;
      object-fit: cover !important;
      display: block !important;
    }
  `;
  document.head.appendChild(style);
}

function setupJuryArchiveCarousel() {
  const frame = document.querySelector('.jury-carousel-frame');
  if (!frame) return;
  const images = [
    '2023_jurat_cambrajpg.jpg',
    '2023_jurat_cant.jpg',
    '2025_Jurat_cant.JPG',
    '2025_jurat_cambra.JPG',
    'jurat21.jpg',
    'jurat32.jpg',
    'jurat_cambra2.jpg',
    'jurat_cant2.jpg',
    'jurat-historic-01.jpg'
  ];
  const controls = frame.querySelectorAll('.jury-carousel-control');
  frame.querySelectorAll('.jury-carousel-slide').forEach(slide => slide.remove());
  images.forEach((file, index) => {
    const slide = document.createElement('div');
    slide.className = 'jury-carousel-slide' + (index === 0 ? ' active' : '');
    const img = document.createElement('img');
    img.src = '../images/jurat/historic/' + file;
    img.alt = 'Fotografia històrica del jurat';
    img.loading = index === 0 ? 'eager' : 'lazy';
    slide.appendChild(img);
    frame.insertBefore(slide, controls[0]);
  });

  const slides = frame.querySelectorAll('.jury-carousel-slide');
  const prev = frame.querySelector('.jury-carousel-control.prev');
  const next = frame.querySelector('.jury-carousel-control.next');
  let current = 0;
  const show = (n) => {
    current = (n + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
  };
  prev?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));

  const style = document.createElement('style');
  style.textContent = `
    .jury-carousel-slide img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      display: block !important;
    }
    .jury-carousel-slide { opacity: 1 !important; }
  `;
  document.head.appendChild(style);
}

function setupVenueCarousel() {
  const frames = document.querySelectorAll('.venue-carousel-frame');
  if (!frames.length) return;
  const images = [
    'casino-prado-01.jpg',
    'casino-prado-02.jpg',
    'casino-prado-03.jpg',
    'casino-prado-04.jpg',
    'casino-prado-05.jpg',
    'casino-prado-06.jpg',
    'casino-prado-07.jpg'
  ];
  frames.forEach(frame => {
    const basePath = frame.dataset.carouselPath || 'images/casino-prado/';
    const controls = frame.querySelectorAll('.venue-carousel-control');
    frame.querySelectorAll('.venue-carousel-slide').forEach(slide => slide.remove());
    images.forEach((file, index) => {
      const slide = document.createElement('div');
      slide.className = 'venue-carousel-slide' + (index === 0 ? ' active' : '');
      const img = document.createElement('img');
      img.src = basePath + file;
      img.alt = 'Fotografia del Casino Prado Suburense';
      img.loading = index === 0 ? 'eager' : 'lazy';
      slide.appendChild(img);
      frame.insertBefore(slide, controls[0]);
    });
    const slides = frame.querySelectorAll('.venue-carousel-slide');
    const prev = frame.querySelector('.venue-carousel-control.prev');
    const next = frame.querySelector('.venue-carousel-control.next');
    let current = 0;
    const show = (n) => {
      current = (n + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    };
    prev?.addEventListener('click', () => show(current - 1));
    next?.addEventListener('click', () => show(current + 1));
  });
  const style = document.createElement('style');
  style.textContent = `
    .venue-carousel-frame {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      min-height: 360px;
      background: #20201d;
      overflow: hidden;
    }
    .venue-carousel-slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      pointer-events: none;
      transition: opacity .25s ease;
    }
    .venue-carousel-slide.active {
      opacity: 1;
      pointer-events: auto;
    }
    .venue-carousel-slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .venue-carousel-control {
      position: absolute;
      top: 50%;
      z-index: 2;
      transform: translateY(-50%);
      width: 42px;
      height: 42px;
      border: 1px solid rgba(245,241,232,.75);
      background: rgba(32,32,29,.55);
      color: #f5f1e8;
      font-size: 24px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .venue-carousel-control:hover { background: rgba(32,32,29,.8); }
    .venue-carousel-control.prev { left: 16px; }
    .venue-carousel-control.next { right: 16px; }
    @media(max-width:600px) {
      .venue-carousel-frame { min-height: 250px; }
      .venue-carousel-control { width: 36px; height: 36px; font-size: 20px; }
    }
  `;
  document.head.appendChild(style);
}

setupWinnerHistory();
applySocialIcons();
normalizeJuryPhotos();
setupJuryArchiveCarousel();
setupVenueCarousel();
const header = document.getElementById('site-header');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
window.addEventListener('scroll', () => { header?.classList.toggle('scrolled', window.scrollY > 20); });
toggle?.addEventListener('click', () => { const open = links.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
links?.querySelectorAll('a').forEach(link => { link.addEventListener('click', () => { links.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }); });
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
// A Inscripcions, la informació general i els documents són sempre visibles i no funcionen com a desplegables.
document.querySelectorAll('.info-item > summary, .document-item > summary').forEach(summary => {
  summary.addEventListener('click', event => event.preventDefault());
  summary.querySelector('b')?.remove();
  if (summary.closest('.info-item')) summary.style.gridTemplateColumns = '70px 1fr';
  if (summary.closest('.document-item')) summary.style.gridTemplateColumns = '50px 1fr';
});
document.querySelector('.document-item')?.setAttribute('open', '');
applySocialIcons();

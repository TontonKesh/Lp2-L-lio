import { media, transformations } from './media.config.js';
import { initMotion } from './motion.js';
import { wistia, iClosed } from './integrations.config.js';
import { prepareWistia } from './integrations/wistia.js';
import { prepareVimeo } from './integrations/vimeo.js';
import { prepareIClosed } from './integrations/iclosed.js';

document.documentElement.classList.add('is-enhanced');

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#mobile-menu');

function closeMenu(returnFocus = false) {
  if (menu.hidden) return;
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  if (!menu.hidden) { closeMenu(); return; }
  menu.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Fermer le menu');
});
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu(true);
});
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
document.addEventListener('focusin', (event) => {
  if (!menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 700px)').addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

const checklist = document.querySelector('.checklist');
const checklistStatus = document.querySelector('[data-checklist-status]');
function updateChecklist() {
  const checked = checklist.querySelectorAll('input:checked').length;
  checklistStatus.textContent = checked === 3 ? '3 sur 3 · Ta préparation est terminée.' : `${checked} sur 3 · À préparer avant ton appel.`;
}
checklist.addEventListener('change', updateChecklist);
updateChecklist();
window.addEventListener('pageshow', updateChecklist);

const copyMessage = document.querySelector('[data-copy-message]');
const confirmationMessage = document.querySelector('[data-confirmation-message]');
const copyStatus = document.querySelector('[data-copy-status]');
copyMessage.addEventListener('click', async () => {
  copyMessage.disabled = true;
  try {
    await navigator.clipboard.writeText(confirmationMessage.innerText);
    copyStatus.textContent = 'Message copié. Colle-le dans ton groupe WhatsApp.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents(confirmationMessage);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = 'Message sélectionné. Copie-le, puis colle-le dans ton groupe WhatsApp.';
  } finally {
    copyMessage.disabled = false;
  }
});

// The checklist is a preparation aid. It never confirms a booking or sends data.
const allowedEmbedHosts = new Set(['www.youtube-nocookie.com', 'player.vimeo.com', 'fast.wistia.net', 'fast.wistia.com']);
for (const slot of document.querySelectorAll('[data-media]')) {
  const item = media[slot.dataset.media];
  if (item?.type === 'vimeo') {
    prepareVimeo(slot, item);
    continue;
  }
  if (item?.type === 'wistia') {
    prepareWistia(slot, item, wistia);
    continue;
  }
  if (!item || typeof item.src !== 'string' || !item.src.trim()) continue;
  let url;
  try { url = new URL(item.src, window.location.origin); } catch { continue; }
  if (!['https:', 'http:'].includes(url.protocol)) continue;
  let player;
  if (item.type === 'video' && (url.origin === window.location.origin || url.protocol === 'https:')) {
    player = document.createElement('video');
    player.controls = true;
    player.playsInline = true;
    player.preload = 'metadata';
    player.src = url.href;
    player.setAttribute('aria-label', item.title || 'Vidéo de Lélio');
  } else if (item.type === 'embed' && url.protocol === 'https:' && allowedEmbedHosts.has(url.hostname)) {
    player = document.createElement('iframe');
    player.src = url.href;
    player.title = item.title || 'Vidéo de Lélio';
    player.allow = 'fullscreen; picture-in-picture';
    player.allowFullscreen = true;
    player.loading = 'lazy';
    player.referrerPolicy = 'strict-origin-when-cross-origin';
  }
  if (!player) continue;
  slot.replaceChildren(player);
  slot.removeAttribute('aria-label');
  slot.classList.add('is-loaded');
}

const gallery = document.querySelector('[data-transformations]');
const photos = [];
for (const item of transformations) {
  if (!item || typeof item.before !== 'string' || !item.before.trim() || typeof item.after !== 'string' || !item.after.trim()) continue;
  let before, after;
  try {
    before = new URL(item.before, location.origin);
    after = new URL(item.after, location.origin);
  } catch { continue; }
  if (![before, after].every(url => url.protocol === 'https:' || (url.origin === location.origin && url.protocol === 'http:'))) continue;
  const figure = document.createElement('figure');
  figure.className = 'transformation-pair';
  const images = document.createElement('div');
  images.className = 'transformation-images';
  for (const [url, label] of [[before, 'Avant'], [after, 'Après']]) {
    const photo = document.createElement('div');
    photo.className = 'transformation-photo';
    const image = document.createElement('img');
    image.src = url.href;
    image.alt = `${label}${item.caption ? ` — ${item.caption}` : ' l’accompagnement'}`;
    image.loading = 'lazy';
    const tag = document.createElement('span');
    tag.textContent = label;
    photo.append(image, tag);
    images.append(photo);
  }
  figure.append(images);
  if (item.caption) {
    const caption = document.createElement('figcaption');
    caption.textContent = item.caption;
    figure.append(caption);
  }
  photos.push(figure);
}
if (gallery && photos.length) {
  gallery.replaceChildren(...photos);
  gallery.classList.add('has-photos');
  gallery.closest('.transformations').hidden = false;
}

initMotion();
prepareIClosed(iClosed);

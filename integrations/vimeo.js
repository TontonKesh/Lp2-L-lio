import { vimeoUrls } from './urls.js';

/** Keep the official player visible, including its thumbnail and paused controls. */
export function prepareVimeo(slot, item) {
  const urls = vimeoUrls(item?.src);
  if (!urls) return false;
  const poster = slot.querySelector('.video-poster');
  const player = document.createElement('iframe');
  player.src = urls.embed;
  player.title = item.title || 'Vidéo de Lélio';
  player.className = 'vimeo-embed';
  player.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
  player.allowFullscreen = true;
  player.referrerPolicy = 'strict-origin-when-cross-origin';
  slot.replaceChildren(...(poster ? [poster] : []), player);
  slot.removeAttribute('aria-label');
  slot.classList.add('is-loaded', 'is-player-loading');
  const fallback = document.createElement('p');
  fallback.className = 'media-fallback';
  fallback.hidden = true;
  const status = document.createElement('span');
  status.setAttribute('role', 'status');
  status.textContent = 'Le lecteur tarde à s’afficher. ';
  const link = document.createElement('a');
  link.href = urls.external;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Ouvrir la vidéo sur Vimeo ↗';
  fallback.append(status, link);
  slot.after(fallback);
  const timer = setTimeout(() => { fallback.hidden = false; }, 12000);
  player.addEventListener('load', () => {
    clearTimeout(timer);
    fallback.hidden = true;
    slot.classList.remove('is-player-loading');
  }, { once: true });
  player.addEventListener('error', () => {
    clearTimeout(timer);
    fallback.hidden = false;
  }, { once: true });
  return true;
}

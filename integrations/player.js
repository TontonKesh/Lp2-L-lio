const activeGridPlayers = new WeakMap();

function playIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('icon');
  const path = document.createElementNS(svg.namespaceURI, 'path');
  path.setAttribute('d', 'M8 5l11 7-11 7V5Z');
  svg.append(path);
  return svg;
}

/** Mount a validated provider iframe only when the visitor requests playback. */
export function preparePlayer(slot, item, urls, options = {}) {
  if (!urls) return false;
  const title = item.title || 'Vidéo de Lélio';
  const cover = [...slot.childNodes].map(node => node.cloneNode(true));
  const originalLabel = slot.getAttribute('aria-label');
  const grid = slot.closest('.faq-grid');
  let fallback;
  let mounted = false;
  let loadTimer;

  function ready() {
    mounted = false;
    if (grid && activeGridPlayers.get(grid) === ready) activeGridPlayers.delete(grid);
    clearTimeout(loadTimer);
    fallback?.remove();
    slot.replaceChildren(...cover.map(node => node.cloneNode(true)));
    slot.classList.remove('is-loaded');
    slot.classList.add('is-ready');
    if (originalLabel) slot.setAttribute('aria-label', title);
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Voir la vidéo : ${title}`);
    slot.querySelector('.media-status')?.remove();
    slot.querySelector('.media-symbol')?.remove();
    button.className = 'media-launch';
    const symbol = document.createElement('span');
    symbol.className = 'media-symbol';
    symbol.append(playIcon());
    const label = document.createElement('span');
    label.className = 'media-status';
    label.textContent = 'REGARDER LA VIDÉO';
    button.append(label, symbol);
    slot.append(button);
    button.addEventListener('click', open, { once: true });
  }

  function open() {
    if (mounted) return;
    // Keep every answer visible while preventing two FAQ videos playing together.
    if (grid) {
      activeGridPlayers.get(grid)?.();
      activeGridPlayers.set(grid, ready);
    }
    mounted = true;
    const player = document.createElement('iframe');
    player.src = urls.embed;
    player.title = title;
    player.allow = options.allow || 'autoplay; fullscreen; picture-in-picture';
    player.allowFullscreen = true;
    player.referrerPolicy = options.referrerPolicy || 'no-referrer';
    player.className = options.className || 'video-embed';
    player.setAttribute('tabindex', '0');
    slot.replaceChildren(player);
    slot.removeAttribute('aria-label');
    slot.classList.replace('is-ready', 'is-loaded');
    fallback = document.createElement('p');
    fallback.className = 'media-fallback';
    const status = document.createElement('span');
    status.className = 'media-load-status';
    status.setAttribute('role', 'status');
    status.textContent = 'Chargement de la vidéo…';
    const link = document.createElement('a');
    link.href = urls.external;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Ouvrir la vidéo dans un nouvel onglet ↗';
    fallback.append(status, link);
    slot.after(fallback);
    function unavailable() {
      clearTimeout(loadTimer);
      status.hidden = false;
      status.textContent = 'Le lecteur tarde à s’afficher. Tu peux ouvrir la vidéo directement.';
    }
    player.addEventListener('load', () => { clearTimeout(loadTimer); status.hidden = true; }, { once: true });
    player.addEventListener('error', unavailable, { once: true });
    loadTimer = setTimeout(unavailable, 12000);
    player.focus({ preventScroll: true });
  }

  ready();
  return true;
}

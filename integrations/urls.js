const WISTIA_ID = /^[a-z0-9]{10}$/i;
const WISTIA_HOSTS = ['wistia.com', 'wistia.net', 'wi.st'];

/** Accept a media ID, a public media link or an official iframe/script URL. */
export function wistiaMediaId(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const input = value.trim();
  if (WISTIA_ID.test(input)) return input;
  let url;
  try { url = new URL(input); } catch { return null; }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
  if (!WISTIA_HOSTS.some(host => url.hostname === host || url.hostname.endsWith(`.${host}`))) return null;
  const match = url.pathname.match(/^\/(?:medias|embed\/(?:iframe|medias))\/([a-z0-9]{10})\/?$/i)
    || url.pathname.match(/^\/embed\/([a-z0-9]{10})\.js$/i);
  return match?.[1] || null;
}

export function wistiaUrls(value, settings = {}) {
  const id = wistiaMediaId(value);
  if (!id) return null;
  const embed = new URL(`https://fast.wistia.net/embed/iframe/${id}`);
  // Rebuild from the ID: never forward email, booking parameters or source URLs.
  embed.search = new URLSearchParams({
    web_component: 'true',
    seo: 'false',
    videoFoam: 'true',
    playerColor: /^[a-f0-9]{6}$/i.test(settings.playerColor || '') ? settings.playerColor : '1d6586',
    doNotTrack: String(settings.doNotTrack !== false),
    autoPlay: 'true',
  });
  return { id, embed: embed.href, external: `https://fast.wistia.net/embed/iframe/${id}?doNotTrack=${settings.doNotTrack !== false}` };
}

/** Build a Vimeo player from an ID or an official video URL. */
export function vimeoUrls(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const input = value.trim();
  let id;
  let hash;
  if (/^[1-9]\d*$/.test(input)) id = input;
  else {
    let url;
    try { url = new URL(input); } catch { return null; }
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const path = url.hostname === 'player.vimeo.com' ? /^\/video\/([1-9]\d*)\/?$/
      : ['vimeo.com', 'www.vimeo.com'].includes(url.hostname) ? /^\/([1-9]\d*)\/?$/ : null;
    id = path && url.pathname.match(path)?.[1];
    if (!id) return null;
    hash = url.searchParams.get('h');
    if (hash && !/^[a-z0-9]+$/i.test(hash)) return null;
  }
  // Rebuild the supplied embed options without forwarding booking or identity data.
  const embed = new URL(`https://player.vimeo.com/video/${id}`);
  embed.search = new URLSearchParams({
    title: '0', byline: '0', portrait: '0', badge: '0',
    autopause: '1', color: '1d6586', player_id: '0', app_id: '58479',
  });
  if (hash) embed.searchParams.set('h', hash);
  const external = embed.href;
  embed.searchParams.set('autoplay', '0');
  return { id, embed: embed.href, external };
}

/** Only the official iClosed host can receive the booking context. */
export function iClosedConfirmationUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  let url;
  try { url = new URL(value.trim()); } catch { return null; }
  if (url.protocol !== 'https:' || url.hostname !== 'app.iclosed.io' || url.port || url.username || url.password || url.pathname === '/') return null;
  url.hash = '';
  return url.href;
}

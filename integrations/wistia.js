import { wistiaUrls } from './urls.js';
import { preparePlayer } from './player.js';

export function prepareWistia(slot, item, settings) {
  return preparePlayer(slot, item, wistiaUrls(item?.src, settings), { className: 'wistia_embed' });
}

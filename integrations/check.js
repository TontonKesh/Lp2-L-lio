import { media } from '../media.config.js';
import { iClosed } from '../integrations.config.js';
import { wistiaMediaId, vimeoUrls, iClosedConfirmationUrl } from './urls.js';

let pending = 0;
let invalid = 0;
for (const [slot, item] of Object.entries(media)) {
  const provider = item?.type === 'vimeo' ? 'Vimeo' : 'Wistia';
  if (!item || item.src === '' || item.src == null) { pending++; console.log(`À renseigner · ${provider} / ${slot}`); continue; }
  if (typeof item.src !== 'string') { invalid++; console.log(`Invalide · Source / ${slot}`); continue; }
  if (!item.src.trim()) { pending++; console.log(`À renseigner · ${provider} / ${slot}`); continue; }
  if (item.type === 'vimeo') {
    if (!vimeoUrls(item.src)) { invalid++; console.log(`Invalide · Vimeo / ${slot}`); }
    else console.log(`Configuré · Vimeo / ${slot}`);
    continue;
  }
  if (item.type !== 'wistia') { console.log(`Autre lecteur · ${slot} (${item.type})`); continue; }
  if (!wistiaMediaId(item.src)) { invalid++; console.log(`Invalide · Wistia / ${slot}`); }
  else console.log(`Configuré · Wistia / ${slot}`);
}
if (iClosed.confirmationWidgetUrl == null || iClosed.confirmationWidgetUrl === '' || (typeof iClosed.confirmationWidgetUrl === 'string' && !iClosed.confirmationWidgetUrl.trim())) { pending++; console.log('À renseigner · URL du widget de confirmation iClosed'); }
else if (!iClosedConfirmationUrl(iClosed.confirmationWidgetUrl)) { invalid++; console.log('Invalide · URL du widget de confirmation iClosed'); }
else console.log('Configuré · Widget de confirmation iClosed (à tester après réservation)');
console.log(`\n${pending} champ(s) en attente · ${invalid} valeur(s) invalide(s).`);
console.log('La redirection vers le domaine public se règle dans iClosed. Aucun appel externe effectué par ce contrôle.');
if (invalid || (process.argv.includes('--require-complete') && pending)) process.exitCode = 1;

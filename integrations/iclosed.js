import { iClosedConfirmationUrl } from './urls.js';

export const ICLOSED_SCRIPT_URL = 'https://app.iclosed.io/assets/widget.js';
let widgetScript;

function loadWidget() {
  if (widgetScript) return widgetScript;
  widgetScript = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = ICLOSED_SCRIPT_URL;
    script.async = true;
    script.referrerPolicy = 'no-referrer';
    const timeout = setTimeout(() => fail(), 12000);
    function fail() {
      clearTimeout(timeout);
      script.remove();
      widgetScript = null;
      reject(new Error('iClosed widget unavailable'));
    }
    script.addEventListener('load', () => { clearTimeout(timeout); resolve(); }, { once: true });
    script.addEventListener('error', fail, { once: true });
    document.head.append(script);
  });
  return widgetScript;
}

/** The vendor renders booked-call details, using its own redirect parameters. */
export async function prepareIClosed(config) {
  const url = iClosedConfirmationUrl(config?.confirmationWidgetUrl);
  const section = document.querySelector('[data-iclosed-confirmation]');
  if (!url || !section) return;
  const mount = section.querySelector('[data-iclosed-mount]');
  const status = section.querySelector('[data-iclosed-status]');
  const retry = section.querySelector('[data-iclosed-retry]');
  const widget = document.createElement('div');
  widget.className = 'call-details-widget';
  widget.dataset.url = url;
  widget.title = 'Les détails de ton appel avec Lélio';
  mount.replaceChildren(widget);
  section.hidden = false;

  // Respect the vendor's "no booked call" state without leaving an empty section.
  const visibility = new MutationObserver(() => {
    if (widget.style.display === 'none') section.hidden = true;
  });
  visibility.observe(widget, { attributes: true, attributeFilter: ['style'] });

  // Confirm the frame source before handling vendor events; never infer a booking.
  window.addEventListener('message', event => {
    const frame = widget.querySelector('iframe');
    if (!frame || event.origin !== 'https://app.iclosed.io' || event.source !== frame.contentWindow) return;
    if (event.data === 'widget:hide') section.hidden = true;
    if (event.data?.type === 'iclosed.widget_height') {
      const height = Number.parseFloat(event.data.height);
      if (Number.isFinite(height) && height >= 120 && height <= 1800) widget.style.height = `${height}px`;
    }
  });

  const frames = new MutationObserver(() => {
    const frame = widget.querySelector('iframe');
    if (!frame) return;
    frames.disconnect();
    frame.referrerPolicy = 'no-referrer';
    frame.addEventListener('load', () => { status.hidden = true; }, { once: true });
  });
  frames.observe(widget, { childList: true });

  async function start() {
    retry.hidden = true;
    mount.hidden = false;
    status.hidden = false;
    status.textContent = 'Chargement des détails de ton appel…';
    try { await loadWidget(); }
    catch {
      mount.hidden = true;
      status.textContent = 'Le récapitulatif est momentanément indisponible. Les détails de ton appel restent dans ton e-mail de réservation.';
      retry.hidden = false;
    }
  }
  retry.addEventListener('click', start);
  await start();
}

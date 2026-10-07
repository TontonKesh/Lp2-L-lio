/**
 * Use type 'vimeo' or 'wistia' with a video ID or an official video URL in src.
 * Leave src empty (or the entry null) to keep the honest pending cover.
 * Vimeo players stay visible at rest; playback starts from their own controls.
 * Local MP4 ({ type: 'video', src: '/assets/…' }) and supported embeds also work.
 */
export const media = {
  'methode': { type: 'vimeo', src: 'https://player.vimeo.com/video/1233122486', title: 'Méthode Aufstieg' },
  'faq-1': { type: 'vimeo', src: 'https://player.vimeo.com/video/1233121796', title: 'Et si ça marche pas pour moi ?' },
  'faq-2': { type: 'vimeo', src: 'https://player.vimeo.com/video/1233121858', title: 'Quand les premiers résultats ?' },
  'faq-3': { type: 'vimeo', src: 'https://player.vimeo.com/video/1233121962', title: 'Si je suis pas sportif ?' },
  'faq-4': { type: 'vimeo', src: 'https://player.vimeo.com/video/1233122014', title: 'Si je mange déjà bien ?' },
  'faq-5': { type: 'vimeo', src: 'https://player.vimeo.com/video/1233122079', title: 'Pourquoi pas juste des connaissances ?' },
  'faq-6': { type: 'vimeo', src: 'https://player.vimeo.com/video/1233122132', title: 'Je dois tout manger cru ?' },
};

/**
 * Add only supplied, approved before/after photographs.
 * Each entry: { before: '/assets/…', after: '/assets/…', caption: '…' }.
 * An empty list keeps the entire transformations section hidden; it creates no sample results.
 */
export const transformations = [];

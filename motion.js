/** Small, one-time entrances; the browser handles continuous scroll decoration. */
export function initMotion() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 899px), (pointer: coarse)');
  const reveals = [...document.querySelectorAll('.reveal')];
  const pending = new Set();
  const running = new Set();
  const ease = getComputedStyle(document.documentElement).getPropertyValue('--motion-ease').trim();
  const stagger = new Map();
  let observer;

  document.querySelectorAll('.faq-grid, .method-outline').forEach(group => {
    [...group.children].forEach((element, index) => stagger.set(element, (index % 3) * 55));
  });

  function animate(element, keyframes, options) {
    if (reduced.matches || document.hidden || !element.animate) return;
    const animation = element.animate(keyframes, { easing: ease, ...options });
    running.add(animation);
    // The DOM is already at its final state. Release layers after every entrance.
    animation.onfinish = () => { running.delete(animation); animation.cancel(); };
    animation.oncancel = () => running.delete(animation);
  }

  function reveal(element, immediate = false) {
    if (!pending.delete(element)) return;
    observer?.unobserve(element);
    element.dataset.motionState = 'seen';
    if (immediate || reduced.matches || document.hidden) return;

    const small = compact.matches;
    animate(element, [
      { opacity: 0, transform: `translateY(${small ? 8 : 16}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ], {
      duration: small ? 380 : 560,
      delay: small ? 0 : (stagger.get(element) || 0),
      fill: 'backwards',
    });
  }

  function finishEntrances() {
    for (const animation of [...running]) animation.cancel();
  }

  function settle() {
    for (const element of [...pending]) reveal(element, true);
    observer?.disconnect();
    finishEntrances();
  }

  // Without support, reduced motion, or JS, all content simply stays visible.
  if (!reduced.matches && !document.hidden && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const passed = entry.boundingClientRect.bottom <= 0;
        if (entry.isIntersecting || passed) reveal(entry.target, passed);
      }
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0 });

    // Read first, then write. Deep links and restored positions start fully readable.
    const belowFold = reveals.filter(element => element.getClientRects().length && element.getBoundingClientRect().top >= innerHeight * .95);
    for (const element of belowFold) {
      pending.add(element);
      element.dataset.motionState = 'waiting';
      observer.observe(element);
    }
  }

  if (scrollY < 80 && (!location.hash || location.hash === '#top')) {
    const timings = {
      navigation: [0, 280, -4], eyebrow: [30, 420, 8], title: [70, 560, 16],
      'title-last': [120, 560, 16], copy: [170, 480, 10], action: [220, 440, 8],
      signature: [270, 420, 6],
    };
    document.querySelectorAll('[data-hero]').forEach(element => {
      const timing = timings[element.dataset.hero];
      if (!timing) return;
      const [delay, duration, distance] = timing;
      animate(element, [
        { opacity: 0, transform: `translateY(${compact.matches ? distance * .5 : distance}px)` },
        { opacity: 1, transform: 'translateY(0)' },
      ], {
        delay: compact.matches ? delay * .5 : delay,
        duration: compact.matches ? Math.min(duration, 380) : duration,
        fill: 'backwards',
      });
    });
  }

  // Keyboard access never waits for a decorative entrance.
  document.addEventListener('focusin', event => {
    const target = event.target;
    for (const element of [...pending]) {
      if (element.contains(target)) reveal(element, true);
    }
    for (const animation of [...running]) {
      if (animation.effect?.target?.contains(target)) animation.cancel();
    }
  });
  reduced.addEventListener('change', () => { if (reduced.matches) settle(); });
  compact.addEventListener('change', finishEntrances);
  document.addEventListener('visibilitychange', () => { if (document.hidden) finishEntrances(); });
  // A back/forward-cache restore must never bring back invisible content.
  addEventListener('pagehide', settle);
}

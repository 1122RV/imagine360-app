import { showToast } from 'site.js';

export function contactUsReady() {
  $w.onReady(() => {
    const form = $w('#contactForm');
    if (!form) return;
    form.onSubmit(() => {
      showToast('Dispatch inquiry transmitted. An Operations Director will reach out within 2 hours.');
    });
  });
}
import { initNav } from './nav.js';
import { initVideoSync } from './video-sync.js';
import { initContactForm } from './contact-form.js';
import { initAccordion } from './accordion.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initVideoSync();
  initContactForm();
  initAccordion();
});

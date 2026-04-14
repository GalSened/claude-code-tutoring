export function initContactForm() {
  const toggleBtn = document.getElementById('cta-form-toggle');
  const scrollBtn = document.getElementById('cta-scroll-to-form');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!toggleBtn || !form) return;

  const openForm = () => {
    form.style.display = 'flex';
    form.querySelector('input')?.focus({ preventScroll: true });
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  toggleBtn.addEventListener('click', () => {
    const isVisible = form.style.display !== 'none';
    form.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) form.querySelector('input')?.focus();
  });

  scrollBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openForm();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.cta__submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Web3Forms expects multipart FormData posted to its action URL.
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        status.textContent = '✓ Message sent. I\'ll reply within 24 hours.';
        status.style.color = 'var(--color-emerald)';
        form.reset();
      } else {
        throw new Error(json.message || 'Send failed');
      }
    } catch (err) {
      status.textContent = 'Couldn\'t send right now. Please email gal directly.';
      status.style.color = 'var(--color-red)';
    } finally {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });
}

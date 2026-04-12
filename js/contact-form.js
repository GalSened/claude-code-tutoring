export function initContactForm() {
  const toggleBtn = document.getElementById('cta-form-toggle');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!toggleBtn || !form) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = form.style.display !== 'none';
    form.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) form.querySelector('input')?.focus();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.cta__submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        status.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
        status.style.color = 'var(--color-emerald)';
        form.reset();
      } else {
        throw new Error('Send failed');
      }
    } catch {
      status.textContent = 'Something went wrong. Try WhatsApp instead?';
      status.style.color = 'var(--color-red)';
    } finally {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });
}

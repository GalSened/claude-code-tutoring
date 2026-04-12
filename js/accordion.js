export function initAccordion() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  list.addEventListener('click', (e) => {
    const question = e.target.closest('.faq__question');
    if (!question) return;

    const item = question.parentElement;
    const wasOpen = item.classList.contains('faq__item--open');

    // Close all
    list.querySelectorAll('.faq__item--open').forEach(el => {
      el.classList.remove('faq__item--open');
    });

    // Toggle clicked
    if (!wasOpen) item.classList.add('faq__item--open');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const emailLink = document.querySelector('.email-link');

  emailLink.addEventListener('mouseenter', () => {
    emailLink.querySelector('.underline').style.background = '#131313';
  });

  emailLink.addEventListener('mouseleave', () => {
    emailLink.querySelector('.underline').style.background = '#cccccc';
  });

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
});

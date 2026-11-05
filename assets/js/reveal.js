(() => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionPreference.matches || !('IntersectionObserver' in window)) return;

  const sections = [...document.querySelectorAll('main > section')];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) reveal(target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -120px 0px' });

  function reveal(section) {
    section.classList.remove('reveal-pending');
    observer.unobserve(section);
  }

  const initialVisibility = sections.map((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  });
  sections.forEach((section) => {
    section.classList.add('section-reveal', 'reveal-pending');
  });

  // Paint the hidden starting pose before starting any entrance transition.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (motionPreference.matches) return;
    let staggerIndex = 0;
    sections.forEach((section, index) => {
      if (!section.classList.contains('reveal-pending')) return;
      if (initialVisibility[index]) {
        setTimeout(() => reveal(section), 200 + staggerIndex++ * 300);
      } else {
        observer.observe(section);
      }
    });
  }));

  // Keyboard navigation must never leave focused content invisible.
  document.addEventListener('focusin', (event) => {
    const section = event.target.closest('main > section.reveal-pending');
    if (section) reveal(section);
  });

  motionPreference.addEventListener('change', (event) => {
    if (!event.matches) return;
    sections.forEach(reveal);
    observer.disconnect();
  });
})();

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '76px';
    navLinks.style.right = '16px';
    navLinks.style.padding = '1rem';
    navLinks.style.background = 'rgba(8, 19, 35, 0.96)';
    navLinks.style.border = '1px solid rgba(132, 181, 255, 0.2)';
    navLinks.style.borderRadius = '16px';
    navLinks.style.gap = '0.8rem';
  });
}

const animatedValues = document.querySelectorAll('[data-count]');

const animateCounter = (element) => {
  const target = Number(element.dataset.count);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.floor(progress * target);
    element.textContent = `${current}${target === 100 ? '%' : ''}`;
    if (progress < 1) requestAnimationFrame(tick);
    else element.textContent = `${target}${target === 100 ? '%' : ''}`;
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

animatedValues.forEach((value) => observer.observe(value));

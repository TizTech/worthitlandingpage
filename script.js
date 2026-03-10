const reveals = document.querySelectorAll('.reveal');
const floatingPhone = document.querySelector('[data-float]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((el) => observer.observe(el));

  if (floatingPhone) {
    window.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * -8;
      floatingPhone.style.transform = `translateY(-2px) rotateY(${x}deg) rotateX(${y}deg)`;
    });

    window.addEventListener('pointerleave', () => {
      floatingPhone.style.transform = '';
    });
  }
} else {
  reveals.forEach((el) => el.classList.add('show'));
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

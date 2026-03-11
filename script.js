const reveals = document.querySelectorAll('.reveal');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const floatingDevice = document.querySelector('[data-float]');
const themeToggle = document.getElementById('theme-toggle');
const heroScreenImage = document.getElementById('hero-screen-image');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const storedTheme = localStorage.getItem('worthit-theme');

function updateHeroScreen(theme) {
  if (!heroScreenImage) return;
  const lightSrc = heroScreenImage.dataset.lightSrc;
  const darkSrc = heroScreenImage.dataset.darkSrc;
  if (!lightSrc || !darkSrc) return;
  heroScreenImage.src = theme === 'dark' ? darkSrc : lightSrc;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateHeroScreen(theme);
  if (themeToggle) {
    const isDark = theme === 'dark';
    themeToggle.textContent = isDark ? 'Light' : 'Dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

const initialTheme = storedTheme || 'light';
applyTheme(initialTheme);

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

  if (floatingDevice) {
    window.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 8;
      const y = (event.clientY / window.innerHeight - 0.5) * -7;
      floatingDevice.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });
  }
} else {
  reveals.forEach((el) => el.classList.add('show'));
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.hidden = expanded;
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('worthit-theme', next);
    applyTheme(next);
  });
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

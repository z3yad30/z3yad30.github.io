// ===== CLEAN CREATOR PORTFOLIO =====

(function() {
  // --- THEME TOGGLE ---
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeBtn?.querySelector('i');

  function applyTheme(isLight) {
    if (isLight) {
      body.classList.add('light-mode');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    } else {
      body.classList.remove('light-mode');
      if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    }
  }

  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  let isLight = saved ? saved === 'light' : prefersLight;
  applyTheme(isLight);

  themeBtn?.addEventListener('click', () => {
    isLight = !isLight;
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // --- SCROLL REVEAL ---
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // --- FOOTER YEAR ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- EXTERNAL LINKS ---
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
})();

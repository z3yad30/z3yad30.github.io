// ===== SOFT & PLAYFUL PORTFOLIO =====

(function() {
  // --- THEME TOGGLE ---
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeBtn?.querySelector('i');

  function applyTheme(isDark) {
    if (isDark) {
      body.classList.add('dark-mode');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    } else {
      body.classList.remove('dark-mode');
      if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    }
  }

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDark = saved ? saved === 'dark' : prefersDark;
  applyTheme(isDark);

  themeBtn?.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // --- TYPEWRITER EFFECT ---
  const taglineEl = document.getElementById('typewriter');
  const phrases = [
    'Data Science Student 📊',
    'ML Engineer 🤖',
    'RAG & LLM Developer 🧠',
    'Turning data into magic ✨'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    if (!taglineEl) return;
    const current = phrases[phraseIndex];

    if (isDeleting) {
      taglineEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      taglineEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 800);

  // --- SCROLL REVEAL ---
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

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

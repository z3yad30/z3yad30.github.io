// ===== GEN Z PORTFOLIO INTERACTIONS =====

(function() {
  // --- THEME TOGGLE ---
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeBtn?.querySelector('i');

  function applyTheme(isLight) {
    if (isLight) {
      body.classList.add('light-mode');
      if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    } else {
      body.classList.remove('light-mode');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    }
  }

  // Check saved or system preference
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  let isLight = saved ? saved === 'light' : prefersLight;
  applyTheme(isLight);

  themeBtn?.addEventListener('click', () => {
    isLight = !isLight;
    applyTheme(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // --- TYPEWRITER EFFECT ---
  const taglineEl = document.getElementById('typewriter');
  const phrases = [
    'Data Science Student ⚡',
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
      typeSpeed = 1500; // pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // pause before new phrase
    }

    setTimeout(type, typeSpeed);
  }

  // Start typewriter after a short delay
  setTimeout(type, 800);

  // --- SCROLL REVEAL ---
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // only animate once
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

  // --- SMOOTH PARALLAX ON HERO GLOW ---
  const heroGlow = document.querySelector('.hero-glow');
  if (heroGlow && !window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }
})();

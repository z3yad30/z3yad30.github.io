// script.js
(function() {
  // THEME TOGGLE with neon vibes
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeBtn?.querySelector('i');
  function applyTheme(isLight) {
    if (isLight) {
      body.classList.add('light-mode');
      if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    } else {
      body.classList.remove('light-mode');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
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

  // TYPEWRITER - fresh lines for Gen Z energy
  const typeEl = document.getElementById('typewriter');
  const lines = ["⚡ AI Engineer | GenZ Creator", "🤖 LLMs, RAG & FastAPI", "✨ building the future one model at a time", "🧠 Data Science student turned maker"];
  let lineIdx = 0, charIdx = 0, isDeleting = false;
  function typeEffect() {
    if (!typeEl) return;
    const currentLine = lines[lineIdx];
    if (isDeleting) {
      typeEl.textContent = currentLine.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typeEl.textContent = currentLine.substring(0, charIdx + 1);
      charIdx++;
    }
    if (!isDeleting && charIdx === currentLine.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
    if (isDeleting && charIdx === 0) {
      isDeleting = false;
      lineIdx = (lineIdx + 1) % lines.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, isDeleting ? 45 : 75);
  }
  setTimeout(typeEffect, 500);

  // SCROLL REVEAL with smooth intersection
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
  revealElements.forEach(el => observer.observe(el));

  // FOOTER YEAR
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // EXTERNAL LINKS - security & new tab
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // Optional: subtle parallax effect on hero image? just for fun
  const heroImg = document.querySelector('.hero-image img');
  if (heroImg && !window.matchMedia('(pointer: coarse)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroImg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
})();
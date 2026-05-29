// ===== ZEYAD REFAEY — BRUTALIST RAW =====

(function () {

  // --- SCROLL REVEAL ---
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children inside sections
          entry.target.style.transitionDelay = `${i * 0.04}s`;
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));

  // --- FOOTER YEAR ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- EXTERNAL LINKS ---
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (!link.getAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

  // --- CURSOR TRAIL (subtle, brutalist dots) ---
  const trail = [];
  const TRAIL_LEN = 6;

  for (let i = 0; i < TRAIL_LEN; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${6 - i}px;
      height: ${6 - i}px;
      background: #000;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -50%);
      opacity: ${(TRAIL_LEN - i) / TRAIL_LEN * 0.5};
      transition: left 0.05s linear, top 0.05s linear;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    trail[0].x = mx;
    trail[0].y = my;
    trail[0].el.style.left = mx + 'px';
    trail[0].el.style.top = my + 'px';
  });

  function animTrail() {
    for (let i = 1; i < TRAIL_LEN; i++) {
      trail[i].x += (trail[i - 1].x - trail[i].x) * 0.35;
      trail[i].y += (trail[i - 1].y - trail[i].y) * 0.35;
      trail[i].el.style.left = trail[i].x + 'px';
      trail[i].el.style.top = trail[i].y + 'px';
    }
    requestAnimationFrame(animTrail);
  }
  animTrail();

  // --- HOVER INVERT ON PROJECT CARDS ---
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.querySelector('.project-num').style.background = '#fff';
      card.querySelector('.project-num').style.color = '#000';
      card.querySelector('.project-num').style.border = '0px';
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('.project-num').style.background = '#000';
      card.querySelector('.project-num').style.color = '#fff';
    });
  });

  // --- TICKER PAUSE ON HOVER ---
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    ticker.parentElement.addEventListener('mouseenter', () => {
      ticker.style.animationPlayState = 'paused';
    });
    ticker.parentElement.addEventListener('mouseleave', () => {
      ticker.style.animationPlayState = 'running';
    });
  }

  // --- SCRAMBLE TEXT ON NAV LOGO HOVER ---
  const logo = document.querySelector('.nav-logo');
  const original = 'ZR';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
  let scrambleInterval = null;

  if (logo) {
    logo.addEventListener('mouseenter', () => {
      let iter = 0;
      clearInterval(scrambleInterval);
      scrambleInterval = setInterval(() => {
        logo.innerHTML = original
          .split('')
          .map((char, idx) => {
            if (char === '_') return '<span class="blink">_</span>';
            if (idx < iter) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('') + '<span class="blink">_</span>';

        if (iter >= original.length) {
          clearInterval(scrambleInterval);
          logo.innerHTML = 'ZR<span class="blink">_</span>';
        }
        iter += 0.5;
      }, 40);
    });
  }

})();
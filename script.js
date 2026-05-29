// zeyados_engine.js
(function() {
  "use strict";

  // CLOCK LOGIC PROTOCOL
  function runSystemClock() {
    const clockEl = document.getElementById('system-clock');
    if (!clockEl) return;
    
    setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12; // true 12 base
      const formattedHours = String(hours).padStart(2, '0');
      
      clockEl.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    }, 1000);
  }
  runSystemClock();

  // OVERDRIVE THEME CORE (Toggles Matrix Green vs High Contrast Alert Amber)
  const matrixToggle = document.getElementById('matrix-toggle');
  let overdriveActive = false;

  matrixToggle?.addEventListener('click', () => {
    overdriveActive = !overdriveActive;
    const root = document.documentElement;
    
    if (overdriveActive) {
      root.style.setProperty('--neon-green', '#ffb000'); // shift system nodes to Amber
      root.style.setProperty('--cyber-blue', '#ff00ff'); // shift accents to Magenta
      matrixToggle.style.background = '#ffb000';
      matrixToggle.style.color = '#000';
    } else {
      root.style.setProperty('--neon-green', '#39ff14'); // fallback to code green
      root.style.setProperty('--cyber-blue', '#00ffff');
      matrixToggle.style.background = '';
      matrixToggle.style.color = '';
    }
  });

  // HACKER TERMINAL OUTPUT SIMULATOR
  const consoleEl = document.getElementById('typewriter-console');
  const binaryLogs = [
    ">> Initializing deep core neural classification vectors...",
    ">> Synchronized with ChromaDB vector cache memory arrays.",
    ">> Deploying automated production APIs through FastAPI loop.",
    ">> Status: All micro-clusters operational. No errors found."
  ];
  
  let logIdx = 0, charIdx = 0, isDeleting = false;
  
  function processConsoleOutput() {
    if (!consoleEl) return;
    const currentLog = binaryLogs[logIdx];
    
    if (isDeleting) {
      consoleEl.textContent = currentLog.substring(0, charIdx - 1);
      charIdx--;
    } else {
      consoleEl.textContent = currentLog.substring(0, charIdx + 1);
      charIdx++;
    }
    
    if (!isDeleting && charIdx === currentLog.length) {
      isDeleting = true;
      setTimeout(processConsoleOutput, 2500); // Hold statement
      return;
    }
    
    if (isDeleting && charIdx === 0) {
      isDeleting = false;
      logIdx = (logIdx + 1) % binaryLogs.length;
      setTimeout(processConsoleOutput, 300); // Break period
      return;
    }
    
    setTimeout(processConsoleOutput, isDeleting ? 20 : 50);
  }
  setTimeout(processConsoleOutput, 600);

  // CLOSE MODULE SIMULATION HELPERS
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetWindow = e.target.closest('.win95-card');
      if (targetWindow) {
        targetWindow.style.transition = 'transform 0.2s ease, opacity 0.2s';
        targetWindow.style.transform = 'scale(0.9)';
        targetWindow.style.opacity = '0';
        setTimeout(() => targetWindow.remove(), 200);
      }
    });
  });

  // DYNAMIC COMPILATION TIMESTAMP 
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

})();
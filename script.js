// script.js

// TYPEWRITER EFFECT

const bootText = document.querySelector(".boot-text");

const texts = [
  "> INITIALIZING ZEYAD SYSTEM...",
  "> LOADING AI MODULES...",
  "> CONNECTING TO THE MATRIX...",
  "> DEPLOYING COOLNESS..."
];

let index = 0;

setInterval(() => {
  index = (index + 1) % texts.length;
  bootText.textContent = texts[index];
}, 2500);


// RANDOM GLITCH EFFECT

const hero = document.querySelector("h1");

setInterval(() => {

  hero.style.transform = `
    translate(${Math.random() * 4 - 2}px,
    ${Math.random() * 4 - 2}px)
  `;

  setTimeout(() => {
    hero.style.transform = "translate(0)";
  }, 120);

}, 4000);


// SMOOTH REVEAL

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }

  });

});

document.querySelectorAll(".project-card, .window").forEach(el => {

  el.style.opacity = 0;
  el.style.transform = "translateY(40px)";
  el.style.transition = "all .7s ease";

  observer.observe(el);

});


// CURSOR TRAIL

const trail = document.createElement("div");
trail.classList.add("cursor-trail");

document.body.appendChild(trail);

document.addEventListener("mousemove", e => {

  trail.style.left = e.clientX + "px";
  trail.style.top = e.clientY + "px";

});


// EXTRA STYLE FROM JS

const style = document.createElement("style");

style.innerHTML = `
.cursor-trail{
  position:fixed;
  width:14px;
  height:14px;
  border:2px solid #00ff88;
  border-radius:50%;
  pointer-events:none;
  transform:translate(-50%,-50%);
  z-index:9999;
  box-shadow:0 0 14px #00ff88;
}
`;

document.head.appendChild(style);
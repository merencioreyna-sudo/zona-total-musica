const hero = document.querySelector('.hero-music');
// const sidebar2 = document.querySelector('.sidebar2');

const notes = ['♪','♫','♬','♩','♭','♯'];
const total = 80; // MÁS NOTAS, como pediste

for(let i = 0; i < total; i++){
  const note = document.createElement('span');
  note.textContent = notes[Math.floor(Math.random() * notes.length)];

  // posición inicial REAL (no centro)
  let x = Math.random() * hero.offsetWidth;
  let y = Math.random() * hero.offsetHeight;

  note.style.position = 'absolute';
  note.style.left = x + 'px';
  note.style.top = y + 'px';
  note.style.fontSize = (26 + Math.random() * 32) + 'px';
  note.style.opacity = 0.85 + Math.random() * 0.15;
  note.style.color = 'white';
  note.style.pointerEvents = 'none';
  note.style.userSelect = 'none';
  note.style.zIndex = '5'; // 🔒 SIEMPRE POR DELANTE

  hero.appendChild(note);
  // sidebar2.appendChild(note);

  float(note, x, y);
}

function float(el, startX, startY){
  let currentX = startX;
  let currentY = startY;

  const move = () => {
    const nextX = currentX + (Math.random() * 140 - 70);
    const nextY = currentY + (Math.random() * 140 - 70);

    el.animate(
      [
        { transform: `translate(${currentX - startX}px, ${currentY - startY}px)` },
        { transform: `translate(${nextX - startX}px, ${nextY - startY}px)` }
      ],
      {
        duration: 3500 + Math.random() * 3500, // SUAVE
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    ).onfinish = () => {
      currentX = nextX;
      currentY = nextY;
      move();
    };
  };

  move();
}

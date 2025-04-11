const canvas = document.getElementById("canvasEstrelas");
const ctx = canvas.getContext("2d");

function ajustarTamanhoCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

ajustarTamanhoCanvas();
window.addEventListener("resize", ajustarTamanhoCanvas);

const estrelas = [];

for (let i = 0; i < 300; i++) {
  estrelas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    raio: Math.random() * 1.5 + 0.5,
    brilho: Math.random(),
    apagando: Math.random() > 0.5,
    cintilacao: 0.01 + Math.random() * 0.02
  });
}

function desenharEstrelas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let estrela of estrelas) {
    ctx.beginPath();
    ctx.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${estrela.brilho})`;
    ctx.fill();

    if (estrela.apagando) {
      estrela.brilho -= estrela.cintilacao;
      if (estrela.brilho <= 0.1) estrela.apagando = false;
    } else {
      estrela.brilho += estrela.cintilacao;
      if (estrela.brilho >= 1) estrela.apagando = true;
    }
  }

  requestAnimationFrame(desenharEstrelas);
}

desenharEstrelas();
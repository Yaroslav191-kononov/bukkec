let canvas = document.getElementById("canvas");
if (canvas.getContext) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 800, 800);
  ctx.fillStyle = window.getComputedStyle(document.querySelector('body')).getPropertyValue('background-color');
  ctx.strokeStyle = window.getComputedStyle(document.querySelector('body')).getPropertyValue('color');
  ctx.font = 'bold 75px Dela Gothic One serif';
  if ((window.matchMedia("(max-width: 1240px)").matches)) {
    ctx.fillRect((800.4-650)/2, 80, 650, 650);
    ctx.strokeText("Сотри меня", 190, 670);
  }
  else {
    ctx.fillRect(120, 80, 650, 650);
    ctx.strokeText("Сотри меня", 240, 670);
  }
  const img = new Image();
  img.src = "https://bukkec-production-49f4.up.railway.app/images/image1.png";
  img.onload = function () {
    const pattern = ctx.createPattern(img, "no-repeat");
    ctx.fillStyle = pattern;
    if ((window.matchMedia("(max-width: 1240px)").matches)) {
      ctx.translate(140, 100);
    }
    else {
      ctx.translate(190, 100);
    }
    ctx.fillRect(0, 0, 650, 650);
  };
  if (!window.innerWidth < 820) {
    canvas.addEventListener('mousemove', (event) => ctx.clearRect(event.offsetX - 160, event.offsetY - 160, 80, 80));
  }
  canvas.onclick = function () {
    let y = -30;
    let DisappearCanvas = setInterval(() => {
      ctx.clearRect(-100, y += 2, 800, 20);
      y >= 800 ? (clearInterval(DisappearCanvas), canvas.style.zIndex = -3) : null;
    }, 1)
  }
}
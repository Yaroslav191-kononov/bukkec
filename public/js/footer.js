let canvasFooter = document.querySelector('footer canvas');
let divs = document.querySelectorAll('footer article div');
let opacityArticle = 0;
const footer = document.querySelector('footer');
setInterval(()=>{
  const bucket = document.createElement('div');
  bucket.classList.add('bucketFall');
  bucket.style.left = Math.random() * 95 + '%';
  footer.appendChild(bucket);
  bucket.addEventListener('animationend', () => {
    const rect = bucket.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const numberOfParticles = Math.floor(Math.random() * 20) + 10;
    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = x + 'px';
      particle.style.marginTop = 40+'px';
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 50 + 20;
      particle.style.setProperty('--x',Math.cos(angle) * distance + 'px');
      particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
      footer.appendChild(particle);
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
    bucket.remove();
  });
}, 500);
function AppearContent() {
    divs.forEach((elem) => elem.style.opacity = 1);
}
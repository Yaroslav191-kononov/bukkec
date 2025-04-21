let canvasFooter = document.querySelector('footer canvas');
let divs = document.querySelectorAll('footer article div');
let opacityArticle = 0;
let footer = document.querySelector('footer');
setInterval(()=>{
  if(!window.matchMedia("(max-width: 1014px)").matches){
    let bucket = document.createElement('div');
    bucket.classList.add('bucketFall');
    bucket.style.left = Math.random() * 95 + '%';
    footer.appendChild(bucket);
    bucket.addEventListener('animationend', () => {
      let rect = bucket.getBoundingClientRect();
      let x = rect.left + rect.width / 2;
      let numberOfParticles = Math.floor(Math.random() * 20) + 10;
      for (let i = 0; i < numberOfParticles; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = x + 'px';
        particle.style.marginTop = 40+'px';
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 50 + 20;
        particle.style.setProperty('--x',Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        footer.appendChild(particle);
        particle.addEventListener('animationend', () => {
          particle.remove();
        });
      }
      bucket.remove();
    });
  }
  else{
    document.querySelectorAll(".particle").forEach((elem)=>elem.remove());
    document.querySelectorAll(".bucketFall").forEach((elem)=>elem.remove());
  }
}, 500);
function AppearContent() {
    divs.forEach((elem) => elem.style.opacity = 1);
}
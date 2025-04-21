const containerBucket = document.getElementById('container');
const bucket = document.getElementById('bucket');
const addSandButton = document.getElementById('addSand');
const addStonesButton = document.getElementById('addStones');
const addWaterButton = document.getElementById('addWater');
const resetButton = document.getElementById('reset');
const particleColors = {
  sand: ['#C2B280', '#B8A370', '#A99263', '#C6B385', '#BAA26F'],
  stone: ['#778899', '#708090', '#696969', '#808080', '#A9A9A9'],
  water: ['#4682B4', '#6495ED', '#70a1ef', '#ADD8E6', '#B0E2FF']
};
const particleSizes = {
  sand: { min: 16, max: 24 },
  stone: { min: 28, max: 35 },
  water: { min: 10, max: 15 }
};
const particleDensities = {
  sand: 0.8,
  stone: 1.0,
  water: 0.6
};
let particles = [];
const bucketHeight = parseInt(getComputedStyle(bucket).height);
function addParticles(type, cost) {
  if(parseInt(getComputedStyle(bucket).height)>0){
    const bucketRect = bucket.getBoundingClientRect();
    const size = getRandomFloat(particleSizes[type].min, particleSizes[type].max);
    for (let i = 0; i < cost; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particleFirst');
      particle.style.backgroundColor = particleColors[type][Math.floor(Math.random() * particleColors[type].length)];
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      let x = getRandomFloat(bucketRect.left + size, bucketRect.right - size);
      let startY = bucketRect.top;
      let endY = bucketRect.bottom - size;
      particle.style.left = x - containerBucket.getBoundingClientRect().left + 'px';
      particle.style.top = startY - containerBucket.getBoundingClientRect().top + 'px';
      particle.style.zIndex = 1;
      particle.style.opacity = 0;
      containerBucket.appendChild(particle);
      const newParticle = {
        element: particle,
        x: x - containerBucket.getBoundingClientRect().left,
        y: startY - containerBucket.getBoundingClientRect().top,
        size: size,
        type: type
      };
      if (newParticle.element) {
        particles.push(newParticle);
        const TimeFALL = 1.5 * particleDensities[type];
        newParticle.element.style.transition = `top ${TimeFALL}s ease-in-out, opacity ${TimeFALL / 2}s ease-in`;
        setTimeout(() => {
          if (newParticle.element) {
            newParticle.element.style.top = endY - containerBucket.getBoundingClientRect().top + 'px';
            newParticle.element.style.opacity = 0.8;
          }
        }, 10);
        setTimeout(() => {
          if (newParticle.element) {
            newParticle.element.style.transition = 'none';
          }
        }, TimeFALL * 1000);
      }
    }
    bucket.style.height=bucket.offsetHeight-size>0?bucket.offsetHeight-size + "px":"0px"; 
    bucket.style.bottom=parseInt(getComputedStyle(bucket).bottom)+size-1 + "px";
  }
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
addSandButton.addEventListener('click', () => addParticles('sand', 100));
addStonesButton.addEventListener('click', () => addParticles('stone', 50));
addWaterButton.addEventListener('click', () => addParticles('water', 150));
resetButton.addEventListener('click', () => {;
  bucket.style.height="400px";
  bucket.style.bottom="0px";
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    if (particle && particle.element) {
      particle.element.remove();
    }
    particles.splice(i, 1);
  }
});
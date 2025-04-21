let Random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
document.querySelectorAll('header div a').forEach(elem => {
    elem.addEventListener('mouseenter', OnMoveHeader.bind(elem));
    elem.addEventListener('mouseleave', OnMoveHeader.bind(elem));
});
function OnMoveHeader() {
    this.classList.toggle('hoverHeader');
}
let container = document.getElementById('bubbles');
let bubbleCount = 80;
let groupSize = 10;
let bubler;
function createBubbleGroup() {
    if(!window.matchMedia("(max-width: 1014px)").matches){
        for (let i = 0; i < groupSize; i++) {
            let bubble = document.createElement('div');
            bubble.className = 'bubble';
            let size = Math.random() * 25 + 15;
            let left = Math.random() * 100;
            let duration = Math.random() * 5 + 5;
            let xMovement = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 40 + 20) + 'px';
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.setProperty('--x-movement', xMovement);
            container.appendChild(bubble);
            bubble.addEventListener('animationend', ()=>bubble.remove());
        }
        bubler=setTimeout(createBubbleGroup, 8000 / (bubbleCount / groupSize));
    }
}
createBubbleGroup();
window.addEventListener("resize",()=>{
    clearTimeout(bubler);
    bubler=setTimeout(createBubbleGroup, 8000 / (bubbleCount / groupSize));
    document.querySelectorAll(".bubble").forEach((elem)=>elem.remove());
});
async function getQrCode() {
    let qr = await fetch("https://bukkec-production-49f4.up.railway.app/code");
    qr = await qr.text();
    let img = document.createElement("img");
    img.style.height = "70px";
    img.style.width = "70px";
    img.setAttribute("src", qr);
    let img2 = document.createElement("img");
    img2.style.height = "40px";
    img2.style.width = "40px";
    img2.setAttribute("src", qr);
    document.querySelector("header div:nth-of-type(1) div").append(img);
    document.querySelector("header div:nth-of-type(2) div").append(img2);
}
getQrCode();
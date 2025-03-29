let Random=(min, max)=> Math.floor(Math.random() * (max - min + 1)) + min;
document.querySelectorAll('header div a').forEach(elem=>{
    elem.addEventListener('mouseenter',OnMoveHeader.bind(elem));
    elem.addEventListener('mouseleave',OnMoveHeader.bind(elem));
});
function OnMoveHeader(){
    this.classList.toggle('hoverHeader');
}

async function getQrCode(){
    let qr=await fetch("https://kurs-mjqz.onrender.com/code");
    qr=await qr.text();
    let img =document.createElement("img");
    img.style.height="70px";
    img.style.width="70px";
    img.setAttribute("src",qr);
    let img2 =document.createElement("img");
    img2.style.height="40px";
    img2.style.width="40px";
    img2.setAttribute("src",qr);
    document.querySelector("header div:nth-of-type(1)").append(img);
    document.querySelector("header div:nth-of-type(2)").append(img2);
}
getQrCode();
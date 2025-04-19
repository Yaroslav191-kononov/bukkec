buttons.forEach((elem)=>{
    let deg=0;
    let interval=setInterval(()=>{
        elem.style.borderImage=`linear-gradient(${deg}deg, rgb(23, 23, 23) 80%, rgb(64, 64, 64) 20%) 1 / 1 / 0 stretch`;
        deg++ == 360?deg=0:null;
    },10)
    elem.addEventListener('mouseenter',function(){
        clearInterval(interval);
        elem.style.backgroundColor="#e5e7eb";
        elem.style.color="rgb(23, 23, 23)";
        interval=setInterval(()=>{
            elem.style.borderImage=`linear-gradient(${deg}deg, rgb(23, 23, 23) 80%, #e5e7eb 20%) 1 / 1 / 0 stretch`;
            deg++ == 360?deg=0:null;
        },10)
    });
    elem.addEventListener('mouseleave',function(){
        clearInterval(interval);
        elem.style.backgroundColor="rgb(64, 64, 64)";
        elem.style.color="#e5e7eb";
        interval=setInterval(()=>{
            elem.style.borderImage=`linear-gradient(${deg}deg, rgb(23, 23, 23) 80%, rgb(64, 64, 64) 20%) 1 / 1 / 0 stretch`;
            deg++ == 360?deg=0:null;
        },10)
    });
    elem.addEventListener('click', (event)=>{
        event.preventDefault();
        const numberOfBuckets = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < numberOfBuckets; i++) {
            const bucket = document.createElement('div');
            bucket.classList.add('bucket');
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 200 + 50;
            const xOffset = Math.cos(angle) * distance;
            const yOffset = Math.sin(angle) * distance;
            const rotation = (angle * 180 / Math.PI) + (Math.random() * 20 - 10);
            bucket.style.setProperty('--x', xOffset + 'px');
            bucket.style.setProperty('--y', yOffset + 'px');
            bucket.style.setProperty('--rotation', rotation + 'deg');
            elem.appendChild(bucket);
            bucket.addEventListener('animationend', () => {
                bucket.remove();
            });
        }
    });
});
let checkFoter=true;
let checkComment=true;
window.onscroll = function() {
	if(document.documentElement.scrollTop>=3800 && checkFoter){
        AppearContent();
        checkFoter=false;
    }
    else if(document.documentElement.scrollTop>3000 && checkComment){
        addButtonComment();
        checkComment=false;
    }
}
let mainElem=document.querySelector("#main");
let mainAnimation=[
    {
        margin:"0 -20% 0 0",
        img:"http://localhost:3000/images/загруженное55.png",
        shadow:"drop-shadow(-8px 8px 10px rgb(225, 233, 234))"
    },
    {
        margin:"0 0 0 -50%",
        img:"http://localhost:3000/images/загруженное33.png",
        shadow:"drop-shadow(8px -8px 10px rgb(225, 233, 234))"
    },
    {
        margin:"0 -20% 0 0",
        img:"http://localhost:3000/images/загруженное22.png",
        shadow:"drop-shadow(-8px 8px 10px rgb(225, 233, 234))"
    },
    {
        margin:"0 0 0 -50%",
        img:"http://localhost:3000/images/загруженное11.png",
        shadow:"drop-shadow(8px -8px 10px rgb(225, 233, 234))"
    }
];
if(window.matchMedia("(max-width: 768px)").matches){
    mainAnimation=[
        {
            margin:"0 -50% 0 0",
            img:"http://localhost:3000/images/загруженное55.png",
        shadow:"drop-shadow(-8px 8px 10px rgb(225, 233, 234))"
        },
        {
            margin:"0 0 0 -30%",
            img:"http://localhost:3000/images/загруженное33.png",
        shadow:"drop-shadow(8px -8px 10px rgb(225, 233, 234))"
        },
        {
            margin:"0 -50% 0 0",
            img:"http://localhost:3000/images/загруженное22.png",
        shadow:"drop-shadow(-8px 8px 10px rgb(225, 233, 234))"
        },
        {
            margin:"0 0 0 -30%",
            img:"http://localhost:3000/images/загруженное11.png",
        shadow:"drop-shadow(8px -8px 10px rgb(225, 233, 234))"
        }
    ];
};
let step=0;
setInterval(function() {
    mainElem.style.margin=mainAnimation[step].margin;
    mainElem.style.backgroundImage=`url(${mainAnimation[step].img})`;
    mainElem.style.filter=mainAnimation[step].shadow;
    step<mainAnimation.length-1?step++:step=0;
},1200);
document.querySelector("#front").addEventListener("click",(e)=>{
    e.stopPropagation();
    document.querySelector("#cube").style.animation= "rotate 15s";
    document.querySelector("#front").children[0].textContent="0%";
    document.querySelector("#front").children[1].textContent="ваша скидка на первую покупку";
});
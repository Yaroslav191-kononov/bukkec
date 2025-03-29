let canvasFooter=document.querySelector('footer canvas');
let divs=document.querySelectorAll('footer article div');
let opacityArticle=0;
let ctxFooter=canvasFooter.getContext('2d');  
function addFooter(){  
        let XMax=parseInt(window.getComputedStyle(canvasFooter).getPropertyValue('width'))+100;
        let YMax=parseInt(window.getComputedStyle(canvasFooter).getPropertyValue('height'));
        console.log(XMax)
        let X=0;
        let FooterAnimation=setInterval(function(){
            let Y=0;
            X+=15;
            let FooterAppear= setInterval(()=>{
                setCircle(X,Y+=10);
                ctxFooter.clearRect(X-10,Y-10,15,15);
                Y>=YMax?clearInterval(FooterAppear):null;
            },1);
            X>=XMax?(clearInterval(FooterAnimation),AppearContent()):null;
        },80);
    if(window.innerWidth<820){
        clearInterval(FooterAnimation);
        AppearContent();
    }
}
function AppearContent(){
    divs.forEach((elem)=>elem.style.opacity=1);
}
function setCircle(X,Y){
    ctxFooter.beginPath();
    ctxFooter.arc(X, Y, 15, 0, 2*Math.PI, false)
    ctxFooter.fillStyle ='rgb(64,64,64)';
    ctxFooter.fill();
}
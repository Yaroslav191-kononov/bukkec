let Timeout;
document.querySelector('#Name').addEventListener('input',inputCheck);
document.querySelector('#Email').addEventListener('input',inputCheck);
let error=document.querySelector('#error');
function inputCheck(){
    clearTimeout(Timeout);
    error.innerHTML='';
    if(this.type!='email'){
        if(/[^a-zA-Zа-яёА-ЯЁ]/.test(this.value)){
            error.innerHTML='вводите английские или русские буквы<canvas id="smile"></canvas>';
            OnAddCanvas();
            setTimeout(()=>error.style.right=50+'px',500);
            error.classList.remove('hidden');
        }
        else{
            error.style.right='-50%';
            error.innerHTML='вы молодец<canvas id="smile"></canvas>';
            OnAddCanvas();
            error.classList.add('hidden');
        }
    }
    else{
        if(/[@]/.test(this.value)){
            error.style.right='-50%';
            error.innerHTML='вы молодец<canvas id="smile"></canvas>';
            OnAddCanvas();   
            error.classList.add('hidden');
        }   
        else{
            setTimeout(()=>error.style.right=50+'px',500);
            error.innerHTML='вводите символ @<canvas id="smile"></canvas>';
            OnAddCanvas();
            error.classList.remove('hidden');
        }
    }
}
let ctx,cpxL=60,cpxR=90,cpy=55,size=8,smileOnTimer,smileOffTimer;
function drawSmile(){
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#e5e7eb";
ctx.beginPath();
ctx.arc(75,75,50,0,Math.PI*2,true);
ctx.fill();
ctx.stroke();
//------------------------
ctx.moveTo(65,65);
ctx.fillStyle = "rgb(64 64 64)";
ctx.beginPath();
ctx.arc(cpxL,cpy,size-3,0,Math.PI*2,true);
ctx.fill();
ctx.stroke();
//---------------------------------
ctx.moveTo(95,65);
ctx.beginPath();
ctx.arc(cpxR,cpy,size-3,0,Math.PI*2,true);
ctx.fill();
ctx.stroke();
//-----------------------------
ctx.fillStyle = "rgb(64 64 64)";
ctx.moveTo(95,90);
ctx.beginPath();
ctx.arc(75,90,size,0,Math.PI*2);
ctx.fill();
ctx.stroke();
}
function start(){  
drawSmile();
cpy<=65?(cpy+= 1,Timeout=setTimeout(start,20),size+=0.5,cpxL-=0.5,cpxR+=0.5):Timeout=setTimeout(end,350);
}
function end(){  
drawSmile();
cpy>=55?(cpy-= 1,Timeout=setTimeout(end,20),size-=0.5,cpxL+=0.5,cpxR-=0.5):Timeout=setTimeout(start,350);
}
function OnAddCanvas() {
ctx = document.getElementById('smile').getContext('2d');
drawSmile();
start();
}
OnAddCanvas()
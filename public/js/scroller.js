let buttons=document.querySelectorAll('section:nth-of-type(1) a , #scroll article a');
let parent=document.querySelector('#scroll');
let scroll=document.querySelectorAll('#scroll article');
scroll.forEach((elem)=>elem.remove());
let i=0;
let timer=setInterval(()=>{
    scroll[i].classList.remove('opacity-0');
    Linear_Bg(scroll[i].parentElement,false);
    Linear_Bg(scroll[i],false);
    setTimeout(()=>{
        scroll[i].classList.add('opacity-0');
    },2000);
    setTimeout(()=>{
        scroll[i].remove();
        i<scroll.length-1?parent.append(scroll[i+1]):parent.append(scroll[0]);
        i<scroll.length-1?i++:i=0;
    },3000);
},3500);
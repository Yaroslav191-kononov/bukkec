let choise=document.querySelectorAll('section:nth-of-type(2) article>div');
choise.forEach((elem,index,array)=>index%2==0?(
    elem.addEventListener('click',ChoiseDisappear.bind(elem,array[index+1],index+1,array)), 
    elem.addEventListener('mouseenter',OnMove.bind(elem)), 
    elem.addEventListener('mouseleave',OnMove.bind(elem))
):null);
function ChoiseDisappear(afterDisappear,index,array){
    this.classList.add('activeInfo');
    setTimeout(()=>{
        this.classList.add('hidden');
        afterDisappear.classList.remove('hidden');
        afterDisappear.classList.remove('activeInfo');
        if(window.matchMedia("(max-width: 1024px)").matches){
            index>=array.length-1?index=1:index+=2;
            afterDisappear.addEventListener('click',ChoiseDisappear.bind(afterDisappear,array[index],index,array))
        };
        Linear_Bg(afterDisappear,false);
    },1000);
}
function OnMove(){
    this.classList.toggle('hoverInfo');
}
function Linear_Bg(afterDisappear,check){
    let proc1=0;
    let proc2=100;
    let interval =setInterval(()=>{
        try{
            afterDisappear.style.backgroundImage=`linear-gradient(${180}deg, rgb(23, 23, 23) ${proc2}%, rgb(61, 61, 61) ${proc1}%)`;
            proc1++ == 100?(clearInterval(interval),proc=0,check?afterDisappear.style.backgroundImage="none":null):proc2--;
        }
        catch(error){}
    },10);
}
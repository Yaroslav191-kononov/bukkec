let choise = document.querySelectorAll('section:nth-of-type(2) article > div'); 
choise.forEach((elem, index) => {
    if (index % 2 === 0) { 

        elem.addEventListener('click', ChoiseDisappear.bind(elem, choise[index + 1], index + 1, choise)); 
        elem.addEventListener('mouseenter', OnMove.bind(elem));  
        elem.addEventListener('mouseleave', OnMove.bind(elem));  
    }
});

function ChoiseDisappear(afterDisappear, index, array) {
    this.classList.add('activeInfo');
    this.classList.add('fadeOut'); 
    setTimeout(() => {
        this.classList.add('hidden');
        afterDisappear.classList.remove('hidden');
        afterDisappear.classList.remove('activeInfo');
        afterDisappear.classList.add('fadeIn'); 
        afterDisappear.classList.remove('fadeOut');
        Linear_Bg(afterDisappear, false);
        if (window.matchMedia("(max-width: 1024px)").matches) {
            let nextIndex = index >= array.length - 2 ? 0 : index + 2; 
            afterDisappear.addEventListener('click', ChoiseDisappear.bind(afterDisappear, array[nextIndex], nextIndex, array), { once: true });
        }
    }, 1000); 
}
function OnMove() {
    this.classList.toggle('hoverInfo');
}
function Linear_Bg(afterDisappear, check) {
    let proc1 = 0;
    let proc2 = 100;
    let interval = setInterval(() => {
        try {
            afterDisappear.style.backgroundImage = `linear-gradient(${180}deg, rgb(23, 23, 23) ${proc2}%, rgb(61, 61, 61) ${proc1}%)`;
            proc1++ == 100 ? (clearInterval(interval), proc = 0, check ? afterDisappear.style.backgroundImage = "none" : null) : proc2--;
        }
        catch (error) { }
    }, 10);
}
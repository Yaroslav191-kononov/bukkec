let CommentTextArr = [];
let CommentStep = 0;
let check=true;
function CommentSee() {
    CommentTextArr = [];
    fetch('/comm', {
        method: 'POST',
    }).then(res => res.json()).then(data => {
        let comm = document.querySelector('#comm');
        let div = document.createElement('div');
        div.classList.add('flex', 'flex-wrap', 'justify-evenly', 'w-full');
        data.forEach((elem, index) => {
            let str;
            let img = Object.values(elem)[2] ? 'https://bukkec-production-49f4.up.railway.app/uploads/' + Object.values(elem)[2] : 'https://bukkec-production-49f4.up.railway.app/images/user.png';
            str = `
                        <div class="bg-neutral-700 w-full p-6 h-full m-4 CommentBlock">
                            <div class="flex justify-between">
                                <h2 class="bg-neutral-900 text-4xl p-2 text-wrap">${Object.values(elem)[1]}<h2>
                            </div>
                            <img src="${img}" class="img float-left p-4 relative z-20">
                            <div id='_${index}' class='textDisplay bg-neutral-900 p-8 pt-42 text-xl z-10 text-wrap h-comm'></div>
                        </div>`;
            comm.style.padding = '15px';
            CommentTextArr.push(Object.values(elem)[0]);
            div.insertAdjacentHTML("beforeEnd", str);
        });
        comm.append(div);
        addRandom(CommentTextArr[CommentStep]);
    });
}
CommentSee();
let add = document.querySelector('#add');
let hide = document.querySelector('#hide');
hide.children[0].addEventListener('click', () => {
    hide.classList.add('hidden');
});
add.addEventListener('click', () => {
    hide.classList.remove('hidden');
});
document.querySelector('#formComm').addEventListener('submit', (e) => {
    e.preventDefault();
    let form = document.getElementById("formComm");
    let formData = new FormData(form);
    fetch('/commAdd', {
        method: 'POST',
        body: formData
    }).then(res => res.text()).then(data => data).then((data) => {
        let h2 = document.createElement('h2');
        h2.classList.add();
        h2.textContent = data;
        h2.classList.add('absolute', 'text-7xl', 'mx-auto', 'bottom-3/4', 'bg-neutral-900');
        hide.append(h2);
        h2.addEventListener('click', () => {
            h2.remove();
        });
        document.querySelectorAll('#comm div').forEach((elem) => elem.remove());
        CommentStep = 0;
        CommentSee();
    });
});
function addButtonComment() {
    document.querySelector('#add').style.right = '-145px';
};
let randomBtn = document.querySelectorAll('.randomBtn');
function addRandom(text) {
    if(check){
    check=false;
    CommentStep > 0 ? BeforeMove(document.querySelector('#_' + (CommentStep - 1)).parentElement) : BeforeMove(document.querySelector('#_' + (CommentTextArr.length - 1)).parentElement);
    function BeforeMove(elem) {
        elem.querySelectorAll("span").forEach((inElem, index) => {
            setTimeout(() => {
                const angle = Math.random() * 2 * Math.PI;
                const distance = Math.random() * 200 + 50;
                inElem.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                inElem.style.opacity = 0;
            }, index * 20);
        })
        setTimeout(() => elem.style.display = "none", elem.querySelectorAll("span").length * 20);
    }
    setTimeout(() => {
        let textDisplay = document.querySelector('#_' + CommentStep);
        textDisplay.innerHTML = '';
        textDisplay.parentElement.style.display = "block";
        let randomWord = text.split('');
        let containerWidth = textDisplay.offsetWidth;
        let containerHeight = textDisplay.offsetHeight;
        let maxWidthPercentage = -2;
        randomWord.forEach((elem, index) => {
            let letterElement = document.createElement('span');
            letterElement.classList.add('word');
            letterElement.textContent = elem;
            letterElement.style.opacity = 0;
            let randomX = Math.random() * containerWidth * maxWidthPercentage - (containerWidth * maxWidthPercentage) / 2;
            let randomY = Math.random() * containerHeight - containerHeight / 2;
            letterElement.dataset.correctIndex = index;
            letterElement.style.transform = `translate(${randomX}px, ${randomY}px)`;
            textDisplay.appendChild(letterElement);
            setTimeout(() => {
                letterElement.style.opacity = 1;
            }, 5);
        });
        setTimeout(() => {
            let letterElements = document.querySelectorAll('.word');
            letterElements.forEach(elem => {
                elem.style.opacity = 0;
            });
            setTimeout(() => {
                function FinalPlace(){letterElements.forEach((elem) => {
                    let containerWidth = textDisplay.offsetWidth * 0.9;
                    let lineHeight = 50;
                    let correctIndex = parseInt(elem.dataset.correctIndex);
                    let textRow = Math.floor(containerWidth / 30);
                    if(window.matchMedia("(max-width: 1250px)").matches){
                        textRow = Math.floor(containerWidth/30);
                    }
                    if(window.matchMedia("(max-width: 768px)").matches){
                        textRow = Math.floor(containerWidth/12);
                    }
                    if(window.matchMedia("(max-width: 710px)").matches){
                        textRow = Math.floor(containerWidth/13);
                    }
                    let row = Math.floor(correctIndex / textRow);
                    let col = correctIndex % textRow;
                    let finalX = elem.textContent === elem.textContent.toUpperCase() && elem.textContent !== elem.textContent.toLowerCase() ? col * 30 - 10 : col * 30;
                    let finalY = row * lineHeight - lineHeight / 2;
                    if(window.matchMedia("(max-width: 1250px)").matches){
                        finalY = (row * lineHeight - lineHeight) / 1.5;
                        finalX = elem.textContent === elem.textContent.toUpperCase() && elem.textContent !== elem.textContent.toLowerCase() ? (col * 30 - 10)/1.2 : (col * 30)/1.2;
                        }
                    if(window.matchMedia("(max-width: 768px)").matches){
                        finalX = elem.textContent === elem.textContent.toUpperCase() && elem.textContent !== elem.textContent.toLowerCase() ? (col * 30 - 10)/3 : (col * 30)/3;
                        finalY = row * lineHeight - lineHeight / 20;
                        }
                    if(window.matchMedia("(max-width: 560px)").matches){
                        finalX = elem.textContent === elem.textContent.toUpperCase() && elem.textContent !== elem.textContent.toLowerCase() ? (col * 30 - 10)/3-100 : (col * 30)/3-100;
                            finalY = (row * lineHeight - lineHeight) / 2+100;
                        }
                    elem.style.transform = `translate(${finalX}px, ${finalY}px)`;
                    setTimeout(() => {
                        elem.style.opacity = 1;
                    }, 10);
                    textDisplay.style.height=finalY+70+"px";
                });}
                FinalPlace();
                let test;
                window.addEventListener("resize",()=>{
                    clearTimeout(test);
                    test = setTimeout(FinalPlace, 500);
                });
            }, 50);
            check=true;
            CommentStep < CommentTextArr.length - 1 ? (CommentStep++) : (CommentStep = 0);
        }, 2000);
    }, CommentStep > 0 ? document.querySelector('#_' + (CommentStep - 1)).parentElement.querySelectorAll("span").length * 20 : document.querySelector('#_' + (CommentTextArr.length - 1)).parentElement.querySelectorAll("span").length * 20);
}
}
randomBtn.forEach(elem => elem.addEventListener('click', () => addRandom(CommentTextArr[CommentStep])));
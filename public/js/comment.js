let CommentTextArr = [];
let CommentStep = 0;
function CommentSee() {
    fetch('/comm', {
        method: 'POST',
    }).then(res => res.json()).then(data => {
        let comm = document.querySelector('#comm');
        let div = document.createElement('div');
        div.classList.add('flex', 'flex-wrap', 'justify-evenly', 'w-full');
        data.forEach((elem,index) => {
            let str;
            console.log(Object.values(elem)[2]);
            let img = Object.values(elem)[2] ? 'https://kurs-mjqz.onrender.com/uploads/' + Object.values(elem)[2] : 'https://kurs-mjqz.onrender.com/images/user.png';
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
    console.log(CommentTextArr);
    console.log(CommentTextArr[CommentStep]);
    console.log(CommentStep);
    let textDisplay = document.querySelector('#_'+CommentStep);
    textDisplay.innerHTML = '';
    textDisplay.parentElement.style.display="block";
    let randomWord = text.split('');
    let containerWidth = textDisplay.offsetWidth;
    let containerHeight = textDisplay.offsetHeight;
    let maxWidthPercentage = 0.8;
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
        let containerWidth = textDisplay.offsetWidth*0.9;
        letterElements.forEach(letter => {
            letter.style.opacity = 0;
        });
        setTimeout(() => {
            letterElements.forEach((letter) => {
                let lineHeight = 50;
                let correctIndex = parseInt(letter.dataset.correctIndex);
                let textRow = Math.floor(containerWidth / 30);
                let row = Math.floor(correctIndex / textRow);
                let col = correctIndex % textRow;
                let finalX = col * 30;
                let finalY = row * lineHeight - lineHeight / 2;
                letter.style.transform = `translate(${finalX}px, ${finalY}px)`;
                setTimeout(() => {
                    letter.style.opacity = 1;
                }, 10);
            });
        }, 50);
        CommentStep < CommentTextArr.length-1 ? CommentStep++ : CommentStep = 0;
    }, 2000);
}
randomBtn.forEach(elem=>elem.addEventListener('click', () => addRandom(CommentTextArr[CommentStep])));
let body = document.querySelector('body');
let level = document.querySelector('h3');
let playground = document.querySelector('.playground');
let boxes = document.querySelectorAll('.box');
let helpbtn = document.querySelector('.help');

let started = false;
let memArr = [];
let userArr = [];
let levelNum = 1;
let clicks = 0;
let score = 0;

playground.addEventListener('click', (event) => {
    if (started && event.target.classList.contains('box')) {
        userFlash(event.target);
        clicks++;
        userArr.push(event.target.id);
        checker();
    }
});

function userFlash(box) {
    box.classList.add('userFlash');
    setTimeout(() => {
        box.classList.remove('userFlash');
    }, 200);
}

function checker() {
    if (userArr[clicks - 1] !== memArr[clicks - 1]) {
        level.innerText = `You have lost the game, Your score is ${score}`;
        resetGame();
    } else if (clicks === memArr.length) {
        score += 10;
        userArr = [];
        clicks = 0;
        setTimeout(selectBox, 1000);
    }
}

function resetGame() {
    started = false;
    userArr = [];
    memArr = [];
    clicks = 0;
    levelNum = 1;
    score = 0;
    body.classList.add('gameOver');
    setTimeout(() => {
        body.classList.remove('gameOver');
    }, 500);
}

body.addEventListener('keydown', () => {
    if (!started) {
        started = true;
        levelNum = 1;
        score = 0;
        memArr = [];
        userArr = [];
        selectBox();
    }
});

function selectBox() {
    level.innerText = `Level ${levelNum}`;
    levelNum++;
    let randVal = Math.floor(Math.random() * boxes.length);
    let selectedBox = boxes[randVal];
    memArr.push(selectedBox.id);

    // *🛠️ New Fix: Delay added to flash each box*
    let i = 0;
    function flashSequence() {
        if (i < memArr.length) {
            let box = document.getElementById(memArr[i]);
            flashRand(box);
            setTimeout(flashSequence, 600);
            i++;
        }
    }
    flashSequence();
}

function flashRand(box) {
    box.classList.add('memFlash');
    setTimeout(() => {
        box.classList.remove('memFlash');
    }, 400);
}

helpbtn.addEventListener('click', () => {
    let initText = level.innerText;
    level.innerText = `Memory array is: ${memArr}`;
    setTimeout(() => {
        level.innerText = initText;
    }, 2000);
});
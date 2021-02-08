const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const startButton = document.querySelector('.fun-btn');

let result;
let currentTime;

function randomSquare(){
    console.log(square);
    square.forEach(aSquare => {
        aSquare.classList.remove('mole');
    });
    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');

    hitPosition = randomPosition.id;
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if (id.id === hitPosition){
            result = result + 1;
            score.textContent = result;
        }
    });
});

function moveMole(){
    moveTimerId = setInterval(randomSquare, 1000);
}

function countDown(){
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime === 0){
        clearInterval(timerId);
        alert('GAME OVER! Your final score is ' + result);
        clearInterval(moveTimerId);
    }
}

let moveTimerId, timerId;
function start(){
    currentTime = 60;
    result = 0;
    timeLeft.textContent = currentTime;
    score.textContent = result;
    moveMole();
    timerId = setInterval(countDown, 1000);
}

startButton.addEventListener("click", start);
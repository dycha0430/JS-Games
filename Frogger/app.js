document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const timeLeft = document.querySelector('#time-left');
    const result = document.querySelector('#result');
    const startBtn = document.querySelector('#button');
    const width = 9;
    const carsLeft = document.querySelectorAll('.car-left');
    const carsRight = document.querySelectorAll('.car-right');
    const logsLeft = document.querySelectorAll('.log-left');
    const logsRight = document.querySelectorAll('.log-right');
    let currentIndex = 76;
    let currentTime = 60;
    let timerId;
    let moveTimerId;

    function init(){
        startBtn.addEventListener('click', () => {
            currentTime = 60;
            result.innerText = "";
            squares[currentIndex].classList.remove('frog');
            currentIndex = 76;
            squares[currentIndex].classList.add('frog');
            document.addEventListener('keydown', moveFrog);
            moveTimerId = setInterval(move, 1000);
            timerId = setInterval(countTimer, 1000);
        })
    }

    function countTimer() {
        currentTime--;
        timeLeft.innerText = currentTime;
        isGameOver();
    }

    function move() {
        moveCars();
        moveLogs();
        moveFrogWithLog();
        isGameOver();
    }

    function moveFrogWithLog() {
        if (currentIndex >= 18 && currentIndex < 26){
            squares[currentIndex].classList.remove('frog');
            currentIndex++;
            squares[currentIndex].classList.add('frog');
        } else if (currentIndex > 27 && currentIndex < 36){
            squares[currentIndex].classList.remove('frog');
            currentIndex--;
            squares[currentIndex].classList.add('frog');
        }
        
    }

    function moveFrog(e) {
        squares[currentIndex].classList.remove('frog');
        switch(e.keyCode) {
            case 37:
                if (currentIndex % width !== 0) currentIndex--;
                break;
            case 38:
                if (currentIndex - width >= 0) currentIndex -= width;
                break;                
            case 39:
                if (currentIndex % width !== width - 1) currentIndex++;
                break;
            case 40:
                if (currentIndex + width < width * width) currentIndex += width;
                break;
        }

        isGameOver();
        isClear();

        
        squares[currentIndex].classList.add('frog');
    }

    function isClear() {
        if (squares[currentIndex].classList.contains('ending-block')){
            result.innerText = 'You Win!';
            clearInterval(moveTimerId);
            clearInterval(timerId);
            document.removeEventListener('keydown', moveFrog);
        }
    }
    function isGameOver() {
        if (currentTime == 0 || squares[currentIndex].classList.contains('c1')
        || squares[currentIndex].classList.contains('l4') || squares[currentIndex].classList.contains('l5')){
            result.innerText = 'GAME OVER!';
            clearInterval(moveTimerId);
            clearInterval(timerId);
            document.removeEventListener('keydown', moveFrog);
        }
    }

    function moveCars() {
        carsLeft.forEach(carLeft => {
            if (carLeft.classList.contains('c1')){
                carLeft.classList.remove('c1');
                carLeft.classList.add('c3');
            } else if (carLeft.classList.contains('c2')){
                carLeft.classList.remove('c2');
                carLeft.classList.add('c1');
            } else if (carLeft.classList.contains('c3')){
                carLeft.classList.remove('c3');
                carLeft.classList.add('c2');
            }
        })

        carsRight.forEach(carRight => {
            if (carRight.classList.contains('c1')){
                carRight.classList.remove('c1');
                carRight.classList.add('c2');
            } else if (carRight.classList.contains('c2')){
                carRight.classList.remove('c2');
                carRight.classList.add('c3');
            } else if (carRight.classList.contains('c3')){
                carRight.classList.remove('c3');
                carRight.classList.add('c1');
            }
        })
    }

    function moveLogs() {
        logsLeft.forEach (logLeft => {
            if (logLeft.classList.contains('l1')){
                logLeft.classList.remove('l1');
                logLeft.classList.add('l5');
            } else if (logLeft.classList.contains('l2')){
                logLeft.classList.remove('l2');
                logLeft.classList.add('l1');
            } else if (logLeft.classList.contains('l3')){
                logLeft.classList.remove('l3');
                logLeft.classList.add('l2');
            } else if (logLeft.classList.contains('l4')){
                logLeft.classList.remove('l4');
                logLeft.classList.add('l3');
            } else if (logLeft.classList.contains('l5')){
                logLeft.classList.remove('l5');
                logLeft.classList.add('l4');
            }
        })

        logsRight.forEach (logRight => {
            if (logRight.classList.contains('l1')){
                logRight.classList.remove('l1');
                logRight.classList.add('l2');
            } else if (logRight.classList.contains('l2')){
                logRight.classList.remove('l2');
                logRight.classList.add('l3');
            } else if (logRight.classList.contains('l3')){
                logRight.classList.remove('l3');
                logRight.classList.add('l4');
            } else if (logRight.classList.contains('l4')){
                logRight.classList.remove('l4');
                logRight.classList.add('l5');
            } else if (logRight.classList.contains('l5')){
                logRight.classList.remove('l5');
                logRight.classList.add('l1');
            }
        })
    }

    init();    

})
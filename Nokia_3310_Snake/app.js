document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentSnake = [2,1,0];
    let apple = 0;
    let direction = 1;
    let score = 0;
    let speed = 0.0;
    let intervalTime = 0;
    let interval = 0;
    
    function startGame(){
        currentSnake.forEach(snake => squares[snake].classList.remove('snake'));
        squares[apple].classList.remove('apple');
        score = 0;
        scoreDisplay.innerText = score;
        direction = 1;
        clearInterval(interval);
        intervalTime = 1000;
        currentIndex = 0;

        currentSnake = [2,1,0];
        currentSnake.forEach(snake => squares[snake].classList.add('snake'));
        placeApple();
        
        interval = setInterval(moveOutcomes, intervalTime);
    }

    function moveOutcomes() {
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) ||
            (currentSnake[0] % width === width - 1 && direction === 1) ||
            (currentSnake[0] % width === 0 && direction === -1) ||
            (currentSnake[0] - width < 0 && direction === -width) ||
            squares[currentSnake[0] + direction].classList.contains('snake')
        ){
            alert("GAME OVER!");
            return clearInterval(interval);
        }

        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction);

        if (squares[currentSnake[0]].classList.contains('apple')){
            clearInterval(interval);
            score++;
            scoreDisplay.innerText = score;
            
            squares[apple].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            placeApple();
            
            intervalTime -= 100;
            
            if (intervalTime === 0){
                score = 'Congratulations! Clear all level!';
                scoreDisplay.innerText = score;
                return;
            }

            interval = setInterval(moveOutcomes, intervalTime);
        }

        squares[currentSnake[0]].classList.add('snake');
    }

    function placeApple(){
        do {
            apple = Math.floor(Math.random() * squares.length);
        } while (squares[apple].classList.contains('snake'));
        
        squares[apple].classList.add('apple');
    }

    function control(e){

        if (e.keyCode === 39){
            direction = 1;
        } else if (e.keyCode === 38){
            direction = -width;
        } else if (e.keyCode === 37){
            direction = -1;
        } else if (e.keyCode === 40){
            direction = width;
        }
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
})
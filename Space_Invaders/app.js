document.addEventListener('DOMContentLoaded', () => {   
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('#result');

    const width = 15;
    const TIMEOUT = 100;
    let invaderHeight = 3;
    let invaderWidth = 10;
    let invaderIndex = 3;
    let shooterIndex = 217;
    let score = 0;
    let invaderId;
    let invaderList = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];

    let destroyedInvader = [];

    let direction
    function init(){
        invaderList.forEach(index => {
            if (invaderIndex + index < width * width)
                squares[invaderIndex + index].classList.remove('invader');
        });
        squares[shooterIndex].classList.remove('shooter');

        destroyedInvader = [];
        invaderIndex = 3;
        invaderList = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39
        ];
        shooterIndex = 217;

        score = 0;
        invaderList.forEach(index => {
            squares[invaderIndex + index].classList.add('invader');
        });
        
        squares[shooterIndex].classList.add('shooter');

        document.addEventListener('keydown', control);
        invaderId = setInterval(moveInvader, 1000);
    }

    function shooting(){
        let laserId;
        let laserIndex = shooterIndex;
        
        function moveLaser(){
            squares[laserIndex].classList.remove('laser');
            laserIndex -= width;
            if (laserIndex < 0){
                clearInterval(laserId);
            } else if (squares[laserIndex].classList.contains('invader')){
                clearInterval(laserId);
                destroyedInvader.push(laserIndex - invaderIndex);
                squares[laserIndex].classList.remove('invader');
                squares[laserIndex].classList.add('boom');
                setTimeout(function(){
                    squares[laserIndex].classList.remove('boom');
                }, 100);
                ++score;
                if (score === invaderWidth * invaderHeight) {
                    scoreDisplay.innerText = 'Congratulations! Clear the game.';
                }
                else scoreDisplay.innerText = score;
            } else {
                squares[laserIndex].classList.add('laser');
            }
        }

        laserId = setInterval(moveLaser, TIMEOUT);
    }

    function moveInvader(){
        invaderList.forEach(index => {
            if (!destroyedInvader.includes(index))
                squares[invaderIndex + index].classList.remove('invader');
        });
        
        invaderIndex += width;

        invaderList.forEach(index => {
            if (!destroyedInvader.includes(index)) {
                if (invaderIndex + index >= width * width || squares[invaderIndex + index].classList.contains('shooter')){
                    alert('GAME OVER!');
                    clearInterval(invaderId);
                    return init();
                }
                squares[invaderIndex + index].classList.add('invader');
            }
        });
    }

    function control(e){
        // Press right key, then move right.
        if (e.keyCode === 39){
            if (shooterIndex % width === width - 1) return;
            squares[shooterIndex].classList.remove('shooter');
            squares[++shooterIndex].classList.add('shooter');
        } 
        // Press left key, then move left.
        else if (e.keyCode === 37){
            if (shooterIndex % width === 0) return;
            squares[shooterIndex].classList.remove('shooter');
            squares[--shooterIndex].classList.add('shooter');
        } 
        // Press up key, then shoot the laser.
        else if (e.keyCode === 38){
            shooting();
        }
    }


    init();
})
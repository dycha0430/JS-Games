document.addEventListener('DOMContentLoaded', () => {
    const width = 10;
    const height = 20;

    const grid = makeBoard();
    let squares = Array.from(grid.querySelectorAll('div'));
    const nextShapeDisplay = document.querySelectorAll('.nextShape div');
    const scoreDisplay = document.querySelector('#score');
    const result = document.querySelector('#result');
    const startBtn = document.querySelector('#startBtn');
    let score = 0;
    let nextType;
    let tType;
    let tNum;
    let curIndex = 4;
    let timerId;

    // Type of Tetromino.
    const LTetromino = [
        [1, width+1, width*2+1, 2], 
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const ZTetromino = [
        [width, width + 1, 1, 2],
        [1, width+1, width+2, width*2+2],
        [2, 1, width+1, width],
        [1, width+1, width+2, width*2+2]
    ]

    const TTetromino = [
        [width, width+1, width+2, width*2+1], 
        [1, width+1, width*2+1, width],
        [width+2, width+1, width, 1],
        [width*2+1, width+1, 1, width+2]
    ]

    const ITetromino = [
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1]
    ]
    const OTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const Tetromino = [
        LTetromino, ZTetromino, TTetromino, ITetromino, OTetromino
    ]

    // For displaying next tetromino.
    const smallWidth = 4;
    const nextTetromino = [
        [1, smallWidth+1, smallWidth*2+1, 2], 
        [smallWidth, smallWidth + 1, 1, 2],
        [smallWidth, smallWidth+1, smallWidth+2, smallWidth*2+1], 
        [smallWidth, smallWidth+1, smallWidth+2, smallWidth+3],
        [1, 2, smallWidth+1, smallWidth+2]
    ]

    // Create grid.
    function makeBoard() {
        // Actual game board.
        let grid = document.querySelector('.grid');
        for (let i = 0; i < width*height; ++i){
            const square = document.createElement('div');
            grid.appendChild(square);
        }

        // Bottom line.
        for (let i = 0; i < width; ++i){
            const bottomSquare = document.createElement('div');
            bottomSquare.setAttribute('class', 'bottomBar');
            grid.appendChild(bottomSquare);
        }

        // Next tetromino display
        let nextShape = document.querySelector('.nextShape');
        for (let i = 0; i < 16; ++i){
            const square = document.createElement('div');
            nextShape.appendChild(square);
        }

        return grid;
    }

    // Initialization.
    function init() {
        score = 0;
        result.innerText = "";
        scoreDisplay.innerText = score;

        nextType = Math.floor(Math.random()*5);
        makeTetromino();
    }

    // Paint shape of 'tType'type and 'tNum' direction tetromino. 
    function paintTetromino() {
        Tetromino[tType][tNum].forEach(index => {
            squares[curIndex + index].classList.add(`shape${tType}`);
        });
    }

    // Erase painted tetromino.
    function eraseTetromino() {
        Tetromino[tType][tNum].forEach(index => {
            squares[curIndex + index].classList.remove(`shape${tType}`);
        });
    }

    // Ending game.
    function gameOver() {
        result.innerText = "GAMEOVER";
        document.removeEventListener('keydown', control);
    }

    // Randomly choose next tetromino and change current tetromino.
    function makeTetromino() {
        tType = nextType;
        tNum = Math.floor(Math.random()*4);

        nextType = Math.floor(Math.random()*5);        
        curIndex = 4;
    }

    // Start moving new tetromino.
    function startTetromino() {
        paintTetromino();

        eraseNextShape();
        // nextShape display
        displayNextShape();

        if (stopMoving()) {
            gameOver();
            return;
        }

        timerId = setInterval(moveTetromino, 1000);
    }

    // Erase next tetromino display.
    function eraseNextShape() {
        nextTetromino[tType].forEach(index => {
            nextShapeDisplay[index].classList.remove(`shape${tType}`);
        })
    }

    // Paint next tetromino display.
    function displayNextShape() {
        nextTetromino[nextType].forEach(index => {
            nextShapeDisplay[index].classList.add(`shape${nextType}`);
        })
    }

    // Stop tetromino when lower part of tetromino touched other tetromino or bottom line.
    function stopMoving() {
        let ret = false;
        Tetromino[tType][tNum].forEach(index => {
            const tmpIndex = curIndex + index + width;
            if (tmpIndex >= width*height || squares[tmpIndex].classList.contains('taken')){
                ret = true;
            }
        });

        return ret;
    }

    // Lower Tetromino one space.
    function moveTetromino() {
        if (stopMoving()) {
            Tetromino[tType][tNum].forEach(index => {
                squares[curIndex + index].classList.add('taken');
            });
            
            getScore();

            clearInterval(timerId);
            makeTetromino();
            startTetromino();
            return;
        }

        eraseTetromino();
        curIndex += width;
        paintTetromino();
    }

    // Count a score when a whole line is full of squares.
    function getScore() {
        for (let i = height - 1; i >= 0; --i){
            let takeAllLine = true;
            for (let j = 0; j < width; ++j){
                if (!squares[i*width + j].classList.contains('taken')){
                    takeAllLine = false;
                    break;
                }
            }
            
            if (takeAllLine) {
                // Get one score and that line is removed.
                score++;
                scoreDisplay.innerText = score;
                
                removeLine(i);
                i++;
            }
        }
    }

    // Remove a line from grid.
    function removeLine(lineNum){
        const lineIndex = lineNum*width;
        for (let i = 0; i < width; ++i){
            const index = lineIndex + i;
            squares[index].className = "";
        }

        const newLine = squares.splice(lineIndex, width);
        
        squares = newLine.concat(squares);
        
        squares.forEach(cell => grid.appendChild(cell));
    }

    // Move the tetromino to the right.
    function moveRight() {
        let canMove = true;
        Tetromino[tType][tNum].forEach(index => {
            if ((curIndex + index) % width === width - 1 || squares[curIndex + index + 1].classList.contains('taken')) canMove = false;
        });

        if (!canMove) return;

        eraseTetromino();
        curIndex++;
        paintTetromino();   
    }

    // Move the tetromino to the left.
    function moveLeft() {
        let canMove = true;
        Tetromino[tType][tNum].forEach(index => {
            if ((curIndex + index) % width === 0 || squares[curIndex + index - 1].classList.contains('taken')) canMove = false;
        });

        if (!canMove) return;

        eraseTetromino();
        curIndex--;
        paintTetromino();   
    }

    // Turn the tetromino 90 degress to the right.
    function rotate() {
        eraseTetromino();
        if (++tNum > 3) tNum = 0;

        // Check if tetromino is get out of board when rotated.
        const oneBlock = Tetromino[tType][tNum][0] + curIndex;
        let maxDiff = 0;
        Tetromino[tType][tNum].forEach(index => {
            const diff = (curIndex + index) % width - oneBlock % width;
            if (Math.abs(diff) > 3) maxDiff = Math.max(maxDiff, )
        })
        paintTetromino();
    }

    function control(e) {
        if (e.keyCode === 39){
            moveRight();
        } else if (e.keyCode === 38){
            rotate();
        } else if (e.keyCode === 37){
            moveLeft();
        } else if (e.keyCode === 40){
            moveTetromino();
        }
    }

    init();
    startBtn.addEventListener('click', () => {
        if (timerId) {
            // Stop moving tetromino.
            clearInterval(timerId);
            timerId = null;
            document.removeEventListener('keydown', control);
        } else {
            // Start moving tetromino.
            document.addEventListener('keydown', control);
            startTetromino();
        }
    });
})


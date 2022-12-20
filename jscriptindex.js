karaca
#8337

[18: 59]emrebesk:
const board = document.querySelector("#board");
const sst = board.getContext("2d");
const pointText = document.querySelector("#pointText");
const rstbtn = document.querySelector("#rstbtn");
const gameWidth = board.width;
const gameHeight = board.height;
Genişlet
message.txt
6 KB

emrebesk#6590
const board = document.querySelector("#board");
const sst = board.getContext("2d");
const pointText = document.querySelector("#pointText");
const rstbtn = document.querySelector("#rstbtn");
const gameWidth = board.width;
const gameHeight = board.height;
const backGround = "black";
const colorSnake = "green";
const borderSnake = "white";
const colorFood = "lightblue";
const unitSize = 20;
const trapFood = "red";
let running = false;
let horizontalVelocity = unitSize;
let verticalVelocity = 0;
let foodHorizontal;
let foodVertical;
let trapHorizontal;
let trapVertical;
let point = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];
window.addEventListener("keydown", changeDirection);
rstbtn.addEventListener("click", resetGame);

gameStart();

//
function gameStart() {
    unitsize = 20;
    verticalVelocity = 0;
    horizontalVelocity = unitsize;
    point = 0;
    score = 0;
    running = true;
    pointText.textContent = point;
    createFood();
    drawFood();
    nextTick();
};
function clearBoard() {
    sst.fillStyle = backGround;
    sst.fillRect(0, 0, gameWidth, gameHeight);

};
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            snakeMovement();
            snakeDraw();
            checkBorder();
            nextTick();
        }, 75);
    }
    else {
        gameOverDisplay();
    }

};
function createFood() {
    function randFood(min, max) {
        const randomNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randomNum;
    }
    foodHorizontal = randFood(0, gameWidth - unitSize);

    foodVertical = randFood(0, gameWidth - unitSize);

};
function drawFood() {
    sst.fillStyle = colorFood;
    sst.fillRect(foodHorizontal, foodVertical, unitSize, unitSize);

};
function createTrapFood() { };
function drawTrapFood() { };
function snakeMovement() {
    const head = {
        x: snake[0].x + horizontalVelocity,
        y: snake[0].y + verticalVelocity
    };
    snake.unshift(head);
    if (snake[0].x == foodHorizontal && snake[0].y == foodVertical) {
        point += 1;
        pointText.textContent = point;
        createFood();
    } else {
        snake.pop();
    }
};
function snakeDraw() {
    sst.fillStyle = colorSnake;
    sst.strokeStyle = borderSnake;
    snake.forEach(snakePart => {
        sst.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        sst.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);

    })

};
function changeDirection(event) {
    const directory = event.keyCode;
    const L = 37;
    const R = 39;
    const U = 38;
    const D = 40;

    const up = (verticalVelocity == -unitSize);
    const down = (verticalVelocity == unitSize);
    const right = (horizontalVelocity == unitSize);
    const left = (horizontalVelocity == -unitSize);

    switch (true) {
        case (directory == L && !right):
            horizontalVelocity = -unitSize;
            verticalVelocity = 0;
            break;
        case (directory == U && !down):
            horizontalVelocity = 0;
            verticalVelocity = -unitSize;
            break;
        case (directory == R && !left):
            horizontalVelocity = unitSize;
            verticalVelocity = 0;
            break;
        case (directory == D && !up):
            horizontalVelocity = 0;
            verticalVelocity = unitSize;
            break;
    }
};
function checkBorder() {
    switch (true) {
        case (snake[0].x < 0):
            snake[0].x = gameWidth;
            break;
        case (snake[0].x >= gameWidth):
            snake[0].x = 0;
            break;
        case (snake[0].y < 0):
            snake[0].y = gameHeight;
            break;
        case (snake[0].y >= gameHeight):
            snake[0].y = 0;
            break;

    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }

};
function gameOverDisplay() {
    sst.font = "50px MV Boli";
    sst.fillStyle = "yellow";
    sst.textAlign = "center";
    sst.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;

};
function resetGame() {

    if (!running) {
        point = 0;
        score = 0;
        horizontalVelocity = 20;
        verticalVelocity = 0;

        snake = [
            { x: unitSize * 4, y: 0 },
            { x: unitSize * 3, y: 0 },
            { x: unitSize * 2, y: 0 },
            { x: unitSize, y: 0 },
            { x: 0, y: 0 }
        ];
        gameStart();
    } else {
        score = 0;
        point = 0;
        pointText.textContent = point;
        snake = [
            { x: unitSize * 4, y: 0 },
            { x: unitSize * 3, y: 0 },
            { x: unitSize * 2, y: 0 },
            { x: unitSize, y: 0 },
            { x: 0, y: 0 }];

    }

};
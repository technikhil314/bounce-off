import { getRandomColor, getRandomInt } from "./utils.js";
let bricks = [];
let _ctx, _canvas;
const blockHeight = 30;
const blockWidth = 150;
const numberOfRows = Math.floor(window.innerHeight / (3 * blockHeight));
const ballRadius = 20;
let numberOfColumns = Math.floor(window.innerWidth / blockWidth);
let gap = Math.floor((window.innerWidth % blockWidth) / numberOfColumns);
let speed = 2;
let initialAngle = 5;
let paddleX = 0;
let isStarted = false;
let rightPressed = false;
let leftPressed = false;
let animationFrameId = null;
let x, y, dx = 0, dy = 0;

function keyDownHandler(e) {
    if ((e.keyCode === 32 || e.keyCode === 13) && !isStarted) {
        isStarted = true;
        draw(true);
    }
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function drawBricks() {
    for (let i = 0; i < numberOfRows; i++) {
        if (!bricks[i]) {
            bricks[i] = [];
        }
        for (let j = 0; j < numberOfColumns; j++) {
            let currentBrick;
            if (!bricks[i][j]) {
                currentBrick = {
                    color: getRandomColor(),
                    status: 1,
                    x: j * (blockWidth + gap) + gap / 2,
                    y: i * (blockHeight + gap) + gap
                }
                bricks[i][j] = currentBrick;
            } else {
                currentBrick = bricks[i][j]
            }
            if (currentBrick.status === 1) {
                _ctx.fillStyle = bricks[i][j].color;
                _ctx.fillRect(currentBrick.x, currentBrick.y, blockWidth, blockHeight);
            }
        }
    }
}

function drawBall() {
    _ctx.fillStyle = `black`
    _ctx.arc(x, y, ballRadius, 0, Math.PI * 2, true);
    _ctx.fill();
}

function drawPaddle() {
    _ctx.fillStyle = `black`
    if (rightPressed && paddleX + blockWidth * 1.5 <= _canvas.width) {
        paddleX += speed * 5;
    }
    else if (leftPressed && paddleX >= 0) {
        paddleX -= speed * 5;
    }
    _ctx.fillRect(paddleX, _canvas.height - blockHeight, 1.5 * blockWidth, blockHeight);
}
function collisionDetection() {
    for (var c = 0; c < numberOfRows; c++) {
        for (var r = 0; r < numberOfColumns; r++) {
            var b = bricks[c][r];
            if (b.status === 1 && x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
                console.log(x, y, b.x, b.y);
                dy = -dy;
                b.status = 0;
            }
        }
    }
}
function draw(start = false) {
    _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
    _canvas.width = window.innerWidth;
    _canvas.height = window.innerHeight;
    _ctx.globalAlpha = 1;
    _ctx.lineCap = "square"
    drawPaddle();
    drawBricks();
    drawBall();
    collisionDetection();
    if (x + dx > _canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > _canvas.height - ballRadius - blockHeight) {
        if (x > paddleX && x < paddleX + blockWidth * 1.5) {
            dy = -dy;
        } else {
            // alert("GAME OVER");
            //document.location.reload();
            cancelAnimationFrame(animationFrameId);
        }
    }
    x += speed * dx;
    y += speed * dy;
    if (start) {
        animationFrameId = requestAnimationFrame(draw);
    }
}

export default function index(canvas, ctx) {
    _canvas = canvas;
    _ctx = ctx;
    _canvas.width = window.innerWidth;
    _canvas.height = window.innerHeight;
    ctx.globalCompositeOperation = "source-over";
    paddleX = (_canvas.width - blockWidth) / 2
    x = ((_canvas.width - blockWidth * 2) / 2) + 0.75 * blockWidth;
    y = _canvas.height - 2 * blockHeight + gap
    while (dy === 0 || dy === -1 || dx === 0) {
        dx = getRandomInt(-initialAngle, initialAngle);
        dy = -Math.abs(getRandomInt(-initialAngle, initialAngle));
    }
    console.log(dy, dx);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    draw();
}


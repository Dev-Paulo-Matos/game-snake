let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = {
    x: 8 * box,
    y: 8 * box,
    score: 0
}
let up = document.querySelector('#up')
let down = document.querySelector("#down")
let record = document.querySelector("#record")
record.innerHTML = `Record: ${localStorage.getItem("score")}`
let direction = "right";
let controlSpeed = 80;
let changeBorder = document.querySelector('#border')
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
    score:0
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', (event) => {
    update(event)
    startGame(event)
} );

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo() {

    border(changeBorder)

    
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            endGame()
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    var score = document.querySelector('#score')
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); //pop tira o último elemento da lista
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        food.score++
        score.innerHTML = `Score: ${food.score}`
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

const speed = (event) => {

    if (event.target.id == 'up') {
        if (controlSpeed > 50) {
            controlSpeed = controlSpeed - 10
            clearInterval(jogo)
            jogo = setInterval(iniciarJogo, controlSpeed)

        }
        
        
        
        
    } else {
        if (controlSpeed < 200) {
            controlSpeed = controlSpeed + 10
            clearInterval(jogo)
            jogo = setInterval(iniciarJogo, controlSpeed)
        }
    }
}
const endGame = () => {
    clearInterval(jogo);
    if (food.score > localStorage.getItem('score')) {
        localStorage.setItem("score", food.score)
    }
    alert('Game Over :(  Se quiser recomeçar aperte F5');
}
up.addEventListener('click', speed)
down.addEventListener('click', speed)


let jogo;

const border = (event) => {

    let isBorder = event.options[event.selectedIndex].value


    if (isBorder == "true") {
        
        if (snake[0].x > 15 * box && direction == "right") endGame()
        if (snake[0].x < 0 && direction == 'left') endGame()
        if (snake[0].y > 15 * box && direction == "down") endGame()
        if (snake[0].y < 0 && direction == 'up') endGame()
    } else {

        if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
        if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
        if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
        if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    }
    
}
let start = false
const startGame = (event) => {
    
    if (event.keyCode == 13) {
        
        if (start) {
            clearInterval(jogo)
            start = false
        } else {
            start = true
            jogo = setInterval(iniciarJogo, controlSpeed)
        }
    } else {
        console.log("oi")
    }
}
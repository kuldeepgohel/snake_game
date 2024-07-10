const playboard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highsScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeBody = [];
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;
let setIntervalId;
let score = 0;

//geting high score from localstorage
let highScore = localStorage.getItem("high-score") || 0;
highsScoreElement.innerHTML = `High Score:${highScore}`;

//for changing food postion
const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

//for the change snake direction
const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  intiGame();
};

//handle the game over or not
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("game is over! press Ok to replay..");
  location.reload();
};

//for intial stage config.
const intiGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY}/${foodX}"></div>`;
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerHTML = `score:${score}`;
  }
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY]; //setting first element of snake body to current snake position
  //for update snake length
  snakeX += velocityX;
  snakeY += velocityY;

  //check if snake head is out of wall then game is over
  if (snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    // add a div for each part of the snake's body
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
    //if snake head hit the body , so set gameOver to true
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }
  playboard.innerHTML = htmlMarkup;
};
changeFoodPosition();
intiGame();

//for moving snake and speed
setIntervalId = setInterval(intiGame, 200);
document.addEventListener("keydown", changeDirection);

import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood, updateSpecialFood, drawSpecialFood, points, highest } from './food.js'
import { outsideGrid,randomGridPosition} from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')
const pointtexts = document.getElementById('point-texts')


function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press ok to restart.')) {
      window.location = '/'
    }
    return
  }


  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  updateSpecialFood()
  checkDeath()

}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
  drawSpecialFood(gameBoard)
  points(gameBoard)
  highest(gameBoard)
}

function checkDeath() {
  //gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
  randomGridPosition()
  gameOver = snakeIntersection()
  // EKRANDAN ÇIKIP TERSTEN GELME..
  if(outsideGrid(getSnakeHead())) {
    if(getSnakeHead().x > 21){
      getSnakeHead().x=0;
      getSnakeHead().y= getSnakeHead().y;
    }else if(getSnakeHead().x <1){
      getSnakeHead().x=21;
      getSnakeHead().y= getSnakeHead().y;
    }else if(getSnakeHead().y < 1){
      getSnakeHead().y=21;
      getSnakeHead().x= getSnakeHead().x;
    }else if(getSnakeHead().y=21){
      getSnakeHead().y=0;
      getSnakeHead().x= getSnakeHead().x;
    }
  }
}
import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 2
let point = 0
let specialFood = getRandomSpecialFoodPosition()
const EXPANSION_RATE_S = 4

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    point +=1
    food = getRandomFoodPosition()
  }
}

export function updateSpecialFood() {
  if (onSnake(specialFood)) {
    expandSnake(EXPANSION_RATE_S)
    point+=2
    specialFood = getRandomSpecialFoodPosition()
  }
}
export function points(gameBoard) {
  const pointSize = document.createElement('div')
  pointSize.style.cssText = point
  pointSize.textContent = point
  pointSize.classList.add('pointSize') 
  gameBoard.appendChild(pointSize)

}
export function highest(gameBoard) {
  var highestScore = localStorage.getItem('highestscore') 
  const highestDisplay = document.createElement('div')
  highestDisplay.textContent = "BEST SCORE:  " + " " + highestScore
  highestDisplay.classList.add('highestDisplay')
  gameBoard.appendChild(highestDisplay)
  if(point>highestScore) {
    localStorage.setItem('highestscore', point);
    highest(gameBoard);
  }
  
}
export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

export function drawSpecialFood(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = specialFood.y
  foodElement.style.gridColumnStart = specialFood.x
  foodElement.classList.add('specialFood')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}
function getRandomSpecialFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}
// TODO: handle keyboard event listener

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const instructions = document.getElementById('instructions')
const header = document.getElementById('header')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  instructions.innerText = "Use the arrow keys (↑, ↓, ←, →) then press Enter to confirm position. Press End to restart";
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass(true)
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass(true)
  }
}

function endGame(draw) {
  header.innerText = draw ? 'Draw!' : `${circleTurn ? "O" : "X"} Wins!`
  instructions.innerText = "Press any key to restart"
  freezeBoard()
}

function freezeBoard() {
  // remove all event listeners on cell and disable hovering
  cellElements.forEach(cell => {
    cell.removeEventListener('click', handleClick)
  })
  setBoardHoverClass(false)
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
  header.innerText = circleTurn ? "O's turn" : "X's turn"
  header.style.color = circleTurn ? "var(--o-color-set)" : "var(--x-color-set)"
}

function setBoardHoverClass(visible) {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (visible) {
    // show hovering depending on whose turn
    circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
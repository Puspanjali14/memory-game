const cardsGrid = document.getElementById("cardsGrid");
const timerElement = document.getElementById("timer");
const movesElement = document.getElementById("moves");
const gameOverElement = document.getElementById("gameOver");
const totalTimeElement = document.getElementById("totalTime");
const totalMovesElement = document.getElementById("totalMoves");
const restartButton = document.getElementById("restart");

let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let timer = null;
let matchedPairs = 0;
let totalTime = 0;

// Generate cards
function generateCards() {
  const icons = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍍", "🥝", "🍑"];
  const shuffledIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);

  shuffledIcons.forEach((icon) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="front">${icon}</div>
      <div class="back"></div>
    `;
    card.addEventListener("click", () => flipCard(card));
    cardsGrid.appendChild(card);
    cards.push(card);
  });
}

// Start timer
function startTimer() {
  let seconds = 0;
  timer = setInterval(() => {
    seconds++;
    totalTime = seconds;
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    timerElement.textContent = `Time: ${mins}:${secs}`;
  }, 1000);
}

// Flip card
function flipCard(card) {
  if (card.classList.contains("flipped") || secondCard) return;

  card.classList.add("flipped");
  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkMatch();
  }
}

// Check for match
function checkMatch() {
  moves++;
  movesElement.textContent = `Moves: ${moves}`;
  const firstIcon = firstCard.querySelector(".front").textContent;
  const secondIcon = secondCard.querySelector(".front").textContent;

  if (firstIcon === secondIcon) {
    matchedPairs++;
    if (matchedPairs === cards.length / 2) {
      clearInterval(timer);
      displayGameOver();
    }
    resetCards();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetCards();
    }, 1000);
  }
}

// Display game over screen
function displayGameOver() {
  totalTimeElement.textContent = `${Math.floor(totalTime / 60)
    .toString()
    .padStart(2, "0")}:${(totalTime % 60).toString().padStart(2, "0")}`;
  totalMovesElement.textContent = moves;
  gameOverElement.classList.remove("hidden");
}

// Reset card selection
function resetCards() {
  firstCard = null;
  secondCard = null;
}

// Initialize game
function initGame() {
  cardsGrid.innerHTML = "";
  generateCards();
  startTimer();
  moves = 0;
  matchedPairs = 0;
  movesElement.textContent = "Moves: 0";
  timerElement.textContent = "Time: 00:00";
  gameOverElement.classList.add("hidden");
}

restartButton.addEventListener("click", initGame);

initGame();

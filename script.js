"use strict";
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const currentScore0Element = document.querySelector("#current--0");
const currentScore1Element = document.querySelector("#current--1");
const diceImg = document.querySelector(".dice");
const holdButton = document.querySelector(".btn.btn--hold");
const rollDiceButton = document.querySelector(".btn.btn--roll");
const newGameButton = document.querySelector(".btn.btn--new");

let scores, activePlayer, currentScore, gameOver;
const WINNING_SCORE = 100;

const resetGame = function () {
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;

  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  gameOver = false;

  diceImg.classList.add("hidden");
  player0Element.classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--winner");
  player1Element.classList.remove("player--active");
};

resetGame();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

rollDiceButton.addEventListener("click", function () {
  if (!gameOver) {
    const randNum = Math.trunc(Math.random() * 6) + 1;

    diceImg.classList.remove("hidden");
    diceImg.src = `dice-${randNum}.png`;

    if (randNum !== 1) {
      currentScore += randNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdButton.addEventListener("click", function () {
  if (!gameOver) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= WINNING_SCORE) {
      gameOver = true;
      diceImg.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

newGameButton.addEventListener("click", resetGame);

"use strict";

let players = [];
let PLAYER_TURN = 0;
let GAME_OVER = false;
const WINNER_PTS = 70;

const currLabelElms = document.querySelectorAll(".current-label");
const scoreElms = document.querySelectorAll(".score");
const currScoreElms = document.querySelectorAll(".current-score");
const diceImg = document.querySelector(".dice");
const playerElms = document.querySelectorAll(".player");
const btnGame = document.querySelector(".btn--new");
const btnDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

function startGame() {
  PLAYER_TURN = 0;
  GAME_OVER = false;
  players = [
    {
      score: 0,
      currentScore: 0,
      history: [],
    },
    {
      score: 0,
      currentScore: 0,
      history: [],
    },
  ];
  scoreElms[0].textContent = players[0].score;
  scoreElms[1].textContent = players[1].score;
  currScoreElms[0].textContent = players[0].currentScore;
  currScoreElms[1].textContent = players[1].currentScore;
  diceImg.classList.add("hidden");
  playerElms[0].classList.add("player--active");
  playerElms[1].classList.remove("player--active");
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

window.addEventListener("resize", () => {
  if (window.innerWidth <= 290) {
    btnHold.textContent = "Hold";
  } else {
    btnHold.textContent = "📥 Hold";
  }
});

function winner() {
  if (players[PLAYER_TURN].score >= WINNER_PTS) {
    GAME_OVER = true;
    currScoreElms[PLAYER_TURN].textContent = "YOU WON!";
  }
  return GAME_OVER;
}
// Initialize all variables
startGame();

btnGame.addEventListener("click", startGame);

btnDice.addEventListener("click", () => {
  if (GAME_OVER) return;
  const diceNum = rollDice();
  diceImg.src = `dice-${diceNum}.png`;
  if (diceImg.classList.contains("hidden")) {
    diceImg.classList.remove("hidden");
  }
  let player = players[PLAYER_TURN];
  if (diceNum === 1) {
    player.currentScore = 0;
    playerElms[PLAYER_TURN].classList.toggle("player--active");
    currScoreElms[PLAYER_TURN].textContent = player.currentScore.toString();
    PLAYER_TURN = (PLAYER_TURN + 1) % 2;
    playerElms[PLAYER_TURN].classList.toggle("player--active");
    // diceImg.classList.toggle("hidden");
  } else {
    player.currentScore += diceNum;
    currScoreElms[PLAYER_TURN].textContent = player.currentScore.toString();
  }
});

btnHold.addEventListener("click", () => {
  if (GAME_OVER) return;
  let player = players[PLAYER_TURN];
  player.score += player.currentScore;
  scoreElms[PLAYER_TURN].textContent = player.score.toString();
  player.currentScore = 0;
  currScoreElms[PLAYER_TURN].textContent = player.currentScore.toString();
  if (winner()) return;
  playerElms[PLAYER_TURN].classList.toggle("player--active");
  diceImg.classList.toggle("hidden");
  PLAYER_TURN = (PLAYER_TURN + 1) % 2;
  playerElms[PLAYER_TURN].classList.toggle("player--active");
});

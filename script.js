'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnInstr = document.querySelector('.btn--instr');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const modal = document.querySelector('.modal');
const hidden = document.querySelector('.hidden');
const overlay = document.querySelector('.overlay');
const showModal = document.querySelector('.show-modal');
const btncloseModal = document.querySelector('.close-modal');

// Killer Game Instructions Modal Window
function instructions() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

instructions();
// close instructions modal window

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
btncloseModal.addEventListener('click', closeModal);

// Starting Conditions
let score = [0, 0];
let activePlayer = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate Random Number(1-6) for dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //   Display Rolled Dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    //   check if rolled dice is 1
    if (dice !== 1) {
      //   display current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch to the next player
      /*document.getElementById(`current--${activePlayer}`).textContent = 0;
            activePlayer = activePlayer === 0 ? 1 : 0;
            currentScore = 0;
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active'); */
      switchPlayer();
    }
  }
});
// Hold Feature - Save Current Score to Total Score
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // When a player wins
    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
    } else {
      switchPlayer();
    }
  }
});

// Restart The Game
btnNew.addEventListener('click', function () {
  console.log('restart');
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('active--player');
  score = [0, 0];
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  document.getElementById('current--0').textContent = currentScore;
  document.getElementById('current--1').textContent = currentScore;
});
// How to play
btnInstr.addEventListener('click', instructions);

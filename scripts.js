
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matches = 0;
var couples_num = 15;

function flipCard() {
  if (lockBoard)
    return;
  if (this === firstCard) //handle double click
    return;
  this.classList.add('flip');

  if (!hasFlippedCard) {//click on a card only once
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  else { //second click
    moves += 1;
    hasFlippedCard = false;
    secondCard = this;
  }

  if (matches === (couples_num - 1)) {
    alert("The game is over!");
  }

  document.getElementById("moves").innerHTML = moves;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework)
  //it's a match
  {
    matches += 1;
    document.getElementById("matches").innerHTML = matches;
    disableCards();
  }

  else //not a match
    unflipCards();

}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 800); //back to backCard

}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  econdCard = null;
}


(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * 2 * couples_num);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


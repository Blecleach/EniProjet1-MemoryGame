console.log("coucou");

const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  //   if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
  isVictory();
}

function checkForMatch() {
  let isMatch =
    firstCard.querySelector(".front-face").src ===
    secondCard.querySelector(".front-face").src;
  // carte "désactivées" si c'est un match, sinon unflip
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
function isVictory() {
  const flippedCards = document.querySelectorAll(".card.flip");
  if (flippedCards.length === cards.length) {
    alert("Bravo !");
  }
}
function resetGame() {
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  resetBoard();
  shuffle();
}
(function shuffle() {
  cards.forEach((card) => {
    let randomCardPos = Math.floor(Math.random() * 12);
    card.style.order = randomCardPos;
  });
})();
// raccourci barre d'espace
document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    resetGame();
  }
});
cards.forEach((card) => card.addEventListener("click", flipCard));

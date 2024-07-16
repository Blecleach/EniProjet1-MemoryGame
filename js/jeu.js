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
  }, 500);
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
    card.classList.add("no-transition");
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  resetBoard();
  shuffle();
}
function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

function resetGame() {
  cards.forEach((card) => {
    // vire les transitions
    card.style.transition = "none";
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  resetBoard();
  setTimeout(() => {
    shuffle();
    // remet les transitions
    cards.forEach((card) => {
      card.style.transition = "";
    });
  }, 100);
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    resetGame();
  }
});
cards.forEach((card) => card.addEventListener("click", flipCard));

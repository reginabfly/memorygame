//Create a list that holds all of your cards
let deck = document.querySelector(".deck");
let card = document.getElementsByClassName("card");
let cards = [...card];

//arrays to hold matching and non-matching cards
let openedCards = []; 
let matchedCards = []; 

//display the card's symbol (put this functionality in another function that you call from this one)
let flipCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
}

//set up the event listener for a card. If a card is clicked:
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    cards[i].addEventListener("click", flipCard);
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//put shuffled cards on deck
function shuffle2 () {
    let shuffledCards = shuffle(cards);
    let deck = document.querySelector(".deck");
    for (let i = 0; i < cards.length; i++) {
        cards[i].parentNode.removeChild(cards[i]);
    }
    for (let c = 0; c < shuffledCards.length; c++) {
        deck.appendChild(shuffledCards[c]);
        }
};

window.onload = shuffle2();

//add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
//if the list already has another card, check to see if the two cards match
//if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
deck.addEventListener("click", function(event) {
    let clickedElem = event.target;
    if (event.target.classList.contains('card') && openedCards.length < 2) {
        flippedCardsFunc(event);
    }   else if (openedCards[0] === openedCards[1]) {
        matched ();
        } else if (openedCards[0] !== openedCards[1] && openedCards.length === 2) {
            removeOpenedClasses();
            card.classList.addClass("disabled");
        }
  });

function flippedCardsFunc (event) {
    openedCards.push(event.target);
}

function removeOpenedClasses () {
    openedCards[0].classList.remove("open", "show");
    openedCards[1].classList.remove("open", "show");
    openedCards = [];
}

function matched () {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards[0].push(matchedCards);
    openedCards[1].push(matchedCards);
    openedCards = [];
}

//if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)


//increment the move counter and display it on the page (put this functionality in another function that you call from this one)
//if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

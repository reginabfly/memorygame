//Create a list that holds all of your cards
let card = document.getElementsByClassName("card");
let cardsArray = [...card];
let moves = 0;

//arrays to hold matching and non-matching cards
let openedCardsArray = [];
let matchedCardsArray = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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
function putShuffledCardsOnDeck() {
    let shuffledCards = shuffle(cardsArray);
    let deck = document.querySelector(".deck");
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].parentNode.removeChild(cardsArray[i]);
    }
    for (let c = 0; c < shuffledCards.length; c++) {
        deck.appendChild(shuffledCards[c]);
    }
};

//request shuffling of the cards when page loads
window.onload = putShuffledCardsOnDeck();

//display the card's symbol
function flipCard(theCardSelected) {
    theCardSelected.classList.toggle("open");
    theCardSelected.classList.toggle("show");
}

function cardEventListener(event) {
    flipCard(event.target);
    //add the card to a *list* of "open" cards
    if (event.target.classList.contains('card') && openedCardsArray.length < 2) {
        addToListOpenedCards(event);
    }
    //if the list already has another card, check to see if the two cards match
    if (openedCardsArray.length === 2) {
        if (openedCardsArray[0].children[0].className === openedCardsArray[1].children[0].className) {
            //if the cards do match, lock the cards in the open position
            trackMatchedCards();
        } else {
            //remove event listener until timer is done
            for (let i = 0; i < cardsArray.length; i++) {
                cardsArray[i].removeEventListener("click", cardEventListener);
            };
            //timer slows down flipping of the card
            setTimeout(function flipCardsBackOverAfterDelay() {
                //if the cards do not match, remove the cards from the list and hide the card's symbol 
                removeOpenedClasses();
                //add event listener back after timer expires
                for (let i = 0; i < cardsArray.length; i++) {
                    cardsArray[i].addEventListener("click", cardEventListener);
                };
            }, 1000);
        }
    }
};

//set up the event listener for a card if it is clicked
for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].addEventListener("click", cardEventListener);
    cardsArray[i].addEventListener("click", increaseMoveCounterFunc);
};

function addToListOpenedCards(event) {
    openedCardsArray.push(event.target);
}

function removeOpenedClasses() {
    openedCardsArray[0].classList.remove("open", "show");
    openedCardsArray[1].classList.remove("open", "show");
    openedCardsArray = [];
}

function trackMatchedCards() {
    openedCardsArray[0].classList.add("match", "disabled");
    openedCardsArray[1].classList.add("match", "disabled");
    openedCardsArray[0].classList.remove("show", "open");
    openedCardsArray[1].classList.remove("show", "open");
    matchedCardsArray.push(openedCardsArray[0]);
    matchedCardsArray.push(openedCardsArray[1]);
    openedCardsArray = [];
}

//increment the move counter and display it on the page
function increaseMoveCounterFunc () {
    moves++;
    document.querySelector("span").textContent = moves;
}

//if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
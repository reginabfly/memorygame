//list that holds all of your cards
let card = document.getElementsByClassName("card");
let cardsArray = [...card];

//declarations for functions
let moves = 0;
let stars = document.getElementsByClassName("star");
let starsArray = document.querySelectorAll(".stars li");
let timer = document.querySelector(".timer");

//timer
let second = 0,
    minute = 0;
let interval;
let timerRunning = false;

//arrays to hold matching and non-matching cards
let openedCardsArray = [];
let matchedCardsArray = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length,
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
    theCardSelected.classList.toggle("disabled");
}

function cardEventListener(event) {
    startTimer();
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
    starsDisplayChange();
};

//set up the event listener for a card if it is clicked
for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].addEventListener("click", cardEventListener);
};

function addToListOpenedCards(event) {
    openedCardsArray.push(event.target);
    if (openedCardsArray.length === 2) {
        increaseMoveCounterFunc();
    }
}

function removeOpenedClasses() {
    openedCardsArray[0].classList.remove("open", "show", "disabled");
    openedCardsArray[1].classList.remove("open", "show", "disabled");
    openedCardsArray = [];
}

function trackMatchedCards() {
    openedCardsArray[0].classList.add("match", "disabled");
    openedCardsArray[1].classList.add("match", "disabled");
    openedCardsArray[0].classList.remove("show", "open", "disabled");
    openedCardsArray[1].classList.remove("show", "open", "disabled");
    matchedCardsArray.push(openedCardsArray[0]);
    matchedCardsArray.push(openedCardsArray[1]);
    openedCardsArray = [];
    finalScoreModal();
}

//increment the move counter and display it on the page
function increaseMoveCounterFunc() {
    moves++;
    document.querySelector("span").textContent = moves;
}

//remove stars as move counter increases
function starsDisplayChange() {
    if (moves < 12) {
        //display 3 stars
    } else if (moves >= 12 && moves <= 20) {
        //display 2 stars
        starsArray[0].getElementsByTagName('i')[0].classList.remove("fa-star");
        starsArray[0].getElementsByTagName('i')[0].classList.add("fa-star-o");
    } else {
        //display 1 star
        starsArray[0].getElementsByTagName('i')[0].classList.remove("fa-star");
        starsArray[0].getElementsByTagName('i')[0].classList.add("fa-star-o");
        starsArray[1].getElementsByTagName('i')[0].classList.remove("fa-star");
        starsArray[1].getElementsByTagName('i')[0].classList.add("fa-star-o");
    }
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        second = 0;
        minute = 0;
        interval = setInterval(function () {
            second++;
            timer.innerHTML = minute + " mins " + second + " secs";
            if (second == 60) {
                minute++;
                second = 0;
            }
        }, 1000);
    }
}

function stopTimer() {
    if (timerRunning) {
        timerRunning = false;
        clearInterval(interval);
    }
}

//reset deck, openCardsArray, matchedCardsArray, timer, moves and stars when user clicks reset button
document.querySelector(".restart").addEventListener("click", resetGame);

function resetGame() {
    //reshuffle cards
    putShuffledCardsOnDeck();
    //put all stars back
    starsArray[0].getElementsByTagName('i')[0].classList.remove("fa-star-o");
    starsArray[0].getElementsByTagName('i')[0].classList.add("fa-star");
    starsArray[1].getElementsByTagName('i')[0].classList.remove("fa-star-o");
    starsArray[1].getElementsByTagName('i')[0].classList.add("fa-star");
    starsArray[2].getElementsByTagName('i')[0].classList.remove("fa-star-o");
    starsArray[2].getElementsByTagName('i')[0].classList.add("fa-star");
    //reset moves counter
    moves = 0;
    document.querySelector("span").textContent = moves;
    //set arrays back to empty
    matchedCardsArray = [];
    openedCardsArray = [];
    //reset timer
    second = 0;
    minute = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    //turn over all cards
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].classList.remove("show", "open", "match", "disabled");
    }
}

//if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
function finalScoreModal() {
    if (matchedCardsArray.length === 16) {
        setTimeout(function delayModalPopup() {
            document.getElementById("modal").style.display = "block";
        }, 1000);
        //get results from moves, stars and timer to display in modal
        document.getElementsByClassName("final-moves")[0].innerHTML = moves;
        let starCount = document.getElementsByClassName("fa-star").length;
        document.getElementsByClassName("star-rating")[0].innerHTML = starCount;
        document.getElementsByClassName("total-time")[0].innerHTML = timer.innerHTML;
        stopTimer();
        //close the modal
        let span = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
    }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function playAgain() {
    resetGame();
    modal.style.display = "none";
};

// A deck with all of the cards in the game
const deck = document.getElementById("card-deck");

// Declare modal
let modal = document.getElementById("popup1")

// Declares the variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// A card array which holds all the cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// An array for all the opened card
var openedCards = [];

// This bit of code shuffles all the cards
// When the array is shuffled with all the cards in it, it comes back as the variable "shuffledarray"
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
};

// This function is to start the game from the beginning
function startGame(){
 
    // This line empties the array below called "openedCards".
    openedCards = [];

    // The line below shuffles the deck.
    cards = shuffle(cards);

    // This bit of code removes all the classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
}

// This line shuffles all the cards when the page is loading or whenever it gets refreshed
document.body.onload = startGame();

// Togglesopen and shows the class to display all the cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

// This function adds the opened cards to the OpenedCards list and checks if they are a match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } 
        else {
            unmatched();
        }
    }
};

// This function checks if the opened cards are a match or not
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// This function decides what happends when the cards dont match, if they match they both will be opened, stay opened and turn green, if not...
// ...both of the cards close down again. The ,500 means there is a 0.5 second cooldown to wait when you dont get a pair.
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
        }
        ,500);
}

// This function disables the player temporarily from clicking anyother card, kinda like a cooldown so you cant accidentally bug the game by clicking too fast.
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

// This function enables cards and disables the matched cards so you cant use them again.
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// This function makes it so that if all the cards are matched and there are no cards left hence the number 16 (because then no cards are left)...
// ...the pop up which will say "congratulations you are a winner" and wheter the user wants to play again or not pops up.
function congratulations(){
    if (matchedCard.length == 16){

        // This line shows the congratulations popup
        modal.classList.add("show");
    };
}

// This function is made for the user to play again.
function playAgain(){
    modal.classList.remove("show");
    startGame();
}

// This is a loop which adds event listerners to each card. 
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
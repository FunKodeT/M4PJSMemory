// --VARIABLES START--

const cards = document.querySelectorAll('.memory-card');
    /*
        - Constant variable 'cards' specified using index.html class="memory-card"
        - This is the variable determing what a card is according to the html
    */
let hasFlippedCard = false;
    /*
        - Varying variable 'hasFlippedCard' specified as 'false'
        - This is the variable for if a card has been flipped by the user or not 
    */
let lockBoard = false;
    /*
        - Varying variable 'lockBoard' specified as 'false'
        - This variable establishes a variable to call in order to determine if the game board is locked from being clicked or not
    */
let firstCard, secondCard;
    /*
        - Varying variables 'firstCard' and 'secondCard' established
        - This establishes the variables for the first card clicked and the second card clicked in the game
    */

// FUNCTIONS START

function flipCard(){
    /* 
        - This function establishes the rules for how cards flip
    */
    if(lockBoard) return;
    /*
        - If the lockboard variable is (true/false?) you (can/cannot?) flip the card
    */
    if(this === firstCard) return;
    /*
        - Informs if this is the first card that is flipped
    */
    this.classList.add('flip');
    /*
        - Instructs the card to flip if it is equal to 'this'
    */
    if(!hasFlippedCard){
        /*
            - This determines the rules for if the flipped card value is true
        */
        hasFlippedCard = true;
        /*
            - This says the card has been flipped
        */
        firstCard = this;
        /*
            - This says the first card variable is equal to this
        */
        return;
        /*
            - This tells the script to go back if the first card is equal to true(?)
        */
        }
        secondCard = this;
        /*
            - This says the second card variable is equal to this
        */
        checkForMatch();
        /*
            - This tells the programs to see if the card data is matching
        */
}

function checkForMatch(){
    /*
        - This establishes the function for checking if the cards match
    */
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    /*
        - This specified a variable that checks to see if the data of the cards is the same
    */
    isMatch ? disableCards() : unflipCards();
    /*
        - This says that if the cards match, disable the event listeners and don't flip them again
    */
}

function disableCards(){
    /*
        - This function establishes the rules for disabling the cards from further interaction til page reload
    */
    firstCard.removeEventListener('click', flipCard);
    /*
        - This removes the event listener for the first card in the match for flipping
    */
    secondCard.removeEventListener('click', flipCard);
    /*
        - This removes the event listener for the second card in the match for flipping
    */
    resetBoard();
    /*
        - This deactivates the lock, allowing interaction with the game again
    */
}

function unflipCards(){
    /*
        - This establishes the function to call for if the cards do not match
    */
    lockBoard = true;
    /*
        - This tells the board to not allow any further interactions while the lockboard rule runs
    */
    setTimeout(() => {
        /*
            - This applies a timer to automatically unflip them if not matching. This also keeps the cards from being clicked on multiple times and breaking the logic
        */
        firstCard.classList.remove('flip');
        /*
            - Removes the flip attribute to the first card
        */
        secondCard.classList.remove('flip');
        /*
            - Removes the flip attribute to the second card
        */
        resetBoard();
        /*
            - This deactivates the lock, allowing interaction with the game again
        */
    }, 1500);
    /*
        - This sets the timer at 1500 milliseconds before running the rule
    */
}

function resetBoard(){
    /*
        - This function deactivates the lockboard function, allowing interaction with the game again
    */
    [hasFlippedCard, lockBoard] = [false, false];
    /*
        - This sets the program to reset the card flip and board lock values to false
    */
    [firstCard, secondCard] = [null, null];
    /*
        - This sets the program to reset the first and second card values
    */
}

(function shuffle(){
    /*
        - This function allows for the cards to be randomly placed within the game
    */
    cards.forEach(card =>{
        /*
            - This says that each card will be selected to run the rule, and what that rule is
        */
        let randomPos = Math.floor(Math.random() * 12);
        /*
            - This establishes the value of between 0-11 and tells the cards to calcualte their positions based on the randomly assigned numbers applied to them via the math logic
        */
        card.style.order = randomPos;
        /*
            - This tells the board to determine card order based on their randomly given numbers and positions
        */
    })
})();

// --FUNCTIONS END--

cards.forEach(card => card.addEventListener('click', flipCard));
/*
    - Establishes an event listener for each card to flip
*/

/* Code written during tutorial

const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip');
    // this.classList.toggle('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        // console.log({hasFlippedCard, firstCard});
        return;
    // } else {
        // hasFlippedCard= false;
        secondCard = this;
        checkForMatch();
        // console.log({firstCard, secondCard});
        // console.log(firstCard.dataset.framework);
        // console.log(secondCard.dataset.framework);
    //     if(firstCard.dataset.framework === secondCard.dataset.framework){
    //         firstCard.removeEventListener('click', flipCard);
    //         secondCard.removeEventListener('click', flipCard);
    //         // console.log('Function was executed!');
    //     } else {
    //         setTimeout(() => {
    //         firstCard.classList.remove('flip');
    //         secondCard.classList.remove('flip');
    //     }, 1500)
    }
    // // console.log('I was clicked!');
    // // console.log(this);
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
    // if(firstCard.dataset.framework === secondCard.dataset.framework)
    // {
    //     disableCards();
    //     // firstCard.removeEventListener('click', flipCard);
    //     // secondCard.removeEventListener('click', flipCard);
    // } else {
    //     unflipCards();
    //     // setTimeout(() => {
    //     // firstCard.classList.remove('flip');
    //     // secondCard.classList.remove('flip');
    //     // }, 1500);
    // }
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
        // lockBoard = false;
        }, 1500);
}
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
(function shuffle(){
    cards forEach(card =>{
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();
cards.forEach(card => card.addEventListener('click', flipCard));
*/
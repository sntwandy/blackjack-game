/**
 *  2C = Two of Clubs
 *  2D = Two of Diamonds
 *  2H = Two of Hearts
 *  2S = Two of Spades
 */

// HTML refences
const btnNewGame = document.querySelector('#btnNewGame');
const btnRequestCard = document.querySelector('#btnRequestCard');
const btnStop = document.querySelector('#btnStop');
const pointsContainer = document.querySelectorAll('small');
const playerCards = document.querySelector('#player-cards');
const computerCards = document.querySelector('#computer-cards');

// variables
let deck = [];
const cardTypes = ['C', 'D', 'H', 'S'];
const cardTypesSpecials = ['A', 'J', 'Q', 'K'];
let playerPoints = 0, computerPoints = 0;

// Create a new deck
const createDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let cardType of cardTypes) {
            deck.push(`${i}${cardType}`);
        };
    };

    for (let cardType of cardTypes) {
        for (let cardTypeSpecial of cardTypesSpecials) {
            deck.push(`${cardTypeSpecial}${cardType}`);
        };
    };

    // console.log(deck);
    deck = _.shuffle(deck);
    // console.log(deck);

    return deck;
};

createDeck();


// Pick a card

const pickCard = () => {

    if (deck.length === 0) {
        throw 'No cards';
    }

    const card = deck.pop();
    // console.log(card);
    // console.log(deck);
    return card;
};

// pickCard();

// Card value
const cardValue = (card) => {

    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
};

// computer turn
const computerTurn = (minPoints) => {
    do {
        const card = pickCard();
        computerPoints += cardValue(card);
        pointsContainer[1].innerText = computerPoints;

        computerCards.append(createCardDOM(card));

        if (minPoints > 21) {
            break;
        };

    } while ( (computerPoints < minPoints) && (minPoints <= 21));
}

// const value = cardValue(pickCard());

// Events
btnRequestCard.addEventListener('click', () => {

    const card = pickCard();
    playerPoints += cardValue(card);
    pointsContainer[0].innerText = playerPoints;

    playerCards.append(createCardDOM(card));

    playerLoose(playerPoints);
});

btnStop.addEventListener('click', () => {
    btnRequestCard.disabled = true;
    computerTurn(playerPoints);
    btnStop.disabled = true;
});

btnNewGame.addEventListener('click', () => {
    resetGame();
    createDeck();
});

// Create card to the DOM

const createCardDOM = (card) => {
    const cardImg = document.createElement('img');
    cardImg.classList.add('card');
    cardImg.src = `./assets/cartas/${card}.png`;

    return cardImg;
};

// Player loose

const playerLoose = (points) => {
    if (points > 21) {
        alert('Iam sorry, you lose!');
        btnRequestCard.disabled = true;
        btnStop.disabled = true;
        computerTurn(points);
    } else if (points === 21) {
        alert('Nice, you make 21!!');
        btnRequestCard.disbled = true;
        btnStop.disabled = tue;
        computerTurn(points);
    }
};

const resetGame = () => {
    deck = [];
    playerCards.innerText = '';
    computerCards.innerText = '';
    pointsContainer[0].innerText = '0';
    pointsContainer[1].innerText = '0';
    computerPoints = 0;
    playerPoints = 0;
    btnRequestCard.disabled = false;
    btnStop.disabled = false;
};
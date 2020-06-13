/**
 *  2C = Two of Clubs
 *  2D = Two of Diamonds
 *  2H = Two of Hearts
 *  2S = Two of Spades
 */


const gameModule = (() => {
    'use strict'

    // HTML refences
const btnNewGame = document.querySelector('#btnNewGame'),
        btnRequestCard = document.querySelector('#btnRequestCard'),
        btnStop = document.querySelector('#btnStop'),
        pointsContainer = document.querySelectorAll('small'),
        playersCards = document.querySelectorAll('.playersCards');

// variables
let deck = [];
const cardTypes = ['C', 'D', 'H', 'S'],
    cardTypesSpecials = ['A', 'J', 'Q', 'K'];
let playersPoints = [];

// Initializing Game
btnRequestCard.disabled = true;
btnStop.disabled = true;

const initializingGame = (playerNum = 2) => {
    playersPoints = [];
    for (let i = 0; i < playerNum; i++) {
        playersPoints.push(0);
    };

    pointsContainer.forEach(element => element.innerText = '0');
    playersCards.forEach(element => element.innerHTML = '');

    btnRequestCard.disabled = false;
    btnStop.disabled = false;
};

// Create a new deck
const createDeck = () => {
    deck = [];
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
    return deck = _.shuffle(deck);;
};

// Determinate win
const determinateWin = () => {
    const [minPoints, computerPoints] = playersPoints;
    setTimeout( () => {
        if (computerPoints === minPoints) {
            alert('Tied game');
        } else if (minPoints > 21) {
            alert('Computer Won!');
        } else if (computerPoints > 21) {
            alert('Player Won!');
        } else {
            alert('Computer Won');
        }
    }, 500 );
};

// Pick a card
const pickCard = () => (deck.length === 0) ? alert('No cards') : deck.pop();

// Get card value
const cardValue = (card) => {
    const value = card.slice(0, card.length - 1);
    return (isNaN(value)) ?
            (value === 'A') ? 11 : 10
            : value * 1;
};

// Accumulate points
const accumulatePoints = (turn, card) => {
    playersPoints[turn] += cardValue(card);
    pointsContainer[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
}

// computer turn
const computerTurn = (minPoints) => {
    let computerPoints = 0;
    do {
        const card = pickCard();
        computerPoints = accumulatePoints(playersPoints.length - 1, card);
        createCardDOM(card, playersCards.length - 1);
    } while ( (computerPoints < minPoints) && (minPoints <= 21));
    determinateWin();
};

// Events
btnRequestCard.addEventListener('click', () => {
    btnRequestCardFn();
});

btnStop.addEventListener('click', () => {
    btnRequestCard.disabled = true;
    computerTurn(playersPoints[0]);
    btnStop.disabled = true;
});

btnNewGame.addEventListener('click', () => {
    resetGame();
    createDeck();
});

// Create card to the DOM
const createCardDOM = (card, turn) => {
    const cardImg = document.createElement('img');
    cardImg.classList.add('card');
    cardImg.src = `./assets/cartas/${card}.png`;
    playersCards[turn].append(cardImg);
};

// Player action
const playerAction = (points) => {
    if (points > 21) {
        btnRequestCard.disabled = true;
        btnStop.disabled = true;
        computerTurn(points);
    } else if (points === 21) {
        setTimeout( () => {
            alert('Nice, you make 21!!');
        }, 500 );
        btnRequestCard.disabled = true;
        btnStop.disabled = true;
        computerTurn(points);
    }
};

// Btn request logic
const btnRequestCardFn = () => {
    const card = pickCard();
    const playerPoints = accumulatePoints(0 , card);

    createCardDOM(card, 0);

    playerAction(playerPoints);
};

// Reset the game
const resetGame = () => {
    initializingGame();
};

return {
    newGame : initializingGame,
};
})();
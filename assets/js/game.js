/**
 *  2C = Two of Clubs
 *  2D = Two of Diamonds
 *  2H = Two of Hearts
 *  2S = Two of Spades
 */

let deck = [];
const cardTypes = ['C', 'D', 'H', 'S'];
const cardTypesSpecials = ['A', 'J', 'Q', 'K'];

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

    console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
};

createDeck();
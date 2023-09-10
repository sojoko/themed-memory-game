const images = [
    'img/w1.jpg',
    'img/w2.jpg',
    'img/w3.png',
    'img/w4.jpg',
    'img/w5.jpg',
    'img/w6.gif',

];

const cards = [...images, ...images];

const cardContainer = document.querySelector('#grid-card');
const gridContainer = document.querySelector('.grid-container');
let primeraCarta = null;
let segundaCarta = null;
let counterForVictory = 0;
let cardsOpens = 0;
const totalCards = cards.length;
let cardsReference = [];

function suffleCards(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// function barajarCartas(array) {
//     let currentIndex = array.length;
//     let temporaryValue, randomIndex;
//
//
//     while (currentIndex !== 0) {
//
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;
//
//
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//
//     return array;
// }



console.log(cards)
function startGame() {



suffleCards(cards);
console.log(cards)

cards.forEach((imagen, index) => {
    const card = document.createElement('div');
    card.classList.add('grid-card')

    const image = document.createElement('img');
    image.classList.add('inactive')
    image.src = imagen;
    image.alt = 'Card';


    card.appendChild(image);
    gridContainer.appendChild(card);

    card.addEventListener('click', () => {


        if (!primeraCarta) {
            primeraCarta = card.querySelector('img');
            primeraCarta.classList.remove('inactive');
            console.log('la primera ' + primeraCarta.src)

        } else if (primeraCarta !== card && !segundaCarta) {
            segundaCarta = card.querySelector('img');
            segundaCarta.classList.remove('inactive');
            console.log('la segunda ' + segundaCarta.src)


            if (primeraCarta.src === segundaCarta.src) {
                primeraCarta = null;
                segundaCarta = null;

                cardsOpens += 2;
                console.log(cardsOpens)

            } else {
                setTimeout(() => {
                    primeraCarta.classList.add('inactive');
                    segundaCarta.classList.add('inactive');
                    primeraCarta = null;
                    segundaCarta = null;
                }, 800);
            }
            if (cardsOpens == totalCards) {

                setTimeout(restartGameForVictory, 700);
            }
        }


    });

    cardsReference.push(card.querySelector('img'));
    console.log(cardsReference)

})

}




function restartGameForVictory() {
    primeraCarta = null;
    segundaCarta = null;
    cardsOpens = 0;


    cardsReference.forEach((img) => {
        img.classList.add('inactive')
    })
    suffleCards(cards);
    console.log(cards)

}


restartGameForVictory()

startGame()




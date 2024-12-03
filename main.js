const images = [
    'img/w1.jpg',
    'img/w2.jpg',
    'img/w3.png',
    'img/w4.png',
    'img/w5.png',
    'img/w6.png',
];

const cards = [...images, ...images];

const gridContainer = document.querySelector('.grid-container');

const winMessage = document.createElement('div');
winMessage.id = 'win-message';
winMessage.classList.add('hidden');
winMessage.innerHTML = '<p>¡Ganaste! 🎉 Felicidades</p>';
document.body.appendChild(winMessage);

let primeraCarta = null;
let segundaCarta = null;
let cardsOpens = 0;
const totalCards = cards.length;
const image = document.createElement('img');


function suffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showWinMessage() {
    winMessage.classList.remove('hidden');
    winMessage.classList.add('show');

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        winMessage.classList.remove('show');
        winMessage.classList.add('hidden');
    }, 3000);
}

function restartGameForVictory() {
    showWinMessage(); //

    setTimeout(() => {
        primeraCarta = null;
        segundaCarta = null;
        cardsOpens = 0;
        gridContainer.innerHTML = '';
        startGame();
    }, 3000);
}

function startGame() {
    suffleCards(cards);

    cards.forEach((imagen) => {
        const card = document.createElement('div');
        card.classList.add('grid-card');

        const image = document.createElement('img');
        image.src = imagen;
        image.alt = 'Card';
        image.classList.add('inactive');
        card.appendChild(image);
        gridContainer.appendChild(card);

        card.addEventListener('click', () => {
            if (image.classList.contains('active')) return;


            if (!primeraCarta) {
                primeraCarta = image;
                primeraCarta.classList.remove('inactive');
                primeraCarta.classList.add('active');
            } else if (!segundaCarta) {
                segundaCarta = image;
                segundaCarta.classList.remove('inactive');
                segundaCarta.classList.add('active');


                if (primeraCarta.src === segundaCarta.src) {
                    primeraCarta = null;
                    segundaCarta = null;
                    cardsOpens += 2;

                    if (cardsOpens === totalCards) {
                        restartGameForVictory();
                    }
                } else {

                    setTimeout(() => {
                        primeraCarta.classList.remove('active');
                        primeraCarta.classList.add('inactive');
                        segundaCarta.classList.remove('active');
                        segundaCarta.classList.add('inactive');
                        primeraCarta = null;
                        segundaCarta = null;
                    }, 800);
                }
            }
        });
    });
}

// Iniciar el juego por primera vez
startGame();


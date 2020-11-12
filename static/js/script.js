// const { func } = require("prop-types");

//Challenge 1
function ageInDays() {
    var birthYear = prompt("Type your birth year");
    var age = (2020 - birthYear) * 365;
    var h1 = document.createElement("h1");
    var textAnswer = document.createTextNode("You are " + age + " days old");
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function resetAgeInDays() {
    document.getElementById('ageInDays').remove();
}


//Challenge 2
var generation = 0;
function generateCat() {
    var image = document.createElement("img");
    var div = document.getElementById("flex-cat-gen");
    image.src = "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/cat_16x9.jpg?itok=1uV8V4Gl";
    image.setAttribute('id', 'imgss');
    div.appendChild(image);
    generation++;
}

function resetImages() {
    if (generation > 0) {
        document.getElementById("imgss").remove();
        generation--;
    }
}

function resetAllImages() {
    var full = generation;
    for (var i = 0; i < full; i++) {
        resetImages();
    }
}


//Challenge 3
function rpsGame(yourChoice) {
    var humanChoice = yourChoice.id;
    var botChoice = numberToChoice(Math.floor(Math.random() * 3));
    results = decideWinner(humanChoice, botChoice);
    message = finalMessage(results);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'scissors': document.getElementById('scissors').src,
        'paper': document.getElementById('paper').src,
    }
    document.getElementById('rock').remove();
    document.getElementById('scissors').remove();
    document.getElementById('paper').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style = 'box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messageDiv.innerHTML = "<h1 = style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style = 'box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

function finalMessage(results) {
    if (results === 0) return { 'message': 'You lost!', 'color': 'red' };
    else if (results === 0.5) return { 'message': 'You tied!', 'color': 'yellow' };
    else return { 'message': 'You won!', 'color': 'green' };
}

function decideWinner(yourChoice, botChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'scissors': { 'scissors': 0.5, 'rock': 0, 'paper': 1 },
        'paper': { 'scissors': 0, 'rock': 1, 'paper': 0.5 }
    }
    var yourScore = rpsDatabase[yourChoice][botChoice];
    return yourScore;
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}


//Challenge 4
var allButtons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}


function buttonColorChange(optionChoosen) {
    if (optionChoosen.value === 'red') {
        buttonRed();
    }
    else if (optionChoosen.value === 'green') {
        buttonGreen();
    }
    else if (optionChoosen.value === 'reset') {
        buttonColorReset();
    }
    else if (optionChoosen.value === 'random') {
        randomColors();
    }
}

function buttonRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning', 'btn-info'];
    for (let i = 0; i < allButtons.length; i++) {
        var randomNumber = Math.floor(Math.random() * choices.length);
        // console.log(randomNumber);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomNumber]);
    }
}

//Challenge 5: Blackjack

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);


let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false
};



const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lostSound = new Audio('static/sounds/aww.mp3');


function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(YOU, card);
        updateScore(YOU, card);
        showScore(YOU);
    }
}

function randomCard() {
    let numb = Math.floor(Math.random() * 13);
    // console.log(numb);
    return blackjackGame['cards'][numb];
}


function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector(YOU['div']).querySelectorAll('img');
        let dealerImages = document.querySelector(DEALER['div']).querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;

        document.querySelector(YOU['scoreSpan']).style.color = '#ffffff';
        document.querySelector(DEALER['scoreSpan']).style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }

}

function updateScore(activePlayer, card) {
    if (card === 'A' && activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21)
        activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    else if (card === 'A')
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    else
        activePlayer['score'] += blackjackGame['cardsMap'][card];
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "!BUST";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}


function dealerLogic() {
    blackjackGame['isStand'] = true;
    let card = randomCard();
    showCard(DEALER, card);
    updateScore(DEALER, card);
    showScore(DEALER);

    if (DEALER['score'] > 15) {
        blackjackGame['turnsOver'] = true;
        showResult(computeWinner());
    }
    // showResult(computeWinner());
}

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (DEALER['score'] > 21 || YOU['score'] > DEALER['score']) {
            winner = YOU;
            blackjackGame['wins']++;
        }
        else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
            blackjackGame['losses']++;
        }
        else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
    }
    else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
        blackjackGame['losses']++;
    }
    else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner) {
    let message, messageColor;
    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Win!';
            messageColor = 'green';
            winSound.play();
        }
        else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lostSound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}
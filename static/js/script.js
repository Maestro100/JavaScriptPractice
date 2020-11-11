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
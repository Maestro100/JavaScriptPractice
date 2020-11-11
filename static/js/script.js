// Challenge 1: Age in days

function ageInDays(){
    var birthYear = prompt("Type your birth year");
    var age = (2020-birthYear) *365;
    var h1 = document.createElement("h1");
    var textAnswer = document.createTextNode("You are "+age+" days old");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function resetAgeInDays(){
    document.getElementById('ageInDays').remove();
}
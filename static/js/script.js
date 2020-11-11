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

var generation = 0;
function generateCat(){
    var image = document.createElement("img");
    var div = document.getElementById("flex-cat-gen");
    image.src = "https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/cat_16x9.jpg?itok=1uV8V4Gl";
    image.setAttribute('id','imgss');
    div.appendChild(image);
    generation++;
}

function resetImages(){
    if(generation>0) {
        document.getElementById("imgss").remove();
        generation--;
    }
}

function resetAllImages(){
    var full = generation;
    for(var i=0;i<full;i++){
        resetImages();
    }
}
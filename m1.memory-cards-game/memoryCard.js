let arrayOfCards = [];
let arrayOfOpenCards=[];
let game = {gameScore: 0,matches: 0,start:false};
const inputNumOfRows = document.querySelector("input[type='number']");
const container = document.querySelector("#Container");
const gameMessage = document.querySelector('#gameMessage');
const score = document.querySelector('#score');
const timeText = document.getElementById('time');
const gameLevel = document.getElementById('gameLevel');
const btnRestart = document.getElementById('btnRestart');
let classTimer = {
    minutes:3,
    seconds:0,
    Id:0,
    timesUp:false,
    setSec:function(sec){
        if (sec<0 && this.minutes> 0){
            this.seconds = 59;
            this.minutes--;
        }
        else if (sec<0 && this.minutes== 0){
            this.timesUp = true;
        }
        else{
            this.seconds--;
        }
    },
    displaySec:function(){
        if (this.seconds>=0 && this.seconds<10){
            return "0"+this.seconds;
        }
        else{
            return this.seconds;
        }
    }
};

document.querySelector('#btnBuildBoard')
        .addEventListener("click" ,function(){fncBuildBoard(inputNumOfRows);});

document.querySelector('#btnRestart')
        .addEventListener("click" ,function(){fncRestart(inputNumOfRows);});   

gameLevel.addEventListener("change", function(){
    classTimer.minutes = this.value;
    timeText.value='0'+classTimer.minutes + ':' + classTimer.displaySec();});

window.onload = function(){
    document.querySelector("input[type='number']").value = 4;
    gameMessage.readOnly=true;
    score.readOnly = true;
    timeText.readOnly = true;
    CreateArrayOfCards(inputNumOfRows.value);
    timeText.value='0'+classTimer.minutes + ':' + classTimer.displaySec();
}
function fncBuildBoard(inputNumOfRows){
    InitGame();
    CreateArrayOfCards(inputNumOfRows.value);
    gameLevel.disabled = true;
    InitTimer();
}
function fncRestart(inputNumOfRows){
    InitGame();
    CreateArrayOfCards(inputNumOfRows.value);
    gameLevel.disabled = false;
    clearInterval(classTimer.Id);
    timeText.value='0'+classTimer.minutes + ':' + classTimer.displaySec();
    
}
function CreateArrayOfCards(NumOfRows){ 
    BuildArrayOfCards(NumOfRows);
    let card =0;
    for (let row =1; row<=NumOfRows;row++){
            let RowDiv = document.createElement('div');
            RowDiv.className = 'row';
            RowDiv.style.height =100/NumOfRows+'%';
        for(let col =1; col<=NumOfRows;col++){
            let cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.id = arrayOfCards[card];
            cardDiv.style.width = 100/NumOfRows+'%';
            cardDiv.addEventListener("click",btnCardClicked);

            let image = document.createElement('img');
            image.setAttribute("src", "Images/"+arrayOfCards[card]+".jpeg");

            cardDiv.appendChild(image);
            RowDiv.appendChild(cardDiv);
            card++;
        }  
        container.appendChild(RowDiv);   
    } 
}
function BuildArrayOfCards(NumOfRows) {
    for (let row = 1; row <= NumOfRows * NumOfRows / 2; row++) {
        arrayOfCards.push(row);
        arrayOfCards.push(row);
    }
    shuffle(arrayOfCards);
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
function InitGame() {
    score.value ="";
    gameMessage.value ="";
    game.start = true;
    arrayOfCards = [];
    container.innerHTML = "";
    classTimer.seconds = 0;
    classTimer.minutes = gameLevel.value;
}
function btnCardClicked(e){
    if (arrayOfOpenCards.length ===2) {// Prevent picking up three cards
        return;
    }
    if (e.target.nodeName==="IMG") { // Prevent clicking on the same card again (When it's already open)
        return;
    }
    if (classTimer.timesUp === true){ //After finish cowntdown
        return;
    }
    if (game.start === false){ //Before game start
        return;
    }
    arrayOfOpenCards.push(e.target);

    if (arrayOfOpenCards.length === 1){
        if (gameMessage.classList.contains("match")){
            gameMessage.classList.toggle("match");
        }     
        arrayOfOpenCards[0].childNodes[0].classList.toggle("visible"); 
        gameMessage.value ="";
    }

    if(arrayOfOpenCards.length ===2){
        arrayOfOpenCards[1].childNodes[0].classList.toggle("visible"); 
        if(arrayOfOpenCards[0].id === arrayOfOpenCards[1].id){
            gameMessage.value ="Correct!";
            gameMessage.classList.toggle("match");
            arrayOfOpenCards=[];
            game.matches++;
            score.value = game.matches;
            CheckIfGameOver();
        }
        else{
            gameMessage.value ="Wrong!";
            window.setTimeout(closeCards,1500);
        }        
    }
}
function closeCards() {
    for (let indx =0;indx<arrayOfOpenCards.length;indx++){
        arrayOfOpenCards[indx].childNodes[0].classList.toggle("visible"); 
    }
    arrayOfOpenCards=[];
    gameMessage.value ="";
}
function CheckIfGameOver(){
    var NumOfRows = inputNumOfRows.value;
    if (game.matches === NumOfRows*NumOfRows/2){
        gameMessage.value ="Complete!";
        clearInterval(classTimer.Id);
        gameLevel.disabled = false;
    }
}
function timer(){
    timeText.value='0'+classTimer.minutes + ':' + classTimer.displaySec();
    classTimer.setSec(classTimer.seconds-1);
    if (classTimer.timesUp) {
        clearInterval(classTimer.Id);
        gameMessage.value ="Game over!";
        gameLevel.disabled = false;
        }  
}
function InitTimer(){
        clearInterval(classTimer.Id);
        classTimer.timesUp = false;
        classTimer.Id = setInterval(timer,1000);
}
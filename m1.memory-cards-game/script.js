
const app = {
    score: 0,
    cards: [1, 1, 2, 2, 3, 3, 4, 4],
    init: function () {
        app.shuffle();
    },
    shuffle: function () {
        let random = 1;
        let temp;
     
        for (let i = 0; i <= 7; i++) {
            random = Math.floor(Math.random() * i) + 1;
            temp = app.cards[i];
            app.cards[i] = app.cards[random];
            app.cards[random] = temp;
        }
        app.assignCards();
    },
    assignCards: function () {
        let cards = document.querySelectorAll("div.card");
        for (i = 0; i <= 7; i++) {
            cards[i].setAttribute("data-card-value", app.cards[i]);
        }
        app.clickCardsHandlers();
    },
    clickCardsHandlers: function () {
        let elements = document.querySelectorAll("div.card");
        elements.forEach( element => {
            element.addEventListener("click", function () {
                element.innerHTML = element.getAttribute("data-card-value");
                element.style.background = '#ffffff';
                element.classList.add("selected");
                app.checkMatch();
            });
        });
    },
    checkMatch: function(){
        /* Array which contains the cards with selected class. */
        let selectedCards = document.getElementsByClassName('selected');
        let cards =  document.querySelectorAll("div.card");
        let scoreElem = document.getElementById('score');
        /* if the array contains two parameters*/ 
        if(selectedCards.length === 2){
            let firstCard = selectedCards[0];
            let seconsCard = selectedCards[1];
            //match success
           if(firstCard.getAttribute("data-card-value") === seconsCard.getAttribute("data-card-value")){
               for(i=0; i<selectedCards.length;i++){
                   selectedCards[i].style.background = "#99ff99";
               }
               app.score ++;
               scoreElem.innerHTML = app.score;
           }
           // match failed
           else{
                setTimeout(function(){ 
                    firstCard.innerHTML = "";
                    seconsCard.innerHTML = ""; 
                    firstCard.style.background = ""
                    seconsCard.style.background = ""
                }, 1000);
           }
           for(i=0;i<cards.length;i++){
               cards[i].classList.remove('selected');
           }
           
       }
   }
   
};


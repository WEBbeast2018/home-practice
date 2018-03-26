
let cards = [];
let ValueCards = [];
let NumRows = 4; // u can change it as u want
//to check if the picked card is  the first or the secend card
let firstCard = true;
//to save the the value of the picked card
let pickedCardValue;
//score
let score = 0;
//the saved event target for the card
let targetCard;
//the saved event target for the  previus card
let previusTargetCard;
//saved the num of match to knwo when the game is done 
let NumOfMatch = 0;

//insert the num to the array (and efter that we insert the num in the cards)
for (let i = 0; i < NumRows * (NumRows / 2); i++) {
  cards[i] = i + 1;
}

//dbl the cards array value
cards = cards.concat(cards);

//shuflle the cards
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
//call the func to shafle the cards
shuffle(cards);

// create the cards
function create_cards() {
  let cardBlockDiv = document.createElement('div');
  cardBlockDiv.className = 'card_block';
  document.body.appendChild(cardBlockDiv);
  for (let i = 1; i <= NumRows; i++) {
    let Rows = document.createElement('div');
    Rows.className = 'row';
    document.querySelector('.card_block').appendChild(Rows);
    for (let j = 1; j <= NumRows; j++) {
      let cardsArcticle = document.createElement('article');
      cardsArcticle.className = 'card_block S_card';
      Rows.appendChild(cardsArcticle);
    }
  }
}
//call to create_cards func
create_cards();

//put the card suffle num in html txt.
let btnn = document.querySelectorAll('.S_card');
for (let i = 0; i < cards.length; i++) {
  btnn[i].innerHTML = cards[i];
}

//func to call in a match cards
function succes_func(targetCard, previusTargetCard) {
  score += 10;
  document.getElementById('ID_score').innerHTML = `score = ${score}`;
  targetCard.style.backgroundColor = 'green';
  previusTargetCard.style.backgroundColor = 'green';
  firstCard = true;
  NumOfMatch++;
  //to check if u win the game
  if (NumOfMatch == cards.length) { alert(`you win! the score is: ${score}`); }
}

//func to call in a unmatch cards
function fail_func(targetCard, previusTargetCard) {
  if (score <= 5 ? score = 0 : score -= 5);
  document.getElementById('ID_score').innerHTML = `score = ${score}`;
  targetCard.style.backgroundColor = 'red';
  previusTargetCard.style.backgroundColor = 'red';
  document.getElementById('ID_score').style.color = 'red';
  resset_card(targetCard, previusTargetCard);
}

//func to call to resset the unmatch clicked card
function resset_card(targetCard, previusTargetCard) {
  var x = document.getElementById("txt");
  setTimeout(function () {
    targetCard.style.backgroundColor = '#f9e6ff';
    previusTargetCard.style.backgroundColor = '#f9e6ff';
    targetCard.style.fontSize = '0px';
    previusTargetCard.style.fontSize = '0px';
    document.getElementById('ID_score').style.color = '#5c0d41';
  }, 1000);
}

//funf to call when card clicked
function myfunc1(event) {
  targetCard = event.target;
  targetCard.style.fontSize = '100px';
  if (firstCard) {
    pickedCardValue = targetCard.innerHTML;
    previusTargetCard = targetCard;
    firstCard = false;
  }
  else if (targetCard.innerHTML == pickedCardValue && targetCard.id != previusTargetCard.id) {
    succes_func(targetCard, previusTargetCard);
  }
  else {
    firstCard = true;
    fail_func(targetCard, previusTargetCard);
  }
}

// add a event listener to cards
let btn = document.querySelectorAll('.S_card');
for (let i = 0; i < btn.length; i++) {
  btn[i].setAttribute("id", i + 1);
  btn[i].addEventListener("click", myfunc1);
}
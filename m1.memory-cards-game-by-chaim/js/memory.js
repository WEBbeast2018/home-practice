const dly = 500; // the delay interval

    let pair = false;
    let myCardId = '';
    let beenClicked = new Set();
    let stopWatch = null;
    let multiplier = 0;

    const count = document.getElementById('count');
    const match = document.getElementById('match');
    let counter = 0;
    let matched = 0;

    function renderBoard(target, select) {
      let size = 1;
      let myMap = new Map();
      while (target.hasChildNodes()) { target.removeChild(target.firstChild); }
      select.forEach(entry => { if (entry.checked) { size = parseInt(entry.value); } });
      multiplier = ((size * size) / 2);

      for (i = 1; i < size + 1; i++) {
        let div = document.createElement('div');
        for (j = 1; j < size + 1; j++) {
          let id = "card" + i + j;

          let alt = 0;
          do {
            alt = 100 + Math.floor((Math.random() * multiplier) + 1);
            if (!myMap.has(alt)) { myMap.set(alt, 1); }
            else {
              let val = parseInt(myMap.get(alt));
              myMap.set(alt, ++val);
            }
          }
          while (myMap.has(alt) && myMap.get(alt) > 2);

          let elmt = `<img class="card" id=${id} src="./images/facedown.png" alt=${alt}>`;
          div.innerHTML += elmt;
        }
        target.appendChild(div);
      }
      counter = 0;
      count.value = counter;
      matched = 0;
      match.value = matched;
      if (stopWatch !== null) { 
        clearInterval(stopWatch); 
        stopWatch = null;
      }
      beenClicked.clear();
    }

    /**
    // adding even listener to each cards
    let cards = document.getElementsByClassName('card');
    for (i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', flipCard);
    }
    **/

    // adding even listener to <div> using event bubbling
    let myCards = document.querySelector('.cards');
    myCards.addEventListener('click', flipCard, false);

    // firing onclick event for specific card
    function flipCard(evnt) {
      if (stopWatch == null) { stopWatch = setInterval(timer, 1000); }

      // filtering <div> events and cards that already matched
      if ((evnt.target !== evnt.currentTarget) && !beenClicked.has(evnt.target.id)) {
        let card = document.getElementById(evnt.target.id);
        let myCard = document.getElementById(myCardId);

        if (pair) {
          if ((myCard !== null) && (card.alt == myCard.alt) && (card.id !== myCard.id)) {
            card.src = './images/' + card.alt + '.png';
            myCard.src = './images/' + myCard.alt + '.png';
            beenClicked.add(card.id);
            beenClicked.add(myCard.id);
            match.value = ++matched;
            if (matched == multiplier) { clearInterval(stopWatch); }
          }
          else {
            card.src = './images/' + card.alt + '.png';
            let timerId = setTimeout(function () { card.src = './images/facedown.png'; }, dly);
          }
        }
        else {
          myCardId = card.id;
          card.src = './images/' + card.alt + '.png';
          let timerId = setTimeout(function () { card.src = './images/facedown.png'; }, dly);
        }
        pair = !pair;
        count.value = ++counter;
      }
      evnt.stopPropagation();
    }

    var s = 0;
    var m = 0;
    var h = 0;
    function timer() {

      s++;
      if (s > 60) { s = 0; m++; }
      if (m > 60) { m = 0; h++; }
      let ss = checkTime(s);
      let mm = checkTime(m);
      document.getElementById("timer").value = h + ":" + mm + ":" + ss;
    }

    function checkTime(i) {
      if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
      return i;
    }
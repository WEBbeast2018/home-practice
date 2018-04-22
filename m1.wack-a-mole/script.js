$(document).ready(function(){
       let score, timeLeft, randomTime, currentHole;
       const holes = $('.hole');
       const moles =  $('.mole');

    moles.click(function () {
        let currentMole = $(this);
        if(currentMole.hasClass('showMole')){
            score++;
            $('.score').html(score);
        }
    });

    $('#startBtn').on('click', function(){
        timeLeft = 30;
          score = 0;
          $(this).prop("disabled", true);
          $(this).css("cursor", "no-drop");
          setTimer();
          setInterval(() => {
              if(timeLeft > 0){
                  randomTime = getRandomTime();
                  currentHole = convertToJqueryElem(getRandomHole(holes));
                  currentHole.children().addClass('showMole');
                  setTimeout(() => {
                      currentHole.children().removeClass('showMole');
                  }, randomTime);
              }
              else{
                  return;
              }
          },1000)
      });

      let convertToJqueryElem = function(element){
          let elem;
          elem = $(element);
          return elem;
      }

      let getRandomHole = function(holes){
            let holeIndex = Math.floor(Math.random() * holes.length);
            let randomHole = holes[holeIndex];
            return randomHole;
      }

      let getRandomTime = function(){
          return Math.round(Math.random() * 1000);
      }

      let setTimer = function(){
          setInterval(() => {
              if(timeLeft !== 0){
                  timeLeft --;
                  if(timeLeft > 9)
                  {
                      $('#timer span').html(timeLeft);
                  }
                  else{
                      $('#timer span').html("0" + timeLeft);
                  }
              }
              else{
                  return;
              }
          }, 1000);
      }

});

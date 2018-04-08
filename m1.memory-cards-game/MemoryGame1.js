
let arrCards = [0];
let openedCards = [];

function startGame()
{
  createTable();
  $('button').click(cardOpen);
}

function cardOpen() {
   $('button[className="close"]').removeClass("disabled");
   openedCards.push(this);
   $(this).toggleClass("open");
    var len = openedCards.length;
    if(len === 2){
      $("button").addClass("disabled");
        if(openedCards[0].textContent === openedCards[1].textContent){
          matched();
        } 
        else {
          unMatched();
        }
    }
};
function matched(){
    $("button.open.disabled").removeClass("open disabled").addClass("match");
    $('button[className!="match"]').removeClass("disabled");
    openedCards = [];
}

function unMatched()
{
  setTimeout(function(){
    $("button.open.disabled").removeClass("open").addClass("unmatch");
  },1000);
  
  setTimeout(function(){
  $("button.close").removeClass("unmatch disabled");

},2000);
 openedCards = [];

}
function createTable()
    {       
        const num_rows = document.getElementById('rows').value; 
        const range = num_rows*num_rows;
        let flag=0;
        let random_num;
        let index=0;
     
        if(num_rows%2)
          {
                alert("Please Enter even number");
          } 

        else
          {
            buildArray(num_rows);
            shuffle();
           // console.log(arrCards);
           var theader = '<table border="1">\n';
            var tbody = '';
 
              for( var i=0; i<num_rows;i++)
              {
                  tbody += '<tr>';
                  for( var j=0; j<num_rows;j++,index++)
                  {                 
                      tbody += '<button class="close">';
                      tbody += arrCards[index];
                      tbody += '</button>'
                  }
                  tbody += '</tr>\n';
              }
              var tfooter = '</table>';
              document.getElementById('wrapper').innerHTML = theader + tbody + tfooter;
           }
        }
function shuffle() {
  var currentIndex = arrCards.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arrCards[currentIndex];
    arrCards[currentIndex] = arrCards[randomIndex];
    arrCards[randomIndex] = temporaryValue;
  }
}

function buildArray(size){
  let random_num;
  let range = size * size;
  console.log(range);    

  for(let i=0 ; i<range ;)
  {
  random_num = Math.floor((Math.random() * range) + 1);  

   while(arrCards.includes(random_num))
   {
      random_num = Math.floor((Math.random() * range) + 1);  
   }
    arrCards[i] = arrCards[i+1] = random_num;
    i+=2;   
    console.log(arrCards,random_num);
 
  }
}

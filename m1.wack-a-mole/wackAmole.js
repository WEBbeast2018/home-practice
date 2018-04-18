
let IntervalFunc;
let randNums;
let score = 0;
let classTimer = {
    minutes:1,
    seconds:0,
    Id:0,
    timesUp:false,
    setSec:function(sec){
        if (sec<0 && this.minutes> 0){
            this.seconds = 59;
            this.minutes--;
        }
        else if (sec<0 && this.minutes === 0){
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

$(function() {

    InitPageElements();

    IntervalFunc = setInterval(InitBoardGame, 3000);

    $(".btn").on('click', function () {
        if ($(this).hasClass( "gameSquers" )) {
            score++;
            $("#score").val(score);
            $(this).removeClass( "gameSquers" );
        }
    });

    $("#restart").on('click',function() {
        clearInterval(classTimer.Id);
        score = 0;
        $("#score").val(0);
        classTimer.seconds = 0;
        classTimer.minutes = 1;
        $("#time").val('0'+classTimer.minutes + ':' + classTimer.displaySec());
        IntervalFunc = setInterval(InitBoardGame, 3000);
        InitTimer();
    });

    InitTimer();
});

function InitPageElements() {
    $("#score").prop("readonly", true);
    $("#score").val(0);

    $("#time").prop("readonly", true);
    $("#time").val('0' + classTimer.minutes + ':' + classTimer.displaySec());

    let btnIndx = 0;
    $(".btn").each(function () {
        $(this).attr('id', ++btnIndx);
    });
}

function InitBoardGame() {
        ClearBoard();
        randNums = CreateRandNumArray();

        while (!ArrayIncludeFourDiffNums(randNums)) { // Check that the array include four different numbers
            randNums = CreateRandNumArray();
        }

        for (let i = 0; i<randNums.length; i++ ) {
            $(".btn").each(function () {
                if (Number(this.id) === randNums[i]) {
                    $(this).addClass("gameSquers");
                }
            });
        }
}

function CreateRandNumArray() {
    const  randNumbers =[];
    for (let i = 0; i<4 ; i++) {
        let randomNum = Math.floor(Math.random() * 36) + 1;
        randNumbers.push(randomNum);
    }
    return randNumbers;
}

function ArrayIncludeFourDiffNums(arrayRandNums) {
    var result = [];

    arrayRandNums.forEach(function(item) { // Create array without duplicates
        if(result.indexOf(item) < 0) {
            result.push(item);
        }
    });

    if (result.length === 4) {
        return true;
    }

    return false;
}

function ClearBoard() {

    if (randNums === undefined) {
        return;
    }

    $(".btn").each(function () {
        if (randNums.indexOf(Number(this.id)) != -1) {
            $(this).removeClass("gameSquers");
        }
    });
}

function timer() {
    $("#time").val('0'+classTimer.minutes + ':' + classTimer.displaySec());
    classTimer.setSec(classTimer.seconds-1);
    if (classTimer.timesUp) {
        clearInterval(classTimer.Id);
        clearInterval(IntervalFunc);
        ClearBoard();
        randNums = [];
    }
}
function InitTimer() {
    clearInterval(classTimer.Id);
    classTimer.timesUp = false;
    classTimer.Id = setInterval(timer,1000);
}



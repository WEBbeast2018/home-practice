let buttons =  document.querySelectorAll("button");
let inputText = document.querySelector("input");
let resetCalc = false;
let calcResult;

for (let indx =0;indx<buttons.length;indx++){
    buttons[indx].addEventListener("click",function(){
        switch(this.textContent) {
            case "CLR":
                clrAction();
                break;
            case "=":
                equalAction();
                break;

            case "+":
            case "-":
            case "/":
            case "x":
                mathAction(this.textContent);
                break;

            case "0":
                zeroClicked();
                break;

            default:
                numClick(this.textContent);
        }
    })
}

function clrAction(){ 
    inputText.value ="";
}

function numClick(num){
    if (resetCalc === true){
        clrAction();
        resetCalc = false;
    }
    inputText.value +=num;  
}

function mathAction(Operator){
    var text = inputText.value;
    if (mathActionIsNotLegal(text)){
        return;
    }
    if (resetCalc === true){
        clrAction();
        inputText.value =calcResult+" "+ Operator;
        resetCalc = false;
    }
    else{
        inputText.value +=Operator;
    }
}

function zeroClicked(){   
    if (zeroIsNotLegal()){
        return;
    }   
    else{
        if (resetCalc === true){
            clrAction();
            resetCalc = false;
        }
        inputText.value +=0;
    }
    
}

function equalAction(){
    let text = inputText.value;
    let splitArray;

    if (actionIsNotLegal()){
        return;
    }

    if (text.indexOf('/') > -1){
        splitArray = text.split('/');
        inputText.value = Number(splitArray[0]) / Number(splitArray[1]);
    }
    else if (text.indexOf('+') > -1){
        splitArray = text.split('+');
        inputText.value = Number(splitArray[0]) + Number(splitArray[1]);
    }
    else if (text.indexOf('-') > -1){
        splitArray = text.split('-');
        inputText.value = Number(splitArray[0]) - Number(splitArray[1]);
    }
    else if (text.indexOf('x') > -1){
        splitArray = text.split('x');
        inputText.value = Number(splitArray[0]) * Number(splitArray[1]);
    }
    resetCalc = true;
    calcResult = inputText.value;
}

function mathActionIsNotLegal(text){
    return (text.indexOf('/') > -1) || (text.indexOf('+') > -1)
    || (text.indexOf('-') > -1) || (text.indexOf('x') > -1)
}

function actionIsNotLegal(){
    let text = inputText.value;
    let lastChar = text[text.length-1];

    return (text ==="") || lastChar==="x"|| lastChar==="+"||
    lastChar ==="-" || lastChar==="/";
}

function zeroIsNotLegal(){
    let text = inputText.value;
    let lastChar = text[text.length-1];

    return (text ==="0") || lastChar==="x"|| lastChar==="+"||
    lastChar ==="-" || lastChar==="/";
}

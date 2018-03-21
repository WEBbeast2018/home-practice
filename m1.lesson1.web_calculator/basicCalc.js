let sum = 0;
let intA = null;
let intB = null;
let currentOp = null;
let prevOp = null;

function clearMe() {
  document.getElementById("digit").innerHTML = "0";
  intA = null;
  intB = null;
}

function total(op) {
  // document.getElementById("operand").innerHTML = op;
  calc(op);
  intA = null;
  intB = null;
  prevOp = null;
}

function getNum(val) {
  sum = (sum * 10) + parseInt(val);
  document.getElementById("digit").innerHTML = sum;
  intB = sum;
  console.log(intA, intB);
}

function calc(op) {
  console.log(intA, intB, op, prevOp);
  if (intA != null) {
    switch (prevOp) {
      case "+":
        intA += intB;
        break;
      case "-":
        intA -= intB;
        break;
      case "*":
        intA *= intB;
        break;
      case "/":
        intA /= intB;
    }
  }
  else {
    intA = intB;
    intB = null;
  }
  document.getElementById("operand").innerHTML = op;
  document.getElementById("digit").innerHTML = intA;
  prevOp = op;
  sum = 0;
  console.log(intA, intB, op, prevOp);
}
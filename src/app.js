const inputBillElem = document.querySelector(".input-bill");
const buttonsPercent = document.querySelectorAll(".btns");
const inputCustom = document.querySelector(".tips-persent");
const inputPeopleNum = document.querySelector(".input-person");
const resetBtn = document.querySelector(".btn-reset");
const tipPrice = document.querySelector(".tip-price");
const totalPrice = document.querySelector(".total-price");

const zeroPeopleNotice = document.querySelector(".zeroPeople");

const state = {
  bill: 0,
  percent: 0,
  people: 0,
};

function cleanButtons() {
  for (let i = 0; i < buttonsPercent.length; i++) {
    buttonsPercent[i].classList.remove("active-button");
  }
}

for (let i = 0; i < buttonsPercent.length; i++) {
  const buttonValue = buttonsPercent[i];
  buttonValue.addEventListener("click", () => {
    if (i == 0) {
      state.percent = 5;
      cleanButtons();
      buttonValue.classList.add("active-button");
    }
    if (i == 1) {
      state.percent = 10;
      cleanButtons();
      buttonValue.classList.add("active-button");
    }
    if (i == 2) {
      state.percent = 15;
      cleanButtons();
      buttonValue.classList.add("active-button");
    }
    if (i == 3) {
      state.percent = 25;
      cleanButtons();
      buttonValue.classList.add("active-button");
    }
    if (i == 4) {
      state.percent = 50;
      cleanButtons();
      buttonValue.classList.add("active-button");
    }

    countTotalAmount();
    countTipAmount();
    inputCustom.value = "";
    inputCustom.classList.remove("input-green-color");
    inputPeopleZero();
  });
}

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

inputBillElem.addEventListener("keyup", () => {
  const billValue = inputBillElem.value;
  state.bill = Number(billValue);

  if (state.bill > 0) {
    inputBillElem.classList.add("input-green-color");
  }
  if (state.bill == 0 || state.bill == "") {
    inputBillElem.value = "";
    inputBillElem.classList.remove("input-green-color");
  }

  countTotalAmount();
  countTipAmount();
  inputPeopleZero();
});

inputCustom.addEventListener("keyup", () => {
  const customValue = inputCustom.value;
  state.percent = Number(customValue);
  if (state.percent > 0) {
    inputCustom.classList.add("input-green-color");
  }
  if (state.percent == 0) {
    inputCustom.value = "";
    inputCustom.classList.remove("input-green-color");
  }
  countTotalAmount();
  countTipAmount();
  inputPeopleZero();
  cleanButtons();
});

function inputPeopleZero() {
  if (
    (state.bill != 0 && state.percent != 0 && state.people == 0) ||
    (state.bill != 0 && state.percent != 0 && state.people == "")
  ) {
    inputPeopleNum.classList.add("input-red-color");
    zeroPeopleNotice.classList.remove("zeroPeople");
    zeroPeopleNotice.classList.add("zeroPeopleRed");
  }
}

inputPeopleNum.addEventListener("keyup", () => {
  const peopleNum = inputPeopleNum.value;
  state.people = Number(peopleNum);
  if (state.people > 0) {
    inputPeopleNum.classList.remove("input-red-color");
    inputPeopleNum.classList.add("input-green-color");
    zeroPeopleNotice.classList.remove("zeroPeopleRed");
    zeroPeopleNotice.classList.add("zeroPeople");
  }
  if (state.people == 0 || state.people == "") {
    inputPeopleNum.value = "";
    inputPeopleNum.classList.remove("input-green-color");
    zeroPeopleNotice.classList.remove("zeroPeopleRed");
    zeroPeopleNotice.classList.add("zeroPeople");
  }
  countTotalAmount();
  countTipAmount();
  inputPeopleZero();
});

function countTotalAmount() {
  let countTotal = 0;
  x = state.bill;
  y = state.percent;
  z = state.people;
  if (x > 0 && z > 0) {
    countTotal = (x + (x * y) / 100) / z;
  }
  totalPrice.innerHTML = "$" + countTotal.toFixed(2);
}

function countTipAmount() {
  let countTip = 0;
  x = state.bill;
  y = state.percent;
  z = state.people;

  if (x > 0 && z > 0) {
    countTip = (x * y) / 100 / z;
  }
  tipPrice.innerHTML = "$" + countTip.toFixed(2);
}

resetBtn.addEventListener("click", () => {
  inputBillElem.value = "";
  inputPeopleNum.value = "";
  inputCustom.value = "";
  const tipPriceZero = "$0.00";
  tipPrice.innerHTML = tipPriceZero;
  const totalZero = "$0.00";
  totalPrice.innerHTML = totalZero;
  state.bill = 0;
  state.percent = 0;
  state.people = 0;
  inputPeopleNum.classList.remove("input-green-color");
  inputBillElem.classList.remove("input-green-color");
  inputCustom.classList.remove("input-green-color");
  cleanButtons();
});

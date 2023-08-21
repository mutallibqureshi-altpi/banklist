const account1 = {
  owner: "Abdul Mutallib Qureshi",
  arrVal: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2,
  pin: 1111,

  arrValDates: [
    "2022-11-18T21:31:17.178Z",
    "2022-12-23T07:42:02.383Z",
    "2023-01-28T09:15:04.904Z",
    "2023-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-05-16T17:01:17.194Z",
    "2023-05-17T23:36:17.929Z",
    "2023-05-18T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Ayan Shaikh",
  arrVal: [5000, -790, 3400, -150, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  arrValDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  owner: "Salman Ansari",
  arrVal: [500, 900, -2000, 6000, 200, -4000, 10000, -100, -40],
  interestRate: 1.9,
  pin: 3333,

  arrValDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account4 = {
  owner: "Amaan Alam",
  arrVal: [40, 100, -500, 6000, -500, 25, 10],
  interestRate: 1.9,
  pin: 4444,

  arrValDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2022-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

const movement = document.querySelector(".movement");
const balanceValue = document.querySelector(".balance-value");
const incomes = document.querySelector(".income");
const outcomes = document.querySelector(".outcome");
const interests = document.querySelector(".interest");
const userInput = document.querySelector(".user-input");
const userPin = document.querySelector(".user-pin");
const loginBtn = document.querySelector(".login-btn");
const welcomeMsg = document.querySelector(".welcome-msg");
const container = document.querySelector(".container");
const transferInput = document.querySelector(".transfer-input");
const transferAmount = document.querySelector(".transfer-amount");
const transferBtn = document.querySelector(".transfer-btn");
const closeUserInput = document.querySelector(".close-user-input");
const closeUserPin = document.querySelector(".close-user-pin");
const closeAccountBtn = document.querySelector(".close-account-btn");
const loanInput = document.querySelector(".loan-input");
const loanBtn = document.querySelector(".loan-btn");
const sortBtn = document.querySelector(".sort-btn");

const displayMoments = (data, sort) => {
  movement.innerHTML = "";
  const movs = sort ? data.slice().sort((a, b) => a - b) : data;

  movs.forEach((val, i) => {
    const type = val > 0 ? "deposite" : "withdrawal";
    const html = `
    <div class="movement-row">
    <div class="movement-deposit ${type}">${i + 1} ${type}</div>
    <div class="movement-date">2 days ago</div>
    <div class="movement-value">${val}Rs</div>
  </div>
        `;
    movement.insertAdjacentHTML("afterbegin", html);
  });
};

const createUsername = (user) => {
  user.forEach((acc) => {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(" ")
      .map((val) => val[0])
      .join("");
  });
};

createUsername(accounts);

const updateUI = (acc) => {
  displayMoments(acc.arrVal);
  balance(acc);
  displayBalance(acc);
};

const balance = (acc) => {
  acc.balance = acc.arrVal.reduce((acc, curr) => acc + curr, 0);
  balanceValue.innerHTML = `Rs${acc.balance} `;
};

const displayBalance = (acc) => {
  const income = acc.arrVal
    .filter((val) => val > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const fixedIncome = income.toFixed(2);
  incomes.innerHTML = `$${fixedIncome}`;

  const outcome = acc.arrVal
    .filter((val) => val < 0)
    .reduce((acc, curr) => acc + curr, 0);
  const fixedOutcome = Math.abs(outcome).toFixed(2);
  outcomes.innerHTML = `$${fixedOutcome}`;

  const interest = acc.arrVal
    .filter((data) => data > 0)
    .map((val) => (val * acc.interestRate) / 100)
    .filter((val) => val >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  const fixedInterest = interest.toFixed(2);
  interests.innerHTML = `$${fixedInterest}`;
};

// conversion
// const rsToUsd = 0.012;
// const totalDepositUsd = account1.arrVal
//   .filter((val) => val > 0)
//   .map((val) => val * rsToUsd)
//   .reduce((acc, curr) => acc + curr, 0);
// console.log(totalDepositUsd);

// login-user
let currentAccount;
const checkUser = (e) => {
  e.preventDefault();
  currentAccount = accounts.find((user) => user.username === userInput.value);

  if (currentAccount?.pin === Number(userPin.value)) {
    welcomeMsg.innerHTML = `Good Day, ${currentAccount.owner.split(" ")[0]}`;
    container.style.opacity = 100;

    // update-UI
    updateUI(currentAccount);
  } else {
    console.log("chor");
  }
  userInput.value = "";
  userPin.value = "";
  userPin.blur();
};

loginBtn.addEventListener("click", checkUser);

// transfer-money
const transferMoney = (e) => {
  e.preventDefault();
  const amount = Number(transferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === transferInput.value
  );
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.arrVal.push(-amount);
    receiverAcc.arrVal.push(amount);
    // update-UI
    updateUI(currentAccount);
  } else {
    console.log("error");
  }
  transferAmount.value = "";
  transferInput.value = "";
  transferInput.blur();
};

transferBtn.addEventListener("click", transferMoney);

// closing-user-account
const closeUserAccount = (e) => {
  e.preventDefault();
  if (
    closeUserInput.value === currentAccount.username &&
    Number(closeUserPin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (val) => val.username === currentAccount.username
    );
    accounts.splice(index, 1);
    container.style.opacity = 0;
  }
};

closeAccountBtn.addEventListener("click", closeUserAccount);

const initiateLoan = (e) => {
  e.preventDefault();
  const amount = Number(loanInput.value);
  const data = currentAccount.arrVal.some((val) => val >= amount * 0.1);
  if (amount > 0 && data) {
    currentAccount.arrVal.push(amount);
    updateUI(currentAccount);
  } else {
    console.log("to high");
  }
};

loanBtn.addEventListener("click", initiateLoan);

let sorted = false;
const sortItem = () => {
  displayMoments(currentAccount.arrVal, !sorted);
  sorted = !sorted;
};

sortBtn.addEventListener("click", sortItem);

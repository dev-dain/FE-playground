const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const hList = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const btn = document.querySelector('.btn');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions = 
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

btn.addEventListener('click', function(e) {
  e.preventDefault();
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = '';
    amount.value = '';
  }
})

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const transactionItem = document.createElement('li');
  transactionItem.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  transactionItem.innerHTML = `
    ${transaction.text}<span>${sign}${transaction.amount}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
    X</button>`;
  hList.appendChild(transactionItem);
}

function updateValues() {
  const amounts = transactions.map(transactions => transactions.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  updateLocalStorage();
  init();
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function init() {
  hList.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
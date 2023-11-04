'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// ==========================================
// ==========================================
// ==========================================
// ==========================================
console.log('================================');
console.log('================================');
console.log('================================');
console.log('================================');
console.log('SIMPLE ARRAY METHODS');

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE - does not affect the original array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE - does affect the original array
// console.log(arr.splice(2));
arr.splice(-1);
arr.splice(1, 2);
console.log(arr);

// REVERSE - does affect the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'j'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT - does affect the original array
const letters = arr.concat(arr2);
console.log(letters);

// or we can use the spread operator
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));

// ==========================================
// ==========================================
// ==========================================
// ==========================================
console.log('================================');
console.log('================================');
console.log('================================');
console.log('================================');
console.log('THE NEW AT METHOD');

const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));

// getting last array element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);

console.log(arr3.at(-1));

console.log('brandon'.at(0));
console.log('brandon'.at(-1));

// ==========================================
// ==========================================
// ==========================================
// ==========================================
console.log('================================');
console.log('================================');
console.log('================================');
console.log('================================');
console.log('LOOPING ARRAYS: forEach');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}.`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

console.log('========= forEach method ========');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited $${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew $${Math.abs(mov)}`);
  }
});

const practiceArray = [123, 234, 423, 867, 5, 30, 9];
practiceArray.forEach((yourmom, is) => console.log(`${is}: ${yourmom}`));

// ==========================================
// ==========================================
// ==========================================
// ==========================================
console.log('================================');
console.log('================================');
console.log('================================');
console.log('forEach WITH MAPS and SETS');

// a new map holds a key-value pair
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// longhand
console.log('=====lonhand vs.=====');
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

console.log('=====arrow function vs.=====');

currencies.forEach((yourmom, hey) => console.log(`${hey}: ${yourmom}`));
// yourmom = the value so in currencies that is 'United States dollar'
// hey = the key of each value

// With a set
const currenciesUnique = new Set(['USD', 'GDP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

const set1 = new Set([1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 2, 2]);

console.log(set1.has(1));
// Expected output: true

console.log(set1.has(5));
// Expected output: true

console.log(set1.has(6));
// Expected output: false

console.log(...set1);
// 1 2 3 4 5

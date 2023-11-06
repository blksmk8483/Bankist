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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

// getting my username - desired result is first letter of each name as a lower case string combined

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
console.log(...accounts);

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
// console.log('================================');
// console.log('================================');
// console.log('================================');
// console.log('================================');
// console.log('SIMPLE ARRAY METHODS');

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // SLICE - does not affect the original array
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// // SPLICE - does affect the original array
// // console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);
// console.log(arr);

// // REVERSE - does affect the original array
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'j'];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT - does affect the original array
// const letters = arr.concat(arr2);
// console.log(letters);

// // or we can use the spread operator
// console.log([...arr, ...arr2]);

// // JOIN
// console.log(letters.join(' - '));

// // ==========================================
// // ==========================================
// // ==========================================
// // ==========================================
// console.log('================================');
// console.log('================================');
// console.log('================================');
// console.log('================================');
// console.log('THE NEW AT METHOD');

// const arr3 = [23, 11, 64];
// console.log(arr3[0]);
// console.log(arr3.at(0));

// // getting last array element
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.slice(-1)[0]);

// console.log(arr3.at(-1));

// console.log('brandon'.at(0));
// console.log('brandon'.at(-1));

// // ==========================================
// // ==========================================
// // ==========================================
// // ==========================================
// console.log('================================');
// console.log('================================');
// console.log('================================');
// console.log('================================');
// console.log('LOOPING ARRAYS: forEach');

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}.`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('========= forEach method ========');
// movements.forEach(function (mov, i, arr) {
//   if (mov > 0) {
//     console.log(`Movement ${i + 1}: You deposited $${mov}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew $${Math.abs(mov)}`);
//   }
// });

// const practiceArray = [123, 234, 423, 867, 5, 30, 9];
// practiceArray.forEach((yourmom, is) => console.log(`${is}: ${yourmom}`));

// // ==========================================
// // ==========================================
// // ==========================================
// // ==========================================
// console.log('================================');
// console.log('================================');
// console.log('================================');
// console.log('forEach WITH MAPS and SETS');

// // a new map holds a key-value pair
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// // longhand
// console.log('=====lonhand vs.=====');
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// console.log('=====arrow function vs.=====');

// currencies.forEach((yourmom, hey) => console.log(`${hey}: ${yourmom}`));
// // yourmom = the value so in currencies that is 'United States dollar'
// // hey = the key of each value

// // With a set
// const currenciesUnique = new Set(['USD', 'GDP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// const set1 = new Set([1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 2, 2]);

// console.log(set1.has(1));
// // Expected output: true

// console.log(set1.has(5));
// // Expected output: true

// console.log(set1.has(6));
// // Expected output: false

// console.log(...set1);
// // 1 2 3 4 5

// // ==========================================
// // ==========================================
// // ==========================================
// // ==========================================
// console.log('================================');
// console.log('================================');
// console.log('================================');
// console.log('CHALLENGE #1');

// Working With Arrays
// Coding Challenge #1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Juliafoundoutthattheownersofthefirstandthelasttwodogsactuallyhave cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. CreateanarraywithbothJulia's(corrected)andKate'sdata
// 3. Foreachremainingdog,logtotheconsolewhetherit'sanadult("Dognumber1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy   ")
// 4. Runthefunctionforbothtestdatasets
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far 😉 GOOD LUCK 😀

// // Here was my solution....
// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// // dogsJulia.shift();
// // dogsJulia.pop();
// // dogsJulia.pop();
// const correctedDogsJulia = dogsJulia.slice(1, -2);

// const checkDogs = [...correctedDogsJulia, ...dogsKate];
// console.log(checkDogs);

// checkDogs.forEach(function (age, i) {
//   if (age >= 3) {
//     console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`);
//   } else {
//     console.log(`Dog number ${i + 1} is still a puppy 🐶.`);
//   }
// });

// // Here was his solution....
// const checkDogs2 = function (dogsJulia, dogsKate) {
//   // 3 different ways I could have written this ---
//   const dogsJuliaCorrected = dogsJulia.slice(1, -2); // solution #1
//   // dogsJuliaCorrected.splice(0, 1); // solution #2
//   // dogsJuliaCorrected.splice(-2); // solution #2
//   // dogsJulia.slice(1, 3); // solution #3

//   // 2 ways of writing this --
//   // const dogs = dogsJuliaCorrected.concat(dogsKate);
//   const dogs = [...dogsJuliaCorrected, ...dogsKate];
//   console.log(dogs);

//   dogs.forEach(function (age, i) {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶.`);
//     }
//   });
// };

// checkDogs2([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('DATA TRANSFORMATIONS: map, filter, reduce');

// // map will give a new array
// const eurToUsd = 1.1;

// const movementUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

// console.log(movements);
// console.log(movementUSD);

// // same but with a for of loop
// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);

// console.log(movementsUSDfor);

// // with an arrow function
// const movementUSD2 = movements.map(mov => mov * eurToUsd);

// console.log(movementUSD2);

// // adding the forEach to display
// const movementsDescriptions = movements.map(
//   (mov, i, arr) =>
//     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} $${Math.abs(
//       mov
//     )}`
// );

// console.log(...movementsDescriptions);
// movementsDescriptions.forEach(desc => console.log(desc));

// // same as above but contained into one function
// function displayMovements3(justaboutanything) {
//   const movementsDescriptions = justaboutanything.map(
//     (mov, i) =>
//       `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} $${Math.abs(
//         mov
//       )}`
//   );

//   movementsDescriptions.forEach(desc => console.log(desc));
// }

// displayMovements3(movements);

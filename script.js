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

// THIS DISPLAYS THE DEPOSITS AND WITHDRAWALS
const displayMovements = function (BobsYourUncle) {
  containerMovements.innerHTML = '';

  BobsYourUncle.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}€</div>
  </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// CURRENT BALANCE THAT IS ON THE TOP RIGHT
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.innerHTML = `${balance}€`;
};

// THE IN, OUT, and INTEREST BALANCE THAT IS BELOW THE TRANSACTIONS
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// USERNAME LOGIC
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
// console.log(...accounts);

// LOGIN USER, PIN, BUTTON
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display movements
    displayMovements(currentAccount.movements);
    // Display balance
    calcDisplayBalance(currentAccount.movements);
    // Display summary
    calcDisplaySummary(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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
const eurToUsd = 1.1;

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

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('THE FILTER Method');

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(movements);
console.log('===Using FILTER method===');
console.log(deposits);

// same result using a for of loop
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log('===Using FOR...OF===');
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('THE REDUCE Method');

// acc = accumulator -> SNOWBALL
// the acc needs an initial value, - that is why we are starting it at zero.
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: $${acc}`);
  return acc + cur;
}, 0);
const balance2 = movements.reduce((acc, cur, i, arr) => {
  console.log(`Iteration ${i}: $${acc}`);
  return acc + cur;
}, 0);
console.log(balance2);

// same as above but as a for of loop
let balance3 = 0;
for (const mov of movements) balance3 += mov;
console.log(balance3);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('CHALLENGE #2');

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculatethedogageinhumanyearsusingthefollowingformula:ifthedogis <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// 2. Excludealldogsthatarelessthan18humanyearsold(whichisthesameas keeping dogs that are at least 18 years old)
// 3. Calculatetheaveragehumanageofalladultdogs(youshouldalreadyknow from other challenges how we calculate averages 😉)
// 4. Runthefunctionforbothtestdatasets
// Test data:
// § Data1:[5,2,4,1,15,8,3] § Data2:[16,6,10,5,6,1,4]
// GOOD LUCK 😀

const DogAgeData1 = [5, 2, 4, 1, 15, 8, 3];
const DogAgeData2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (age) {
  const dogToHuman = age.filter(function (age) {
    let humanAge = 0;
    if (age <= 2) {
      humanAge = 2 * age;
      console.log(
        `Your dogs age is ${age} and in human years it is ${humanAge}.`
      );
    } else {
      humanAge = 16 + age * 4;
      if (humanAge > 18) {
        console.log(
          `Your dogs age is ${age} and in human years it is ${humanAge}.`
        );
      }
    }
  });
};
console.log('====DogsAgeData1====');
calcAverageHumanAge(DogAgeData1);
console.log('====DogsAgeData2====');
calcAverageHumanAge(DogAgeData2);

// Solution example
const calcAverageHumanAge2 = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);

  // I can write this 2 ways
  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  // const average =
  //   adults.reduce((acc, age, i, arr) => acc + age, 0) / arr.length;

  return average;
};

const avg1 = calcAverageHumanAge2(DogAgeData1);
const avg2 = calcAverageHumanAge2(DogAgeData2);

console.log(avg1, avg2);

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('CHAINING METHODS');

// const eurToUsd = 1.1;

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('CHALLENGE #3');

const calcAverageHumanAge3 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge3(DogAgeData1));
console.log(calcAverageHumanAge3(DogAgeData2));

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('THE FIND METHOD');

const firstWithDrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithDrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// // Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const account5 = {
//   owner: 'Rubie Knight',
//   movements: [430, 1000, -300, 700, -200, 50, 90],
//   interestRate: 1.2,
//   pin: 5555,
// };
// const accounts = [account1, account2, account3, account4, account5];

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov.toFixed(2)}€</div>
  </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// CURRENT BALANCE THAT IS ON THE TOP RIGHT
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.innerHTML = `${acc.balance.toFixed(2)}€`;
};

// THE IN, OUT, and INTEREST BALANCE THAT IS BELOW THE TRANSACTIONS
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// LOGIN USER, PIN, BUTTON
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

// Tranfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

// Request Loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// Button Sort
let sorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // const currencies = new Map([
// //   ['USD', 'United States dollar'],
// //   ['EUR', 'Euro'],
// //   ['GBP', 'Pound sterling'],
// // ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// // ==========================================
// // ==========================================
// // ==========================================
// // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('SIMPLE ARRAY METHODS');

// // let arr = ['a', 'b', 'c', 'd', 'e'];

// // // SLICE - does not affect the original array
// // console.log(arr.slice(2));
// // console.log(arr.slice(2, 4));
// // console.log(arr.slice(-2));
// // console.log(arr.slice(1, -2));
// // console.log(arr.slice());
// // console.log([...arr]);

// // // SPLICE - does affect the original array
// // // console.log(arr.splice(2));
// // arr.splice(-1);
// // arr.splice(1, 2);
// // console.log(arr);

// // // REVERSE - does affect the original array
// // arr = ['a', 'b', 'c', 'd', 'e'];
// // const arr2 = ['j', 'i', 'h', 'g', 'j'];
// // console.log(arr2.reverse());
// // console.log(arr2);

// // // CONCAT - does affect the original array
// // const letters = arr.concat(arr2);
// // console.log(letters);

// // // or we can use the spread operator
// // console.log([...arr, ...arr2]);

// // // JOIN
// // console.log(letters.join(' - '));

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('THE NEW AT METHOD');

// // const arr3 = [23, 11, 64];
// // console.log(arr3[0]);
// // console.log(arr3.at(0));

// // // getting last array element
// // console.log(arr3[arr3.length - 1]);
// // console.log(arr3.slice(-1)[0]);

// // console.log(arr3.at(-1));

// // console.log('brandon'.at(0));
// // console.log('brandon'.at(-1));

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('LOOPING ARRAYS: forEach');

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const [i, movement] of movements.entries()) {
// //   if (movement > 0) {
// //     console.log(`Movement ${i + 1}: You deposited ${movement}.`);
// //   } else {
// //     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
// //   }
// // }

// // console.log('========= forEach method ========');
// // movements.forEach(function (mov, i, arr) {
// //   if (mov > 0) {
// //     console.log(`Movement ${i + 1}: You deposited $${mov}`);
// //   } else {
// //     console.log(`Movement ${i + 1}: You withdrew $${Math.abs(mov)}`);
// //   }
// // });

// // const practiceArray = [123, 234, 423, 867, 5, 30, 9];
// // practiceArray.forEach((yourmom, is) => console.log(`${is}: ${yourmom}`));

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('forEach WITH MAPS and SETS');

// // // a new map holds a key-value pair
// // const currencies = new Map([
// //   ['USD', 'United States dollar'],
// //   ['EUR', 'Euro'],
// //   ['GBP', 'Pound sterling'],
// // ]);

// // // longhand
// // console.log('=====lonhand vs.=====');
// // currencies.forEach(function (value, key, map) {
// //   console.log(`${key}: ${value}`);
// // });

// // console.log('=====arrow function vs.=====');

// // currencies.forEach((yourmom, hey) => console.log(`${hey}: ${yourmom}`));
// // // yourmom = the value so in currencies that is 'United States dollar'
// // // hey = the key of each value

// // // With a set
// // const currenciesUnique = new Set(['USD', 'GDP', 'USD', 'EUR', 'EUR']);
// // console.log(currenciesUnique);

// // currenciesUnique.forEach(function (value, key, map) {
// //   console.log(`${key}: ${value}`);
// // });

// // const set1 = new Set([1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 1, 2, 2, 2]);

// // console.log(set1.has(1));
// // // Expected output: true

// // console.log(set1.has(5));
// // // Expected output: true

// // console.log(set1.has(6));
// // // Expected output: false

// // console.log(...set1);
// // // 1 2 3 4 5

// // // ==========================================
// // // ==========================================
// // // ==========================================
// // // ==========================================
// // console.log('================================');
// // console.log('================================');
// // console.log('================================');
// // console.log('CHALLENGE #1');

// // Working With Arrays
// // Coding Challenge #1
// // Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
// // A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// // Your tasks:
// // Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// // 1. Juliafoundoutthattheownersofthefirstandthelasttwodogsactuallyhave cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// // 2. CreateanarraywithbothJulia's(corrected)andKate'sdata
// // 3. Foreachremainingdog,logtotheconsolewhetherit'sanadult("Dog+1
// // is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy   ")
// // 4. Runthefunctionforbothtestdatasets
// // Test data:
// // § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// // Hints: Use tools from all lectures in this section so far 😉 GOOD LUCK 😀

// // // Here was my solution....
// // const dogsJulia = [3, 5, 2, 12, 7];
// // const dogsKate = [4, 1, 15, 8, 3];

// // // dogsJulia.shift();
// // // dogsJulia.pop();
// // // dogsJulia.pop();
// // const correctedDogsJulia = dogsJulia.slice(1, -2);

// // const checkDogs = [...correctedDogsJulia, ...dogsKate];
// // console.log(checkDogs);

// // checkDogs.forEach(function (age, i) {
// //   if (age >= 3) {
// //     console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`);
// //   } else {
// //     console.log(`Dog number ${i + 1} is still a puppy 🐶.`);
// //   }
// // });

// // // Here was his solution....
// // const checkDogs2 = function (dogsJulia, dogsKate) {
// //   // 3 different ways I could have written this ---
// //   const dogsJuliaCorrected = dogsJulia.slice(1, -2); // solution #1
// //   // dogsJuliaCorrected.splice(0, 1); // solution #2
// //   // dogsJuliaCorrected.splice(-2); // solution #2
// //   // dogsJulia.slice(1, 3); // solution #3

// //   // 2 ways of writing this --
// //   // const dogs = dogsJuliaCorrected.concat(dogsKate);
// //   const dogs = [...dogsJuliaCorrected, ...dogsKate];
// //   console.log(dogs);

// //   dogs.forEach(function (age, i) {
// //     if (age >= 3) {
// //       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`);
// //     } else {
// //       console.log(`Dog number ${i + 1} is still a puppy 🐶.`);
// //     }
// //   });
// // };

// // checkDogs2([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('DATA TRANSFORMATIONS: map, filter, reduce');

// // // map will give a new array
// const eurToUsd = 1.1;

// // const movementUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // });

// // console.log(movements);
// // console.log(movementUSD);

// // // same but with a for of loop
// // const movementsUSDfor = [];
// // for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);

// // console.log(movementsUSDfor);

// // // with an arrow function
// // const movementUSD2 = movements.map(mov => mov * eurToUsd);

// // console.log(movementUSD2);

// // // adding the forEach to display
// // const movementsDescriptions = movements.map(
// //   (mov, i, arr) =>
// //     `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} $${Math.abs(
// //       mov
// //     )}`
// // );

// // console.log(...movementsDescriptions);
// // movementsDescriptions.forEach(desc => console.log(desc));

// // // same as above but contained into one function
// // function displayMovements3(justaboutanything) {
// //   const movementsDescriptions = justaboutanything.map(
// //     (mov, i) =>
// //       `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} $${Math.abs(
// //         mov
// //       )}`
// //   );

// //   movementsDescriptions.forEach(desc => console.log(desc));
// // }

// // displayMovements3(movements);

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('THE FILTER Method');

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });

// console.log(movements);
// console.log('===Using FILTER method===');
// console.log(deposits);

// // same result using a for of loop
// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log('===Using FOR...OF===');
// console.log(depositsFor);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('THE REDUCE Method');

// // acc = accumulator -> SNOWBALL
// // the acc needs an initial value, - that is why we are starting it at zero.
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: $${acc}`);
//   return acc + cur;
// }, 0);
// const balance2 = movements.reduce((acc, cur, i, arr) => {
//   console.log(`Iteration ${i}: $${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance2);

// // same as above but as a for of loop
// let balance3 = 0;
// for (const mov of movements) balance3 += mov;
// console.log(balance3);

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // Maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('CHALLENGE #2');

// // Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// // Your tasks:
// // Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// // 1. Calculatethedogageinhumanyearsusingthefollowingformula:ifthedogis <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// // 2. Excludealldogsthatarelessthan18humanyearsold(whichisthesameas keeping dogs that are at least 18 years old)
// // 3. Calculatetheaveragehumanageofalladultdogs(youshouldalreadyknow from other challenges how we calculate averages 😉)
// // 4. Runthefunctionforbothtestdatasets
// // Test data:
// // § Data1:[5,2,4,1,15,8,3] § Data2:[16,6,10,5,6,1,4]
// // GOOD LUCK 😀

// const DogAgeData1 = [5, 2, 4, 1, 15, 8, 3];
// const DogAgeData2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (age) {
//   const dogToHuman = age.filter(function (age) {
//     let humanAge = 0;
//     if (age <= 2) {
//       humanAge = 2 * age;
//       console.log(
//         `Your dogs age is ${age} and in human years it is ${humanAge}.`
//       );
//     } else {
//       humanAge = 16 + age * 4;
//       if (humanAge > 18) {
//         console.log(
//           `Your dogs age is ${age} and in human years it is ${humanAge}.`
//         );
//       }
//     }
//   });
// };
// console.log('====DogsAgeData1====');
// calcAverageHumanAge(DogAgeData1);
// console.log('====DogsAgeData2====');
// calcAverageHumanAge(DogAgeData2);

// // Solution example
// const calcAverageHumanAge2 = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

//   const adults = humanAges.filter(age => age >= 18);
//   console.log(humanAges);
//   console.log(adults);

//   // I can write this 2 ways
//   const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
//   // const average =
//   //   adults.reduce((acc, age, i, arr) => acc + age, 0) / arr.length;

//   return average;
// };

// const avg1 = calcAverageHumanAge2(DogAgeData1);
// const avg2 = calcAverageHumanAge2(DogAgeData2);

// console.log(avg1, avg2);

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('CHAINING METHODS');

// // const eurToUsd = 1.1;

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('CHALLENGE #3');

// const calcAverageHumanAge3 = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// console.log(calcAverageHumanAge3(DogAgeData1));
// console.log(calcAverageHumanAge3(DogAgeData2));

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('THE FIND METHOD');

// const firstWithDrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithDrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('THE some and every');

// console.log(movements);
// // Equality
// console.log(movements.includes(-130));

// // SOME: Condition
// const anyDeposits = movements.some(mov => mov > 0);

// console.log(anyDeposits);

// // EVERY
// console.log(movements.every(mov => mov > 0)); // false
// console.log(account4.movements.every(mov => mov > 0)); // true

// // Speerate callback
// const deposit = mov => mov > 0;

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('THE FLAT and FLATMAP');

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// // ==== Practice getting the overall balance ====

// // const accountMovements = accounts.map(acc => acc.movements);
// // console.log(accountMovements);
// // const allMovements = accountMovements.flat();
// // console.log(allMovements);
// // const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

// // ==== Same as above but nested ====

// // using the flat method
// const overallBalance = accounts
//   .map(acc => acc.movements) // map over the movements of each of the acccounts and make a new array of each of the movements
//   .flat() // combine those arrays together
//   .reduce((acc, mov) => acc + mov, 0); // add the values together to get a total balance

// console.log(overallBalance); // should add up to 17840

// // using the flatMap method
// // this maps over the array and then flat
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance2);

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('SORTING ARRAYS');

// // sort
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // Numbers

// console.log(movements);
// // return < 0, A, B (keep order)
// // return > 0, B, A {switch order}

// // Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
// movements.sort((a, b) => a - b);
// console.log(movements);

// console.log(movements);

// // Descending
// movements.sort((a, b) => (a > b ? -1 : 1));
// console.log(movements);

// movements.sort((a, b) => b - a);
// console.log(movements);

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('MORE WAYS OF CREATING AND FILLING ARRAYS');

// const arr9 = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// const x = new Array(7);
// console.log(x);

// // console.log(x.map(() => 5)); // This does not work...

// // x.fill(1);
// x.fill(1, 3);

// console.log(x);
// arr9.fill(23, 4, 6);
// console.log(arr9);

// // Array.from
// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
// console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
// });

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('ARRAY METHODS PRACTICE');

// // 1.
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur);

// console.log(bankDepositSum);

// // 2.

// // const numDeposits1000 = accounts
// //   .flatMap(acc => acc.movements)
// //   .filter(mov => mov >= 1000).length;

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

// console.log(numDeposits1000);

// // Prefixed operator
// let a = 10;
// // console.log(a++);
// console.log(++a);
// console.log(a);

// // 3.
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acc, cur) => {
//       // cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
//       acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return acc;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(sums);

// // 4.
// // this is a nice title -> This Is a Nice Title
// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1);

//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

//   const titleCase = title
//     .toLocaleLowerCase()
//     .split(' ')
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(' ');

//   return capitalize(titleCase);
// };
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('the but or ON and On'));
// console.log(convertTitleCase('and this title'));

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('Coding Challenge #4');

// // Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// // Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// // Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
// // Your tasks:
// // 1. Loopoverthe'dogs'arraycontainingdogobjects,andforeachdog,calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// // 2. FindSarah'sdogandlogtotheconsolewhetherit'seatingtoomuchortoo little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// // 3. Createanarraycontainingallownersofdogswhoeattoomuch ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// // 4. Logastringtotheconsoleforeacharraycreatedin3.,likethis:"Matildaand Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// // 5. Logtotheconsolewhetherthereisanydogeatingexactlytheamountoffood that is recommended (just true or false)
// // 6. Logtotheconsolewhetherthereisanydogeatinganokayamountoffood (just true or false)
// // 7. Createanarraycontainingthedogsthatareeatinganokayamountoffood(try to reuse the condition used in 6.)
// // 8. Createashallowcopyofthe'dogs'arrayandsortitbyrecommendedfood portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)

// // Hints:
// // § Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// // § Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
// // Test data:

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// // GOOD LUCK 😀

// // 1
// dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

// console.log(dogs);

// // dogs.forEach(dog => (dog.yourMom = dog.curFood - 1));
// // console.log(dogs);

// // 2
// // dogs.find(yourmom => {
// //   if ((yourmom.owners = ['Sarah'])) {
// //     if (dogs.recFood > yourmom.curFood) {
// //       console.log('Your dog needs to eat more!');
// //     } else {
// //       console.log('You dogs is getting fat. Eat the recommended portions.');
// //     }
// //   } else {
// //     console.log('Not yet!');
// //   }
// // });

// // const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
// // console.log(
// //   `Sarah's dog is eating ${
// //     dogSarah.curFood > dogSarah.recFood ? 'too much' : 'too little'
// //   }.`
// // );

// dogs.find(yourmom => yourmom.owners.includes('Sarah'));
// console.log(
//   `Your dog needs to ${
//     dogs.recFood > dogs.curFood
//       ? 'eat more!'
//       : 'eat less! It is going to get fat!!!'
//   }`
// );

// // 3. Create an array containing all owners of dogs who eat toomuch ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

// const whatever = dogs.filter(
//   dog => (dog.ownersEatTooMuch = dog.recFood > dog.curFood)
// );

// console.log(whatever);

// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recFood)
//   .flatMap(dog => dog.owners);

// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recFood)
//   .flatMap(dog => dog.owners);

// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLittle);

// // 4. Log a string to the console for each array created in 3.,like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// // 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)

// // if (dogs.curFood === dogs.recFood) {
// //   console.log(dogs.owners);
// // }

// console.log(dogs.some(dog => dog.curFood === dog.recFood));

// // 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
// const dogWithinRange = dogs.find(
//   dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
// );
// console.log(dogWithinRange.owners);

// // his solution
// const checkEatingOkay = dog =>
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

// console.log(dogs.some(checkEatingOkay));

// // 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
// console.log(dogWithinRange);

// console.log(dogs.filter(checkEatingOkay));

// // 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)

// console.log(dogs.map(dog => dog.recFood).sort((a, b) => a - b));

// // his solution
// const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
// console.log(...dogsSorted);

// ===== Lectures =====

console.log(23 === 23.0);

// Base 10 - 0 to 9
// Binaray base 2 - 0
console.log(0.1 + 0.2);

console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px')); // 30
console.log(Number.parseInt('e23')); //NaN

console.log(Number.parseInt(' 2.5rem '));
console.log(Number.parseFloat(' 2.5rem '));

// Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));

// Checking if value is a number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('MATH AND ROUNDING');

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

console.log(Math.min(5, 18, 23, 11, 2)); // 2

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));

// Rounding Integers
console.log(Math.trunc(23.3)); // 23

console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23

console.log(Math.trunc(-23.3)); // 23
console.log(Math.floor(-23.3)); // 24

// Rounding decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));

// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // // ==========================================
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('================================');
// // // console.log('THE REMAINDER OPERATOR');

// REMAINDER OPERATOR is the % symbol

console.log(5 % 2); // 5 = 2 * 2 + 1
console.log(5 / 2); // 2.5

console.log(8 % 3); // 8 = 2 * 3 + 2
console.log(8 / 3); // 2.66

console.log(6 % 2); // 0
console.log(6 / 2); // 3

console.log(7 % 2); // 1
console.log(7 / 2); // 3.5

const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); // false
console.log(isEven(514)); // true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

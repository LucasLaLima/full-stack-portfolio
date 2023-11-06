/*
// Array initialization
const myArray = [10, 20, 30];
console.log(myArray);

// Indexing
let first = myArray[0];
console.log(first);

console.log(myArray[1]);

// Reassigning
myArray[0]=99;
console.log(myArray); // [99. 20, 30]

// Mixed arrays
const myArray2 = [
  1,
  'hello',
  true,
  {name: 'socks'},
  [1, 2]
]
console.log(typeof [1, 2]); // Array special types of objects

// Checking if something is an array
console.log(Array.isArray([1, 2]));

// Arrays have special property length
console.log(myArray.length); //3
console.log(myArray2.length); //5

// They have special property push(<value>)
myArray.push(100);
console.log(myArray);

// They have specail property slice(<index>, <number of values from index>)
let x = myArray.slice(0, 1);
console.log(x); // 99

let y = myArray.slice(0, 2);
console.log(y); // 99

// While Loops
let i = 1;
while(i<=5){
  console.log(i);
  i++;
}

// For loops
for (let i=1; i<= 5; i++){
  console.log(i);
}

let rn = 0; // Random number
while(rn < 0.5) {
  rn = Math.random();
  console.log(rn);
}

// More loop practice
const toDoList = [
  'make dinner',
  'wash dishes',
  'watch youtube'
]

for(let i=0; i<toDoList.length; i++) {
  console.log(toDoList[i]);
}

// Summing an array
const nums = [1, 1, 3];
let total = 0;

for(let i=0; i < nums.length; i++){
  const num = nums[i];
  total += num;
}
console.log(total);

// Copy of array where each is doubled
const numsDoubled = [];
for(let i=0; i < nums.length; i++){
  numsDoubled.push(nums[i]*2);
}
console.log(numsDoubled);
*/

// More array stuff
const array1 = [1, 2, 3];
const array2 = array1;
array2.push(4);
console.log(array1);
console.log(array2);

// Using slice to copy
const array3 = [4, 5, 6]
const array4 = array3.slice(); // copying
console.log(array4);

// Destructuring 
const [firstValue, secondValue] = [1, 2, 3]
console.log(firstValue); // 1
console.log(secondValue); // 2

// For loops - break 
for(let i=1; i<=10; i++){
  console.log(i);
  if(i===8){
    break;
  }
}

// For loops - continue
for(let i=1; i<=10; i++){
  if(i%3===0){ continue }
  console.log(i);
}

// While loop - continue
let i = 1;
while(i<=10){
  if(i % 3 === 0){
    i++; //avoids infinite loop
    continue;
  }
  console.log(i);
  i++;
}

// Loops with functions
function doubleArray(nums) {
  const numsDoubled = [];
  for(let i=0; i < nums.length; i++){
    if(nums[i]===0){
      return numsDoubled;
    }
    numsDoubled.push(nums[i]*2);
  }
  return numsDoubled;
}
console.log(doubleArray( [1, 1, 3]));
console.log(doubleArray ( [2, 2, 5, 0 , 5] ));

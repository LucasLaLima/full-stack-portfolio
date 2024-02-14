import {formatCurrency} from '../scripts/utils/money.js';

/*
Two types of test cases:
- General test case
- Edge cases

Group of related tests are called a "test suite"
*/

// Test suite name
console.log('test suite: formalCurrency');

// Test 1 - general
console.log('converts cents into dollars');
if(formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

// Test 2 - general
console.log('works with 0');
if(formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

// Test 3 - edge
console.log('rounds up to the nearest cent');
if(formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}

// Test 4 - edge
console.log('rounds down to the nearest cent')
if(formatCurrency(2000.4) === '20.00') {
  console.log('passed');
} else {
  console.log('failed');
}
/* 
请实现一个函数用来判断字符串是否表示数值（包括整数和小数）。 
例如，字符串"+100","5e2","-123","3.1416"和"-1E-16"都表示数值。 
但是"12e","1a3.14","1.2.3","+-5"和"12e+4.3"都不是。

*/
const s = '';

function fn(s) {
  return !isNaN(Number(s));
}

console.log(fn('+100'));
console.log(fn('5e2'));
console.log(fn('-123'));
console.log(fn('2.1416'));
console.log(fn('-1E-16'));

console.log(fn('12e'));
console.log(fn('1a3.14'));
console.log(fn('1.2.3'));
console.log(fn('+-5'));
console.log(fn('12e+4.3'));

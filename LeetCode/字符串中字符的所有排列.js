/* 
输入一个字符串,按字典序打印出该字符串中字符的所有排列。
例如输入字符串abc,则打印出由字符a,b,c所能排列出来的所有字符串
abc,acb,bac,bca,cab和cba。
*/
const nums = [a, b, c];

// c b a
// c b a

/* 
[a, b, c, d]
[b, c, d, a]
[c, d, a, b]
[d, a, b, c]
*/

/* 

abcabcabc
abc bca cab abc bca cab 

*/
function fn(s) {
  const l = s.length;
  for (let index = 0; index < l; index++) {
    const ele = s[index];
  }
  return;
}

const r = fn(nums);
console.log('r', r);

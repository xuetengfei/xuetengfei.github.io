const isPalindrome = function (s) {
  let res = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  console.log('res', res);
  for (let i = 0; i < res.length; i++) {
    if (res[i] !== res[res.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

console.log(isPalindrome('A man, a plan, a canal: Panama'));

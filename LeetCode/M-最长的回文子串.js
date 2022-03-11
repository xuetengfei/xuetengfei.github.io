/* 
给你一个字符串 s，找到 s 中最长的回文子串。

示例 1：
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
示例 2：
输入：s = "cbbd"
输出："bb"

提示：
1 <= s.length <= 1000
s 仅由数字和英文字母组成

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


作者：ruo-n8
链接：https://leetcode-cn.com/problems/longest-palindromic-substring/solution/zui-chang-hui-wen-chuan-shi-yong-shuang-cc725/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

*/

// 返回以l,r为中心点扩散的最长回文串
function palindrome(s, l, r) {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return s.slice(l + 1, r);
}

const longestPalindrome = function (s) {
  let res = '';
  for (let i = 0; i < s.length; i++) {
    // 处理奇数回文串
    const s1 = palindrome(s, i, i);
    console.log('s1', s1);
    // 处理偶数回文串
    const s2 = palindrome(s, i, i + 1);

    console.log('s2', s2);
    res = res.length <= s1.length ? s1 : res;
    res = res.length <= s2.length ? s2 : res;
  }
  return res;
};

const r = longestPalindrome('babad');
console.log('r ', r);

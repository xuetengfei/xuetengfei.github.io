/* 
翻转单词顺序
输入一个英文句子，翻转句子中单词的顺序
，但单词内字符的顺序不变。为简单起见，
标点符号和普通字母一样处理。
例如输入字符串"I am a student."，则输出"student. a am I"。
*/

function fn(s) {
  return s.split(' ').reverse().join(' ');
}

const r = fn('I am a student.');
console.log(r);

/* 左旋转字符串 */
{
  // abcdefg 函数将返回左旋转2位得到的结果"cdefgab"。
  function fn(s, k) {
    const substring = s.slice(0, k);
    const rest = s.slice(k, s.length - 1);
    return rest + substring;
  }
  const r = fn('abcdefg', 2);
  console.log(r);
}

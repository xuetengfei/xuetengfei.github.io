/* 
请实现一个函数，将一个字符串中的每个空格替换成“%20”。
例如，当字符串为We Are Happy。则经过替换之后的字符串为We%20Are%20Happy。
*/
const nums = [1, 2, 3, 2, 2, 2, 5, 4, 2];

{
  function fn(s) {
    return s.replace(/\s/g, '%20');
  }

  const r = fn('We Are Happy');
  console.log('r', r);
}
{
  function fn(s) {
    return s.replace(/\s+/g, '%20');
  }

  const r = fn('We Are     Happy');
  console.log('r', r);
}

{
  // 交换字符串中的两个单词
  var str = 'John Smith';
  var newstr = str.replace(/(w+)\s(\w+)/, '$2, $1');
  // Smith, John
  console.log(newstr);
}

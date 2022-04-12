## Copyright

> js 代码-给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是
> 否有效。 有效字符串需满足： 左括号必须用相同类型的右括号闭合。 左括号必须以正
> 确的顺序闭合。

```javascript
function solution(l) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    switch (c) {
      case '(':
        stack.push(')');
        break;
      case '[':
        stack.push(']');
        break;
      case '{':
        stack.push('}');
        break;
      default:
        if (c !== stack.pop()) {
          return false;
        }
    }
  }
  return stack.length === 0;
}

console.log(solution('()'));
console.log(solution('([])'));
console.log(solution('([]){}'));
```

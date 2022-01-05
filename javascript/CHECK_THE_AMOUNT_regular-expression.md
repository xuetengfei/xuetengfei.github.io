金额校验，精确到 2 位小数。

```javascript
var reg2 = /^[1-9]+(.[0-9]{2})?$/;

console.log('reg2.test("123.13")', reg2.test('123.13'));
// reg2.test("123.13") true

console.log('reg2.test("0123.13")', reg2.test('0123.13'));
// reg2.test("0123.13") false

console.log('reg2.test("0123.135")', reg2.test('0123.135'));
// reg2.test("0123.135") false
```

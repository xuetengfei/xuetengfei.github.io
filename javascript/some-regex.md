### 校验有效数字(不能 0 开头)

```javascript
const regex = /^[1-9][0-9]*$/;
const number = 10000;
const end = regex.test(number); // trueb
```

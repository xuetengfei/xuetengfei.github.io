如何定义可以输入的内容的限制，并根据设置的规则对其进行验证？

```
yarn add joi
```

```javascript
const Joi = require('joi');
const schema = Joi.object()
  .keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    access_token: [Joi.string(), Joi.number()],
    birthyear: Joi.number().integer().min(1900).max(2013),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  })
  .with('username', 'birthyear')
  .without('password', 'access_token');

const { error, value } = Joi.validate(
  { username: 'abc', birthyear: 1994 },
  schema,
);

if (!error) {
  console.log('pass !!!');
} else {
  console.log(error.details);
  console.log(' no pass !!!');
}
```

用 node 跑一下，输出结果

```javascript
// [ { message: '"email" is required',
//     path: [ 'email' ],
//     type: 'any.required',
//     context: { key: 'email', label: 'email' } } ]
//  no pass !!!
```

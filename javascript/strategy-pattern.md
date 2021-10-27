## 打折价格计算实例

```javascript
let Pricestrategy = (() => {
  // 策略算法组
  let strategy = {
    return30(price) {
      return parseInt(price / 100) * 30;
    },
    return50(price) {
      return parseInt(price / 100) * 50;
    },
    return70(price) {
      return parseInt(price / 100) * 70;
    },
  };
  // 对外暴露的API
  return {
    // 接受参数，匹配对于的算法
    calc(algorithm, price) {
      // console.log(strategy);
      return strategy[algorithm] && strategy[algorithm](price);
    },
    // 可以添加新的算法
    add(type, fn) {
      strategy[type] = fn;
    },
  };
})();

console.log(Pricestrategy.calc('return70', 300)); // 210

Pricestrategy.add('return10', price => {
  return price * 3;
});
console.log(Pricestrategy.calc('return10', 300)); // 900
console.log(Pricestrategy.calc('return50', 300)); // 150
```

```javascript
let Pricestrategy = (() => {
  // 策略算法组
  let strategy = {
    return30(price) {
      return parseInt(price / 100) * 30;
    },
    return50(price) {
      return parseInt(price / 100) * 50;
    },
    return70(price) {
      return parseInt(price / 100) * 70;
    },
  };
  return function (algorithm, price) {
    return strategy[algorithm] && strategy[algorithm](price);
  };
})();
console.log(Pricestrategy('return70', 300)); // 210
```

实用场景:表单验证，缓动动画，折扣算法等

```javascript
let Pricestrategy = new Map();
Pricestrategy.set('return70', function ({ price }) {
  return parseInt(price / 100) * 70;
});
Pricestrategy.set('return10', function ({ price }) {
  return parseInt(price / 100) * 10;
});
Pricestrategy.set('return20', function ({ price }) {
  return parseInt(price / 100) * 20;
});

const fn = (algorithm, ...args) => {
  return Pricestrategy.get(algorithm)
    ? Pricestrategy.get(algorithm)(args[0])
    : '没有找到可用策略';
};

console.log(fn('return700', { price: 100 })); // 210
```

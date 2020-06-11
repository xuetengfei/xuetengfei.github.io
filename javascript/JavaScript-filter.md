`.filter`是一个内置的数组迭代方法，它接受一个“（一个过滤条件的函数）”，该“过滤函数”针对每个值进行调用，并返回一个符合该条件(“truthy 值”)的数组。

- “truthy 值”是强制转换为布尔值时计算为 true 的任何值。几乎所有值都是真实的，除了：undefined，null，false，0，NaN 或“”（空字符串）。

```javascript
const restaurants = [
  {
    name: "Dan's Hamburgers",
    price: 'Cheap',
    cuisine: 'Burger',
  },
  {
    name: 'Taquerias Arandina',
    cuisine: 'Tex-Mex',
    price: 'Cheap',
  },
  {
    name: 'Hopdoddy',
    price: 'Expensive',
    cuisine: 'Burger',
  },
  {
    name: 'El Alma',
    cuisine: 'Tex-Mex',
    price: 'Expensive',
  },
];
```

这是很多信息。我现在想要一个汉堡，所以让我们过滤掉一下这个数组。

```javascript
const isBurger = ({ cuisine }) => cuisine === 'Burger';
const burgerJoints = restaurants.filter(isBurger);
```

```javascript
// console.log(burgerJoints)
[
  { name: "Dan's Hamburgers", price: 'Cheap', cuisine: 'Burger' },
  { name: 'Hopdoddy', price: 'Expensive', cuisine: 'Burger' },
];
```

我想过`滤掉汉堡`尝试新的东西。一种选择是从头开始编写新的 isNotBurger 谓词。

```javascript
// bad : repeat code

const isBurger = ({ cuisine }) => cuisine === 'Burger';
const isNotBurger = ({ cuisine }) => cuisine !== 'Burger';
```

```javascript
// good

const isBurger = ({ cuisine }) => cuisine === 'Burger';
const isNotBurger = restaurant => !isBurger(restaurant);
```

这个更好！如果汉堡的定义发生变化，您只需要在一个地方更改逻辑。但是，如果我们想要一些否定的谓词呢？由于这是我们可能经常想要做的事情，因此编写否定函数可能是个好主意。

```javascript
const negate = predicate =>
  function() {
    return !predicate.apply(null, arguments);
  };

const isBurger = ({ cuisine }) => cuisine === 'Burger';
const isNotBurger = negate(isBurger);

const isPizza = ({ cuisine }) => cuisine === 'Pizza';
const isNotPizza = negate(isPizza);
```

apply（）方法调用具有给定 this 的函数，并将参数作为数组（或类数组对象）提供。  
arguments 对象是所有（非箭头）函数中可用的局部变量。您可以使用参数在函数内引用函数的参数 object.  
为什么要使用旧的 function，而不使用更酷的箭头函数？在这种情况下，使用传统函数是必要的，因为 arguments 对象在传统函数上是*唯一*可用的。

---

[JavaScript .filter() 方法全解析](https://www.zcfy.cc/article/level-up-your-filter-game)

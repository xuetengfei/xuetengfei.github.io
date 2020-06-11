## 高阶-函数

```javascript
// 高阶函数就是一个函数.这个函数执行后返回一个新的函数.

// multiply; //=> (x) => (y) => x * y

const multiply = x => y => x * y;
multiply(5); //=> (y) => 5 * y
multiply(5)(20); //=> 5 * 20
```

## Demo Show: filter List

根据输入字段的值,过滤出要呈现的用户列表。需要将`filter条件函数`单独`抽离`出来.目前这个`filter()`函数内容还是很简单的,可以将其包含在另一个`高阶函数`中。

```javascript
import React, { Component } from 'react';

const doFilter = keyword => user => user.name === keyword;

export default class App extends Component {
  state = {
    query: '',
  };
  onChange = event => {
    // 来自用户的输入保存为 query state
    this.setState({ query: event.target.value });
  };
  render() {
    const { query } = this.state;
    const users = [{ name: 'Robin' }, { name: 'Markus' }];
    return (
      <>
        <ul>
          {/*  `doFilter(query)` 相当于  `user => query === user.name;`  */}
          {users.filter(doFilter(query)).map(user => (
            <li>{user.name}</li>
          ))}
        </ul>
        <input type="text" onChange={this.onChange} />
      </>
    );
  }
}
```

```javascript
const doFilter = keyword => user => user.name === keyword;
```

这个函数有两个**=>**，第一次返回一个函数，第二次函数返回一个最后计算结果。第一个参数是**keyword**是个**形参**,这个参数可以是任意值包括**函数**.第二个参数**user**它自己是一个**形参**,user 这个名字和 react class 上下文没有任何关系,它只不过代表**Array.filte( v => fn(v))**中这个 **v**的意义,表示数组中的每一个元素的意思.

## 高阶组件

在 react 中，定义一个组件现在有两种方式，一种是**Class Component**,一种是**Function Component**.任何返回 JSX 的函数都被称为**无状态函数组件**，简称为函数组件。基本的函数组件如下所示

```javascript
const Title = props => <h5>{props.children}</h5>

<Title>Higher-Order Components(HOCs)</Title>

// render ->> <h5>Higher-Order Components(HOCs)</h5>
```

高阶函数运用到了 react 上,用来定义函数组件,就是**高阶组件**,只是换一种叫法而已.调用高阶函数,返回一个新的函数;调用高阶组件,返回一个新的组件.高阶组件接受**组件**作为参数并返回**组件的函数**。如何使用传入组件完全取决于开发者，甚至可以完全忽视它。

### Example: toUpperCase

```javascript
import React from 'react';

const yell = PassedComponent => ({ chidlren, ...restProps }) => (
  <PassedComponent {...restProps}>{children.toUpperCase()}!</PassedComponent>
);

const Title = props => <h1>{props.children}</h1>;

const AngryTitle = yell(Title);

<AngryTitle>wowowo</AngryTitle>;

// <h1>WOWOWO!</h1>
```

### Example: WithLoading...

**WithLoading** 组件的作用是:根据状态显示**加载中**或者具体的**组件内容**,高度封装.接受一个**组件名称**作为参数

```javascript
const withLoading = PassedComponent => ({ isLoading, ...props }) => {
  if (isLoading) {
    return <p>Loading</p>;
  }

  return <PassedComponent {...props} />;
};
```

添加三元运算符可将函数体缩短为一行代码。因此可以省略函数体，并且可以省略 return 语句。

```javascript
const withLoading = PassedComponent => ({ isLoading, ...props }) =>
  isLoading ? <p>Loading</p> : <PassedComponent {...props} />;
```

!>tips: 找到最后一个`=>`,看它`return` 的结果就是最终的输出

#### 完整的代码和具体使用

```javascript
import React, { Component } from 'react';

const WithLoading = PassedComponent => ({ isLoading, ...props }) =>
  isLoading ? <p>Loading</p> : <PassedComponent {...props} />;

const Foo = () => <h1>foo component</h1>;

const FooWithLoad = WithLoading(Foo);

export default class IndexPage extends React.Component {
  render() {
    return (
      <>
        <FooWithLoad isLoading={false} />
      </>
    );
  }
}

//  生成的DOM元素是: <h1>Loading</h1>
//  页面显示 `Loading`
```

## 理解

```javascript
// 定义一个高阶组件
const multiply = x => y => x * y;

// 高阶组件接受传参后,返回一个新组件,把新组件赋给一个变量
const Secondary = multiply(5); //=> Function

// 组件内使用这个变量(新的组件),接收第二次传参,得到最终的结果
Secondary(20); // => 5*20 => 100


const multiply = x => y => x * y;
multiply; //=> (x) => (y) => x * y
multiply(5); //=> (y) => 5 * y
multiply(5)(20); //=> 5 * 20

console.log(multiply(5)(20)); // 100

// `multiply`后面可以跟上两个圆括号
multiply(5)(20); //=> 100


// 但是,组件后面跟两个圆括号是错误的.就像下面这样
// 标签内的那个东西实际是个类或者函数，WithLoad 实际已经是实例化好的jsx，不能再实例化一次
// 必须保证，高阶函数返回的那个函数是一个`jsx的类`或`返回jsx的function`

const props = {
  isLoading: false,
};
const WithLoad = WithLoading(Foo)(props);   ❌

return (
  <>
    <WithLoad /> ❌
  </>
);



// 所以,需要一个将`WithLoading(Foo)`赋予给一个变量名,相当于一个创造了新的标签,实例化
// 然后,给这个新的标签,以`自定义属性`的方式传入`props参数`使用

const WithLoad = WithLoading(Foo);    // 位置(1)可以写在`class{}`前面
class IndexPage extends React.Component {
  render() {
    const WithLoad = WithLoading(Foo);  // 位置(2)可以写在`render()`内部 ✅
    return (
      <div>
          <WithLoad isLoading={false} />   ✅
      </div>          ↓
    );                ↓
  }                   ↓
}                     ↓
                      ↓
                      ↓
// 类似于              ↓
const Secondary = multiply(5); //=> Function
Secondary(20) // =>100
```

## Class 高阶组件

你也可以返回一个有状态组件，因为 JavaScript 中的类不过是函数的语法糖。这样就可以使用到 React 生命周期的方法，比如 `componentDidMount`。这是 HOCs 真正有用的地方。可以做一些稍微有趣点的事，比如将 HTTP 请求的结果传递给函数组件。

## 实例：HTTP 请求

[withGists HOC - CodeSandbox](https://codesandbox.io/embed/o2YpJnpDj)

```javascript
import React from 'react';
import { render } from 'react-dom';

const withGists = PassedComponent =>
  class WithGists extends React.Component {
    state = {
      gists: [],
    };

    componentDidMount() {
      fetch('https://api.github.com/gists/public')
        .then(r => r.json())
        .then(gists =>
          this.setState({
            gists,
          }),
        );
    }

    render() {
      return <PassedComponent {...this.props} gists={this.state.gists} />;
    }
  };

const Gist = ({ id, html_url, files }) => (
  <div>
    <a href={html_url}>{id}</a>
    <ul>
      {Object.entries(files).map(([filename, data]) => (
        <li>
          <a href={data.raw_url} key={filename}>
            {filename}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Gists = ({ gists }) => (
  <div>
    <h1>Gists</h1>
    {gists.map(gist => (
      <div key={gist.id}>
        <Gist {...gist} />
        <hr />
      </div>
    ))}
  </div>
);

const GistsList = withGists(Gists);

render(<GistsList />, document.getElementById('root'));
```

## react-redux 中的 HOC

react-redux 也是使用 HOC， `connect` 将应用 `store` 的值传递到“已连接” 的组件。它还会执行一些错误检查和组件生命周期优化，如果手动完成将导致编写大量重复代码。
如果你发现自己在不同地方编写了大量的代码，那么也可以将代码重构成可重用的 HOC。
HOCs 非常具有表现力，可以使用它们创造很多很酷的东西。
尽可能地保持你的 HOC 简单，不要过度抽象。

---

1. [A gentle Introduction to React's Higher Order Components - RWieruch](https://www.robinwieruch.de/gentle-introduction-higher-order-components/)
2. [面向初学者的高阶组件教程\_React, HOC, 高阶组件 教程\_w3cplus](https://www.w3cplus.com/react/higher-order-components-for-beginners.html)

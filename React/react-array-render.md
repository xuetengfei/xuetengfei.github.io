# 如何呈现一个项目列表

`react` 没有类似`vue`中的`v-for`API
在我看来，这是解释 React 最好的部分之一。没有特定于 React 的 API，但是可以使用纯 JavaScript 来迭代项目列表并返回每个项目的 HTML。

## map()

```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    var users = [{ name: 'Robin' }, { name: 'Markus' }];

    return (
      <ul>
        {users.map(user => (
          <li>{user.name}</li>
        ))}
      </ul>
    );
  }
}

export default App;
```

映射数组并返回每个项的渲染输出非常有意义。这同样适用于自定义的情况，其中 filter（）或 reduce（）更有意义，而不是为每个映射项呈现输出。

## filter（）或 reduce（）

```javascript
import React, { Component } from 'react';

class App extends Component {
  render() {
    var users = [
      { name: 'Robin', isDeveloper: true, key: 1 },
      { name: 'Markus', isDeveloper: false, key: 2 },
    ];

    return (
      <ul>
        {users
          .filter(user => user.isDeveloper)
          .map(user => (
            <li>{user.name}</li>
          ))}
      </ul>
    );
  }
}

export default App;
```

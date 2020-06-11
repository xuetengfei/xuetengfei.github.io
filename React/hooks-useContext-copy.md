# useContext 减少组件层级

useContext 用来处理多层级传递数据的方式，在以前组件树，跨层级祖先组件想要给孙子组件传递数据的时候，除了一层层 props 往下透传之外，可以使用 React Context API 实现。

```javascript
// componentsContext.js

const CurrentUser = React.createContext({
  name: 'xuetengfei',
});
const Notifications = React.createContext(['one', 'two', 'three']);
```

```javascript
// component

import React, { useContext } from 'react';
import { CurrentUser, Notifications } from './componentsContext.js';
import styles from './useContext.less';

export default function() {
  const user = useContext(CurrentUser);
  const notifications = useContext(Notifications);
  return (
    <div className={styles.normal}>
      <h3>
        Welcome back!<b className={styles.c}>{user.name}</b>!<br />
        You have<b className={styles.c}>{notifications.length}</b>! notifications.
      </h3>
    </div>
  );
}
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/useContext-1558202413.jpg' width='600px'/>

0. [xuetengfeiumi -- demo](http://106.12.98.175/#/useContext)

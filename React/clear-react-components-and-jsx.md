<!-- clear-react-components-and-jsx.md -->

一、 可选的 props 和空对象 {}

在父组件内部完成此操作总是比在组件本身内部完成更为干净。

```javascript
import React from 'react';
import propsTypes from 'props-types';

const UserCard = ({ user }) => {
  return (
    <ul>
      <li>{user.name}</li>
      <li>{user.age}</li>
      <li>{user.email}</li>
    </ul>
  );
};

UserCard.propsTypes = {
  user: propsTypes.object,
};
UserCard.defaultTypes = {
  user: {},
};
```

修改为

```javascript
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// 子组件
export const UserCard = ({ user }) => {
  return (
    <ul>
      <li>{user.name}</li>
      <li>{user.age}</li>
      <li>{user.email}</li>
    </ul>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

// 父组件
export const UserContainer = () => {
  const [user, setUser] = useState(null);
  if (isLoading) return <Spinner />;
  return <div>{user && <UserCard user={user} />}</div>;
};
```

2

```javascript
import React, { useState, useEffect } from 'react';
import { fetchUserAction } from '../api/actions.js';

const UserContainer = () => {
  const [user, setUser] = useState(null);
  const handleUserFetch = async () => {
    const result = await fetchUserAction();
    setUser(result);
  };

  useEffect(() => {
    handleUserFetch();
    // 忽略警告
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <p>No data available.</p>;
  return <UserCard data={user} />;
};
```

`handleUserFetch()` 方法在组件每次渲染的时候都会重新创建（组件有多少次更新就会创
建多少次）。

```javascript
import React, { useState, useEffect, useCalllback } from 'react';

import { fetchUserAction } from '../api/actions.js';

const UserContainer = () => {
  const [user, setUser] = useState(null);

  // 使用 useCallback 包裹
  const handleUserFetch = useCalllback(async () => {
    const result = await fetchUserAction();
    setUser(result);
  }, []);

  useEffect(() => {
    handleUserFetch();
  }, [handleUserFetch]); /* 将 handleUserFetch 作为依赖项传入 */

  if (!user) return <p>No data available.</p>;

  return <UserCard data={user} />;
};
```

useCallback 的作用在于利用 memoize 减少无效的 re-render，来达到性能优化的作用。

3.提交表单

```javascript
import React, { useState } from 'react';

const Form = () => {
  const [name, setName] = useState('');

  const handleChange = e => {
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // api call here
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={name} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

在`button`上绑定 click 事件，通过点击调用 handleSubmit 来提交数据,无法使用 Enter
键提交表单。使用 submit，就可以满足。

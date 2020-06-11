#### 使用 Axios

Axios 是浏览器和 Node.js 最受欢迎的基于 promise 的 HTTP 客户端之一。简单，轻便且易于定制。不仅如此，还可以与 React 和许多其他框架配合使用。Axios 支持请求和响应拦截器，转换器和自动转换为 JSON。它还默认保护您免受跨站点请求伪造（XSRF）。

#### 在 React 项目中集成和配置 Axios

新建一个空项目,将通过创建一个名为的 utils 目录，在里面，创建一个`API.js`新文件，在其中将存储 Axios 配置。

```javascript
// utils/API.js
import axios from 'axios';

export default axios.create({
  baseURL: 'https://randomuser.me/api/',
  responseType: 'json',
});
```

`API.js`文件导入**Axios**库并导出一个 axios 新配置的实例。它被设置为使用[RandomUser](https://www.randomuser.me/)API 作为基本 URL，并指定 JSON 作为 responseType 值。

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from './card';

class User extends React.Component {
  render() {
    const { avatar, email, isLoading } = this.props;
    const userDetails = (
      <div>
        <img src={avatar} alt="" />
        <span>{email}</span>
      </div>
    );
    const loadingMessage = <span>Loading...</span>;
    return <Card>{isLoading ? loadingMessage : userDetails}</Card>;
  }
}

User.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default User;
```

#### 在哪里加载数据 ?

根据官方的 React 文档，在 componentDidMount()生命周期钩子里面，向 API 提出加载数据的实际请求，是此类操作的理想之选。

#### GET 请求

获取请求
现在 App.js 组件有自己的状态。这将有助于跟踪加载状态，人名，头像和电子邮件。User 在重新渲染组件时，它还使用状态数据来渲染组件。
我们还创建了该 `async componentDidMount()`方法。在内部，发出异步请求来加载数据并更新组件的状态。这将触发新的重新渲染。请注意，该方法 async 允许我们在 await 内部执行某些操作。

```javascript
// src/App.js

import React from 'react';

import API from './utils/API';
import User from './User';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      avatar: null,
      email: null,
    };
  }

  render() {
    const { isLoading, name, avatar, email } = this.state;
    return <User isLoading={isLoading} name={name} avatar={avatar} email={email} />;
  }

  async componentDidMount() {
    // Load async data.
     let userData = await API.get('/', {
          params: {
            results: 1,
            inc: 'name,email,picture'
          }
        });
        userData = userData.data.results[0];
        const avatar = userData.picture.large;
        const email = userData.email;
    
        this.setState({
          ...this.state, ...{
            isLoading: false,
            avatar,
            email
          }
        });
      }
  }
}

export default App;
```

#### POST 请求

在 Axios 中，使用该`post()`方法创建 POST 请求

```javascript
import axios from 'axios';

try {
  const response = await axios.post('http://demo0725191.mockable.io/post_data', {
    posted_data: 'example',
  });
  console.log('👉 Returned data:', response);
} catch (e) {
  console.log(`😱 Axios request failed: ${e}`);
}
```



#### 使用 Async / Await ，如何处理错误 ？

使用 promises 时处理 JavaScript 错误的常用方法是通过该.catch()方法。使用的美妙之处 async/await 在于我们可以忘记它并使用 try/catch 语句代替。 以下是如何使用重写上述请求 try/catch。

```javascript
try {
  // Load async data from an inexistent endpoint.
  let userData = await API.get('/inexistent-endpoint');
} catch (e) {
  console.log(`😱 Axios request failed: ${e}`);
}
```

END.

<!--

[How to use Axios with React (Everything you need to know) – DesignRevision](https://designrevision.com/react-axios/#integrating-and-configuring-axios-in-your-react-project)

[How to fetch data with React Hooks? - RWieruch](https://www.robinwieruch.de/react-hooks-fetch-data/)

[How to create React custom hooks for data fetching with useEffect](https://itnext.io/how-to-create-react-custom-hooks-for-data-fetching-with-useeffect-74c5dc47000a)

 -->


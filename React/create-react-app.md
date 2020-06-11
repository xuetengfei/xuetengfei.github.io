# create-react-app useage

### HomePage

1. [Create React App · Set up a modern web app by running one command.](https://facebook.github.io/create-react-app/)

### Install

```javascript
npm install -g create-react-app
```

### Create new project

```javascript
create-react-app my-app
cd my-app/

```

### Start

```javascript
npm start
```

### package.json

```javascript
{
  "name": "test_redux_app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@ajusa/lit": "^1.1.0",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-scripts": "2.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}

```

### "react-scripts": "2.1.3" ??

react-scripts 又是什么？在 node_modules 目录中能找到它，依赖了好多工具，其中就包括'webpack'。  
原来它是 facebook 开发的一个管理 create-react-app 服务的工具，也是它让整个源码变得很整洁的。因为它隐藏了没必要的文件，大多数人的配置都是差不多的

### proxy 与 前后端联调

通常线上环境,前后端拥有相同的主机和端口,后端为前端应用程序提供服务。例如，在部署应用程序后，生产设置可能如下所示：

```
/             - static server returns index.html with React app
/todos        - static server returns index.html with React app
/api/todos    - server handles any /api/* requests using the backend implementation */
```

前后端拥有相同的主机和端口(线上环境)，那么像 `fetch('/api/todos')`这样的请求很方便，而不必担心在开发过程 `fetch('/api/todos')`它们`重定向`到另一个主机或端口。

开发过程中，前后端各自开发，主机或端口不同的情况下，这个时候可能会遇到[CORS](https://stackoverflow.com/questions/21854516/understanding-ajax-cors-and-security-considerations)问题，解决这个问题，
create-react-app 提供了一个超级简单的方法，只需要在 package.json 文件中，加一个[proxy](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development)字段就可以了。

```javascript
"proxy": "http://111.222.333.444:2555",
```

这样，当您在开发中 fetch('/api/todos')时，开发服务器将识别出它不是 static asset,静态资产，并将您的请求`http://localhost:4000/api/todos`,代理 发送`http://111.222.333.444:2555/api/todos` 。这可以避免开发中的 CORS 问题和错误消息：

请记住， proxy 只在开发环境中有效（使用 npm start ），并且由您来确保像`/api/todos` 这样的 URL 在生产中指向正确的东西。 没有 text/html accept 标头的任何无法识别的请求都将被重定向到指定的 proxy 。

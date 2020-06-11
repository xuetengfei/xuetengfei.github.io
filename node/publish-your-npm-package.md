## 准备工作

新建一个文件夹，初始化一个 github 空白仓库。

```
npm who am i
```

看一个自己在自己电脑上是否已经注册登陆了 npm 。没有的话，注册 npmjs 帐号，执行 npm adduser ,按提示输入 username 和 password 以及 email。
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/npm-login.jpg' width='500px'/>

## 初始化项目

```javascript
npm init
```

初始化 packgae.json 填写 repository 字段。就是这个文件的 github 仓库地址。新建一个 lib 文件夹，代码全部写着这个文件夹里面，那么修改
main 字段，这个 bin 的字段是一个对象，其 key-value 组合的键值对。key 是我们日后的命令别名，value 就是我们的文件路径。下面作为参考。
name 字段建议使用`@yourname/projectname`这种形式，可以避免重名冲突。各大厂商也都是这样做的。version 字段，先写 0.0.1。

```json
{
  "name": "@xuetengfei/rapid",
  "version": "0.0.1",
  "main": "./lib/index.js",
  "bin": {
    "rapid": "./lib/index.js"
  },
  "keywords": ["react"],
  "license": "MIT",
  "dependencies": {
    "commander": "^2.19.0",
    "nodemon": "^1.18.9"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/xuetengfei/Rapid"
  }
}
```

安装对应依赖

```javascript
yarn add  commander
```

## main.js 代码

npm 包实际是一个存档文件，package.json : 包描述文件。
bin: 用于存放可执行二进制文件的目录。
lib：用于存放 javascript 代码的目录。
doc：用于存放文档的目录。
test: 用于存放单元测试用例的代码。
我们开发 npm 包模块的时候，就可以按照以上目录结构，进行开发。

先不要去关下面的代码写了什么，重点是整个发布的流程。

```javascript
#!/usr/bin/env node
const fs = require('fs');
const program = require('commander'); //终端输入处理框架
const package = require('../package.json'); //获取版本信息
program
  .version(package.version, '-v,--version')
  .command('init <name>')
  .action(name => {
    console.log(name);
  });
program.parse(process.argv);
```

## 提交然后发布

```javascript
npm publish .
```

`npm publish .`这个过程可能会出现错误，原因是`@yourname/projectname`这种格式，会认为你要发私有包。那么，修改命令为`npm publish --access=public`

 <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/npm-publish-2.jpg' width='500px'/>

## 项目本地安装

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/yarn-add-your-npm.jpg'/>

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/npm-updata.jpg' width='400px'/>

## 全局安装

全局安装后跑一下我们之前的 bin 二进制文件命令
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/run-result.jpg' />

## 升级版本

每一次发布新版本，需要修改 package.json 的 version 字段，然后`npm publish .`新版发布后，项目中就会有提示了(这个提示是 vscode 的一个插件)
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/npm-new-version.jpg' width="400px"/>

---

[CLI documentation | npm Documentation](https://docs.npmjs.com/cli-documentation/)

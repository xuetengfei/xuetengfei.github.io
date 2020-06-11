前面的博客中写到,Code Splitting 可以`按照路由级别代码分割`,其实也可以`按需载入外部依赖`，就是从`静态导入`切换到`动态导入`。
dynamic import 提供基于 Promise 的 API 在代码中使用的 import 的顺序与它们被解析的顺序没有任何关联。import 遵循 ES 模块规则：**单例、匹配符、CORS **等,import 脚本只会加载一次，这只是其中一个优点。可以在延迟加载、条件加载和用户操作的情景下使用 dynamic import 。

## syntax

```javascript
if (user.loggedIn) {
  import('user-widget.js');
}
```

## e.g. frontEnd encrypt

拆分 JavaScript 包，只在用户加载应用程序时发送初始路由所需的代码。 这样可以最大限度地减少需要解析和编译的脚本数量，从而加快页面加载时间。在项目里面,前端需要对敏感数据进行加密,而此模块没有在其他地方使用，可以修改代码块，只有在用户提交数据才使用动态导入来获取它。

```javascript
// some/path/func.js

// ...
export const enc = (str = '') => {
  const publicKey = 'some-public-key';

  import('jsencrypt')
    .then(module => module.default) // using the default export
    .then(Jsencrypt => {
      const encrypt = new Jsencrypt();
      encrypt.setPublicKey(publicKey);
      return encrypt.encrypt(str);
    });
};
// ...
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200522154020dynamic-import.jpg' alt='20200522154020dynamic-import'/>

---

2. [Dynamic import() · V8](https://v8.dev/features/dynamic-import)
   [Reduce JavaScript payloads with code splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

<!-- <img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/async-import-module-1557852480.png' width='600px'/> -->

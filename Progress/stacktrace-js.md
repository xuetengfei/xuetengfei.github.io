[stacktrace.js](https://github.com/stacktracejs/stacktrace.js) 使用浏览器的 `error.stack`机制来生成堆栈跟踪、解析跟踪、使用`sourcemap`增强跟踪，并使用`promise`返回一组 `stackframes`。在所有浏览器中生成、分析和增强 JavaScript 堆栈跟踪

还可以上报错误,集中分析。

## 简单封装一下

```javascript
import StackTrace from 'stacktrace-js';
const callback = stackframes => console.table(stackframes.slice(0, 5));
var errback = err => console.log(err.message);

const ErrorTrack = error =>
  StackTrace.fromError(error)
    .then(callback)
    .catch(errback);

export { ErrorTrack };
```

```javascript
// ...
import { ErrorTrack } from '../../_public/stacktrace';
//...

const handleShowToast = () => {
  // ...
  var error = new Error('BOOM!');
  ErrorTrack(error);
};

export default function() {
  return (
    <div className={styles.normal}>
      <Button onClick={handleShowToast}>click</Button>
      <p>打开控制台</p>
    </div>
  );
}
```

## 截图

## 开发环境截图示意

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/track-1-1557304363.jpg'/>

## 生产环境环境截图示意

[服务器 demo - xuetengfeiumi](http://106.12.98.175/#/notyf)
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/track-2-1557304363.jpg'/>

---

1. [stacktrace.js: Generate, parse, and enhance JavaScript stack traces in all web browsers](https://github.com/stacktracejs/stacktrace.js)

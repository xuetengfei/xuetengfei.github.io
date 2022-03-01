```js
function f() {
  try {
    console.log('start');
    return 'result';
  } catch (err) {
    /// ...
  } finally {
    console.log('cleanup!');
  }
}

f(); // cleanup!
```

```javascript
function f() {
  try {
    alert('start');
    throw new Error('an error');
  } catch (err) {
    // ...
    if ("can't handle the error") {
      throw err;
    }
  } finally {
    alert('cleanup!');
  }
}

f(); // cleanup!
```

<!-- 1. [Will it finally: 关于 try/catch 的一些细节 - 众成翻译](https://www.zcfy.cc/article/will-it-finally-a-try-catch-quiz) -->

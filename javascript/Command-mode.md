> 命令模式:封装功能，简化 API

封装功能，提供简单而高效的 API 是提高团队开发效率的可行方案。命令模式即是将分散化的小粒度功能整合成复杂的对象，并提供更简单而统一的 API 来管理并简化功能的使用。

```js
const Commands = (() => {
  let obj = {
    value: 1000,
    plus(number) {
      this.value += number;
    },
    minus(number) {
      this.value -= number;
    },
  };
  return {
    getValue: () => obj.value,
    excute: ({ command, number }) => {
      obj[command].call(obj, number);
    },
  };
})();

Commands.excute({ command: 'plus', number: 10 });
Commands.excute({ command: 'plus', number: 30 });
Commands.excute({ command: 'minus', number: 15 });
console.log(Commands.getValue()); // 1025
```

[creatStore implementation - xuetengfei](/Redux/redux-creatStore-implementation)

---

1.  《JavaScript 设计模式 张容铭著 》

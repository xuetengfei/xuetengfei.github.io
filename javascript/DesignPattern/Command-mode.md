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

1.  《JavaScript 设计模式 张容铭著 》

<!--

```javascript
let MyCommands = (() => {
  let Actions = {
    name(paraname) {
      console.log('我是' + paraname);
    },
    age(name, num1, num2) {
      log(name + ' 今年' + num1 + ' 岁 ' + ' 明年 ' + num2 + '岁！');
    },
    // others command function is code here ...
  };
  return {
    excute: function (msg) {
      if (!msg) return;
      // 如果msg是数组
      if (msg.length) {
        // 如果是数组，遍历执行多次命令，数组里面每一项元素，单独执行这个excute函数
        for (let i = 0; i < msg.length; i++) {
          MyCommands.excute(msg[i]);
          // 这里不要使用 arguments.callee(msg[i])，严格模式下'callee'报错
        }
      } else {
        // 兼容性的写法：检查参数的形式是不是'数组格式'，目的是为了统一使用'apply'这个api
        // 传入的参数是'对象'还是'数组'都可以
        msg.param =
          Object.prototype.toString.call(msg.param) === '[object Array]'
            ? msg.param
            : [msg.param];
        // apply参数只接受数组形式参数，call接受单独的参数
        Actions[msg.command].apply(Actions, msg.param);
      }
    },
  };
})();

MyCommands.excute({ command: 'name', param: ['马冬梅'] });
MyCommands.excute([{ command: 'name', param: '袁华' }]);
MyCommands.excute([
  { command: 'name', param: '夏洛' },
  { command: 'age', param: ['马冬梅', 19, 20] },
  { command: 'age', param: ['夏洛', 80, 81] },
]);
```

````javascript
我是马冬梅
 我是袁华
 我是夏洛
 马冬梅 今年 19 岁  明年 20 岁！
夏洛 今年 80 岁  明年 81 岁！
````

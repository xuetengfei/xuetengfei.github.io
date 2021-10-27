在某个场景下我们的函数中有判断语句，这个判断依据在整个项目运行期间一般不会变化，
所以判断分支在整个项目运行期间只会运行某个特定分支，那么就可以考虑惰性载入函数

```javascript
function foo() {
  if (a !== b) {
    console.log('aaa');
  } else {
    console.log('bbb');
  }
}

// 优化后
function foo() {
  if (a != b) {
    foo = function () {
      console.log('aaa');
    };
  } else {
    foo = function () {
      console.log('bbb');
    };
  }
  return foo();
}
```

复制代码那么第一次运行之后就会覆写这个方法，下一次再运行的时候就不会执行判断了。
当然现在只有一个判断，如果判断很多，分支比较复杂，那么节约的资源还是可观的。

## 一次性函数

跟上面的惰性载入函数同理，可以在函数体里覆写当前函数，那么可以创建一个一次性的函
数，重新赋值之前的代码相当于只运行了一次，适用于运行一些只需要执行一次的初始化代
码

```javascript
let fn;
fn = function () {
  console.log('msg');
  fn = function () {
    console.log('foo');
  };
};
fn(); // msg
fn(); // foo
fn(); // foo
```

vue 的 props 对象和 react 很不一样啊。

## 静态和动态 props

#### City-Components

```javascript
<template>
  <div>
    <div>I'm City Component</div>
    <div></div>
    <p>Message From its father: {{msg1}}</p>
    <p>Message From its father: {{msg2 | Uppercase}}</p>
  </div>
</template>

<script>
export default {
  name: "City",
  props: {
    msg1: {
      type: String
    },
    msg2: {
      type: String
    }
  }
};
</script>
```

#### Province-Components

```javascript
<template>
  <div>
    <input type="text" v-model="msg2" />
    <City staticMsg="static props msg" :dynamicMsg="msg2" />
  </div>
</template>

<script>
export default {
  name: 'Province',
  data() {
    return {
      msg1: 'static props msg',
      msg2: 'init value',
    };
  },
};
</script>
```

## 写成对象

```javascript
<template>
  <div>
    <input type="text" v-model="obj.msg2">
    <City v-bind="obj"/>
  </div>
</template>

<script>
export default {
  name: "Province",
  data() {
    return {
      obj: {
        msg1: "static props msg",
        msg2: "input value"
      }
    };
  }
};
</script>
```

## 单向数据流

Prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。

另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。

## Prop 验证

我们可以为组件的 prop 指定验证规则。如果传入的数据不符合要求，Vue 会发出警告。这对于开发给他人使用的组件非常有用。

要指定验证规则，需要用对象的形式来定义 prop，而不能用字符串数组：

```javascript
Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 指允许任何类型)
    propA: Number,
    // 可能是多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true,
    },
    // 数值且有默认值
    propD: {
      type: Number,
      default: 100,
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function() {
        return { message: 'hello' };
      },
    },
    // 自定义验证函数
    propF: {
      validator: function(value) {
        return value > 10;
      },
    },
  },
});
```

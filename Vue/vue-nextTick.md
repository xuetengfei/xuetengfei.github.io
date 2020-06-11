# nextTick & 异步更新队列

首先，vue 的理念是数据驱动视图 UI，当因为数据变动，进而引起的 DOM 发生改变重新渲染。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用`nextTick(callback)`。使用 [nextTick](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97) 之后，这样回调函数在 DOM 更新完成后就会调用。

比如你想让一个 dom 元素显示，然后下一步去获取这个元素的 offsetWidth，最后你获取到的会是`0` [演示](https://codepen.io/xuetengfei/project/editor/DQbGqa).
因为你`改变数据`，把`show`变成`true`，元素并不会立即显示，理所当然也不会获取到动态宽度。正确的做法是先把元素 show 出来，在`$nextTick` 去执行获取宽度的操作。

```javascript
 methods: {
          show: function() {
            this.flag = !this.flag;
            this.$nextTick(() => {
              console.log(this.$refs.el.offsetWidth, this.flag);
              this.width = this.$refs.el.offsetWidth;
            });
          },
        }
```

---

下面是项目中部分代码，使用 elementUI 来做一个 tree 组件，table 中每行数据都有一个权限集合的数组，打开 dialog 后需要把数据中数组渲染到 tree 上面。element 提供的方法是使用 refs 操作底层 DOM,如下。

```javascript
this.$refs.tree.setCheckedKeys([1, 2, 3, 5]);
```

直接使用`this.$refs.tree.setCheckedKeys([1,2,3,5])`是会`报错`的。elementUI 的 tree 组件使用`refs`来操作底层的 DOM，那么修改`dialogVisible`为 true 后，弹窗打开,这些都数据变化了，会引起 Vue 重新渲染。但此时 tree 组件对应的真实的 DOM 还没有来得及渲染出来，那么对 tree 组件 的 DOM 直接修改,就会报错。

所以，应该等待 Vue 完成更新 DOM 之后(数据变化引起 Vue 重新渲染，此时是 dialogVisible 由 false 变成 true)，再去使用`refs`操作相关的`DOM`。

vue 提供了`nextTick(callback)`，可以在数据变化之后立即使用`nextTick(callback)`，这样回调函数在 DOM 更新完成后就会调用。

```javascript
<template>
 <el-dialog title="分配权限" :visible.sync="dialogVisible" width="40%">
  <el-tree
    :data="vaildPermission"
    show-checkbox
    node-key="id"
    :props="defaultProps"
    highlight-current
    ref="tree"
  ></el-tree>
  </el-dialog>
</template>

<script>
export default {
  name: 'role-management',
  data() {
    return {
      dialogVisible:false
    }
  },
  methods: {
    AssignAuthority(rowData) {
        this.dialogVisible = !this.dialogVisible
        this.$nextTick(function() {
            this.$refs.tree.setCheckedKeys([...rowData.menu])
      })
    }
  }
}
</script>

<style scoped>
</style>
```

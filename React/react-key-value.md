# keys:唯一的并且稳定的

?> Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。React 对比算法的选择以让组件更新可预测并使得高性能应用足够快。

Keys 应该是稳定的，可预测的，且唯一的。不稳定的 key（类似由 Math.random()生成的）将使得大量组件实例和 DOM 节点进行`不必要的重建`，使得性能下降并丢失子组件的状态。

## 最佳实践

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串(兄弟节点中是唯一的，而非全局唯一) 。通常，我们使用来自数据的 id 作为元素的 key.或根据数据的某些内容创建一个唯一的哈希值来作为 key

```javascript
//good
{
  todos.map(todo => <Todo {...todo} key={todo.id} />);
}
```

假设 todo.id 是唯一的并且稳定的, React 便能更好的去控制这些组件的更新(否则我们可能会面临大量重复创建的组件, 并且每次更新都是重新 render 这些组件.)

## 避免使用简单索引作为 key

当元素没有确定的 id 时，万不得已，你可以使用他的序列号索引 index 作为 key, `不建议`使用索引来进行排序。因为,若元素没有重排，该方法效果不错，但重排会导致渲染变得很慢。组件实例基于 key 进行更新和重用。如果 key 是索引，则 item 的顺序变化会改变 key 值。这将导致组件的状态可能会以意想不到的方式混淆和更新。

```javascript
//bad
{
  todos.map((todo, index) => <Todo {...todo} key={index} />);
}
```

---

1. [列表 & Keys - React](https://react.docschina.org/docs/lists-and-keys.html#keys)
2. [协调（Reconciliation） - React](https://react.docschina.org/docs/reconciliation.html#%E9%80%92%E5%BD%92%E5%AD%90%E8%8A%82%E7%82%B9)

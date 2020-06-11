# 在 JSX 中加入 console.log

```javascript
const ConsoleLog = ({ children }) => {
  console.log(children);
  return false;
};
```

```javascript
render() {
  return (
    <div>
      <h1>List of todos</h1>
      <ConsoleLog>{ this.props.todos }</ConsoleLog>
    </div>
  );
}
```

使用高阶组件能帮助我们对于传入的 props 进行修饰后传入真正的组件(类似于 middleware 的概念)

```javascript
function HOC(WrappedComponent) {
  return class Test extends Component {
    render() {
      const newProps = {
        title: 'New Header',
        footer: false,
        showFeatureX: false,
        showFeatureY: true,
      };

      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}
```

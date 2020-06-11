# avoid setState in componentWillMount

componentWillMount 在组件将要挂载时被立即调用. 这个调用发生在 render 函数执行之前, 所以如果在 componentWillMount 里面设置了 state, 这个设置的 state 是不会触发重新渲染的. 同样我们也需要注意不要在 componentWillMount 中引入其他可能会导致问题的代码.

```javascript
// 如果你有类似的需求, 请在 componentDidMount 里面完成.

function componentDidMount() {
  axios.get(`api/messages`).then(result => {
    const messages = result.data;
    console.log('COMPONENT WILL Mount messages : ', messages);
    this.setState({
      messages: [...messages.content],
    });
  });
}
```

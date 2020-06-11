```javascript
yarn add react-loadable
```

然后使用它代替我们上面的 asyncComponent 方法

上一篇博客，写了一个`asyncComponent`,现在可以这样重写。

```javascript
const AsyncHome = Loadable({
  loader: () => import('./containers/Home'),
  loading: MyLoadingComponent,
});
```

AsyncHome 组件的使用方式跟之前是完全一样的，另外这里的 MyLoadingComponent 我们可以写成下面这样。

```javascript
/* 
  MyLoadingComponent
*/
const MyLoadingComponent = ({ isLoading, error }) => {
  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};
```

这个组件代码非常简单，从代码里可以看到在这个组件里处理了各种边缘情况。

<!-- A higher order component for loading components with promises. -->

1. [react-loadable: ](https://github.com/jamiebuilds/react-loadable)
2. [Introducing React Loadable – @thejameskyle](https://jamie.build/react-loadable.html)

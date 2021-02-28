React Hooks 的响应式布局实现，还介绍了如何自定义 hooks 与使用 Context 上下文，来
复用，以达到性能最佳优化

Hooks+Context 将创建一个新的文件 viewportContext，在其中可以存储当前视口大小的状
态以及计算逻辑。

```javascript
const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  // 顺带监听下高度，备用
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};
```

```javascript
const App = () => {
  return (
    <ViewportProvider>
      <AppComponent />
    </ViewportProvider>
  );
};
```

```javascript
const MyComponent = () => {
  const { width } = useViewport();
  const breakpoint = 620;

  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
};
```

# 组件切换

一个可切换的组件实际上是包含了多个组件, 选择渲染其中某个组件的组件. 我们使用对象来将 props 的值和组件做上映射

```javascript
import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import UserPage from './UserPage.jsx';
import FourOhFourPage from './FourOhFourPage.jsx';

const PAGES = {
  home: HomePage,
  about: AboutPage,
  user: UserPage,
};

const Page = props => {
  const Handler = PAGES[props.page] || FourOhFourPage;

  return <Handler {...props} />;
};

// The keys of the PAGES object can be used in the prop types to catch dev-time errors.
Page.propTypes = {
  page: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
};
```

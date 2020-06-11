使用高阶组件去实现我们的 toggle, 从而实现组件的多样性.
比如下面的例子, 实现某个功能的开/关

```javascript
// featureToggle.js
const isFeatureOn = function(featureName) {
  // return true or false
};

import { isFeatureOn } from './featureToggle';

const toggleOn = (featureName, ComposedComponent) =>
  class HOC extends Component {
    render() {
      return isFeatureOn(featureName) ? <ComposedComponent {...this.props} /> : null;
    }
  };

// 用法
import AdsComponent from './Ads';
const Ads = toggleOn('ads', AdsComponent);
```

# defaultProps

一个组件默认激活的 tabs 的第二个。点击的时候切换 tabs。  
初始化的时候，由`props`来条件渲染，渲染完成后，由内部`state`接替条件渲染

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/defaultProps-1554742482.jpg' width="350px">

```javascript
import React, { Component } from 'react';
import { navList } from './own/map';

export default class index extends Component {
  state = {
    currentNavIndex: '',
    timeList: [],
  };
  handleNavTab = num => {
    this.setState({
      currentNavIndex: num,
    });
  };
  render() {
    const { currentNavIndex } = this.state;
    const { TabIndex } = this.props;
    const activedTableIndex =
      currentNavIndex === '' ? TabIndex : currentNavIndex;
    return (
      <>
        <nav>
          {navList.map(v => {
            return (
              <div
                className={activedTableIndex === v.id ? style.active : ''}
                key={v.id}
                onClick={() => {
                  this.handleNavTab(v.id);
                }}>
                {v.name}
              </div>
            );
          })}
        </nav>
      </>
    );
  }
}

index.defaultProps = {
  TabIndex: 1,
};
```

```javascript
class ReactComp extends React.Component {}
ReactComp.defaultProps = {};
// or
class ReactComp extends React.Component {
  static defaultProps = {};
}
```

```javascript
function Reactcomp(props) {}
ReactComp.defaultProps = {};
```

1. [你可能不需要使用派生 state – React Blog](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)
2. [建议：完全可控的组件](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#preferred-solutions)

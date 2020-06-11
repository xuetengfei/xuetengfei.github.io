## 空页面

业务流程图如下，当没有数据的时候显示一个`空页面`。

<div class='lightbox'>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/hoc-with-empty-1-1552190852.png' width='200px' />
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/hoc-with-empty-2-1552190852.jpg' width='200px' /> 
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/hoc-with-empty-3-1552190852.jpg' width='200px' />
</div>

## HOC 文件组织

```javascript
├── HOC
│   ├── hoc.module.scss
│   ├── withempty.js
│   └── withloading.js
```

## withempty.js

```javascript
import React from 'react';
import hoc from './hoc.module.scss';
import emptyImg from '../../assets/img/empty-content.png';

export const WithEmpty = Component => ({ isEmpty, ...props }) =>
  isEmpty ? (
    <div className={hoc.empty}>
      <div className={hoc.emptyContent}>
        <img src={emptyImg} alt="emptyImg" />
        <p>暂无数据</p>
      </div>
    </div>
  ) : (
    <Component {...props} />
  );
```

## index.js 核心业务

```javascript
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/index';
import Cards from './sub/card';
import style from './sub/index.module.scss';
import { typeNameMap } from '../../public/constant';
import dayjs from 'dayjs';
import { accessHalfYearMonthList } from '../../public/utils';
import { WithEmpty } from '../../components/HOC/withempty';

export default function AccountDetails(props) {
  const [monthValue, setMonthValue] = useState(dayjs().format('YYYY-MM'));
  const [pickedMonthID, setPickedMonthID] = useState(0);
  const [dialogVisiblity, setDialogVisiblity] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleGoBack = () => {
    const goback = props.location.query.goback;
    goback();
  };
  const handleSetDialogVisiblity = param => {
    setDialogVisiblity(param);
  };
  const handlePickMonth = id => {
    console.log('id: ', id);
    setPickedMonthID(id);
  };
  const availdDateList = accessHalfYearMonthList();

  const type = props.location.query.type
    ? props.location.query.type
    : 'EquipmentRepayment';
  const nameObj = typeNameMap();
  const pageTitle = nameObj[type];
  const Card = Cards[type];

  useEffect(() => {
    setTimeout(() => {
      setIsEmpty(false);
    }, 10000);
  });

  let list = [1, 2, 4, 5];
  const CardList = () => (
    <>
      {list.map(v => (
        <Card key={v} />
      ))}
    </>
  );

  const WithEmptyForCard = WithEmpty(CardList);
  return (
    <div className={style.wrap}>
      <Header
        title={pageTitle}
        handleGoBack={handleGoBack}
        whiteArrow
        color="#fff"
        backgroundColor="#4289ff"
      >
        <div onClick={() => handleSetDialogVisiblity(true)}>{monthValue}</div>
      </Header>
      <div className={style.content}>
        <WithEmptyForCard isEmpty={isEmpty} />
      </div>
    </div>
  );
}
```

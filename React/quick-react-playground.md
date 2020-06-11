```
.
├── index.html
├── index.jsx
├── package.json
└── yarn.lock
```

````

```json
{
  "name": "parceljs",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
}
````

```jsx
// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

const App = () => (
  <>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam,
      eligendi.
    </p>
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

```html
<!-- index.html -->
<html>
  <body>
    <div id="root"></div>
    <script src="./index.jsx"></script>
  </body>
</html>
```

```bash
➜  react-playground parcel index.html
Server running at http://localhost:1234
✨  Built in 2.56s.
```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/20200528105613iShot2020-05-28上午10.55.58.jpg' alt='20200528105613iShot2020-05-28上午10.55.58'/>

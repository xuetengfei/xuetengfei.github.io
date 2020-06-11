<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/express-02-1573468263.jpg' width="500px"/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/express-01-1573468263.jpg' width="500px"/>

```javascript
const express = require('express');
const app = express();
const port = 3000;

/* express.static */
app.use('/public', express.static(__dirname + '/static'));

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`App listening on port ${port}!`));
```

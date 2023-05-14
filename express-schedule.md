Express.js 提供了 schedule 模块来定期执行任务。

要安排任务,需要:

1. 安装 schedule 模块:

```md
npm install schedule
```

2. 在 Express 应用程序中加载 schedule :

```js
const schedule = require('schedule');
```

3. 使用 schedule.scheduleJob() 函数来安排任务:

```js
schedule.scheduleJob('0 * * * *', function () {
  // 任务代码
  console.log('Running a task every hour');
});
```

上述示例会每小时运行一次任务。

4. 您可以使用 CRON 表达式 来精细控制任务的运行频率:

- - 分钟 0-59
- - 小时 0-23
- - 日 1-31
- - 月 1-12
- - 周 0-7 (0 和 7 都是周日)

例如,每天中午 12 点运行:

```
0 0 12 * *
```

5.  您可以安排多个任务,每个任务有不同的运行频率。

6.  您还可以取消预定的任务,使用 schedule.cancelJob():

```js
const job = schedule.scheduleJob('0 * * * *', function(){ ... });

job.cancel();
```

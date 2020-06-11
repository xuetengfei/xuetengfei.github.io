## 依赖的安装
定时器[node-schedule](https://github.com/node-schedule/node-schedule)

```javascript
npm install node-schedule
```
通知器[terminal-notifier](https://github.com/julienXX/terminal-notifier)
```javascript
brew install terminal-notifier
```

## code

```javascript
var schedule = require("node-schedule");
var exec = require("child_process").exec;

function scheduleCronstyle() {
  console.log("Task start ...");
  /* 每天 02:00 执行任务 */
  const time2AM = "0 2 * * *";
  /* 每5秒执行 */
  const twoSeconds = "*/5 * * * * *"; //  每两秒执行
  //  每num秒执行
  const secondTask = num => `*/${num} * * * * *`;
  //  每num分钟执行
  const minuteTask = num => `*/${num} * * * *`;
  /* 每天 5:00和17:00执行任务 */
  const time3 = "0 5,17 * * *";
  /* 每分钟执行一次任务 */
  const everymin = "* * * * *";
  /* 每8个小时执行一个任务 */
  const time6 = "0 */8 * * * ";
  schedule.scheduleJob(secondTask(2), function() {
    // 成功的例子
    exec(
      'terminal-notifier -title ProjectX -subtitle -message "Finished"',
      function(error, stdout, stderr) {
        if (error) {
          console.error("error: " + error);
          return;
        }
        console.log("end");
      }
    );
  });
}

scheduleCronstyle();
```

<!--<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/node-notice.jpg"/>-->

<img src="https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/node-notice-2.jpg"/>


写了一个定时提交git的任务

```javascript
const CronJob = require("cron").CronJob;
var exec = require("child_process").exec;

// 每x秒
const secondTask = num => `*/${num} * * * * *`;

// 每x小时
const hourTask = num => `0 */${num} * * *`;

console.log("time task running ...");

const job = new CronJob(hourTask(8), function() {
  console.log("now time is", new Date());
  exec("cd ../XUE_BLOG/docs && sh ./auto.sh", function(error, stdout, stderr) {
    if (error) {
      console.error("error: " + error);
      return;
    }
    console.log("stdout: " + stdout);
    console.log("Task continues ...");
  });
});

job.start();
```
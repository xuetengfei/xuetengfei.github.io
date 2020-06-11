## copy url

写博客,要记录参考链接,🔗,当然是 markdown 格式的.

Alfred 是高效神器,找一个`Copy URL`的 workflow,就可以了.

但是,本人喜欢链接在在新窗口打开,就要修改一下这个 workflow 源码,如下;

```js
// ...some code ...

class App {
    constructor() {
        this.dataPath = Alfred.dataPath;
        this.configPath = `${this.dataPath}/config.json`;

        /*
         * fixed:xuetengfei
         *  if (this.hasConfig()) {
         *            this.initConfig();
         *  }
         */


        if (!this.hasConfig()) {
            this.initConfig();
        }
    }
    hasConfig() {
        return $.NSFileManager.defaultManager.fileExistsAtPath(this.configPath);
    }
    initConfig() {
        var fileManager = $.NSFileManager.defaultManager;
        var config = JSON.stringify([{ "format": "${url}", "title": "URL" }, { "format": "${title}", "title": "Title" }, { "format": "<a href=\"${url}\">${title}</a>", "title": "Anchor" }, { "format": "[${title}](${url}){:target=\"_blank\"}", "title": "Markdown" }]);
        var error = $();
// { "format": "[${title}](${url}){:target=\"_blank\"}", "title": "Markdown" }]);
// {:target="_blank"}

// ...some code ...
```

2. [Copy URL-Packal](http://www.packal.org/workflow/copy-url)

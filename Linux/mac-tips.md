**去掉 Dock 栏的隐藏速度**

```
defaults write com.apple.dock autohide-time-modifier -int 0;killall Dock
```

恢复设置

```
defaults delete com.apple.dock autohide-time-modifier;killall Dock
```

#### 最小化和隐藏

macOS 提供两种不显示窗口的方式，一个叫“最小化”，一个叫“隐藏”，快捷键分别为：

```
Cmd + h    隐藏 (hide)
Cmd + m    最小化 (minimize)
```

他们的区别在于，“隐藏”是 App 级别的操作，把当前 App 的所有窗口都收起来，而“最小化”，是窗口级别的操作，只把当前窗口收起来。收入的位置也不同，“隐藏”会把 App 都收入 Dock 上的程序图标内，其实看起来和平时没有什么区别：

Cmd+m 最小化 chrome 浏览器后，Cmd+Tab 切换到 chrome。最小化的 chrome 窗口无法恢复正常大小。但是可以用 Cmd-H 隐藏。 后用 Cmd+Tab 恢复窗口显示。

或者，用 Cmd+Tab 切换到需要的 chrome 图标上，放开 Tab 键，然后再按 Alt 键，放开 Cmd。手指头有点别扭。

<!--


[装点你的 Dock：外观篇丨一日一技 · Mac - 少数派](https://sspai.com/post/33493)
 -->

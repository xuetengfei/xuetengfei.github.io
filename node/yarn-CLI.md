### yarn init

```
yarn init
yarn init --yes/-y
```


### Adding a dependency

```bash
yarn add [package]
```

### Adding a devDependencies


```bash
yarn add --dev 
```
### Adding a global devDependencies
```bash
yarn global add --dev 
```
### Upgrading a dependency

```
yarn upgrade [package]
```

### Removing a dependency

```
yarn remove [package]
```




### 依照 package.json 文件列出的依赖安装所有依赖包。

```
yarn
yarn install
```


### 从当前项目删除一个无用的依赖包。

```
yarn remove
```

### 监测可以执行的文件，比如 package.json 里面的自定义的script 

```
yarn bin
```
### 显示node_modules中所有的依赖列表


```
yarn list --depth=0

```

### 依赖历史版本和时间


```
yarn info gulp time
```



### 修改项目的版本号


```
yarn version
```



### 解释为什么安装了某个包。


```
yarn why [package]
```


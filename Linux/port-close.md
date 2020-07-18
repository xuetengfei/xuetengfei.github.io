```javascript
lsof -i:端口号

```

```javascript
lsof -i tcp:7788
---------------------------------------------------------------------------------------
COMMAND   PID       USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
node    13626 xuetengfei   24u  IPv6 0x2725a48557803b21      0t0  TCP *:7788 (LISTEN)
---------------------------------------------------------------------------------------
kill 13626
```

编辑为 zsh 的 alias function

```javascript
alias killport='f(){
    lsof -i:$1 &&
    echo "Now,please enter command line: kill PID Number";
};f'

```

终端 **su root** 切换到 **root 用户**，此时拥有最高权限，任何操作都要慎重。

**/etc/sudoers** 这个文件千万不要随便乱动。为了保护系统安全，sudoers 的权限一旦修改后，任何 sudo 命令都会被拒绝。

让 Linux 用户 sudo 操作免密

前言
当前用户不是 root 时，有些操作会因为权限不够而被拒绝，需要 sudo 才可以完成。但是每次 sudo 都需要输入密码，很烦，干脆修改 sudoers，让 sudo 不需要验证密码。

---

什么操作？？？
https://segmentfault.com/q/1010000007575129

```bash
sudo chown -R $(whoami) /usr/local
```

**whoami**就是一個命令，會 echo 當前登錄用戶的名字。當然你知道自己的用戶名，比如 jack,就直接

```javascript
sudo chown -R jack /usr/local
```

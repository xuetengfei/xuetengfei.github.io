```sh
nohup java -jar /web/server.jar > log.txt 2>&1 &
```

该命令的意思是：nohub 使用 java 执行 server.jar 这个文件，并且输出日志到 log.txt
文件，&表示后台运行

```sh
#! /bin/bash
nohup java -jar /home/test/demo.jar >/home/test/log.txt 2>&1 &
echo $! > /home/test/pid.txt
```

```sh
#! /bin/bash
PID=$(cat /home/test/pid.txt)
kill -9 $PID
```

查看实时 jar 包日志

```sh
tail -f log.txt
```

```md
When using nohup and you put the task in the background, the background operator
(&) will give you the PID at the command prompt. If your plan is to manually
manage the process, you can save that PID and use it later to kill the process
if needed, via `kill PID `or `kill -9 PID` (if you need to force kill).
Alternatively, you can find the PID later on by
`ps -ef | grep "command name" `and locate the PID from there. Note that nohup
keyword/command itself does not appear in the ps output for the command in
question.

If you use a script, you could do something like this in the script:
```

```sh
nohup my_command > my.log 2>&1 &
echo $! > save_pid.txt
```

```md
This will run my_command saving all output into my.log (in a script, $!
represents the PID of the last process executed). The 2 is the file descriptor
for standard error (stderr) and 2>&1 tells the shell to route standard error
output to the standard output (file descriptor 1). It requires &1 so that the
shell knows it's a file descriptor in that context instead of just a file
named 1. The 2>&1 is needed to capture any error messages that normally are
written to standard error into our my.log file (which is coming from standard
output). See I/O Redirection for more details on handling I/O redirection with
the shell.

If the command sends output on a regular basis, you can check the output
occasionally with tail my.log, or if you want to follow it "live" you can use
`tail -f my.log`. Finally, if you need to kill the process, you can do it via:
```

```sh
kill -9 `cat save_pid.txt`
rm save_pid.txt
```

---

1. [linux - How to get the process ID to kill a nohup process? - Stack Overflow](https://stackoverflow.com/questions/17385794/how-to-get-the-process-id-to-kill-a-nohup-process)

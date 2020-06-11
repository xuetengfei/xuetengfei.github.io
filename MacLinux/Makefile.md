?> makefile用于定义自动化编译命令make的规则，通过make命令，配合相关工程的makefile，可以让我们不再需要手动去一条条的编译和链接我们的源程序，直接通过执行一个命令就可以代替那些需要执行的编译命令。同时make命令会根据配置文件的状态（是否被修改）来确定是否需要重新编译该文件。



#### Demo_1: 使用Makefile合并多个临时js文件
?> 文件夹内只有一个名叫**Makefile**的文件

```bash
➜  _test_makefile tree 3
.
└── Makefile

0 directories, 1 file
```

?> 看一下**Makefile**文件里面的内容

```bash
# Makefile_v.1.0

.PHONY: touchfile mergejs 

# 批量创建文件
# files:=$(foreach n,$(names),$(n).js)

names:=a b c d

touchfile:
		@for i in $(names); do \
    	    touch $$i.js; \
			echo "// This Is $$i.js File " > $$i.js; \
	    done

# 合并文件
mergejs:
		mkdir -p bakFile;
		cat *.js >> bakFile/merged.js;
		rm *.js
```
?> 执行**Makefile**文件**touchfile**

```bash
➜  _test_makefile make touchfile
➜  _test_makefile tree 3
.
├── Makefile
├── a.js
├── b.js
├── c.js
└── d.js

0 directories, 5 files
➜  _test_makefile
```

?> 执行**Makefile**文件**mergejs**

```bash
➜  _test_makefile tree 3
.
├── Makefile
└── bakFile
    └── merged.js

1 directory, 2 files
```
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/Xnip2019-12-28_12-26-40-1577507233.jpg'/>



----


```bash
# Makefile_v.1.1

# 声明变量
jslist = *.js
LIST = one two three
TIME = $$(date '+%Y-%m-%d %H:%M:%S')
TIMESTRING = $$(date '+%Y-%m-%d-%H-%M-%S')

# 打印出变量
var:
	    @export foo=bar; \
		echo "foo=[$$foo]"
		@echo $$(DATE)
		@echo $$(date '+%Y-%m-%d %H:%M:%S')
		@echo $$PWD
		@echo $$HOME
		@echo $(jslist)
		@echo $(TIMESTRING)

# 批量创建文件
# files:=$(foreach n,$(names),$(n).js)
names:=a b c d

touchfile:
		@for i in $(names); do \
    	    touch $$i.js; \
			echo "//" $$(date '+%Y-%m-%d %H:%M:%S') >> $$i.js; \
			echo "// This Is $$i.js File " >> $$i.js; \
	    done


# 合并文件
mergejs:
		mkdir -p bakFile;
		echo "//" $$(date '+%Y-%m-%d %H:%M:%S') >> bakFile/merged.js; 
		cat *.js >> bakFile/merged.js;
		rm *.js



# 在桌面temp文件夹内新建一个时间戳命名的JS文件
newjs:
		echo "//" $(TIMESTRING) >> $$HOME/Desktop/temp/$(TIMESTRING).js


# 当前目录temp文件下面新建一个时间戳命名的JS文件
newjs_2:
		echo "//" $(TIMESTRING) >> $$PWD/temp/$(TIMESTRING).js
```
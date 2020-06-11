?> 上传图片到阿里云,上传之后,路径地址保存到剪贴板里面,并且保存日志到`nameLog.md`中

```python
#!/usr/bin/python
# coding:utf-8
import datetime
import oss2
import os
import time
import pyperclip


nameList = []
shortNameList = []
path = './img2oss'
filenames = os.listdir(path)

prefix = '<img src=\'https://xxxx.oss-cn-beijing.aliyuncs.com/'
endfix = '\'/>'

bucketName = "xxxx"
endPoint = "oss-cn-xxx.aliyuncs.com/"
ACCESS_KEY_ID = "xxxx"
ACCESS_KEY_SECRET = "xxx"

auth = oss2.Auth(ACCESS_KEY_ID, ACCESS_KEY_SECRET)
bucket = oss2.Bucket(auth, endPoint, bucketName)


#########start 获取文件路径、文件名、后缀名############
def get_filePath_fileName_fileExt(filename):
    (filepath, tempfilename) = os.path.split(filename)
    (shotname, extension) = os.path.splitext(tempfilename)
    return filepath, shotname, extension
#########end 获取文件路径、文件名、后缀名############


t = int(time.time())

# 上传文件
for v in filenames:
    if (v != '.DS_Store') and (v != 'store'):
        shotname = get_filePath_fileName_fileExt(v)[1]
        extension = get_filePath_fileName_fileExt(v)[2]
        newName = shotname + '-' + str(t)+extension
        shortNameList.append(newName)
        nameList.append(prefix+newName+endfix)
        bucket.put_object_from_file(newName, path+'/'+v)
    # print(x)

print(nameList)

pyperclip.copy(str(nameList))
pyperclip.paste()


time1 = datetime.datetime.now().strftime('%Y-%m-%d-%H-%M-%S')

f = open('./nameLog.md', 'a')
for x in shortNameList:
    f.write(time1 + ':['+x+']'+'\n')
f.close()

```

<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/oss-1-1555666191.jpg'/>
<img src='https://loremxuetengfei.oss-cn-beijing.aliyuncs.com/oss-2-1555666191.jpg'/>

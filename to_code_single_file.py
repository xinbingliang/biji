# -*- coding:utf-8 -*-
__Author__ = "xinneirong"
__Email__ = "xinneirong@gmail.com"
__Time__ = "2020/5/18 11:53"

import os

# 遍历文件夹
def walkFile(file):
    file_list = []
    for root, dirs, files in os.walk(file):
        # 遍历文件
        for f in files:
            file_list.append(os.path.join(root, f))
    return file_list

file_list = walkFile(".")

for file in file_list:
    if file.endswith(("js", "vue", "scss", "json", "wxss", "wxml", "php", 'html', 'py')):
        try:
            with open("./code.txt", "a+") as wf:
                with open(file, encoding='gbk') as rf:
                    wf.write("# "+file+"\r\n")
                    wf.write(rf.read())
        except Exception as e:
            pass

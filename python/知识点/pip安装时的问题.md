# unicodedecodeerror ascii codec can’t decode byte 0xd7 in position 9 ordinal not in range(128)

在windows7上使用pip安装包时遇到以上问题只需要在`C:\Python27\Lib\mimetypes.py`的导包以下添加如下代码

```python
import os
import sys
import posixpath
import urllib


if sys.getdefaultencoding() != 'gbk':
	reload(sys)
	sys.setdefaultencoding('gbk')

```


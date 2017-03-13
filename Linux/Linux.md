# Linux

## terminal

Linux 默认提供了 6 个纯命令行界面的 “terminal”（准确的说这里应该是 6 个 virtual consoles）来让用户登录，在物理机系统上你可以通过使用`[Ctrl]`+`[Alt]`+`[F1]～[F6]`进行切换，当你切换到其中一个终端后想要切换回图形界面，你可以按下`[Ctrl]`+`[Alt]`+`[F7]`来完成。

伪终端就是当你在图形用户界面使用 `/dev/tty7` 时每打开一个终端就会产生一个伪终端， `pts/0` 后面那个数字就表示打开的伪终端序号

## 快捷键

| 按键              | 作用                       |
| --------------- | ------------------------ |
| `Ctrl+d`        | 键盘输入结束或退出终端              |
| `Ctrl+s`        | 暂停当前程序，暂停后按下任意键恢复运行      |
| `Ctrl+z`        | 将当前程序放到后台运行，恢复到前台为命令`fg` |
| `Ctrl+a`        | 将光标移至输入行头，相当于`Home`键     |
| `Ctrl+e`        | 将光标移至输入行末，相当于`End`键      |
| `Ctrl+k`        | 删除从光标所在位置到行末             |
| `Alt+Backspace` | 向前删除一个单词                 |
| `Shift+PgUp`    | 将终端显示向上滚动                |
| `Shift+PgDn`    | 将终端显示向下滚动                |

## 通配符

```shell
touch love_{1..10}_linux.txt
```

| 字符                      | 含义                              |
| ----------------------- | ------------------------------- |
| `*`                     | 匹配 0 或多个字符                      |
| `?`                     | 匹配任意一个字符                        |
| `[list]`                | 匹配 list 中的任意单一字符                |
| `[!list]`               | 匹配 除list 中的任意单一字符以外的字符          |
| `[c1-c2]`               | 匹配 c1-c2 中的任意单一字符 如：[0-9] [a-z] |
| `{string1,string2,...}` | 匹配 sring1 或 string2 (或更多)其一字符串  |
| `{c1..c2}`              | 匹配 c1-c2 中全部字符 如{1..10}         |

## 帮助

| 区段   | 说明                     |
| ---- | ---------------------- |
| 1    | 一般命令                   |
| 2    | 系统调用                   |
| 3    | 库函数，涵盖了C标准函数库          |
| 4    | 特殊文件（通常是/dev中的设备）和驱动程序 |
| 5    | 文件格式和约定                |
| 6    | 游戏和屏保                  |
| 7    | 杂项                     |
| 8    | 系统管理命令和守护进程            |

* NAME（名称）

  > 该命令或函数的名称，接着是一行简介

* SYNOPSIS（概要）

  >对于命令，正式的描述它如何运行，以及需要什么样的命令行参数。对于函数，介绍函数所需的参数，以及哪个头文件包含该函数的定义。

* DESCRIPTION（说明）

  >命令或函数功能的文本描述。

* EXAMPLES（示例）

  >常用示例

* SEE ALSO（参见）

  >相关命令或函数的列表。


常见的例子包括：OPTIONS（选项），EXIT STATUS（退出状态），ENVIRONMENT（环境），BUGS（程序漏洞），FILES（文件），AUTHOR（作者），REPORTING BUGS（已知漏洞），HISTORY（历史）和COPYRIGHT（版权）。

## 图像字符

```
$ sudo apt-get update
$ sudo apt-get install sysvbanner
```

## 用户和权限

### 查看用户

* who

  | 参数   | 说明                  |
  | ---- | ------------------- |
  | `-a` | 打印能打印的全部            |
  | `-d` | 打印死掉的进程             |
  | `-m` | 同`am i`,`mom likes` |
  | `-q` | 打印当前登录用户数及用户名       |
  | `-u` | 打印当前登录用户登录信息        |
  | `-r` | 打印运行等级              |

### 创建用户

* su 切换到某一用户
  * su - 环境变量也切换到该用户
* sudo 以root用户运行命令

```shell
sudo adduser xin # 新增用户
ls /home # 同时创建了用户家目录
su -l xin
```

### 用户组

```shell
groups xin # 查看用户所属组
sudo cat /etc/sudoers.d/xin

cat /etc/group | aort # 以文件形式查看
cat /etc/group | grep -E "xin" # 打印数据的过滤
```

etc/group 的内容包括用户组（Group）、用户组口令、GID 及该用户组所包含的用户（User），每个用户组一条记录

> group_name:passwd:GID:user_list

### 添加进sudo组

```shell
su - l xin
sudo ls #提示不在sudo组中

# 切换到有root权限的账户
su - 
groups xin
sudo usermod -G sudo xin 
groups xin
```

### 删除用户

````shell
sudo deluser xin --remove-home
````

### 文件权限

```shell
ls -l 
```

![](https://dn-anything-about-doc.qbox.me/linux_base/3-9.png/logoblackfont)

![](https://dn-anything-about-doc.qbox.me/linux_base/3-10.png/logoblackfont)

* 文件类型

  linux一切皆文件

  * /dev下的设备文件，大都和硬件设备有关
  * socket 网络套接字
  * pipe管道
  * 链接文件，软链接和硬链接

* 文件权限

  * 一个目录同时具有读权限和执行权限才可以打开并查看内部文件，而一个目录要有写权限才允许在其中创建其它文件，这是因为目录文件实际保存着该目录里面的文件的列表等信息

* 链接数目

  * 链接到该文件所在的 inode 结点的文件名数目

* 文件大小

  * 以 inode 结点大小为单位来表示的文件大小，你可以给 ls 加上 `-lh` 参数来更直观的查看文件的大小

### 修改文件的所有者

```shell
sudo chown xin xin.txt
```

### 文件权限

````shell
chmod 700 xin.txt
chmod go-rw xin.txt
````

'g''o'还有'u'，分别表示group，others，user，'+'，'-' 就分别表示增加和去掉相应的权限。

## Linux目录结构及文件基本操作

### FHS 标准

#### 两层规范

- 第一层是， / 下面的各个目录应该要放什么文件数据
- 第二层则是针对 /usr 及 /var 这两个目录的子目录来定义
  ![](https://dn-anything-about-doc.qbox.me/linux_base/4-1.png/logoblackfont)

#### 文件的四种交互状态

![](https://dn-anything-about-doc.qbox.me/document-uid18510labid59timestamp1482919171956.png/wm)

### 批量的重命名

```
touch file{1..5}.txt #批量创建5个文件
rename ‘s/\.txt/\.c/’ *.txt # 将.txt后缀转化为.c
rename 'y/a-z/A-Z/' *.c #批量将这五个文件的名称改为大写
```

## 环境变量和文件查找

### 变量

```shell
declare tmp # 明确定义创建
tmp	= 'shiyanlou'	# 直接创建也可以
echo tmp
```

### 环境变量

环境变量就是作用域比自定义变量要大，如Shell 的环境变量作用于自身和它的子进程。

![](https://dn-anything-about-doc.qbox.me/linux_base/5-2.png/logoblackfont)

- 当前 Shell 进程私有用户自定义变量，如上面我们创建的 temp 变量，只在当前 Shell 中有效。
- Shell 本身内建的变量。
- 从自定义变量导出的环境变量。

### 打印环境变量的命令

| 命令       | 说明                                       |
| -------- | ---------------------------------------- |
| `set`    | 显示当前 Shell 所有环境变量，包括其内建环境变量（与 Shell 外观等相关），用户自定义变量及导出的环境变量 |
| `env`    | 显示与当前用户相关的环境变量，还可以让命令在指定环境中运行            |
| `export` | 显示从 Shell 中导出成环境变量的变量，也能通过它将自定义变量导出为环境变量 |

### 全局环境变量

```shell
temp='实验楼'
echo $temp
bash
echo $temp
export temp
bash
echo $temp
```

### 命令的查找路径和顺序

`echo $PATH` 

### 添加自定义路径到PATH环境变量

`PATH=$PATH:/home/shiyanlou/mybin`

务必使用绝对路径

每个用户的 home 目录中有一个 Shell 每次启动时会默认执行一个配置脚本，以初始化环境，包括添加一些用户自定义环境变量等等。zsh 的配置文件是`.zshrc`，相应 Bash 的配置文件为`.bashrc`。它们在`etc`下还都有一个或多个全局的配置文件

```shell
echo "PATH=$PATH:/home/test/mybin" >> ~/.bash
```

### 变量修改

| 变量设置方式              | 说明                     |
| ------------------- | ---------------------- |
| `${变量名#匹配字串}`       | 从头向后开始匹配，删除符合匹配字串的最短数据 |
| `${变量名##匹配字串}`      | 从头向后开始匹配，删除符合匹配字串的最长数据 |
| `${变量名%匹配字串}`       | 从尾向前开始匹配，删除符合匹配字串的最短数据 |
| `${变量名%%匹配字串}`      | 从尾向前开始匹配，删除符合匹配字串的最长数据 |
| `${变量名/旧的字串/新的字串}`  | 将符合旧字串的第一个字串替换为新的字串    |
| `${变量名//旧的字串/新的字串}` | 将符合旧字串的全部字串替换为新的字串     |

### 变量删除

`unset temp`

### 环境变量立即生效

修改配置文件后立即生效

```shell
source .bash # 或
. ./.bash
```

### 搜索文件

* whereis 从数据库中查找

* locate 也是从数据库查找，使用`updatedb`更新

  ```shell
  locate /etc/sh
  locate /usr/share/\*.jpg
  ```

* find 精细查找

| 参数       | 说明     |
| -------- | ------ |
| `-atime` | 最后访问时间 |
| `-ctime` | 创建时间   |
| `-mtime` | 最后修改时间 |

- `-mtime n`: n 为数字，表示为在n天之前的”一天之内“修改过的文件
- `-mtime +n`: 列出在n天之前（不包含n天本身）被修改过的文件
- `-mtime -n`: 列出在n天之内（包含n天本身）被修改过的文件
- `newer file`: file为一个已存在的文件，列出比file还要新的文件名

![](https://dn-anything-about-doc.qbox.me/linux_base/5-8.png)

```shell
sudo apt-get update;sudo apt-get install cmatrix
```

## 文件打包和压缩

### 文件打包和压缩

| 文件后缀名      | 说明                   |
| ---------- | -------------------- |
| `*.zip`    | zip程序打包压缩的文件         |
| `*.rar`    | rar程序压缩的文件           |
| `*.7z`     | 7zip程序压缩的文件          |
| `*.tar`    | tar程序打包，未压缩的文件       |
| `*.gz`     | gzip程序(GNU zip)压缩的文件 |
| `*.xz`     | xz程序压缩的文件            |
| `*.bz2`    | bzip2程序压缩的文件         |
| `*.tar.gz` | tar打包，gzip程序压缩的文件    |
| `*.tar.xz` | tar打包，xz程序压缩的文件      |
| `*tar.bz2` | tar打包，bzip2程序压缩的文件   |
| `*.tar.7z` | tar打包，7z程序压缩的文件      |

### zip压缩打包程序

````shell
zip -r -q -o xin.zip /home/xin
du -h xin.zip	# 以人类易读的形式查看文件的大小
file xin.zip #查看文件类型

zip -r -9 -q -o xin_9.zip /home/xin -x ~/*.zip	#只能使用绝对路径
zip -r -1 -q -o xin_1.zip /home/shiyanlou -x ~/*.zip

du -h -d 0 *.zip ~|sort # 所查看文件的深度

zip -r -e -o xin_encryption.zip /home/xin 
zip -r -l -o xin.zip /home/xin #排除window的问题
````

* `-r` 递归打包
* `-q` 安静模式
* `-o` 表示输出文件，后面紧跟输出文件名
* `-x`  排除紧跟的文件
* `-e` 加密压缩

```shell
unzip xin.zip # 解压到当前文件夹

unzip -q xin.zip -d ziptest # 目录不存在就创建
unzip -l xin.zip # 解压只查看
unzip -O GBK 中文压缩问价.zip
```

### rar打包压缩命令

````shell
sudo apt-get update;sudo apt-get install rar unrar

rar a xin.rar . 打包当前文件夹
rar d xin.rar .zashrc # 删除某个文件
rar l xin.rar # 查看但不解压文件
unrar x xin.rar # 全路径解压

mkdir tmp 
unrar e xin.rar tmp/ # 去掉路径解压
````

### tar打包工具

````shell
tar -cf xin.tar ~

mkdir tardir
tar -xf xin.tar -C tardir

tar -tf xin.tar

tar -cphf ext.tar /etc

tar -czf xin.tar.gz ~
tar -xzf xin.tar.gz 解压缩
````

* `-c` 创建一个tar包文件
* `-f` 指定创建的文件名称
* `-v` 以可视化的方式输出
* `-P` 保留绝对路径
* `-x` 解包到指定的文件夹
* `-t` 只查看不解包
* `-p` 保留原文件属性
* `-h` 备份连接的源文件而不是链接本身
* `-z` 创建gzip压缩

| 压缩文件格式     | 参数   |
| ---------- | ---- |
| `*.tar.gz` | `-z` |
| `*.tar.xz` | `-J` |
| `*tar.bz2` | `-j` |

### 彩蛋

```shell
$ sudo apt-get install libaa-bin 
$ aafire
```

## 文件系统和磁盘操作

### 简单文件系统的操作

* `df` 查看磁盘的容量

* `du` 查看目录的容量

  ````shell
  # 默认同样以 blocks 的大小展示
  $ du 
  # 加上`-h`参数，以更易读的方式展示
  $ du -h
  # 只查看1级目录信息
  $ du -h -d 0 ~
  # 查看2级
  $ du -h -d 1 ~
  ````

### 简单磁盘管理

* `dd` 可以用在备份硬件的引导扇区、获取一定数量的随机数据或者空数据等任务中。`dd`程序也可以在复制时处理数据，例如转换字节序、或在 ASCII 与  EBCDIC 编码间互换

  `dd`的命令行语句与其他的 Linux 程序不同，因为它的命令行选项格式为`选项=值`，而不是更标准的`--选项 值`或`-选项=值`。`dd`默认从标准输入中读取，并写入到标准输出中，但可以用选项`if`（input file，输入文件）和`of`（output file，输出文件）改变。

  ````shell
  # 输出到文件
  $ dd of=test bs=10 count=1 # 或者 dd if=/dev/stdin of=test bs=10 count=1
  # 输出到标准输出
  $ dd if=/dev/stdin of=/dev/stdout bs=10 count=1
  ````

  * `bs` 用来指定块的大小（默认为Byte，可以使用'K'，'M'，'G'）
  * `count` 指定块的数量 

  ```shell
  $ dd if=/dev/stdin of=test bs=10 count=1 conv=ucase
  ```

### dd创建虚拟镜像文件

```shell
$ dd if=/dev/zero of=virtual.img bs=1M count=256
$ du -h virtual.img
```

### 格式化磁盘

```shell
$ sudo mkfs.ext4 virtual.img
```

### 使用mount 命令挂载到目录树

```shell
mount [options] [source] [directory]
mount [-o [操作选项]] [-t 文件系统类型] [-w|--rw|--ro] [文件系统源] [挂载点]

$ mount -o loop -t ext4 virtual.img /mnt 
# 也可以省略挂载类型，很多时候 mount 会自动识别

# 以只读方式挂载
$ mount -o loop --ro virtual.img /mnt
# 或者mount -o loop,ro virtual.img /mnt
```

### 卸载已经挂载的

```shell
# 命令格式 sudo umount 已挂载设备名或者挂载点，如：
$ sudo umount /mnt
```

### fdisk做分区

````
# 查看硬盘分区表信息
$ sudo fdisk -l

# 进入磁盘分区模式
$ sudo fdisk virtual.img
````

### 使用losetup 命令建立镜像和回环设备的关联

`````shell
$ sudo losetup /dev/loop0 virtual.img
# 如果提示设备忙你也可以使用其它的回环设备，"ls /dev/loop*"参看所有回环设备

# 解除设备关联
$ sudo losetup -d /dev/loop0
# 安装kpartx工具
$ sudo apt-get install kpartx
$ sudo kpart kpartx -av /dev/loop0

# 取消映射
$ sudo kpart kpartx -dv /dev/loop0
# 然后格式化
$ sudo mkfs.ext4 -q /dev/mapper/loop0p1
$ sudo mkfs.ext4 -q /dev/mapper/loop0p5
$ sudo mkfs.ext4 -q /dev/mapper/loop0p6
# 挂载
$ mkdir -p /media/virtualdisk_{1..3}

# 挂载磁盘分区
$ sudo mount /dev/mapper/loop0p1 /media/virtualdisk_1
$ sudo mount /dev/mapper/loop0p5 /media/virtualdisk_2
$ sudo mount /dev/mapper/loop0p6 /media/virtualdisk_3

$ df -h
# 卸载磁盘分区
$ sudo umount /dev/mapper/loop0p1
$ sudo umount /dev/mapper/loop0p5
$ sudo umount /dev/mapper/loop0p6
`````

### 彩蛋

````shell
# 安装
$ sudo apt-get install cowsay

# 默认是一只牛
$ cowsay hello shiyanlou

# 加上'-l'参数打印所有支持的动物（其实不只是动物）种类
$ cowsay -l

# 使用'-f'参数选择动物种类
$ cowsay -f elephant hello shiyanlou

# 此外它还可以结合我们之前的作业讲过的 fortune 命令一起使用
$ fortune | cowsay -f daemon
````

## Linux下的帮助命令

### 内建命令和外部命令

````shell
type exit 
type service

#得到这样的结果说明是内建命令，正如上文所说内建命令都是在 bash 源码中的 builtins 的.def中
xxx is a shell builtin
#得到这样的结果说明是外部命令，正如上文所说，外部命令在/usr/bin or /usr/sbin等等中
xxx is /usr/sbin/xxx
#若是得到alias的结果，说明该指令为命令别名所设定的名称；
xxx is an alias for xx --xxx
````

### 帮助命令和使用

* help命令

```shell
help ls # 只能用于显示内建命令的帮助信息，不然就会得到你刚刚得到的结果
```

* man命令

```shell
man ls 
```

比用 help 更多更详细，而且　man　没有内建与外部命令的区分，因为 man 工具是显示系统手册页中的内容，也就是一本电子版的字典，这些内容大多数都是对命令的解释信息，还有一些相关的描述。

| 章节数  | 说明                              |
| ---- | ------------------------------- |
| `1`  | Standard commands （标准命令）        |
| `2`  | System calls （系统调用）             |
| `3`  | Library functions （库函数）         |
| `4`  | Special devices （设备说明）          |
| `5`  | File formats （文件格式）             |
| `6`  | Games and toys （游戏和娱乐）          |
| `7`  | Miscellaneous （杂项）              |
| `8`  | Administrative Commands （管理员命令） |
| `9`  | 其他（Linux特定的）， 用来存放内核例行程序的文档。    |

* info命令

man显示的信息都还不够，满足不了你的需求

```shell
#该命令在本环境中没有，一般的 bash 会自带的有。
info ls
```

## 任务计划crintab

### crontab准备

* 启动rsyslog，以便了解任务是否真的被执行（Ubuntu 会默认自行启动不需要手动启动）

```shell
sudo service rsyslog start
```

* 启动crontab，本地  Ubuntu 的环境中也不需要手动启动

```shell
sudo cron －f &
```

* 使用crontab

```shell
crontab -e
```

选择第一个基本的 vim 就可以了

* 文档格式

![](https://dn-simplecloud.qbox.me/1135081468202503630-wm)

* 文档做后添加

  ```shell
  */1 * * * * touch /home/shiyanlou/$(date +\%Y\%m\%d\%H\%M\%S)
  ```

  > “ % ” 在 crontab 文件中，有结束命令行、换行、重定向的作用，前面加 ” \ ” 符号转意，否则，“ % ” 符号将执行其结束命令行或者换行的作用，并且其后的内容会被做为标准输入发送给前面的命令。

* 参看添加的计划任务

  ```shell
  crontab -l
  ```

* 查看cron是否启动

  ````shell
  ps aux | grep cron
  or
  pgrep cron
  ````

* 查看日志的反馈信息

  ```shell
  sudo tail -f /var/log/syslog
  ```

* 删除任务

  ```shell
  crontab -r 
  crontab -l
  ```

### crontab 的深入

crontab -e 是针对使用者的 cron 來设计的，也就是每个用户在添加任务，就会在 /var/spool/cron/crontabs 中添加一个该用户自己的任务文档，这样可以做到隔离，独立，不会混乱。

系统级别的任务编辑` /etc/crontab `

* 在/etc目录下关于 cron 的文件的作用

1. /etc/cron.daily，目录下的脚本会每天让执行一次，在每天的6点25分时运行；
2. /etc/cron.hourly，目录下的脚本会每个小时让执行一次，在每小时的17分钟时运行；
3. /etc/cron.mouthly，目录下的脚本会每月让执行一次，在每月1号的6点52分时运行；
4. /etc/cron.weekly，目录下的脚本会每周让执行一次，在每周第七天的6点47分时运行；

## 命令的执行顺序和管道

### 命令执行顺序的控制

````shell
$ sudo apt-get update;sudo apt-get install some-tool;some-tool
# 让它自己运行
````

### 有选择的执行命令

```shell
which cowsay>/dev/null && cowsay -f head-in ohch~ # 安转后便执行，若没有安装就不执行
$ which cowsay>/dev/null || echo "cowsay has not been install, please run 'sudo apt-get install cowsay' to install"
$ which cowsay>/dev/null && echo "exist" || echo "not exist"
```

`&&`就是用来实现选择性执行的，它表示如果前面的命令执行结果（不是表示终端输出的内容，而是表示命令执行状态的结果）返回0则执行后面的，否则不执行

### 管道

* 基础使用

  ````shell
  $ ls -al /etc
  $ ls -al /etc | less
  ````

* cut命令打印每一行的某一段

  ```shell
  $ cut /etc/passwd -d ':' -f 1,6
  # 前五个（包含第五个）
  $ cut /etc/passwd -c -5
  # 前五个之后的（包含第五个）
  $ cut /etc/passwd -c 5-
  # 第五个
  $ cut /etc/passwd -c 5
  # 2到5之间的（包含第五个）
  $ cut /etc/passwd -c 2-5
  ```

* grep命令，在文本中或stdin中查找匹配字符串

* ​



























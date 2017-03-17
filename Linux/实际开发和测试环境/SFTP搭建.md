# SFTP搭建

* `/etc/ssh/sshd_config`

```
#Subsystem sftp /usr/lib/openssh/sftp-server   #该行注释掉
Subsystem sftp internal-sftp 

#UsePAM yes    #该行同样注释掉，或者移到Subsystem sftp internal-sftp的上面
Match Groups ftp-users   #匹配sftp组，如为单个用户可用：Match User test;  
	ChrootDirectory /www/sftp
	X11Forwarding no
	AllowTcpForwarding no
	ForceCommand internal-sftp
```

* 创建测试用户(务必创建新用户)
  * `useradd test`
  * `groupadd sftp-users`
  * `usermod -a -G sftp-users test`
  * ​
* 修改目标文件权限
  * `mkdir /www/sftp`
  * `chown root /www/sftp/`
  * `chmod 755 /www/sftp/`
  * `mkdir /www/sftp/shared`
  * `chown -R test:sftp-users /www/sftp/shared/`
  * `chmod 755 /home/sftp/shared/`
* `service ssh restart`




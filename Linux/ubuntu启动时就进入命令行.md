1. sudo vi /etc/default/grub  

   注释掉 GRUB_CMDLINE_LINUX_DEFAULT=”quiet” 这行， 即 #GRUB_CMDLINE_LINUX_DEFAULT=”quiet”

   把GRUB_CMDLINE_LINUX=”" 改为 GRUB_CMDLINE_LINUX=”text”

   去掉 #GRUB_TERMINAL=console 的注释，即 GRUB_TERMINAL=console

2. sudo update-grub  

3. sudo systemctl set-default multi-user.target  

4. sudo reboot  

5. sudo systemctl start lightdm
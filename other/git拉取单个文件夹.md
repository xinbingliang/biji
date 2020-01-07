# git拉取单个文件夹

````
git init
git remote add -f origin http://your/git/repo.git  # 拉取远程仓库信息
git config core.sparsecheckout true  # 开启 sparse clone
echo "production" >> .git/info/sparse-checkout  # 设置过滤条件
git pull origin master
````


#git
* `git init` 创建git仓库
* `git add file`添加到暂存区
* `git commit -m 'DESC'` 提交到版本库
* `git diff` 查看修改内容
* `git log` 显示最近的commit日志
* `git log --pretty=oneline` 以简略形式显示日志
* `git reset --hard HEAD^` 回到上一版本
* `git reset --hard 43759843` 回退版本以标识码
* `git reflog` 查找未来版本号码
* `git checkout -- readme.txt` 丢弃工作区修改(回到最后一次commit或add)
* `git reset HEAD file` 撤销add后的暂存区  
* `git rm filename` `git commit -m 'DESC'` 删除已经提交到版本库中的文件
* `git checkout -- file` 恢复误删文件
* `git remote add origin git@github.com:` 链接到远程仓库
* `git push -u origin master` 推送到远程仓库
* `git push origin master` 第一次推送后以后的推送
* `git clone  git@github.com` 远程仓库克隆到本地
* `git checkout -b dev` 创建并切换到dev分支(`git branch dev` `git checkout dev`)
* `git branch` 查看当前分支状况
* `git checkout master` 切换分支
* `git merge dev` dev分支合并到当前分支上,使用Fast-forward模式
* `git branch -d dev` 删除某一分支
* 冲突合并应该操作被改文件后再次提交
* `git log --graph --pretty=oneline --abbrev-commit` 查看分支合并情况
* `git merge --no-ff -m 'no-ff' dev` 不使用Fast forward合并分支，并有一个提交动作
* `git stash` 存储工作现场
* `git checkout -b bug-01` 创建bug分支
* `git stash list` 查看保存的工作现场
* `git stash pop` 恢复工作现场，并删除(`git stash apply`恢复`git stash drop`删除)
* `git branch -D feature` 强行删除没有被合并的分支
* `git remote` 查看远程仓库名称，默认为origin
* `git remote -v` 详细远程仓库信息
* `git push origin dev`推送到远程某一分支上
* `git checkout -b dev origin/dev` 远程分支到本地
* `git branch --set-upstream dev origin/dev` 本地dev分支与远程origin/dev分支的链接
* `git tag -a v0.1 -m "version 0.1 released"` 打标签
* `git tag` 查看所有标签
* `git tag -a v0.1 -m "version 0.1" 3628164` 历史提交打标签
* `git show v0.1` 显示标签
* `git tag -d v0.1` 删除标签
* `git push origin v1.0` 推送标签到远程
* `git push origin --tags` 推送所有标签
* `git push origin :refs/tags/v0.9` 删除远程标签
* 创建`.gitignore`并提交，将忽略某些文件不提交



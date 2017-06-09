# vim开发配置

## 插件管理工具

主页： [https://github.com/tpope/vim-pathogen](https://github.com/tpope/vim-pathogen)

有了这个，就可以像 Textmate / Sublime Text 那样方便地安装卸载插件。后面安装的插件只需将它们放到 ~/.vim/bundle/ 里面独立一个文件夹，pathogen 更会自动加载。卸载时进入到 ~/.vim/bundle/ 找到对应的文件夹删除即可！干净利落。

```
mkdir -p ~/.vim/autoload ~/.vim/bundle && curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim
```

然后在 ~/.vimrc 加入：

```
execute pathogen#infect()
```

## vim-surround 智能包围

主页：[https://github.com/tpope/vim-surround](https://github.com/tpope/vim-surround)

在 Sublime Text 中，如果你选定一段文字。按一下’键或"等有包含意义的按键，编辑器会自动在尾部帮你追加一个对应的结束符。这个插件不但可以完成类似的功能还更加地强大！替换括号，再增加一层括号，追加。都不是问题！并且 html tag 的包含也是支持的哇！

```
cd ~/.vim/bundle
git clone git://github.com/tpope/vim-surround.git
```

## vim-repeat 自动重复插件

主页：[https://github.com/tpope/vim-repeat](https://github.com/tpope/vim-repeat)

这个有点类似宏的东西，配合 vim-surround 功能无比强大。比如说你现在要把 js 中声明的 { a: ‘foo’: b: ‘bar’, c: …} 转化成为一个标准的 json 文档，那么，需要将 a,b,c…加上双引号，‘foo’,‘bar’,…转换为双引号。利用 vim-surround 可以追加和替换，但是每一次重复打 ysiw" 和 cs’" 也是挺麻烦的。vim-repeat 可以自动帮你重复上一次的命令。只要将光标定位到对应的单上面再按一下.键，命令就自动重复！

```
cd ~/.vim/bundle
git clone git://github.com/tpope/vim-repeat.git
```

## NERDTree 文件管理器

主页：[https://github.com/scrooloose/nerdtree](https://github.com/scrooloose/nerdtree)

即是在侧栏显示一个树型的文件浏览器，几乎稍微现代些的代码编辑器都是内置的。但对于VIM来讲，这个功能还是需要加个插件才能实现。由于要考虑到 shell 环境，这个在 gvim + tab 的环境体验并不良好。但在单 tab 模式下。该有的功能还是一样不少，比 Sublime text 和 Textmate 的文件管理功能都要强大。书签，定义根目录，新建，删除，重命名，移动都是有的。鼠标或键盘操作都支持！

```
cd ~/.vim/bundle
git clone https://github.com/scrooloose/nerdtree.git
```

## snipemate.vim 代码片断伴侣

主页：[https://github.com/msanders/snipmate.vim](https://github.com/msanders/snipmate.vim)

实现打几个字符按一下tab自动生成一段格式好的代码的功能，比如 func<Tab> 生成 function() {} 之类的。具体片断跟语法插件有关，不再细表

```
cd ~/.vim/bundle
git clone git://github.com/msanders/snipmate.vim.git
```

## syntastic 语法错误定位

主页：[https://github.com/scrooloose/syntastic](https://github.com/scrooloose/syntastic)

在出错行的行号列显示高亮提示，方便定位出错的行。

```
cd ~/.vim/bundle && \
git clone https://github.com/scrooloose/syntastic.git
```

## vim-es6 ES6语法高亮及代码片断

主页：[https://github.com/isRuslan/vim-es6](https://github.com/isRuslan/vim-es6)

除了语法高亮，还提供了几个 es6 特有的代码片断。

```
cd ~/.vim/bundle
git clone https://github.com/isRuslan/vim-es6.git
```

## jshint Javascript语法检测

主页：[https://github.com/walm/jshint.vim](https://github.com/walm/jshint.vim)

这个是 vim 与 jshint 的绑定，首先需要全局安装的 jshint 包。它会自动调用 jshint 进行讲法检测并在 vim 中标示出有问题的地方。相当方便，可以有效减少 debug 的时间。每次打开的保存js文件会自动执行检测。

首先安装 jshint (node.js 的包）

```
sudo npm install -g jshint
```

再安装jshint.vim插件：

```
cd ~/.vim/bundle
git clone https://github.com/wookiehangover/jshint.vim
```

完成后，还需要建立 ~/.jshintrc 文件，加入 esnext 的选项打开 es6 支持：

```
{
  "esnext": true
}
```

.jshintrc 的全部配置选项可以参考这里：[https://github.com/jshint/jshint/blob/master/examples/.jshintrc](https://github.com/jshint/jshint/blob/master/examples/.jshintrc)

# 配置 Vim 和 Gvim

~/.vimrc

```
execute pathogen#infect()
syntax on
filetype plugin indent on
set ts=2
set sw=2
set expandtab
set number
map <C-t> :NERDTreeToggle<CR>
set autoindent
map <C-s> :w<CR>
imap <C-s> <Esc>:w<CR>a
inoremap ( ()<Left>
inoremap { {}<Left>
inoremap [ []<Left>
inoremap ' ''<Left>
inoremap " ""<Left>
```

~/.gvimrc

```
set lines=61
set columns=159
colo solarized
set background=dark
set guifont=Ubuntu\ Mono\ 11
NERDTreeToggle
```

## git遇到RPC failed

```
git config --global http.postBuffer 24288000
```




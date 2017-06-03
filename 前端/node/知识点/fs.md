# fs模块

## 文件操作模式

- `r` ：读取文件，文件不存在时报错；
- `r+` ：读取并写入文件，文件不存在时报错；
- `rs` ：以同步方式读取文件，文件不存在时报错；
- `rs+` ：以同步方式读取并写入文件，文件不存在时报错；
- `w` ：写入文件，文件不存在则创建，存在则清空；
- `wx` ：和`w`一样，但是文件存在时会报错；
- `w+` ：读取并写入文件，文件不存在则创建，存在则清空；
- `wx+` ：和`w+`一样，但是文件存在时会报错；
- `a` ：以追加方式写入文件，文件不存在则创建；
- `ax` ：和`a`一样，但是文件存在时会报错；
- `a+` ：读取并追加写入文件，文件不存在则创建；
- `ax+` ：和`a+`一样，但是文件存在时会报错。

## writeFile写入文件

使用`fs.writeFile(filename, data, [options], callback)`写入内容到文件。

writeFile接收四个参数，filename是文件名称；data是要写入文件的数据；[options]是一个对象为可选参数，包含编码格式（encoding），模式（mode）以及操作方式（flag）；callback是回调函数。

![writeFile](http://labfile.oss.aliyuncs.com/courses/44/nodejs3-2.png)

```javascript
const fs = require('fs');

for (let i=0; i<100; i++){
  fs.writeFile(
    './data.txt',
    'data-'+i+'\r\n',
    {
      encoding: "utf8",
      flag: 'a+'
    }, function (err) {
      if(err){
        console.log(err);
      }
    })
}

console.log('write End ....');
```

## readFile读取文件

使用`fs.readFile(filename, [options], callback)`方法读取文件。

readFile接收三个参数，filename是文件名；[options]是可选的参数，为一个对象，用于指定文件编码（encoding）及操作方式（flag）；callback是回调函数。

![img](http://labfile.oss.aliyuncs.com/courses/44/nodejs3-1.png)

```javascript
const fs = require('fs');

fs.readFile('./data.txt', function (err, data) {
  if(err){
    throw err;
  }

  console.log(data);	//打印输出为二进制流
  console.log(data.toString());	//转成字符串
});
```

指定编码

```javascript
fs.readFile('./data.txt', 'utf-8', function (err, data) {
  if(err){
    throw err;
  }

  console.log(data.toString());
});
```

## 使用fs.read和fs.write读写文件

### fs.open()

方法用于打开文件，以便fs.read()读取。path是文件路径，flags是打开文件的方式

### fs.read()

`fs.read(fd, buffer, offset, length, position, callback)`方法接收6个参数。

- `fd`是文件描述符，必须接收`fs.open()`方法中的回调函数返回的第二个参数；
- `buffer`是存放读取到的数据的Buffer对象；
- `offset`指定向buffer中存放数据的起始位置；
- `length`指定读取文件中数据的字节数；
- `position`指定在文件中读取文件内容的起始位置；
- callback是回调函数，回调函数的参数：
  - `err`用于抛出异常；
  - `bytesRead`是从文件中读取内容的实际字节数；
  - `buffer`是被读取的缓存区对象。

### fs.close()

用于关闭文件，fd是所打开文件的文件描述符。

### fs.write()

````javascript
const fs = require('fs');

fs.open('./testwrite.txt', 'w', function (err, fd) {
  if(err){
    throw err;
  }

  console.log('open file success....');
  let buffer = new Buffer('shiyanlou');

  //写文件
  fs.write(fd, buffer, 0, 6, 0, function (err, writeen, buffer) {
    if(err) {
      throw err;
    }

    console.log('write success....');

    // 打印出buffer中存入的数据
    let byteLength = buffer.byteLength;
    console.log(byteLength, buffer.slice(0, byteLength).toString());

    // 关闭文件
    fs.close(fd);
  });
});
````

## 目录操作

### 创建目录

```javascript
const fs = require('fs');

fs.mkdir('./newdir', function (err) {
  if(err){
    throw err;
  }
  console.log('make dir success...');
})
```

### 读取目录

```javascript
fs.readdir('./node_modules', function (err, files) {
  if(err){
    throw err;
  }
  console.log(files);
})
```








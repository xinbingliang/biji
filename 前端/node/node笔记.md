# node笔记

[源文章](http://nqdeng.github.io/7-days-nodejs)

## 文件操作

### 文件拷贝

**小文件拷贝**

```javascript
"use strict";

const fs = require('fs');

function copy(src, dst){
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function main(argv){
    copy(argv[0], argv[1]);
}


main(process.argv.slice(2))
```

**大文件的读取(管道)**

````javascript
"use strict";

const fs = require('fs');

function copy(src, dst){
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv){
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2))
````

### Buffer（数据块）

JS语言自身只有字符串数据类型，没有二进制数据类型，因此NodeJS提供了一个与`String`对等的全局构造函数`Buffer`来提供对二进制数据的操作。

* ```javascript
  let bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
  console.log(bin[0]);    //104
  ```

* ````javascript
  let bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
  console.log(bin.toString('utf-8'));    //hello
  ````

* ````javascript
  var bin = new Buffer('2xin', 'utf-8');
  ````

* ```
  bin[0] = 0x48;
  ```

* `.slice()`不返回一个新的buffer而是引用原来的指针

  ````javascript
  var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
  var sub = bin.slice(2);

  sub[0] = 0x65;
  console.log(bin); // => <Buffer 68 65 65 6c 6f>
  ````

* 创建新的`Buffer`需要使用`.copy()`做复制

  ````javascript
  var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
  var dup = new Buffer(bin.length);

  bin.copy(dup);
  dup[0] = 0x48;
  console.log(bin); // => <Buffer 68 65 6c 6c 6f>
  console.log(dup); // => <Buffer 48 65 65 6c 6f>
  ````

### Stream(数据流)

当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流。NodeJS中通过各种`Stream`来提供对数据流的操作。

**使流数据触发读取**

````javascript
let rs = fs.createReadStream(src);
rs.on('data', function(chunk){
    rs.pause();
    doSomething(chunk, function(){
        rs.resume();
    })
})


rs.on('end', function(){
    cleanUp();
})
````

````javascript
const fs = require('fs');

let rs = fs.createReadStream('22.mp3');
let ws = fs.createWriteStream('~22.MP3');

rs.on('data', function(chunk){
    if(ws.write(chunk) ===false ){
        rs.pause();
    }
})

rs.on('end', function(){
    ws.end();
})

ws.on('drain', function(){
    rs.resume();
})
````

### File System(文件系统)



### Path(路径)



### 目录遍历



### 文本编码






































# webpack 项目

## 准备

* `npm init`
* `npm install -g webpack-dev-server webpack` 
* 创建文件`webpack.config.js`

**package.json**

````javascript
{
  "name": "webpackdemo",
  "version": "1.0.0",
  "description": "## 准备",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --progress --colors  --hot --inline",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
````

**webpack.config.js**

````javascript
var path = require('path');

var config = {
  entry: {
    admin: './admin/index.js',
    consumer: './consumer/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),   //打包后的文件存放位置
    publicPath: '/dist/',                 //指定从哪个位置获得打包出的文件
    filename: '[name].bundle.js'
  }
};


module.exports = config;
````

* `npm start` 运行项目
* 打开`localhost:8080/admin` 查看

## 优化配置

* `npm install  webpack --save`

* 将编译出的文件不注释并压缩

  ```javascript
  var path = require('path');
  var path = require('path');
  var webpack = require('webpack');

   var config = {
   entry: {
    admin: './admin/index.js',
    consumer: './consumer/index.js'},
    output: {
        path: path.join(__dirname, 'dist'),   //打包后的文件存放位置
        publicPath: '/dist/',                 //指定从哪个位置获得打包出的文件
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin() //实现注释的取消和代码压缩
    ]};

    module.exports = config;
  ```




## 使用loader

* `npm install --save babel-core babel-cli babel-loader babel-preset-es2015 babel-preset-react` ES6转ES5
* `npm install css-loader --save` 
* `npm install style-loader --save`
* `npm install less less-loader --save`
* `npm install url-loader --save`
* `npm install file-loader --save`

```javascript
var path = require('path');
var webpack = require('webpack');


var config = {
  entry: {
    admin: './admin/index.js',
    consumer: './consumer/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),   //打包后的文件存放位置
    publicPath: '/dist/',                 //指定从哪个位置获得打包出的文件
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.(png|jpg|jpeg)$/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin() //实现注释的取消和代码压缩
  ]
};

module.exports = config;
```

**开启less**

````javascript
module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /\.(png|jpg|jpeg)$/,
      loader: 'file-loader'
    },{
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }]
  }
````

对某一个文件夹使用某一种loader

```javascript
module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /images/,
      loader: 'file-loader'
    },{
      test: /icons/,
      loader: 'url-loader'
    },{
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }]
  }
```

**实现ES6的处理**

````javascript
module: {
    noParse: [                            //指定文件不递归导入
      /jquery/
    ],
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /images/,
      loader: 'file-loader'
    },{
      test: /icons/,
      loader: 'url-loader'
    },{
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    },{
      test: /\.js$/,
      exclude: /node_modules/,            //预处理排除的文件
      include: /(admin|consumer)/,        //只打包这两个文件
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
````

**使用ES6**

````javascript
import './index.css';
import './style.less';

document.querySelector('#box').innerHTML = "Hello World";
````

**定制build命令**

````javascript
{
  "name": "webpackdemo",
  "version": "1.0.0",
  "description": "## 准备",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --progress --colors",
    "build": "webpack --progress --colors -p",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-cli": "^6.24.1",
    "babel-core": "^6.24.1",
    "babel-loader": "^7.0.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.1",
    "file-loader": "^0.11.1",
    "less": "^2.7.2",
    "3less-loader": "^4.0.3",
    "style-loader": "^0.17.0",
    "url-loader": "^0.5.8",
    "webpack": "^2.5.0"
  }
}
````

**调优**

````javascript
var path = require('path');
var webpack = require('webpack');


var config = {
  entry: {
    admin: './admin/index.js',
    consumer: './consumer/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),   //打包后的文件存放位置
    publicPath: '/dist/',                 //指定从哪个位置获得打包出的文件
    filename: '[name].bundle.js'
  },
  module: {
    noParse: [                            //指定文件不递归导入
      /jquery/
    ],
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },{
      test: /images/,
      loader: 'file-loader'
    },{
      test: /icons/,
      loader: 'url-loader'
    },{
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    },{
      test: /\.js$/,
      exclude: /node_modules/,            //预处理排除的文件
      include: /(admin|consumer)/,        //只打包这两个文件
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({         //实现注释的取消和代码压缩
      compress: {
        warnings: false                           //不输出warninigs
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()  //优化module id
  ]
};


module.exports = config;
````


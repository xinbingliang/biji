# react核心难点

## Properties

除了在父组件中直接以属性方式绑定以外，还可以在组件中初始化

````javascript
var APP = React.createClass({
    getDefaultProps:function(){
        return {
            txt:'this is a prop'
        }
    },
    render:function(){
        return (
            <div>
              <h1>Hello React</h1>
              <p>{this.props.cat}</p>
              <p>{this.props.txt}</p>
            </div>
        )
    }
});

React.renderComponent(<APP cat={5} />, document.body)
````

## state

````javascript
var APP = React.createClass({
    getInitialState: function() {
        return {
            txt: 'this is some text from initial state'
        }
    },
    updateTxt: function(e) {
        this.setState({txt: e.target.value})
    },
    render: function(){
        return (
            <div>
              <input type="text" onChange={this.updateTxt} />
              <p>{this.state.txt}</p>
            </div>
        )
    }
});
````

## 生命周期

* `componentWillMount` 在render之前执行，并永远只执行一次

* `componentDidMount` 组件加载完后执行，DOM结构已经生成，可以使用其他js框架，并执行时间函数或ajax请求数据

* `componentWillReceiveProps` 在组件接收到一个新的prop时被执行。这个方法在初始化render时不会被调用。

* `shouldComponentUpdate` 返回一个布尔值。在组件接收到新的props或者state时被执行

* `componentWillUpdate` 在组件接收到新的props或者state但还没有render时被执行。在初始化时不会被执行。

* `componentDidUpdate` 在组件完成更新后立即执行。在初始化时不会被执行。一般会在组件完成更新后被使用。例如清除notification文字等操作。

* `componentWillUnmount` 在组件从DOM unmount后立即执行， 主要用来执行一些必要的清理任务

  ​


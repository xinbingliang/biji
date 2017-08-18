```javascript
function son(option) {
  this._init(option);
}

son.prototype = {
  _init: function (option) {
    this.name = option.name;
    this.age = option.age;
    this.color = 'red';
  },
  show: function () {

  }
}
```


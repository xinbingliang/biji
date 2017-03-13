/**
 *  desc: 工具函数集
 *  author: xin
 *  time: 1016/10/27
 */


/**
 * 构造函数之间的相互继承，注意在执行本函数后再对子构造函数做属性的添加，
 * 父函数属性在本函数执行之前添加
 * @param C 子构造函数
 * @param P 父构造函数
 */
function xinObjCreate(C, P) {
    //存在该方法
    if(Object.create){
        C.prototype = Object.create(P.prototype)
    } else {
        //语言本身没有create功能
        function F(){}

        F.prototype = P.prototype;
        var f = new F();
        C.prototype = f;
    }
    C.prototype.constructor = C;

    C.super = C.base = P.prototype;
}

/*function Per() {}
Per.prototype.name = 'xin';
function chi(){}
xinObjCreate(chi, Per);
chi.prototype.age = 23;
var obj = new chi();
console.log(obj.name);
console.log(obj.age);*/


/**
 * 对象之间的拷贝
 * @param C 拷贝的目标
 * @param P 拷贝源
 */
function xinExtend(C, P) {
    var P = P || {};
    for (var attr in P){
        C[attr] = P[attr];
    }
}

/*
var obj1 = {
    name: 'xin',
    hib: ['音乐', '短跑', '钓鱼', '养花']
}
var obj2 = {};
xinExtend(obj2, obj1);
console.log(obj2);
*/


/**
 * 对象间深拷贝，对ES5以上的可以直接使用Object.create
 * @param c 拷贝目标
 * @param p 拷贝源
 * @constructor
 */
function xinExtendDeeply(c, p) {
    var p = p || {};

    for(var method in p){
        if(typeof p[method] === typeof {}){
            //容器对象要做相应的准备
            c[method] = (p[method].constructor == Array)?[]:{};
            Extend(c[method], p[method])
        } else {
            c[method] = p[method];
        }
    }
}

/**
 * 通用惰性单例
 * @param fn 将要执行的动作，例如创建一个弹窗
 * @returns {Function} 只有返回函数被执行后才执行最终要求的动作
 */
var xinSingle = function (fn) {
    var result = null;

    return function () {
        if(!result){
            //执行动作其实只有在创建新的对象才会被执行
            result = fn.apply(this, arguments);
        }
        return result;
    }
};

/*$(function () {
    var single = function (fn) {
        var result = null;

        return function () {
            if(!result){
                result = fn.apply(this, arguments);
            }
            return result;
        }
    };

    var createLayer = function () {
        var div = document.createElement('div');

        div.innerHTML = '创建的弹窗';
        div.style.display = 'none';

        document.body.appendChild(div);
        //在惰性中白保护的对象，要获得该对象，可以直接获得该单例
        return div;
    };

    var getLayer = single(createLayer);

    document.getElementById('button').onclick = function () {
        var l = getLayer();
        l.style.display = 'block';
    };

})*/


/**
 * 数组和函数迭代器，当工具中没有包含该功能时才建议使用
 * @param obj 将要迭代的对象
 * @param callback 对迭代结果进行处理的函数
 */
var xinEach = function (obj, callback) {
    //判断是不是对象
    if(typeof obj === typeof {}){
        var num = 0;
        for (var attr in obj){
            callback.call(obj[attr], num++, obj[attr]);
        }
    } else {
        for (var i = 0, l=obj.length; i < l;i++){
            callback.call(obj[i], i, obj[i]);
        }
    }
};

/*
xinEach({
    name: '辛丙亮',
    age: '23'
}, function (i, n) {
    console.log(i, '---', n);
});
*/

/**
 * 自定义事件触发
 * @type {{listen, trigger, remove}}
 */
var Event = (function () {
    var clientList = {},
        listen,
        trigger,
        remove;

    listen = function (key, fn) {
        //可能存在一个信号触发多个处理函数，便需要优先创建容器
        if(!clientList[key]){
            clientList[key] = [];
        }

        clientList[key].push(fn);
    };

    trigger = function () {
        //第一个参数是信号,后面的参数是函数使用的参数
        var key = Array.prototype.shift.call(arguments);
        //将要被调用的众多方法
        var funs = clientList[key];
        if(!funs || funs.length === 0){
            throw "没有对应的方法";
        }

        console.log(arguments);
        for (var i = 0, fn; fn = funs[i++];){
            fn.apply(this, arguments);
        }
    };

    remove = function (key, fn) {
        var fns = clientList[key];

        //没有被注册的信号
        if(!fns){
            return false;
        }

        if(!fn){
            //没有指定方法就是要清空所有监听
            fns && (fns.length = 0);
        } else {
            for(var l = fns.length-1; l >= 0; l--){
                var _fn = fns[l];
                if(_fn === fn){
                    fns.split(l, 1);
                }
            }
        }
    };

    return{
        listen: listen,
        trigger: trigger,
        remove: remove
    }
})();

/*
Event.listen('xin', function (a, b) {
    console.log(a + b);
});
Event.listen('xin', function (a, b) {
    console.log(a * b);
});
Event.trigger('xin', 1, 5);
Event.remove('xin');*/







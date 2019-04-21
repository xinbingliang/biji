# flask_sqlalchemy 中的 paginate 实现分页

在使用flask进行开发的过程是不免要涉及到分页功能的开发，我使用的是`flask_sqlalchemy`，对于继承自`flask_sqlalchemy.Model`的类，都有一个`paginate(page=None, per_page=None, error_out=True, max_per_page=None)`方法来获得一个`flask_sqlalchemy.Pagination`对象。

下面我们来简单说明一下`paginate`和`Pagination`的使用。

## paginate

`paginate(page=None, per_page=None, error_out=True, max_per_page=None)`
这边说明一下这个方法对应的参数：

* page
  * 指定页码，从`1`开始
* per_page
  * 每一页有几个项
* error_out（默认为True） 
  * 是否抛出错误
  * 当其为`True`时,在以下情况会抛出`404` 
    * 没有匹配项或者`page`不等于`1`
    * `page`比`1`小或者`per_page`是负数
    * `page`和`per_page`不是整数
  * 当其为`False`时 
    * `page`和`per_page`的默认值分别为`20`和`1`
* max_per_page 
  * 当指定了`max_per_page`时，`per_page`会受到这个值的限制（不知道是什么场景下使用，求指点）

## Pagination

`Pagination`是调用`paginate`方法后返回的对象。它拥有以下方法，我们可以通过它快速地实现分页的功能。 

* 它拥有以下属性和方法。 has_next
  * 是否还有下一页
* has_prev 
  * 是否还有下一页
* items 
  * 当前页的元素集合
* next(error_out=False) 
  * 返回下一页的`Pagination`对象
* next_num 
  * 下一页的页码
* page 
  * 当前页的页码
* pages 
  * 匹配的元素在当前配置一共有多少页
* per_page 
  * 每一页显示的元素个数
* prev(error_out=False) 
  * 上一页的`Pagination`对象
* prev_num 
  * 上一页的页码
* query 
  * 创建`Pagination`对象对应的`query`对象
* total 
  * 匹配的元素总数





 



 

 

 
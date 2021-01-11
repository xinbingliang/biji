### 将一个函数作为另外一个函数的参数

````go
// main.go
package main

import "fmt"

func filter(score []int, fun func(int) bool) []int {
	reSlice := make([]int, 0)
	for _, v := range score {
		if fun(v){
			reSlice = append(reSlice, v)
		}
	}
	return reSlice
}

func main() {
	score := []int{10, 50, 880, 90, 85}
	fmt.Println(filter(score, func(i int) bool {
		if i > 60 {
			return true
		}else {
			return false
		}
	}))
}
````

### python的finally

```python
def test():
    try:
        return "正常逻辑"
    except Exception as e:
        pass
    finally:  # 在正常返回之前执行
        print("执行finally")


if __name__ == '__main__':
    test()
```

### go中的defer

先进后出

````go
// main.go
package main

import "fmt"

func main() {
	fmt.Println("首先输出")
	defer fmt.Println("输出defer1")
	defer fmt.Println("输出defer2")
	defer fmt.Println("输出defer3")
	fmt.Println("代码末尾")
}
````

defer会拷贝，不会影响外部值

 ````go
// main.go
package main

import "fmt"

func main() {
	test := func() {
		fmt.Println("test1")
	}
	defer test()  // test1
	test = func() {
		fmt.Println("test2")
	}
}
 ````

### panic和recover

````go
// main.go
package main

import "fmt"

func div(a, b int) (int, error) {
	if b == 0{
 		panic("被除数不能为0")
	}else {
		return a/b, nil
	}
}

func main() {
	defer func() {
		err := recover() //从错误中恢复过来
		if err != nil{
			fmt.Println(err)
		}
		fmt.Println("hahahh")
	}()
	div(1, 0)
}
````
















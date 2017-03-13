# traitTrait   为了减少单继承语言的限制，使开发人员能够自由地在不同层次结构内独立的类中复用 method。

## 优先级

从基类继承的成员会被 trait 插入的成员所覆盖。优先顺序是来自当前类的成员覆盖了    trait 的方法，而 trait 则覆盖了被继承的方法。   

```php
class base
{
    public function sayHello()
    {
        echo "Hello";
    }
}

trait  SayWorld
{
    public function sayHello()
    {
        parent::sayHello();
        echo " World";
    }
}

class myHelloWorld extends base
{
    use SayWorld;
}

$obj = new myHelloWorld();
$obj->sayHello();
```

```php
trait HelloWorld
{
    public function sayHello()
    {
        echo "Hello World!";
    }
}

class TheWorldIsNotEnough
{
    use HelloWorld;

    public function sayHello()
    {
        echo "这个是优先级最高";
    }
}

$obj = new TheWorldIsNotEnough();
$obj->sayHello();

```

## 多个trait

```php
header("Content-type: text/html; charset=utf-8");

trait Hello
{
    public function sayHello()
    {
        echo 'Hello ';
    }
}

trait World
{
    public function sayWorld()
    {
        echo 'World';
    }
}

class MyHelloWorld
{
    use Hello, World;

    public function sayExclamationMark()
    {
        echo "!";
    }
}
$obj = new MyHelloWorld();
$obj->sayHello();
$obj->sayWorld();
$obj->sayExclamationMark();
```

## 冲突的解决

```php
trait A
{
    public function smallTalk()
    {
        echo "a";
    }

    public function bigTalk()
    {
        echo 'A';
    }
}

trait B
{
    public function smallTalk()
    {
        echo 'b';
    }

    public function bigTalk()
    {
        echo "B";
    }
}

class Talker
{
    use A, B {
        B::smallTalk insteadof A;
        A::bigTalk insteadof B;
    }
}

class Aliased_Talker{
    use A, B{
        B::smallTalk insteadof A;
        A::bigTalk insteadof B;
        B::bigTalk as talk;
    }
}

$obj1 = new Talker();
$obj1->smallTalk();
$obj1->bigTalk();

$obj2 = new Aliased_Talker();
$obj2->smallTalk();
$obj2->talk();
```

## 修改方法的访问控制

```php
trait HelloWorld
{
    public function sayHello()
    {
        echo "Hello World!";
    }
}

//修改sayHello的访问控制
class MyClass1
{
    use HelloWorld {
        sayHello as protected;
    }
}

//给方法一个改变访问控制的别名
//原版sayHello的访问控制则没有发生变化
class MyClass2 {
    use HelloWorld {
        sayHello as private myprivateHello;
    }
}
```

## 从trait来组成trait

````php
trait Hello{
    public function sayHelo(){
        echo "Hello ";
    }
}

trait World {
    public function sayWorld(){
        echo "World!";
    }
}

trait HelloWorld{
    use Hello,world;
}

class MyHelloWorld{
    use HelloWorld;
}


$obj = new MyHelloWorld();
$obj->sayHelo();
$obj->sayWorld();
````

## Trait的抽象成员

```php
trait Hello {
    public function sayHelloWorld()
    {
        echo "hello".$this->getWorld();
    }

    abstract public function getWorld();
}

class MyHelloWorld
{
    private $world;
    use Hello;

    public function getWorld()
    {
        return $this->world;
    }

    public function setWorld($val)
    {
        $this->world = $val;
    }
}
```

## 静态成员

````php
trait Counter{
    public function inc(){
        static $c = 0;
        $c = $c + 1;
        echo "$c\n";
    }
}

class C1
{
    use Counter;
}

class C2
{
    use Counter;
}

$obj1 = new C1();
$obj1->inc();

$obj2 = new C2();
$obj2->inc();
````

```php
trait SaticExample{
    public static function doSomething(){
        return "Doing Something";
    }
}

class Example
{
    use SaticExample;
}

echo Example::doSomething();
```

## 属性

````php
trait PropertiesTrait
{
    public $x = 1;
}

class PropertiesExmaple
{
    use PropertiesTrait;
}

$example = new PropertiesExmaple;
echo $example->x;
````

```php
//如果 trait 定义了一个属性，那类将不能定义同样名称的属性，否则会产生一个错误
trait PropertiesTrait
{
    public $sname = true;
    public $different  = false;
}

class PropertiesExample
{
    use PropertiesTrait;
    public $same = true;
    public $different = true;
}
```
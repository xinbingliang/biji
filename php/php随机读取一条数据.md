# PHP随机读取一条数据

**使用了thinkPHP3.2框架的情况下**

## 读取所有id后查询一条

```php
$timeArr = array();
for ($i = 0; $i< 1000; $i++){
  $starttime = microtime();

  $isArr = $this->getField('id', true);
  $id = array_rand($isArr);
  $data = $this->field('id, imagestr')->where("id = {$id}")->find();

  $endtime = microtime();
  $time = ($endtime - $starttime)*1000;
  array_push($timeArr, $time);
  usleep(500);
}

$alltime = array_sum($timeArr);
return $alltime/1000;
```

* 0.31

## 数据库随机一条id

````javascript
$timeArr = array();

        for ($i = 0; $i< 1000; $i++){
            $starttime = microtime();

            $sql1 = 'SELECT ROUND( RAND()*(SELECT MAX(id) FROM `y_image`)) AS id';
            $data = $this->query($sql1);
            $data2 = $this->field('id, imagestr')->limit($data['id'], 10)->find();
            array_rand($data2);

            $endtime = microtime();
            $time = ($endtime - $starttime)*1000;
            array_push($timeArr, $time);
            usleep(500);
        }

        $alltime = array_sum($timeArr);
        return $alltime/1000;
````

* 0.32

## 使用数据库默认rand()

````php
        $timeArr = array();

        for ($i = 0; $i< 1000; $i++){
            $starttime = microtime();

             $data = $this->field('id, imagestr')->order('rand()')->find();

            $endtime = microtime();
            $time = ($endtime - $starttime)*1000;
            array_push($timeArr, $time);
            usleep(500);
        }

        $alltime = array_sum($timeArr);
        return $alltime/1000;
````

* 0.27




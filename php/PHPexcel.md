# PHPExcel

## 创建Excel步骤

1. 新建一个excel：实例化PHPExcel
2. 创建sheet(内置表)：
   - createSheet()方法
   - setActiveSheetIndex()方法
   - getActiveSheet()方法    
3. 填充数据
   * setCellValue()方法
4. 保存文件
   * PHPExcel_IOFactory::createWrite()方法
   * save()方法

```php
<?php
$dir = dirname(__FILE__);
include_once "./Classes/PHPExcel.php";
$phpexcelObj = new PHPExcel();
$sheetObj = $phpexcelObj->getActiveSheet();//获得当前活动sheet的操作
$sheetObj->setTitle('demo'); //设置sheet名称
$sheetObj->setCellValue("A1", "姓名")->setCellValue("B1", "分数"); //给当前活的sheet填充数据
$objWrite = PHPExcel_IOFactory::createWriter($phpexcelObj, "Excel2007"); //创建并写入"Excel5"
$objWrite->save("./my.xlsx");
```

### 简写(不推荐使用，内存溢出)

````php
<?php
$dir = dirname(__FILE__);
include_once "./Classes/PHPExcel.php";
$phpexcelObj = new PHPExcel();
$sheetObj = $phpexcelObj->getActiveSheet();//获得当前活动sheet的操作
$sheetObj->setTitle('demo'); //设置sheet名称
/*$sheetObj->setCellValue("A1", "姓名")->setCellValue("B1", "分数"); //给当前活的sheet填充数据*/


$dataArray = array( //相当于一个活动的sheet
    array(), //第一行空出来
    array(  //一行
        "", //该行第一列空出来
        "姓名",
        "分数"
    ),
    array(
        "李四",
        "60"
    ),
    array(
        "王五",
        "70"
    )
);

$sheetObj->fromArray($dataArray); //直接加载填充数据块

$objWrite = PHPExcel_IOFactory::createWriter($phpexcelObj, "Excel2007"); //创建并写入"Excel5"
$objWrite->save("./my.xlsx");
````

## 导入Excel数据

1. 实例化Excel读取对象
2. 加载Excel文件
   * 全部加载
   * 选择加载
3. 读取Excel文件
   * 全部读取
   * 逐行读取

````php
header("Content-Type:text/html;charset=utf-8");
$dir = dirname(__FILE__);   //找到当前脚本路径
require_once "./Classes/PHPExcel/IOFactory.php";
$filename = "./old.xls";
//全部加载
$PHPExcelObj = PHPExcel_IOFactory::load($filename); //加载文件
$sheetCount = $PHPExcelObj->getSheetCount(); //获得sheet数目
for($i = 0; $i < $sheetCount;$i++){
    $DataArray = $PHPExcelObj->getSheet($i)->toArray(); //读取每个sheet中的数据
}
````

## 样式控制

### 合并/拆分单元格（可以查看文档）

* 和对应信息的第一行对齐

````php
<?php
include_once "./Classes/PHPExcel.php";
$phpexcelObj = new PHPExcel();
$sheetObj = $phpexcelObj->getActiveSheet();//获得当前活动sheet的操作
$sheetObj->setTitle('测试');
$sheetObj->setCellValue('A1', 'test1');

$sheetObj->mergeCells('A1:A6');	//列合并
$sheetObj->mergeCells('A1:F1'); //合并行

$sheetObj->unmergeCells('A1:A6');
$sheetObj->unmergeCells('A1:F1');

$objWrite = PHPExcel_IOFactory::createWriter($phpexcelObj, "Excel2007"); //创建并写入"Excel5"
$objWrite->save("./test.xlsx");
````

### 设置文字居中

```php
include_once "./Classes/PHPExcel.php";
$phpexcelObj = new PHPExcel();
$sheetObj = $phpexcelObj->getActiveSheet();//获得当前活动sheet的操作
$sheetObj->setTitle('测试');
$sheetObj->setCellValue('A1', 'test1');

$sheetObj->getDefaultStyle()->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER); //设置水平和垂直居中


$sheetObj->mergeCells('A1:F1'); //合并行


$objWrite = PHPExcel_IOFactory::createWriter($phpexcelObj, "Excel2007"); //创建并写入"Excel5"
$objWrite->save("./test.xlsx");

```

### 设置字体

````php
include_once "./Classes/PHPExcel.php";
$phpexcelObj = new PHPExcel();
$sheetObj = $phpexcelObj->getActiveSheet();//获得当前活动sheet的操作
$sheetObj->setTitle('测试');
$sheetObj->setCellValue('A1', 'test1');

$sheetObj->getDefaultStyle()->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER); //默认设置水平和垂直居中
$sheetObj->getDefaultStyle()->getFont()->setName('微软雅黑')->setSize('14')->setBold(False);//设置默认
$sheetObj->getStyle('A1:F1')->getFont()->setName('微软雅黑')->setSize(30)->setBold(True); //设置字体和大小

$sheetObj->mergeCells('A1:F1'); //合并行


$objWrite = PHPExcel_IOFactory::createWriter($phpexcelObj, "Excel2007"); //创建并写入"Excel5"
$objWrite->save("./test.xlsx");

````

### 设置背景颜色

```php
include_once "./Classes/PHPExcel.php";
$phpexcelObj = new PHPExcel();
$sheetObj = $phpexcelObj->getActiveSheet();//获得当前活动sheet的操作
$sheetObj->setTitle('测试');
$sheetObj->setCellValue('A1', 'test1');

$sheetObj->getDefaultStyle()->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER); //默认设置水平和垂直居中
$sheetObj->getDefaultStyle()->getFont()->setName('微软雅黑')->setSize('14')->setBold(False);//设置默认
$sheetObj->getStyle('A1:F1')->getFont()->setName('微软雅黑')->setSize(30)->setBold(True); //设置字体和大小

$sheetObj->mergeCells('A1:F1'); //合并行

/*$sheetObj->getStyle("A1:F1")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);//设置填充的范围和方式
$sheetObj->getStyle("A1:F1")->getFill()->getStartColor()->setRGB("#abcdef");*/

//或者
$sheetObj->getStyle("A1:F1")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB("#abcdef");

$objWrite = PHPExcel_IOFactory::createWriter($phpexcelObj, "Excel2007"); //创建并写入"Excel5"
$objWrite->save("./test.xlsx");

```

### 添加边框

```php
include_once "./Classes/PHPExcel.php";
$phpexcelObj = new PHPExcel();
$sheetObj = $phpexcelObj->getActiveSheet();//获得当前活动sheet的操作
$sheetObj->setTitle('测试');
$sheetObj->setCellValue('A1', 'test1');

$sheetObj->getDefaultStyle()->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER); //默认设置水平和垂直居中
$sheetObj->getDefaultStyle()->getFont()->setName('微软雅黑')->setSize('14')->setBold(False);//设置默认
$sheetObj->getStyle('A1:F1')->getFont()->setName('微软雅黑')->setSize(30)->setBold(True); //设置字体和大小

$sheetObj->mergeCells('A1:F1'); //合并行

/*$sheetObj->getStyle("A1:F1")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);//设置填充的范围和方式
$sheetObj->getStyle("A1:F1")->getFill()->getStartColor()->setRGB("#abcdef");*/
//或者
$sheetObj->getStyle("A1:F1")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB("#abcdef");

$styleArray = array(
    'borders'=>array(
        'outline' => array(
            'style'=>PHPExcel_Style_Border::BORDER_THICK,
            'color'=>array('rgb'=>'ff0000')
        )
    )
);

$sheetObj->getStyle('A1:F1')->applyFromArray($styleArray);
$objWrite = PHPExcel_IOFactory::createWriter($phpexcelObj, "Excel2007"); //创建并写入"Excel5"
$objWrite->save("./test.xlsx");
```

### 单元格换行

````php
include_once "./Classes/PHPExcel.php";
$phpexcelObj = new PHPExcel();
$sheetObj = $phpexcelObj->getActiveSheet();//获得当前活动sheet的操作
$sheetObj->setTitle('测试');
$sheetObj->getStyle('A1')->getAlignment()->setWrapText(true);	//写在换行符之前才有效果
$sheetObj->setCellValue('A1', "test1\ntest2");

$sheetObj->getDefaultStyle()->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER)->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER); //默认设置水平和垂直居中
$sheetObj->getDefaultStyle()->getFont()->setName('微软雅黑')->setSize('14')->setBold(False);//设置默认
$sheetObj->getStyle('A1:F1')->getFont()->setName('微软雅黑')->setSize(30)->setBold(True); //设置字体和大小

$sheetObj->mergeCells('A1:F1'); //合并行

/*$sheetObj->getStyle("A1:F1")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID);//设置填充的范围和方式
$sheetObj->getStyle("A1:F1")->getFill()->getStartColor()->setRGB("#abcdef");*/
//或者
$sheetObj->getStyle("A1:F1")->getFill()->setFillType(PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB("#abcdef");

$styleArray = array(
    'borders'=>array(
        'outline' => array(
            'style'=>PHPExcel_Style_Border::BORDER_THICK,
            'color'=>array('rgb'=>'ff0000')
        )
    )
);

$sheetObj->getStyle('A1:F1')->applyFromArray($styleArray);
$objWrite = PHPExcel_IOFactory::createWriter($phpexcelObj, "Excel2007"); //创建并写入"Excel5"
$objWrite->save("./test.xlsx");

````

以上都可以写数组后一次性设置

### 单元格格式控制（普通格式超过11位为科学计数）

```php
include_once "./Classes/PHPExcel.php";
$phpexcelObj = new PHPExcel();
$sheetObj = $phpexcelObj->getActiveSheet();//获得当前活动sheet的操作
$sheetObj->setTitle('测试');
$sheetObj->getStyle('A1')->getNumberFormat()->setFormatCode(PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);	//设置默认的格式
$sheetObj->setCellValueExplicit('A1', "151027245185555", PHPExcel_Cell_DataType::TYPE_NUMERIC);	//写入时社会之
$objWrite = PHPExcel_IOFactory::createWriter($phpexcelObj, "Excel5"); //创建并写入"Excel5"
$objWrite->save("./test.xls");
```

## 生成报表













# php-apk

```php
<?php
$file_name = '6.apk';
header('Content-Type: application/vnd.android.package-archive');
header("Content-length: " . filesize($file_name));
header('Content-Disposition: attachment; filename="' . $file_name . '"');
ob_end_flush();
readfile($file_name);
return true;
?>
```






<?php

header("Content-type: text/javascript");

$code = file_get_contents('code.js');
echo $code;

?>


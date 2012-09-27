<?php

header("Content-type: text/javascript");

$code = file_get_contents('../../../jquery/jquery-1.6.4.min.js');
echo $code;

echo 'jQuery.noConflict();';
$code = file_get_contents('code.js');
echo $code;

?>


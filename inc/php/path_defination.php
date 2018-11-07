<?php
//_FILE_ returns current path to the file
//dirpath() returns parent directory
define("PHP_PATH", dirname(__FILE__));
define("INC_PATH", dirname(PHP_PATH));
define("PROJECT_PATH", dirname(INC_PATH));
function php_path($script_path) {
	if ($script_path[0] != '/') {
		$script_path = PHP_PATH ."/". $script_path;
		return  $script_path;
	}else{
		return $script_path = PHP_PATH.$script_path;
	}		
}
?>
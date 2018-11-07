<?php 
$val = exec('node app.js', $out, $err);
$port = json_decode($val);

function is_https(){
  if(isset($_SERVER["HTTPS"]) && !empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off" || $_SERVER["SERVER_PORT"] == 443){
	 return TRUE;
  }else{
  	 return FALSE;
  }
}
     if ($port === 3000) {
     	 $schema = is_https() ? "https" : "http";
     	 $schema .= "://localhost:".$port;
     	  header("location: ".$schema."");
     }else{
     	echo "A PROBLEM OCCURRED.";
     }
 ?>
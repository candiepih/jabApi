<?php 
sleep(1);
header("Acess-Control-Allow-Origin: *");
header("Acess-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS,DELETE");
header("Acess-Control-Allow-Headers: Origin, Content-Type, X-REQUESTED-WITH, X-Auth-Token");
session_start();
include_once("db_queries.php");
 function is_ajax_request(){
 	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == "XMLHttpRequest";
 }
if (!is_ajax_request()) {
 	exit;
 }

if (!isset($_SESSION['data'])) {
	$_SESSION['data'] = array();
}
//POST REQUESTS

if (isset($_POST["get"]) && !verification::is_blank($_POST["get"])) {
  $details = json_decode($_POST["get"]);
  $email = $details[0];
  $password = md5($details[1]);
    if (verification::login_user($email, $password) != FALSE) {
       $info = verification::login_user($email, $password);
      if (!in_array($email, $_SESSION['data'])) {
        session_regenerate_id();
        $_SESSION['data']["email"] = $info["email"];
        $_SESSION['data']["username"] = $info["username"];
        $_SESSION['data']["hash"] = verification::generate_id();
      }
      $details = array("login"=>TRUE, "credentials"=>"valid");
  	  echo json_encode($details, JSON_FORCE_OBJECT);
    }else{
    	$details = array("login"=>FALSE, "credentials"=>"invalid");
    	echo json_encode($details);
    }
   
 }

 if (isset($_POST["send"]) && !verification::is_blank($_POST["send"])) {
   $data = $fetch->send_emails();
   $response = array("sent"=>"success");
   $info = json_decode($_POST["send"]);
    echo json_encode($info, JSON_FORCE_OBJECT);
 }

 //GET REQUESTS
 if (isset($_GET['logout']) && verification::is_blank($_GET['logout'])) {
    if(verification::logout_user()){
      $response = array("logoutStatus" => TRUE, "loggedin"=>FALSE);
      echo json_encode($response);
    }
 }
 
?>
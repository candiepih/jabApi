<?php 
/**
 * Script created by alex@ jabsupertips JAB TEAM
 */
class db_functions {
	protected $table_name = "adminsdata";
	public $conn;
        private $db_name = "clientsdata";
  public $alldata = array();

  function __construct(){
		$this->conn = $this->db_connection();
  }

  public function db_connection(){
  	try {
  	$conn = mysqli_connect("localhost", "root"/*AlexStevo*/, ""/*"Alex254."*/,"clientsdata");
  	   if (!$conn) {
  	 	 throw new Exception("Error Openning the connection", 1);
  	   }
  	} catch (Exception $e) {
  		die($e->getmessage());
  	}
  	return $conn;
  }

  public function close_connection(){
  	if (isset($this->conn)) {
  		mysqli_close($this->conn);
  		unset($this->connection);
  	}
  }

  public function query($sql){
  	try{
  	 $query = $this->conn->query($sql);
  	   if (!$query) {
  	 	 throw new Exception("There was a problem querring the database", 1);
  	   }
  	} catch(Exception $e){
  		 $e->getmessage();
  	}
  	return $query;
  }
  public function query_rows($value){
      return mysqli_num_rows($value);
  }
  public function fetch_rows($sql){
  	$query = $this->query($sql);
  	$rows = $query->num_rows;
  	 return $rows;
  }

  public function fetch_assoc($sql){
  	$query = $this->query($sql);
  	$results = $query->fetch_assoc();
  	 return $results;
  }

  public function user_exists($user){
  	$sql = "SELECT * FROM $this->table_name WHERE email='$user'";
  	 if ($this->fetch_rows($sql) > 0) {
  	 	return TRUE;
  	 }
  }

  public function get_user_details($email, $password){
    $sql = "SELECT * FROM $this->table_name WHERE email =\"$email\" AND password = \"$password\"";
    $results = $this->fetch_assoc($sql);
     return $results;
  }

  public function get_all_rows(){
  	$sql = "SELECT * FROM adminsdata";
    $query  = $this->query($sql);
    if (mysqli_num_rows($query) > 0) {
       while ($result = mysqli_fetch_assoc($query)) {
         array_push($this->alldata, $result);
       }
     }
  }

  public function send_emails(){
    $sql = "SELECT email FROM $this->table_name";
    $query  = $this->query($sql);
    $counter = 0;
    if (mysqli_num_rows($query) > 0) {
       while ($result = mysqli_fetch_assoc($query)) {
         $counter++;
       }
     }
    return $counter;
  }

  public function get_all_data(){
    $this->get_all_rows();
     return $this->alldata;
  }
  
  public function  tables_queries(){
      $sql = "SHOW TABLES FROM $this->db_name";
            return $this->conn->query($sql); 
  }
    
  public function num_of_tables(){
       $sql = "SHOW TABLES FROM $this->db_name";
       return $this->fetch_rows($sql); 
  }
  
  public function create_new_tables($value){
      $sql = "CREATE TABLE $value ("
              . "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,"
              . "email VARCHAR(30) NOT NULL,"
              . "phone INT(20) NOT NULL)";
      try{
          if(!$this->query($sql)){
              throw new Exception("There was a problem creaating table", 1);
          } 
      } catch (Exception $e){
          die($e->getmessage());
      }
  }
  
}
$fetch = new db_functions;
/**
 * inherit the above class
 */
class verification extends db_functions{

  public static function is_blank($value){
    return !isset($value) || trim($value) === "";
  }

  public static function login_user($email_details, $pass){
    global $fetch;
   $user = $fetch->user_exists($email_details);
     if ($user) {
       $results = $fetch->get_user_details($email_details, $pass);
         if ($results) {
            return $results;
         }else{
           return FALSE;
         }  
      }else {
           return FALSE;
      }
  }

  public static function generate_id(){
     $salt = uniqid(rand(), TRUE);
     $salt = password_hash($salt, PASSWORD_BCRYPT);
    return md5($salt);
  }

  public static function session_hash(){
    if (isset($_SESSION['hash'])) {
      return $_SESSION['hash'];
    }
  }

  public static function is_logged_in(){
    if (self::session_hash()) {
      return TRUE;
    }
  }

  public static function not_logged_in(){
     if (!self::is_logged_in()) {
       $hash = self::generate_id();
       if ($hash !== self::session_hash()) {
         return TRUE;
       }
     }  
  }

  public static function logout_user(){
    if (self::is_logged_in()) {
      session_destroy();
      unset($_SESSION["email"]);
      unset($_SESSION["username"]);
      unset($_SESSION["hash"]);
      unset($_SESSION['data']);
    }
    return TRUE;
  }
  
}

?>
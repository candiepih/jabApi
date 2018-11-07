/**
/*Script by alex@ Jab Team
**/
//defining php path files
function php_paths(url){
	if (url[0] !== "/") {
		var path = "inc/php"+"/"+url;
		return path;
	}else{
		path = "inc/php"+url;
		return path;
	}
}
//making ajax request to the server
var xhr = new XMLHttpRequest();
//fetching response
function serverResponse (button, buttonValue) {
  	   if (xhr.readyState === 4 && xhr.status === 200) {
           button.innerHTML = buttonValue;
           button.disabled = false;
  	   	   var response = JSON.parse(xhr.responseText);
           console.log(response);
           if (response.hasOwnProperty("login") && response.login === false && 
            response.hasOwnProperty("credentials") && response.credentials === "invalid") {
              errorsParagraph.innerHTML = "*Wrong Email OR PassWord Combination. Try Again";
              errorsParagraph.style.display = "block";
           }else if (response.hasOwnProperty("login") && response.login == true && 
            response.hasOwnProperty("credentials") && response.credentials == "valid") {
            button.innerHTML = "Login Successfull";
              button.disabled = true;
              overlay[0].style.transform = "translateY(100%)";
              window.history.go(0);
           }
	   }
  }

  function logoutResponse(){
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.hasOwnProperty("logoutStatus") && response.logoutStatus == true
        || response.hasOwnProperty("loggedin") && response.loggedin == false) {
          var par = closeDiv[0].children[1];
          closeDiv[0].style.display = "block";
          closeDiv[0].style.transform = "translateX(0)";
          par.innerHTML = "You Have Successfully Logged Out";
          window.history.go(0);
      }
    }
  }
//sending request
function send_Request(data, button, buttonValue){
  	xhr.open("POST", "http://localhost/myp/jab node js app/inc/php/api.php", true);
  	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhr.onreadystatechange = function (){
      serverResponse(button, buttonValue);
    }
  	xhr.send("get="+JSON.stringify(data));
  }

function sendLogoutRequest(){
  xhr.open("GET", php_paths("api.php?logout"), true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.onreadystatechange = function() {
    logoutResponse();
  }
  xhr.send();
}
//SENDING MESSAGES
function receiveResponse(button, buttonVal){
  if (xhr.readyState === 4 && xhr.status === 200) {
    var par = closeDiv[0].children[1];
    closeDiv[0].style.display = "block";
    closeDiv[0].style.transform = "translateX(0)";
    par.innerHTML = "Message Successfully Sent";
    setTimeout("contentClose()", 5000);
    button.innerHTML = buttonVal;
    button.disabled = false;
    console.log(JSON.parse(xhr.responseText));
  }
}

function server_request(postName, postValue, button, subj, greet, mailList){
  var origVal = button.innerHTML;
  var val = [];
  button.disabled = true;
  button.innerHTML = "Sending Message";
  xhr.open("POST", /*php_paths("api.php")*/ "http://www.jabsupertips.com/api/response.php", true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    xhr.setRequestHeader("Access-Control-Allow-HEADERS", "Content-type, XMLHttpRequest");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function (){
      receiveResponse(button, origVal);
    }
    val.push(subj);
    val.push(postValue);
    val.push(greet);
    if(mailList != null){
        val.push(mailList);
    }
    
    xhr.send(postName+"="+JSON.stringify(val));
}

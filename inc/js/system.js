const isValidEmail = (value) => {
   let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
   return re.test(value);
}

let errorsParagraph = document.getElementById("errors");
var overlay = document.getElementsByClassName("overlay");
var closeDiv = document.getElementsByClassName("loginstatus");
var close = closeDiv[0].getElementsByClassName("close");
var menu = document.getElementsByClassName("menu");

for (var i = 0; i < menu.length; i++) {
	menu[i].addEventListener("click", showMenuContent);
}
  close[0].addEventListener("click", contentClose);

function showMenuContent(){
	var associateContent = document.getElementById(this.children[0].className);
	if (associateContent) {
	  document.getElementsByTagName("html")[0].style.overflow = "hidden";
	  associateContent.style.display = "block";
	  associateContent.style.transform = "translateX(0%)";
	  associateContent.getElementsByTagName("span")[0].addEventListener("click", closeThisDiv);
	  var button = associateContent.getElementsByClassName("send-msg")[0];
          
	  if (button) {
	  	button.addEventListener("click", eO.sendEmail);
	  } 
	}
}
function closeThisDiv(){
	document.getElementsByTagName("html")[0].style.overflow = "visible";
	this.parentNode.style.transform = "translateX(110%)";
}

//verifying form and sending details
function sendForVerification(button) {
  let errorsParagraph = button.parentNode.getElementsByTagName("P")[0];
	var inputs = button.parentNode.getElementsByTagName("input");
	var values = [];
	var errors = [];
	for (var i = 0; i < inputs.length; i++) {
		var inputNameValue = inputs[i].value;
		values.push(inputNameValue);
	}
	if (isValidEmail(values[0]) === false) {
		errors.push("*The email is invalid");
	}
	if(values[1] === "" || values[1].length === 0){
		errors.push("*Fill All The Fields");
	}
	if(errors.length > 0){
		for(var i = 0; i < errors.length; i++){
			errorsParagraph.style.display = "block";
			errorsParagraph.innerHTML = errors[i];
		}
	}else{
		errorsParagraph.style.display = "none";
		var originalButtonValue = button.innerHTML;
		send_Request(values, button, originalButtonValue);
		button.innerHTML = "Loading... ";
		button.disabled = true;
	}
}

function logoutUser(button){
	button.innerHTML = "Logging Out... ";
	sendLogoutRequest();
}

function contentClose(){
	var parent = closeDiv[0];
	parent.style.transform = "translateX(-110%)";
}
//timeout for the close div
setTimeout("contentClose()", 5000);

function is_blank(value){
   var info = value === "" || value.length === 0 || value == 0;
    return info;
}

//class literal
class emailObj {
    constructor(val){
        if(val != null){
          this.subject = val.parentNode.getElementsByTagName("input")[0].value;
          this.greetings = val.parentNode.getElementsByTagName("input")[1].value;
          this.message = val.parentNode.getElementsByTagName("textarea")[0].value;
        }
        this.selctBox = document.querySelector("#mailList-select");
        this.email = document.querySelector("#sendContent3Email");
    }
    
    sendEmail(){
       let eO = new emailObj(this);
       if (!is_blank(eO.subject) && !is_blank(eO.greetings) && !is_blank(eO.message)) {
 	  server_request("send", eO.message, this, eO.subject, eO.greetings);
       }else {
   	  errorsParagraph.style.display = "block";
   	  errorsParagraph.innerHTML = "Fill all the Fields";
        }
     }
    
    sendContent2Email(but){
        let eO = new emailObj(but);
         if (!is_blank(eO.subject) && !is_blank(eO.greetings) && !is_blank(eO.message) && !is_blank(eO.selctBox)) {
            but.parentNode.querySelector("#errors").style.display = "none";
            let option  = eO.selctBox.options[eO.selctBox.selectedIndex].value;
            console.log("Zote ziko fty");
            server_request("send", eO.message, but, eO.subject, eO.greetings, option);
         }else {
   	    but.parentNode.querySelector("#errors").style.display = "block";
   	    but.parentNode.querySelector("#errors").innerHTML = "All Blanks Must Be filled";
         }
    }
    
    sendContent3Email(but){
        let eO = new emailObj(but);
        
        if (!is_blank(eO.subject) && !is_blank(eO.greetings) && !is_blank(eO.message) && !is_blank(eO.email.value) && isValidEmail(eO.email.value)) {
            but.parentNode.querySelector("#errors").style.display = "none";
            server_request("send", eO.message, but, eO.subject, eO.greetings, eO.email.value);
         }else {
             but.parentNode.querySelector("#errors").style.display = "block";
            if(!is_blank(eO.email.value) && !isValidEmail(eO.email.value)){
                but.parentNode.querySelector("#errors").innerHTML = "Email address used is invalid"; 
             }else{
                but.parentNode.querySelector("#errors").innerHTML = "Make sure all fields are filled"; 
             }
             
         }
    }
    
    buildList(but){
      let list = but.parentNode.querySelector("input[type=text]").value;
      let error = but.parentNode.querySelector("#errors");
      if(!is_blank(list)){
          but.parentNode.querySelector("#errors").style.display = "none";
          server_request("send", list, but, null, null, null);
      }else{         
          but.parentNode.querySelector("#errors").style.display = "block";
          but.parentNode.querySelector("#errors").innerHTML = "Enter Mail List Name"; 
      }
    }
    
}



var eO = new emailObj;
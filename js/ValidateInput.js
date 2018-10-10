// Validate empty fields
function ValidateInput(ID, value){
	if(value == ""){
		document.getElementById(ID+"Error").innerHTML = "This field is required.";
	}
	else{
		document.getElementById(ID+"Error").innerHTML = "";
	}
}

// Valdate non-empty fields in Checkout1.html and pass data to PHP
function UploadCheckout1(){
    var params = $("#checkout1Form").serialize();
    $.ajax({
        type: "GET",
        url: "php/checkout1_Validation.php",
        asyc: true,
        data: params,
        error: function (jqXHR,textStatus,errorThrown) {
            // Display reasons if faild to connect
            alert(jqXHR.responseText);
            alert(jqXHR.status);
            alert(jqXHR.readyState);
            alert(jqXHR.statusText);
            alert(textStatus);
            alert(errorThrown);
        },
        success: function (ErrorInfo) {
            // If there is no error (so far the minimal length is 2)
            if (ErrorInfo.length - 2 == 0){
                window.location.href = "checkout2.php";
			}
            // If errors are detected
            else {
                // define what kind of error(s) are detected
                if (ErrorInfo.indexOf("firstnameError") != -1)
                    document.getElementById("firstnameError").innerHTML = "Invalid name. Please input characters.";
                if (ErrorInfo.indexOf("lastnameError") != -1)
                    document.getElementById("lastnameError").innerHTML = "Invalid name. Please input characters.";
                if (ErrorInfo.indexOf("addressError") != -1)
                    document.getElementById("addressError").innerHTML = "Invalid address. Please input valid address.";
                if (ErrorInfo.indexOf("companyError") != -1)
                    document.getElementById("companyError").innerHTML = "Invalid company name. Please input valid company name.";
                if (ErrorInfo.indexOf("cityError") != -1)
                    document.getElementById("cityError").innerHTML = "Please input valid city.";
                if (ErrorInfo.indexOf("postcodeError") != -1)
                    document.getElementById("postcodeError").innerHTML = "Please input AU postcode.";
                if (ErrorInfo.indexOf("emailError") != -1)
                    document.getElementById("emailError").innerHTML = "Please input invalid email address.";
                if (ErrorInfo.indexOf("telephoneError") != -1)
                    document.getElementById("telephoneError").innerHTML = "Please input valid AU telephone number.";
            }
        }
    });
}

// Valdate non-empty fields in Checkout2.html and pass data to PHP
function UploadCheckout2(){
    var params = $("#checkout2Form").serialize();
    $.ajax({
        type: "GET",
        url: "php/checkout2_Validation.php",
        asyc: true,
        data: params,
        error: function (jqXHR,textStatus,errorThrown) {
            // Display reasons if faild to connect
            alert(jqXHR.responseText);
            alert(jqXHR.status);
            alert(jqXHR.readyState);
            alert(jqXHR.statusText);
            alert(textStatus);
            alert(errorThrown);
        },
        success: function (ErrorInfo) {
            // If there is no error (so far the minimal length is 2)
            if (ErrorInfo.length - 2 == 0){
                window.location.href = "checkout3.php";
			}
            // If errors are detected
            else {
                // define what kind of error(s) are detected
                if (ErrorInfo.indexOf("cardnameError") != -1)
                    document.getElementById("cardnameError").innerHTML = "Invalid card name. Please input characters.";
                if (ErrorInfo.indexOf("cardnumberError") != -1)
                    document.getElementById("cardnumberError").innerHTML = "Invalid card number. Please input 16 digits.";
                if (ErrorInfo.indexOf("expirymonthError") != -1)
                    document.getElementById("expirymonthError").innerHTML = "Invalid month. Please input valid month.";
                if (ErrorInfo.indexOf("expiryyearError") != -1)
                    document.getElementById("expiryyearError").innerHTML = "Invalid year. Please input the actual year.";
                if (ErrorInfo.indexOf("cvvError") != -1)
                    document.getElementById("cvvError").innerHTML = "Invalid cvv. Please input 3 digits";
           }
        }
    });
}

// Valdate register format and pass account info to php for register
function Register(){
    var params = $("#registerForm").serialize();
    $.ajax({
        type: "GET",
        url: "php/registerInfo.php",
        asyc: true,
        data: params,
        error: function (jqXHR,textStatus,errorThrown) {
            // Display reasons if faild to connect
            alert(jqXHR.responseText);
            alert(jqXHR.status);
            alert(jqXHR.readyState);
            alert(jqXHR.statusText);
            alert(textStatus);
            alert(errorThrown);
        },
        success: function (Error) {
            // If there is no error 
            if (Error.length == 0){
                window.location.href = "index.html";
			}
            // If errors are detected
            else {
                // define what kind of error(s) are detected
                if (Error.indexOf("registerNameError") != -1)
                    document.getElementById("registerNameError").innerHTML = "Invalid user name. Please input characters.";
                if (Error.indexOf("registerEmailError") != -1)
                    document.getElementById("registerEmailError").innerHTML = "Invalid email. Please type a valid email format.";
                if (Error.indexOf("registerPasswordError") != -1)
                    document.getElementById("registerPasswordError").innerHTML = "Invalid password. Please input 6 characters.";
				if (Error.indexOf("duplicateError") != -1)
					alert("Another user has registerd the same user name or email address. Please type a different one.");
		   }
        }
    });
}

// Validate login info and confirm login
function Login(){
	var params = $("#loginForm").serialize();
    $.ajax({
        type: "GET",
        url: "php/login.php",
        asyc: true,
        data: params,
        error: function (jqXHR,textStatus,errorThrown) {
            // Display reasons if faild to connect
            alert(jqXHR.responseText);
            alert(jqXHR.status);
            alert(jqXHR.readyState);
            alert(jqXHR.statusText);
            alert(textStatus);
            alert(errorThrown);
        },
        success: function (Error) {
            // If there is no error 
            if (Error.length == 0){
                window.location.href = "index.html";
			}
            // If errors are detected
            else {
				if (Error.indexOf("Invalid") != -1)
					alert("User email/password is incorrect/empty. Please check your input.");
		   }
        }
    });
}

// Check whether user has login. (Used by each page's navigation bar)
function CheckLogin(obj){
	if(document.getElementById("hasLogin")){
		if(obj.id != "register.html")
			window.location.href = obj.id;
		else
			alert("You have logged-in, please logout before choosing to register.");
	}
	else{
		if(obj.id == "register.html")
			window.location.href = obj.id;
		else
			alert("No user detected. Please login first.");
	}
}

// Change the password
function ChangePassword(){
	var params = $("#changePasswordForm").serialize();
    $.ajax({
        type: "GET",
        url: "php/changePassword.php",
        asyc: true,
        data: params,
        error: function (jqXHR,textStatus,errorThrown) {
            // Display reasons if faild to connect
            alert(jqXHR.responseText);
            alert(jqXHR.status);
            alert(jqXHR.readyState);
            alert(jqXHR.statusText);
            alert(textStatus);
            alert(errorThrown);
        },
        success: function (Error) {
            // If there is no error 
            if (Error.length == 0){
                alert("Password change successful.");
				window.location.href = "customer-orders.php";
			}
            // If errors are detected
            else {
				if (Error.indexOf("samepassword") != -1)
					alert("Your old password and new password are the same. Please check your input.");
				if (Error.indexOf("differentpassword") != -1)
					alert("Your new password and confirm password are different. Please check your input.");
				if (Error.indexOf("differentold") != -1)
					alert("Your old password is incorrect. Please check your input.");
				if (Error.indexOf("format") != -1)
					alert("Your password format incorrect. Please input 6 characters and(or) numbers.");

		   }
        }
    });	
}

// Change personal details
function ChangeDetail(){
	var params = $("#PersonalDetailForm").serialize();
    $.ajax({
        type: "GET",
        url: "php/changeDetail.php",
        asyc: true,
        data: params,
        error: function (jqXHR,textStatus,errorThrown) {
            // Display reasons if faild to connect
            alert(jqXHR.responseText);
            alert(jqXHR.status);
            alert(jqXHR.readyState);
            alert(jqXHR.statusText);
            alert(textStatus);
            alert(errorThrown);
        },
        success: function (ErrorInfo) {
            // If there is no error 
            if (ErrorInfo.length == 0){
                alert("Personal detail change successful.");				
                window.location.href = "customer-orders.php";
			}
            // If errors are detected
            else {
                // define what kind of error(s) are detected
                if (ErrorInfo.indexOf("firstnameError") != -1)
                    document.getElementById("firstnameError").innerHTML = "Invalid name. Please input characters.";
                if (ErrorInfo.indexOf("lastnameError") != -1)
                    document.getElementById("lastnameError").innerHTML = "Invalid name. Please input characters.";
                if (ErrorInfo.indexOf("addressError") != -1)
                    document.getElementById("addressError").innerHTML = "Invalid address. Please input valid address.";
                if (ErrorInfo.indexOf("companyError") != -1)
                    document.getElementById("companyError").innerHTML = "Invalid company name. Please input valid company name.";
                if (ErrorInfo.indexOf("cityError") != -1)
                    document.getElementById("cityError").innerHTML = "Please input valid city.";
                if (ErrorInfo.indexOf("postcodeError") != -1)
                    document.getElementById("postcodeError").innerHTML = "Please input AU postcode.";
                if (ErrorInfo.indexOf("emailError") != -1)
                    document.getElementById("emailError").innerHTML = "Please input invalid email address.";
                if (ErrorInfo.indexOf("telephoneError") != -1)
                    document.getElementById("telephoneError").innerHTML = "Please input valid AU telephone number.";
            }
        }
    });	
}

// Upload contact info for captcha validation
function UploadContact(){
	var params = $("#contactForm").serialize();
    $.ajax({
        type: "GET",
        url: "php/contactValidation.php",
        asyc: true,
        data: params,
        error: function (jqXHR,textStatus,errorThrown) {
            // Display reasons if faild to connect
            alert(jqXHR.responseText);
            alert(jqXHR.status);
            alert(jqXHR.readyState);
            alert(jqXHR.statusText);
            alert(textStatus);
            alert(errorThrown);
        },
        success: function (ErrorInfo) {
            // If there is no error (so far the minimal length is 2)
            if (ErrorInfo.length == 0){
                alert("Contact form submitted.");
				window.location.href = "contact.html";
			}
            // If errors are detected
            else {
                // define what kind of error(s) are detected
                if (ErrorInfo.indexOf("firstnameError") != -1)
                    document.getElementById("firstnameError").innerHTML = "Invalid name. Please input characters.";
                if (ErrorInfo.indexOf("lastnameError") != -1)
                    document.getElementById("lastnameError").innerHTML = "Invalid name. Please input characters.";
                if (ErrorInfo.indexOf("emailError") != -1)
                    document.getElementById("emailError").innerHTML = "Please input invalid email address.";
				
				if (ErrorInfo.indexOf("subjectError") != -1)
                    document.getElementById("subjectError").innerHTML = "Invalid subject. Please input your subject.";
				if (ErrorInfo.indexOf("messageError") != -1)
                    document.getElementById("messageError").innerHTML = "Please input your comment.";				

                if (ErrorInfo.indexOf("captchaError") != -1)
					alert("The captcha is incorrect, please type again.");

            }
        }
    });
}
<?php /* This page is designed to validate contact form */
	require_once("checkoutInfoData.php");
    // Set validation symbol
    global $isValid;
    $isValid = true;
	session_start();

	// Validate firstname
	if(preg_match("/^[ a-zA-Z]+$/",$_GET["firstname"],$matches))
		$firstName=test_input($matches[0]);
	else{
		$isValid = false;
		echo "firstnameError";
	}

	// Validate lastName
	if(preg_match("/^[ a-zA-Z]+$/",$_GET["lastname"],$matches))
		$lastName=test_input($matches[0]);
	else{
		$isValid = false;
		echo "lastnameError";
	}
	
	// Validate email
	if(preg_match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,}$/",$_GET["email"],$matches))
		$email=test_input($matches[0]);
	else{
		$isValid = false;
		echo "emailError";
	}
	
	// Validate subject
	if(preg_match("/^[a-zA-Z]+$/",$_GET["subject"],$matches))
		$subject=test_input($matches[0]);
	else{
		$isValid = false;
		echo "subjectError";
	}
	
	// Validate messages
	if($_GET["message"] != "")		
		$subject=test_input($_GET["message"]);
	else{
		$isValid = false;
		echo "messageError";		
	}

	
	// Validate captcha code
	if($_GET["captcha"] != $_SESSION["answer"]){
		$isValid = false;
		echo "captchaError";
	}


?>
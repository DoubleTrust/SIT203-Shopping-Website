<?php /* This php is designed for validating login info */
	require_once("global-connect.inc.php");
	require_once("checkoutInfoData.php");
	session_start();
	global $salt;
	$salt = "yanwe";
	
	// Get user's input
	$email = $_GET["loginEmail"];
	$password = $_GET["loginPassword"];
	
	// Encrypt password using md5 for validation
	$encryptPassword = md5($salt.$password);
	
	// Find user's info
	$Validate = "SELECT * FROM UserInfo WHERE Email = '".$email."' AND Password = '".$encryptPassword."'";
	$stmt1 = oci_parse($db, $Validate);
	if(!$stmt1)  {
		echo "An error occurred in parsing the sql string.\n"; 
		exit; 
	}
	oci_execute($stmt1);
	
	// if user does not exist or typed wrong info
	if(oci_fetch_array($stmt1) == false){
		echo "Invalid";
	}
	else{
		$id = oci_result($stmt1,"USERID");
	}
	// Set a mark to detect whether the user is logged in
	$_SESSION['ID']=$id;
	
	// Close the connection
	oci_close($db); 	
?>
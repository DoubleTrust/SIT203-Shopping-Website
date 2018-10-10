<?php /*This page is designed to change user's password */
	require_once("global-connect.inc.php");
	require_once("checkoutInfoData.php");
	require_once("functions.inc.php");
	session_start();
	global $oldPassword, $newPassword, $confirmPassword, $salt;
	$salt = "yanwe";
	$isValid = true;

	// Find user info
	$Search = "SELECT * FROM UserInfo WHERE UserID = ".$_SESSION['ID'];
	$stmt=oci_parse($db, $Search);
	if(!$stmt)  {
		echo "An error occurred in parsing the sql string.\n"; 
		exit; 
	}
	oci_execute($stmt);

	while(oci_fetch_array($stmt)) {
		$password = oci_result($stmt,"PASSWORD");
	}

	// Validate user's type about old password
	if(preg_match("/^[0-9a-zA-Z]+$/",$_GET["password_old"],$matches))
	{
		$oldPassword=test_input($matches[0]);
		$encryptOldPassword = md5($salt.$oldPassword);
	}
	else{
		$isValid = false;
		echo "format";
	}

	// Validate user's type about old password
	if(preg_match("/^[0-9a-zA-Z]+$/",$_GET["password_1"],$matches))
	{
		$newPassword=test_input($matches[0]);
		$encryptPassword = md5($salt.$newPassword);
	}

	else{
		$isValid = false;
		echo "format";
	}

	// Validate user's type about old password
	if(preg_match("/^[0-9a-zA-Z]+$/",$_GET["password_2"],$matches))
		$confirmPassword=test_input($matches[0]);
	else{
		$isValid = false;
		echo "format";
	}

	// if new password and confirm password are not the same
	if($newPassword != $confirmPassword){
		$isValid = false;
		echo "differentpassword";
	}
	
	// if old password is different from user's input
	if($password != $encryptOldPassword){
		$isValid = false;
		echo "differentold";
	}

	// if old password is the same as new password 
	if($newPassword == $oldPassword){
		$isValid = false;
		echo "samepassword";
	}

	// update password info 
	if($isValid){		
		$UpdateData=" UPDATE UserInfo SET Password = '$encryptPassword' WHERE UserID = ".$_SESSION['ID'];
		$stmt=oci_parse($db, $UpdateData);
		if(!$stmt)  {
			echo "An error occurred in parsing the sql string.\n"; 
			exit; 
		}
		oci_execute($stmt);		
	}

	oci_close($db);
?>
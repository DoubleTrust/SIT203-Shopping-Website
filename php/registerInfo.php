<?php /* This php is designed to validate data from register page and store it to database */
	require_once("global-connect.inc.php");
	require_once("checkoutInfoData.php");
	require_once("functions.inc.php");
	session_start();
	global $isValid, $registerName, $registerEmail, $registerPassword, $salt;
	$salt = "yanwe";
    $isValid = true;
	
	
	// Validate name(ID)
    if(preg_match("/^[ a-zA-Z]+$/",$_GET["registerName"],$matches))
        $registerName=test_input($matches[0]);
    else{
        $isValid = false;
        echo "registerNameError";
    }
	
	// Validate email
	if(preg_match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,}$/",$_GET["registerEmail"],$matches))
		$registerEmail=test_input($matches[0]);
	else{
		$isValid = false;
		echo "registerEmailError";
	}
	
	// Validate password
	if(preg_match("/^[0-9a-zA-Z]{6}$/",$_GET["registerPassword"],$matches))
		$registerPassword=test_input($matches[0]);
	else{
		$isValid = false;
		echo "registerPasswordError";
	}
	
	// Store all data if there is no duplicated data
	if($isValid){
		$Search = "SELECT * FROM UserInfo";
		$stmt1=oci_parse($db, $Search);
		if(!$stmt1)  {
			echo "An error occurred in parsing the sql string.\n"; 
			exit; 
		}
		oci_execute($stmt1);
		
		while(oci_fetch_array($stmt1)) {
			$username = oci_result($stmt1,"USERNAME");
			$email = oci_result($stmt1,"EMAIL");
			if($username == $_GET["registerName"] || $email == $_GET["registerEmail"]){
				echo "duplicateError";
				exit();
			}
		}
		
		// Create an ID for new registered user and insert data
		$userID=createID(6);
		// Encrypt password using md5 for register
		$encryptPassword = md5($salt.$registerPassword);
		
		$AddData = "INSERT INTO UserInfo(UserID, Username, password, Email) VALUES ($userID, '$registerName', '$encryptPassword', '$registerEmail')";	
		$stmt2=oci_parse($db, $AddData);
		if(!$stmt2)  {
			echo "An error occurred in parsing the sql string.\n"; 
			exit; 
		}
		oci_execute($stmt2);
		// Set a mark to detect whether the user is logged in
		$_SESSION['ID']=$userID;
	}
	
	// Close the connection
	oci_close($db); 
?>
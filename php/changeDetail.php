<?php /* This php page is designed to change personal details from customer-order.php*/
	require_once("global-connect.inc.php");
	require_once("checkoutInfoData.php");
	require_once("functions.inc.php");
	
	// Set validation symbol
    global $isValid;
    $isValid = true;
	session_start();
	
    // Validate non-empty fields
	// Validate firstname
	if(preg_match("/^[ a-zA-Z]+$/",$_GET["firstname"],$matches))
		$firstname=test_input($matches[0]);
	else{
		//echo "Invalid firstname, please input characters.";
		//array_push($Errors, "firstnameError");
		$isValid = false;
		echo "firstnameError";
	}

	// Validate lastName
	if(preg_match("/^[ a-zA-Z]+$/",$_GET["lastname"],$matches))
		$lastname=test_input($matches[0]);
	else{
		//echo "Invalid firstname, please input characters.";
		//echo "<br/>";
		//array_push($Errors, "lastnameError");
		$isValid = false;
		echo "lastnameError";
	}

	// Validate address
	if(preg_match("/^[ 0-9A-Za-z]+$/",$_GET["address"],$matches))
		$address=test_input($matches[0]);
	else{
		//echo "Invalid address, please input valid address.";
		//array_push($Errors, "addressError");
		$isValid = false;
		echo "addressError";
	}

	// Validate company
	if(preg_match("/^[ a-zA-Z]+$/",$_GET["company"],$matches))
		$company=test_input($matches[0]);
	else{
		//echo "Invalid company name, please input again.";
		//array_push($Errors, "companyError");
		$isValid = false;
		echo "companyError";
	}

	// Validate city
	if(preg_match("/^[ a-zA-Z]+$/",$_GET["city"],$matches))
		$city=test_input($matches[0]);
	else{
		//echo "Invalid city name, please input again.";
		//array_push($Errors, "cityError");
		$isValid = false;
		echo "cityError";
	}

	// Validate postcode
	if(preg_match("/^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/",$_GET["postcode"],$matches))
		$postcode=test_input($matches[0]);
	else{
		//echo "Invalid postcode, please input again.";
		//array_push($Errors, "postcodeError");
		$isValid = false;
		echo "postcodeError";
	}

	// Validate email
	if(preg_match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,}$/",$_GET["email"],$matches))
		$email=test_input($matches[0]);
	else{
		//echo "Invalid email, please input again.";
		//array_push($Errors, "emailError");
		$isValid = false;
		echo "emailError";
	}

	// Validate telephone
	if(preg_match("/^\({0,1}((0|61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/",$_GET["telephone"],$matches))
		$telephone=test_input($matches[0]);
	else{
		//echo "Invalid telephone, please input characters.";
		//array_push($Errors, "telephoneError");
		$isValid = false;
		echo "telephoneError";
	}
	// Get the state and country
	$state=test_input($_GET["state"]);
	$country=test_input($_GET["country"]);	
	
	// If all inputs are valid
	if($isValid) {
        // Store user input to database
		$UpdateData=" UPDATE UserInfo SET Firstname = '$firstname', Lastname = '$lastname', Address = '$address', Company = '$company', City = '$city', State = '$state', Postcode = '$postcode', Country = '$country', Telephone = '$telephone' WHERE UserID = ".$_SESSION['ID'];
		$stmt = oci_parse($db, $UpdateData);
		if(!$stmt){
			echo "An error occurred in parsing the sql string.\n"; 
			exit; 
		}
		oci_execute($stmt); 
		
		
    }
?>
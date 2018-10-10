<?php /* This page is for validatinga and saving data in checkout1.php */
	require_once("checkoutInfoData.php");
    // Set validation symbol
    global $isValid;
    $isValid = true;
	session_start();
	
    // Validate non-empty fields
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

        // Validate address
        if(preg_match("/^[ 0-9A-Za-z]+$/",$_GET["address"],$matches))
            $address=test_input($matches[0]);
        else{
            $isValid = false;
			echo "addressError";
        }

        // Validate company
        if(preg_match("/^[ a-zA-Z]+$/",$_GET["company"],$matches))
            $company=test_input($matches[0]);
        else{
            $isValid = false;
			echo "companyError";
        }

        // Validate city
        if(preg_match("/^[ a-zA-Z]+$/",$_GET["city"],$matches))
            $city=test_input($matches[0]);
        else{
            $isValid = false;
			echo "cityError";
        }

        // Validate postcode
        if(preg_match("/^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/",$_GET["postcode"],$matches))
            $postcode=test_input($matches[0]);
        else{
            $isValid = false;
			echo "postcodeError";
        }

        // Validate email
        if(preg_match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,}$/",$_GET["email"],$matches))
            $email=test_input($matches[0]);
        else{
            $isValid = false;
			echo "emailError";
        }

        // Validate telephone
        if(preg_match("/^\({0,1}((0|61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/",$_GET["telephone"],$matches))
            $telephone=test_input($matches[0]);
        else{
            $isValid = false;
			echo "telephoneError";
        }
        // Get the state and country
        $state=test_input($_GET["state"]);
        $country=test_input($_GET["country"]);

    // If all inputs are valid
    if($isValid) {
        // Store user input
        $checkoutinfo = new checkoutInfodata();
        $checkoutinfo->setCheckout1Info($firstName, $lastName, $address, $company, $city, $postcode, $state, $country, $email, $telephone);
        $_SESSION["checkoutinfo"] = $checkoutinfo;
    }
?>


<?php /* This page is for validating and saving data in checkout2.php */
	include_once "checkoutInfoData.php";
    global $isValid;
    $isValid = true;

    // Validate cardName
    if(preg_match("/^[ a-zA-Z]+$/",$_GET["cardname"],$matches))
        $cardName=test_input($matches[0]);
    else{
        $isValid = false;
        echo "cardnameError";
    }

    // Validate cardNumber
    if(preg_match("/^[0-9]{16}$/",$_GET["cardnumber"],$matches))
        $cardNumber=test_input($matches[0]);
    else{
        $isValid = false;
        echo "cardnumberError";
    }

    // Validate expirymonth
    if(preg_match("/^(0[1-9]|1[0-2])$/",$_GET["expirymonth"],$matches))
        $expiryMonth=test_input($matches[0]);
    else{
        $isValid = false;
        echo "expirymonthError";
    }

    // Validate expiryyear
    if(preg_match("/^[0-9]{4}$/",$_GET["expiryyear"],$matches))
        $expiryYear=test_input($matches[0]);
    else{
        $isValid = false;
        echo "expiryyearError";
    }

    // Validate cvv
    if(preg_match("/^[0-9]{3}$/",$_GET["cvv"],$matches))
        $cvv=test_input($matches[0]);
    else{
        $isValid = false;
        echo "cvvError";
    }

    // If all inputs are valid
    if($isValid) {
        session_start();
        // Store the input
        $_SESSION["checkoutinfo"]->setCheckout2Info($cardName, $cardNumber, $expiryMonth, $expiryYear, $cvv);
	}

?>


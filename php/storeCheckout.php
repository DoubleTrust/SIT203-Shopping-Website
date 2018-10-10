<?php /* This php page is designed to store data, called by checkout3.php */
	require_once("global-connect.inc.php");
	require_once("checkoutInfoData.php");
	require_once("functions.inc.php");

	session_start();
	global $salt;
	$salt = "yanwe";

	// Acquire data stored in class
	$firstname=$_SESSION['checkoutinfo']->firstName;
	$lastname=$_SESSION['checkoutinfo']->lastName;
	$address=$_SESSION['checkoutinfo']->address;
	$company=$_SESSION['checkoutinfo']->company;
	$city=$_SESSION['checkoutinfo']->city;
	$postcode=$_SESSION['checkoutinfo']->postcode;
	$state=$_SESSION['checkoutinfo']->state;
	$country=$_SESSION['checkoutinfo']->country;
	$email=$_SESSION['checkoutinfo']->email;
	$telephone=$_SESSION['checkoutinfo']->telephone;
	$cardname=$_SESSION['checkoutinfo']->cardName;
	$cardnumber=$_SESSION['checkoutinfo']->cardNumber;
	$expirymonth=$_SESSION['checkoutinfo']->expiryMonth;
	$expiryyear=$_SESSION['checkoutinfo']->expiryYear;
	$cvv=$_SESSION['checkoutinfo']->cvv;

	/* Store info if no user has logged in */
	if(!isset($_SESSION['ID'])){
		/* Store user info */
		$userID=createID(6);
		
		// Create new password and encrypt it
		$password=createPassword(6);	
		$encryptPassword = md5($salt.$password);
		
		$AddData="INSERT INTO UserInfo (UserID, Password, Firstname, Lastname, Address, Company, City, State, Postcode, Country, Email, Telephone, Cardname, Cardnumber, Expirymonth, Expiryyear, Cvv) VALUES ($userID, '$encryptPassword', '$firstname', '$lastname', '$address', '$company', '$city', '$state', '$postcode', '$country', '$email', '$telephone', '$cardname', $cardnumber, $expirymonth, $expiryyear, $cvv)";
		$stmt=oci_parse($db, $AddData);
		if(!$stmt)  {
			echo "An error occurred in parsing the sql string.\n"; 
			exit; 
		}
		oci_execute($stmt);
		// Set a mark to detect whether the user is logged in
		$_SESSION['ID'] = $userID;
		// Set a mark to display login email to the new user
		$_SESSION['email'] = $email;
		// Set a mark to detect whether this account is registered after making an order
		$_SESSION['TEMPpassword'] = $password;
		
	}
	/* Store other info if user has logged in */
	else{
		$UpdateData=" UPDATE UserInfo SET Firstname = '$firstname', Lastname = '$lastname', Address = '$address', Company = '$company', City = '$city', State = '$state', Postcode = '$postcode', Country = '$country', Telephone = '$telephone', Cardname = '$cardname', Cardnumber = '$cardnumber', Expirymonth = '$expirymonth', Expiryyear = '$expiryyear', Cvv = '$cvv' WHERE UserID = ".$_SESSION['ID'];
		$stmt=oci_parse($db, $UpdateData);
		if(!$stmt)  {
			echo "An error occurred in parsing the sql string.\n"; 
			exit; 
		}
		oci_execute($stmt);
		$userID = $_SESSION['ID'];
	}

	/* Store order list and order detail */
	$total = $_SESSION['subtotal'];
	$date = date("d/m/Y");
	$cart = $_SESSION['cart'];

	$sql="select max(OrderID) from Orders";
	$stmt = oci_parse($db, $sql); 

	if(!$stmt){
		echo "An error occurred in parsing the sql string.\n"; 
		exit; 
	}
	oci_execute($stmt);

	if (oci_fetch_array($stmt))  {
		$Ordercount = oci_result($stmt,1); 
		// Add a new id
		$Ordercount++; 
		$_SESSION['OrderID']=$Ordercount;
	} 
	else {
		echo "An error occurred in retrieving order id.\n"; 
		exit; 
	}

	$addOrder="INSERT INTO Orders (OrderID, PurchaseDate, Total, UserID) VALUES ( $Ordercount, '$date', '$total', $userID)";
	$addDetail="INSERT INTO OrderDetail (DetailID, Total, CartData, PurchaseDate, User_ID, Firstname, Lastname, Address, Company, City, State, Postcode, Country) VALUES ( $Ordercount, '$total', '$cart', '$date', $userID, '$firstname', '$lastname', '$address', '$company', '$city', '$state', '$postcode', '$country')";
	$stmt1=oci_parse($db, $addOrder);
	$stmt2=oci_parse($db, $addDetail);

	if(!$stmt1 || !$stmt2)  {
		echo "An error occurred in parsing the sql string.\n"; 
		exit; 
	}
	oci_execute($stmt1);
	oci_execute($stmt2);

	oci_close($db);
	
	header("Location:../checkout4.html");
?>
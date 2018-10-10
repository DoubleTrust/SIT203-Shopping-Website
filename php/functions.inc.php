<?php /* This page is designed to pre-define functions for calling */
	require_once("global-connect.inc.php");

	// pass the amount of products in shopping cart to other pages
	$action = $_GET['action'];
	if($action == "showAmount"){
		session_start();
		// Check the amount of shopping cart
		if(isset($_SESSION['Count'])){
			echo "document.getElementById('itemAmount').innerHTML =' ".$_SESSION['Count']." item(s) in cart';";
		}
		else
			echo "document.getElementById('itemAmount').innerHTML ='0 item in cart';";
		
		// Check whether user has logged in
		if(isset($_SESSION['ID'])){ 
			// Find registered name based on ID
			global $username;
			$Search = "SELECT * FROM UserInfo WHERE UserID = ".$_SESSION['ID'];
			$stmt = oci_parse($db, $Search);
			if(!$stmt)  {
				echo "An error occurred in parsing the sql string.\n"; 
				exit; 
			}
			oci_execute($stmt);
			while(oci_fetch_array($stmt)){
				$username = oci_result($stmt,"USERNAME");
			}
			// Create an username and store it automatically if user is not registerd on his own
			if(empty($username)){
				$username = createPassword(6);
				$UpdateData =  "UPDATE UserInfo SET Username = '".$username."' WHERE UserID = ".$_SESSION['ID'];
				$stmt=oci_parse($db, $UpdateData);
				if(!$stmt)  {
					echo "An error occurred in parsing the sql string.\n"; 
					exit; 
				}
				oci_execute($stmt);
			}
			// Set a mark to display account name to the new user
			$_SESSION['username'] = $username;
			// Close the connection
			oci_close($db); 
			echo "
				var menu = document.getElementsByClassName('menu');
				while(menu[0].hasChildNodes())
					menu[0].removeChild(menu[0].firstChild);
				
				var contact = document.createElement('a');
				var contact_txt = document.createTextNode('Contact');
				var contact_li = document.createElement('li');
				contact.setAttribute('href', 'contact.html');
				contact.appendChild(contact_txt);
				contact_li.appendChild(contact);
				
				var user = document.createElement('a');
				var user_txt = document.createTextNode('".$username."');
				var user_li = document.createElement('li');
				user.setAttribute('href', 'customer-orders.php');
				user.setAttribute('id', 'hasLogin');
				user.appendChild(user_txt);
				user_li.appendChild(user);
				
				menu[0].appendChild(user_li);
				menu[0].appendChild(contact_li);
				";		
		}
	}

	// jump to order detail page (customer-order.php)
	if($action == "jumpToResponse"){
		session_start();
		$url = "customer-order.php?&id=".$_SESSION['OrderID'];
		echo "
			document.getElementById('customerOrder').setAttribute('href','".$url."');
		";
		echo $_SESSION['OrderID'];
	}

	// Check whether this account is registered after making an order 
	if($action == "showTempInfo"){	
		session_start();
		if(isset($_SESSION['TEMPpassword'])){
			echo "
				document.getElementById('temp').innerHTML = 'Note: this message will present one time for new users.<br />Your account name is :".$_SESSION['username']." <br />Your login Email is: ".$_SESSION['email']."<br />Your temporary password is: ".$_SESSION['TEMPpassword']."';
			";	
			unset($_SESSION['TEMPpassword']);		
		}
	}

	if($action == "logout"){
		logout();
	}


	// Show the detail info in shopping cart
	function showCart() {
		global $db;
		$cart = $_SESSION['cart'];
		if ($cart) {
			$items = explode(',',$cart);
			$contents = array();
			foreach ($items as $item) {
				$contents[$item] = (isset($contents[$item])) ? $contents[$item] + 1 : 1;
			}
			$output[] = '<tbody>';
			foreach ($contents as $id=>$qty) {
				//echo "ID is:".$id." ";
				//echo "qty is:".$qty." <br />";
				
				$sql = 'SELECT * FROM products WHERE id = '.$id;
				
				// modified by Wentao Yan			
				$stmt = oci_parse($db, $sql); 
	  
				if(!$stmt)  {
					echo "An error occurred in parsing the sql string.\n"; 
					exit; 
				  }
				oci_execute($stmt); 

				while(oci_fetch_array($stmt)) {

					$image= oci_result($stmt,"IMAGE");
					$name = oci_result($stmt,"NAME");
					$price = oci_result($stmt,"PRICE");
					$discount = 0;
					$id = oci_result($stmt,"ID");	

					$detail = oci_result($stmt,"DETAIL");
					$description = oci_result($stmt,"DESCRIPTION");
					$material = oci_result($stmt,"MATERIAL");
					$care = oci_result($stmt,"CARE");
				}
				$brand=array(5,6,3,4,3);
				$Category=array(16,4,"highlight");
				$url = "product.xml?brand=".$brand[0]."&brand=".$brand[1]."&brand=".$brand[2]."&brand=".$brand[3]."&brand=".$brand[4]."&Category=".$Category[0]."&Category=".$Category[1]."&Category=".$Category[2]
						."&name=".$name."&detail=".$detail."&description=".$description."&picture=".$image."&price=".$price."&material=".$material."&care=".$care."&id=".$id;
				$output[] = '<tr>';
				$output[] = '<td><a href="'.$url.'"><img src="'.$image.'" alt="'.$name.'"></a></td>';
				$output[] = '<td><a class="name" href="'.$url.'">'.$name.'</a></td>';
				$output[] = '<td><input type="text" name="qty'.$id.'" value="'.$qty.'" class="form-control"></td>';
				$output[] = '<td>$'.sprintf("%.2f",$price).'</td>';
				$output[] = '<td>$'.sprintf("%.2f",$price).'</td>';
				$output[] = '<td>$'.sprintf("%.2f",($price * $qty)).'</td>';
				$output[] = '<td><a href="basket.php?action=delete&id='.$id.'"><i class="fa fa-trash-o"></i></a></td>';
				$total += $price * $qty;
				$output[] = '</tr>';
			}
			$output[] = '</tbody>';
			$output[] = '<tfoot>';
			$output[] = '<tr><th colspan="5">Total</th><th colspan="2">$'.sprintf("%.2f",$total).'</th></tr>';
			$output[] = '</tfoot>';
			
			// Store the order subtotal
			session_start();
			$_SESSION['subtotal'] = $total;
		} 
		else {
			$output[] = '<p>You shopping cart is empty.</p>';
			$_SESSION['Count'] = 0;
		}
		return join('',$output);
	}

	// Review the order to be confirmed
	function reviewCart($cart){
		global $db;
		//$cart = $_SESSION['cart'];
		if ($cart) {
			$items = explode(',',$cart);
			$contents = array();
			foreach ($items as $item) {
				$contents[$item] = (isset($contents[$item])) ? $contents[$item] + 1 : 1;
			}
			$output[] = '<tbody>';
			foreach ($contents as $id=>$qty) {			
				$sql = 'SELECT * FROM products WHERE id = '.$id;
							
				$stmt = oci_parse($db, $sql); 
	  
				if(!$stmt)  {
					echo "An error occurred in parsing the sql string.\n"; 
					exit; 
				  }
				oci_execute($stmt); 

				while(oci_fetch_array($stmt)) {

					$image= oci_result($stmt,"IMAGE");
					$name = oci_result($stmt,"NAME");
					$price = oci_result($stmt,"PRICE");
					$discount = 0;
					$id = oci_result($stmt,"ID");	

					$detail = oci_result($stmt,"DETAIL");
					$description = oci_result($stmt,"DESCRIPTION");
					$material = oci_result($stmt,"MATERIAL");
					$care = oci_result($stmt,"CARE");			
				}
				
				$brand=array(5,6,3,4,3);
				$Category=array(16,4,"highlight");
				$url = "product.xml?brand=".$brand[0]."&brand=".$brand[1]."&brand=".$brand[2]."&brand=".$brand[3]."&brand=".$brand[4]."&Category=".$Category[0]."&Category=".$Category[1]."&Category=".$Category[2]
						."&name=".$name."&detail=".$detail."&description=".$description."&picture=".$image."&price=".$price."&material=".$material."&care=".$care."&id=".$id;

				$output[] = '<tr>';
				$output[] = '<td><a href="'.$url.'"><img src="'.$image.'" alt="'.$name.'"></a></td>';
				$output[] = '<td><a class="name" href="'.$url.'">'.$name.'</a></td>';
				$output[] = '<td>'.$qty.'</td>';
				$output[] = '<td>$'.sprintf("%.2f",$price).'</td>';
				$output[] = '<td>$'.sprintf("%.2f",$price).'</td>';
				$output[] = '<td>$'.sprintf("%.2f",($price * $qty)).'</td>';
				$total += $price * $qty;
				$output[] = '</tr>';
			}
			$output[] = '</tbody>';
			$output[] = '<tfoot>';
			$output[] = '<tr><th colspan="5">Total</th><th colspan="2">$'.sprintf("%.2f",$total).'</th></tr>';
			$output[] = '</tfoot>';
		} 
		else {
			$output[] = '<p>Error: Cart is empty.</p>';
		}
		return join('',$output);
	}

	// Show the order after confirmed
	function showOrder($cart){
		global $db;
		$items = explode(',',$cart);
		$contents = array();
		foreach ($items as $item) {
			$contents[$item] = (isset($contents[$item])) ? $contents[$item] + 1 : 1;
		}
		$output[] = '<tbody>';
		foreach ($contents as $id=>$qty) {			
			$sql = 'SELECT * FROM products WHERE id = '.$id;
						
			$stmt = oci_parse($db, $sql); 

			if(!$stmt)  {
				echo "An error occurred in parsing the sql string.\n"; 
				exit; 
			  }
			oci_execute($stmt); 

			while(oci_fetch_array($stmt)) {

				$image= oci_result($stmt,"IMAGE");
				$name = oci_result($stmt,"NAME");
				$price = oci_result($stmt,"PRICE");
				$discount = 0;
				$id = oci_result($stmt,"ID");	

				$detail = oci_result($stmt,"DETAIL");
				$description = oci_result($stmt,"DESCRIPTION");
				$material = oci_result($stmt,"MATERIAL");
				$care = oci_result($stmt,"CARE");			
			}
				
			$brand=array(5,6,3,4,3);
			$Category=array(16,4,"highlight");
			$url = "product.xml?brand=".$brand[0]."&brand=".$brand[1]."&brand=".$brand[2]."&brand=".$brand[3]."&brand=".$brand[4]."&Category=".$Category[0]."&Category=".$Category[1]."&Category=".$Category[2]
					."&name=".$name."&detail=".$detail."&description=".$description."&picture=".$image."&price=".$price."&material=".$material."&care=".$care."&id=".$id;

			$output[] = '<tr>';
			$output[] = '<td><a href="'.$url.'"><img src="'.$image.'" alt="'.$name.'"></a></td>';
			$output[] = '<td><a class="name" href="'.$url.'">'.$name.'</a></td>';
			$output[] = '<td>'.$qty.'</td>';
			$output[] = '<td>$'.sprintf("%.2f",$price).'</td>';
			$output[] = '<td>$'.sprintf("%.2f",$price).'</td>';
			$output[] = '<td>$'.sprintf("%.2f",($price * $qty)).'</td>';
			$total += $price * $qty;
			$output[] = '</tr>';
		}
		$output[] = '</tbody>';
		$output[] = '</tfoot>';

		return join('',$output);
	}

	// Create ID and password randomly, referecnce from https://blog.csdn.net/niceday99/article/details/20763573
	function createID($pw_length){ 
		$userID = '';  
		for ($i = 0; $i < $pw_length; $i++){  
			$userID .= chr(mt_rand(48, 57));  
		}  
		return $userID;  
	}

	function createPassword($pw_length){
		$characters = '0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM';
		$randpwd = '';  
		for ($i = 0; $i < $pw_length; $i++){  
			$randpwd .= $characters[rand(0, strlen($characters)-1)];
		}  
		return $randpwd; 
	}

	// Present the order list in customer-orders.php
	function showOrderList(){
		global $db;	
		$sql = "SELECT * FROM Orders WHERE UserID = ".$_SESSION['ID'];
		$stmt = oci_parse($db, $sql);
		if(!$stmt){
			echo "An error occurred in parsing the sql string.\n"; 
			exit; 
		}
		oci_execute($stmt); 
		
		$output[] =  '';
		while(oci_fetch_array($stmt)) {
			$orderID = oci_result($stmt, "ORDERID");
			$purchaseDate = oci_result($stmt, "PURCHASEDATE");
			$total = oci_result($stmt, "TOTAL");
			$url = "customer-order.php?&id=".$orderID;
			
			$output[] = "<tr>";
			$output[] = "<th>#".$orderID."</th>";
			$output[] = "<td>".$purchaseDate."</td>";
			$output[] = "<td>$".$total."</td>";
			$output[] = "<td><a href=".$url." class='btn btn-primary btn-sm'>View</a></td>";
			$output[] = "</tr>";
		}
		
		return join('',$output);
	}

	// If user has logged in, fill the shipping address automatically
	function autoComplete(){
		// Acquire user data
		global $db;	
		$sql = "SELECT * FROM UserInfo WHERE UserID = ".$_SESSION['ID'];
		$stmt = oci_parse($db, $sql);
		if(!$stmt){
			echo "An error occurred in parsing the sql string.\n"; 
			exit; 
		}
		oci_execute($stmt); 
		
		$output[] =  '';
		while(oci_fetch_array($stmt)) {
			$firstname = oci_result($stmt, "FIRSTNAME");
			$lastname = oci_result($stmt, "LASTNAME");
			$address = oci_result($stmt, "ADDRESS");
			$company = oci_result($stmt, "COMPANY");
			$city = oci_result($stmt, "CITY");
			$state = oci_result($stmt, "STATE");
			$postcode = oci_result($stmt, "POSTCODE");
			$country = oci_result($stmt, "COUNTRY");
			$email = oci_result($stmt, "EMAIL");
			$telephone = oci_result($stmt, "TELEPHONE");
		}
		
		// Fill the form
		echo "<script type = 'text/javascript'>
			document.getElementById('firstname').value = '".$firstname."';
			document.getElementById('lastname').value = '".$lastname."';
			document.getElementById('address').value = '".$address."';
			document.getElementById('company').value = '".$company."';
			document.getElementById('city').value = '".$city."';
			document.getElementById('postcode').value = '".$postcode."';
			document.getElementById('email').value = '".$email."';
			document.getElementById('telephone').value = '".$telephone."';
			
			var state = document.getElementById('state');
			var opts = state.getElementsByTagName('option');
				for(var i = 0; i < opts.length; i ++){
					if(opts[i].value == '".$state."')
						opts[i].selected = true;
				}
		</script>	
		";
	}

	// Log out if user clicks corrsponding button
	function logout(){
		// Destory all sessions
		session_start();
		session_unset();
		session_destroy();
		
		header("Location:../index.html");
	}
?>

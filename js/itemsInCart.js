var item = "0 item in cart";


function checkCart(){
	if(document.getElementsByClassName("name")[0] == null)
		alert("Your shopping cart is empty, please select products in corrsponding page.");
	else
		window.location.href = "checkout1.php";
}

function setItemCount(){
	var count = document.getElementsByClassName("name").length;
	//alert(document.getElementsByClassName("name")[0]);
	//item = count + " items in cart";
	//alert("<?php echo $_SESSION['Count']; ?>");
	//document.getElementById("itemCount").innerHTML = item;
	//document.getElementById("itemCount").innerHTML = item;
}

function getItemCount(){
	alert("item:" + item);
	this.innerHTML = item;
}
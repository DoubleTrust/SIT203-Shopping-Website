document.getElementsByTagName("body").onload = searchProducts(); //update once load the page

function searchProducts(){
	// Get search target
    var target = location.search.match(new RegExp("[\?\&]searchValue=([^\&]+)", "i"))[1];
    target = decodeURIComponent(target.trim());

    // Get all furniture & accessories
	var furniture = xmlDoc.getElementsByTagName("Furnitures");
	var accessory = xmlDoc.getElementsByTagName("Accessories");

	// Clear previous products
	productList = [];

    // Get and store all furniture info
	for(var i = 0; i < furniture.length; i ++){
	
		var type = furniture[i].getElementsByTagName("Type")[0].childNodes[0].nodeValue; 
		var photoFront = furniture[i].getElementsByTagName("PhotoFront")[0].childNodes[0].nodeValue;
		var photoBack = furniture[i].getElementsByTagName("PhotoBack")[0].childNodes[0].nodeValue;
		var name = furniture[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
		var brand = furniture[i].getElementsByTagName("Brand")[0].childNodes[0].nodeValue;
		var price = furniture[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
		var details = furniture[i].getElementsByTagName("Details")[0].childNodes[0].nodeValue;
		var material = furniture[i].getElementsByTagName("Material")[0].childNodes[0].nodeValue;
		var care = furniture[i].getElementsByTagName("Care")[0].childNodes[0].nodeValue;
		var description = furniture[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
		var ID = furniture[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
		
		// Set limits for live search here
		if(name.toLowerCase() == target.toLowerCase()) {
            var newNode = CreateNodes(type, photoFront, photoBack, name, brand, price, details, material, care, description, ID);
            //productList.push(newNode);
		}
	}

    // Get and store all accessory info
	for(var i = 0; i < accessory.length; i ++){
		var type = accessory[i].getElementsByTagName("Type")[0].childNodes[0].nodeValue; 
		var photoFront = accessory[i].getElementsByTagName("PhotoFront")[0].childNodes[0].nodeValue;
		var photoBack = accessory[i].getElementsByTagName("PhotoBack")[0].childNodes[0].nodeValue;
		var name = accessory[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
		var brand = accessory[i].getElementsByTagName("Brand")[0].childNodes[0].nodeValue;
		var price = accessory[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
		var details = accessory[i].getElementsByTagName("Details")[0].childNodes[0].nodeValue;
		var material = accessory[i].getElementsByTagName("Material")[0].childNodes[0].nodeValue;
		var care = accessory[i].getElementsByTagName("Care")[0].childNodes[0].nodeValue;
		var description = accessory[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
		var ID = furniture[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
		
		//var newNode = CreateNodes(type, photoFront, photoBack, name, brand, price, details, material, care, description,ID);
		
		if(name.toLowerCase() == target.toLowerCase()) {
            var newNode = CreateNodes(type, photoFront, photoBack, name, brand, price, details, material, care, description, ID);
            //productList.push(newNode);
		}
	}

    //set the price sort to default status
	document.getElementById("default").selected = true;
	//getImportedProducts(furniture, accessory);

    //initialize the page
	initialize();
}


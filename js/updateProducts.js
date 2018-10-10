document.getElementsByTagName("body").onload = selectJudge(); //update once load the page

function UpdateProducts(){
    //get all furniture & accessories
	var furniture = xmlDoc.getElementsByTagName("Furnitures");
	var accessory = xmlDoc.getElementsByTagName("Accessories");

	//clear previous products
	productList = [];
	
	FurnitureType.Beds = [];
	FurnitureType.Chairs = [];
	FurnitureType.Tables = [];
	FurnitureType.Storage = [];
	
	AccessoryType.HomeDeco = [];
	AccessoryType.TextilesRugs = [];
	AccessoryType.Lighting = [];
	AccessoryType.PlantpotsStands = [];

    //get and store all furniture info
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
		
		var newNode = CreateNodes(type, photoFront, photoBack, name, brand, price, details, material, care, description, ID);
		
		if(productCategory == "furniture")
			productList.push(newNode);  //store product info  into temp list one by one
		FurnitureType.total.push(newNode);   //store product info into perm list one by one
		
		if(type == "Chairs"){       //store different type of products into specific array
			FurnitureType.Chairs.push(newNode);	 
		}
		else if(type == "Beds"){       //store different type of products into specific array
			FurnitureType.Beds.push(newNode);	 
		}
		else if(type == "Tables"){       //store different type of products into specific array
			FurnitureType.Tables.push(newNode);	 
		}
		else if(type == "Storage"){       //store different type of products into specific array
			FurnitureType.Storage.push(newNode);	 
		}
	}

    //get and store all accessory info
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
		var ID = accessory[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
		
		var newNode = CreateNodes(type, photoFront, photoBack, name, brand, price, details, material, care, description,ID);
		
		if(productCategory == "accessories")
			productList.push(newNode);  //store product info  into temp list one by one
		AccessoryType.total.push(newNode);   //store product info  into perm list one by one
		
		if(type == "Home Deco"){       //store different type of products into specific array
			AccessoryType.HomeDeco.push(newNode);	 
		}
		else if(type == "Textiles & Rugs"){       //store different type of products into specific array
			AccessoryType.TextilesRugs.push(newNode);	 
		}
		else if(type == "Lighting"){       //store different type of products into specific array
			AccessoryType.Lighting.push(newNode);	 
		}
		else if(type == "Plant pots & Stands"){       //store different type of products into specific array
			AccessoryType.PlantpotsStands.push(newNode);	 
		}
		//productInfo.products.appendChild(productList[i]);   //be the child of "row products" note: first 6 are default products
	}

    //set the price sort to default status
	document.getElementById("default").selected = true;
	getImportedProducts(furniture, accessory);

    //initialize the page
	initialize();
	FurnitureType.typeMark = "";  //initialize the mark
	calculateBrands(); //calculate the number of products with the same brand
	
}

productInfo.totalProducts = productList.length;   //get the imported product amount


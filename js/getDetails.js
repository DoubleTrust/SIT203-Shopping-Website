var brand, Category;
var price, name, pic, detail, material, care, description;


window.onload = function() {
	brand = UrlParam.paramValues("brand");   
	Category = UrlParam.paramValues("Category");
	name = UrlParam.paramValues("name");  
	detail = UrlParam.paramValues("detail");
	description = UrlParam.paramValues("description");
	pic = UrlParam.paramValues("picture");
    price = UrlParam.paramValues("price");
    material = UrlParam.paramValues("material");
    care = UrlParam.paramValues("care");
	id = UrlParam.paramValues("id");

	updateNavigation(); //update navigation settings accordingly
    updateDetail();
	
	
}

function updateNavigation(){
	/*if the current product belongs to furniture or accessory category*/
	if(Category[2] == "furniture"){
		document.getElementById("FurniturePage").setAttribute("class", "active");    //set ACCESSORIES category to active
		document.getElementById("AccessoryPage").setAttribute("class", "");   //set FURNITURE category to inactive
		document.getElementById("guideList").innerHTML = "Furniture";
	}
	else if (Category[2] == "accessory"){
		
		document.getElementById("AccessoryPage").setAttribute("class", "active");    //set ACCESSORIES category to active
		document.getElementById("FurniturePage").setAttribute("class", "");   //set FURNITURE category to inactive
		document.getElementById("guideList").innerHTML = "Accessories";
	}	
	
	/*present product brand and category information in detail page */
	document.getElementById("furnitureAmount").innerHTML = Category[0];   //show the current amount of furniture
	document.getElementById("accessoryAmount").innerHTML = Category[1];   //show the current amount of furniture
	document.getElementById("UniversalCount").innerHTML = brand[0];
	document.getElementById("IkeaCount").innerHTML = brand[1];
	document.getElementById("FactoryCount").innerHTML = brand[2];
	document.getElementById("FantasticCount").innerHTML = brand[3];
	document.getElementById("ArtdecoCount").innerHTML = brand[4];
	
}

function updateDetail(){
	document.getElementById("name").innerHTML = name;
	document.getElementById("price").innerHTML = price;
    document.getElementById("detail").innerHTML = detail;
    document.getElementById("material").innerHTML = material;
    document.getElementById("description").innerHTML = description;
    document.getElementById("pic").setAttribute("src", pic);
	document.getElementById("basketAddress").setAttribute("onclick", "test()");
	
    /* create a new line if the product has more detail in "Material and care" section */
    if(care != ".") {
        var ul = document.getElementById("ul");
        var li = document.createElement("li");
        var content = document.createTextNode(care);
        li.appendChild(content);
        ul.appendChild(li);
    }

} 

function test(){
	window.location.href = "basket.php?action=add&id="+id;
}



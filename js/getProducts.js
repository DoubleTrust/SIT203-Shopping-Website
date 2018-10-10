var xmlDoc = parseXml("product.xml"); //get XML content

var productList = new Array();     //an array to store products
var productCategory = "furniture";  //default display: furniture
//var FirstChoice = 0;     //identify what product did user choose in "index.html" page
var noLimits = false;     // set the limit trigger

var FurnitureType = new Object();  //an object to store different type of furniture products
FurnitureType.typeMark = "";
FurnitureType.total = new Array();
FurnitureType.Chairs = new Array();
FurnitureType.Beds = new Array();
FurnitureType.Tables = new Array();
FurnitureType.Storage = new Array();

var AccessoryType = new Object();  //an object to store different amount of furniture products
AccessoryType.typeMark = "";
AccessoryType.total = new Array();
AccessoryType.HomeDeco = new Array();
AccessoryType.TextilesRugs = new Array();
AccessoryType.Lighting = new Array();
AccessoryType.PlantpotsStands = new Array();

var productInfo = new Object();

/* Default product page number*/
productInfo.currentPage = 1;  
/* Default setting;*/
productInfo.productPerPage = 6; 
/*current products class */
productInfo.products = document.getElementsByClassName("row products")[0];  

/* set attributes through JavaScript DOM */
//make sure detail.xsl will not access this statement
if(document.getElementById("ChangeToFurniture") != null) {
    document.getElementById("ChangeToFurniture").setAttribute("onclick", "changeToFurniture()");
    document.getElementById("Chairs").setAttribute("onclick", "FilterType(this)");
    document.getElementById("Beds").setAttribute("onclick", "FilterType(this)");
    document.getElementById("Tables").setAttribute("onclick", "FilterType(this)");
    document.getElementById("Storage").setAttribute("onclick", "FilterType(this)");

    document.getElementById("ChangeToAccessory").setAttribute("onclick", "changeToAccessory()");
    document.getElementById("HomeDeco").setAttribute("onclick", "FilterType(this)");
    document.getElementById("TextilesRugs").setAttribute("onclick", "FilterType(this)");
    document.getElementById("Lighting").setAttribute("onclick", "FilterType(this)");
    document.getElementById("PlantpotsStands").setAttribute("onclick", "FilterType(this)");

    document.getElementById("clearSetting").setAttribute("onclick", "clearSetting()");
    document.getElementById("FilterBrand").setAttribute("onclick", "filterBrand()");
    document.getElementById("Limit6").setAttribute("onclick", "changeLimits(this)");
    document.getElementById("Limit12").setAttribute("onclick", "changeLimits(this)");
    document.getElementById("LimitAll").setAttribute("onclick", "changeLimits(this)");
    document.getElementsByName("sort-by")[0].setAttribute("onchange", "sortPrice()");
    document.getElementById("pre").setAttribute("onclick", "prevPage()");
    document.getElementById("next").setAttribute("onclick", "nextPage()");
}

/* decide what elements to show when user clicks a specific type of products in "index.html"*/
function selectJudge(){
	UpdateProducts();
    if(UrlParam.paramValues("value") == "furniture"){
        changeToFurniture();
    }
    else if(UrlParam.paramValues("value") == "accessories"){
        changeToAccessory();
    }
	if(UrlParam.paramValues("value") == "Chairs"){
		var Chairs = document.getElementById("Chairs");
		FilterType(Chairs);
	}
	else if(UrlParam.paramValues("value") == "Beds"){
		var Beds = document.getElementById("Beds");
		FilterType(Beds);
	}
	else if(UrlParam.paramValues("value") == "Tables"){
		var Tables = document.getElementById("Tables");
		FilterType(Tables);
	}
	else if(UrlParam.paramValues("value") == "Storage"){
		var Storage = document.getElementById("Storage");
		FilterType(Storage);
	}
		
	else if(UrlParam.paramValues("value") == "HomeDeco"){
		var HomeDeco = document.getElementById("HomeDeco");
		FilterType(HomeDeco);
	}
	else if(UrlParam.paramValues("value") == "TextilesRugs"){
		var TextilesRugs = document.getElementById("TextilesRugs");
		FilterType(TextilesRugs);
	}
	else if(UrlParam.paramValues("value") == "Lighting"){
		var Lighting = document.getElementById("Lighting");
		FilterType(Lighting);
	}
	else if(UrlParam.paramValues("value") == "PlantpotsStands"){
		var PlantpotsStands = document.getElementById("PlantpotsStands");
		FilterType(PlantpotsStands);
	}
}

function passUrl(detail){
	/* pass brand values*/
	var brand = new Array();
    var universal = document.getElementById("UniversalCount").innerHTML;
    var Ikea = document.getElementById("IkeaCount").innerHTML;
    var The_factory = document.getElementById("FactoryCount").innerHTML;
    var Fantastic = document.getElementById("FantasticCount").innerHTML;
    var Artdeco = document.getElementById("ArtdecoCount").innerHTML;
	brand = [universal, Ikea, The_factory, Fantastic, Artdeco];
	
	/*pass category values */
	var Category = new Array();
	var furnitureAmount = document.getElementById("furnitureAmount").innerHTML;
	var accessoryAmount = document.getElementById("accessoryAmount").innerHTML;
	var highlight = ""
	if(document.getElementById("FurniturePage").getAttribute("class") == "active")
		highlight = "furniture";
	else if (document.getElementById("AccessoryPage").getAttribute("class") == "active")
		highlight = "accessory";
	Category = [furnitureAmount, accessoryAmount, highlight];
	
	/*pass product name, price, detail, material, care, description, pic */
	var curNode, name, Detail, description, picture, price, material, care;

    /*if user clicks product name */
	if(detail.parentNode.getAttribute("class") == null){
        curNode = detail.parentNode.parentNode.parentNode.parentNode;
		name = detail.innerHTML;

    }
    /*if user clicks "View detail" */
	else if(detail.innerHTML == "View detail"){
        curNode = detail.parentNode.parentNode.parentNode.parentNode;
        name = curNode.getElementsByClassName("name")[0].innerHTML;
    }
    /*if user clicks images */
 	else{
        curNode = detail.parentNode.parentNode.parentNode.parentNode.parentNode;
		name = curNode.getElementsByClassName("name")[0].innerHTML;
   	}
    description = curNode.getElementsByClassName("description")[0].getAttribute("id");
    Detail = curNode.getElementsByClassName("details")[0].getAttribute("id");
    picture = curNode.getElementsByClassName("img-responsive")[0].getAttribute("src");
    price = curNode.getElementsByClassName("price")[0].innerHTML;
    material = curNode.getElementsByClassName("material")[0].getAttribute("id");
    care = curNode.getElementsByClassName("care")[0].getAttribute("id");
	id = curNode.getElementsByClassName("productID")[0].getAttribute("id");


    var url = "product.xml?brand=" + brand[0] + "&brand=" + brand[1] + "&brand=" + brand[2] + "&brand=" + brand[3] + "&brand=" + brand[4]
			+ "&Category=" + Category[0] + "&Category=" + Category[1] + "&Category=" + Category[2] + "&name=" + name + "&detail=" + Detail + "&description=" + description
	        + "&picture=" + picture + "&price=" + price + "&material=" + material + "&care=" + care + "&id=" + id;
	detail.setAttribute("href", url);
	
}

function parseXml(fileName){ 
     var xmlhttp, xmlDoc;
	 try{
		 xmlhttp = new XMLHttpRequest();
		 //xmlDoc.async = "false";
	 }catch(e){
		 try{
			 xmlhttp = new ActiveXObject("MSXML2.XMLHTTP.3.0");
			 //xmlDoc.async = "false";
		 }catch(e){
			 try{
				 xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
				 //xmlDoc.async = "false";
			 }catch(e){
				 alert("Do not support XMLHTTP");
			 }
		 }
	 }
	 xmlhttp.open("GET", fileName, false);
	 xmlhttp.send();
	 xmlDoc = xmlhttp.responseXML; 
     return xmlDoc;  
}

function changeToFurniture(){
	productCategory = "furniture";
	FurnitureType.typeMark = "";
	productInfo.currentPage = 1;
	clearMark();  //clear all previous marks in "Brand" section 
	RemoveHighLightType();
	calculateBrands();
	
	if(document.getElementById("FurniturePage").getAttribute("class") != "active"){
		document.getElementById("FurniturePage").setAttribute("class", "active");    //set FURNITURE category to active
		document.getElementById("AccessoryPage").setAttribute("class", "");   //set ACCESSORIES category to inactive
		document.getElementById("guideList").innerHTML = "Furniture";
		var box = document.getElementsByClassName("box");
		box[0].getElementsByTagName("h1")[0].innerHTML = "Furniture";
		box[0].getElementsByTagName("p")[0].innerHTML = "In our Furniture department we offer wide selection of the best furniture we have found and carefully selected worldwide.";
	} 
	UpdateProducts();
}

function changeToAccessory(){
	productCategory = "accessories";
	AccessoryType.typeMark = "";
	productInfo.currentPage = 1;
	clearMark();  //clear all previous marks in "Brand" section 
	RemoveHighLightType();
	calculateBrands();
	
	if(document.getElementById("AccessoryPage").getAttribute("class") != "active"){
		document.getElementById("AccessoryPage").setAttribute("class", "active");    //set ACCESSORIES category to active
		document.getElementById("FurniturePage").setAttribute("class", "");   //set FURNITURE category to inactive
		document.getElementById("guideList").innerHTML = "Accessories";
		var box = document.getElementsByClassName("box");
		box[0].getElementsByTagName("h1")[0].innerHTML = "Accessories";
		box[0].getElementsByTagName("p")[0].innerHTML = "In our Accessories department we offer wide selection of the best accessories we have found and carefully selected worldwide.";
	} 
	UpdateProducts();
}

function changeLimits(limits){
	productInfo.currentPage = 1;
	var productNumber = document.getElementsByClassName("products-number")[0];
	var numberSort = productNumber.getElementsByTagName("a");
	for(var i = 0; i < numberSort.length; i ++)   //clear highlight symbol
		numberSort[i].setAttribute("class", "btn btn-default btn-sm");
		
	limits.setAttribute("class", "btn btn-default btn-sm btn-primary");  //set highlight symbol
	
	if(limits.innerHTML != "All"){           //if it allows 6 or 12 products per page
		noLimits = false;
		productInfo.productPerPage = parseInt(limits.innerHTML);
		//productInfo.currentPage = 1；
		createPages(numPages(), productInfo.currentPage);	
		changePage(1);
		changeShowing(1, productInfo.productPerPage);
	}
	else{  //if all product will be displayed in the same page
        noLimits = true;
		productInfo.productPerPage = productList.length;
		createPages(1, 1);
		changePage(1);
		changeShowing(1, productInfo.productPerPage);
	}
	
}

function prevPage(){
	if(productInfo.currentPage > 1){
		productInfo.currentPage -- ;
		changePage(productInfo.currentPage);
		//changeHighlight(productInfo.currentPage);
	}
}

function nextPage(){
	if(productInfo.currentPage < numPages()){
		productInfo.currentPage ++ ;
		changePage(productInfo.currentPage);
		//changeHighlight(productInfo.currentPage);
	}
}

function numPages(){
	var numPage = Math.ceil(productList.length / productInfo.productPerPage);
	return numPage;
}

function changePage(page){
	changeHighlight(page);
	var btn_next = document.getElementById("next");
	var btn_prev = document.getElementById("pre");

	var currentNode = productInfo.products.getElementsByClassName("col-md-4 col-sm-6");
	if(currentNode.length != 0){
		if(page < 1)
			page = 1;
		if(page > numPages())
			page = numPages();
		
		for(var i = 0; i < currentNode.length; i ++)
			currentNode[i].style.display = "none";
		for (var i = (page-1) * productInfo.productPerPage; i < (page * productInfo.productPerPage) && i < productList.length; i++){
			if(currentNode[i] != null)
				currentNode[i].style.display = "block";
			else{  //if there are no products satisfying the requirements
				document.getElementById("currentPageProduct").innerHTML = 0;
				document.getElementById("AmountofProduct").innerHTML = 0 ;
			}
		}
		if (page == 1) {   //adjust >> and <<
			btn_prev.style.visibility = "hidden";
		} 
		else {
			btn_prev.style.visibility = "visible";
		}

		if (page == numPages()) {
			btn_next.style.visibility = "hidden";
		} 
		else {
			btn_next.style.visibility = "visible";
		}
	}
	else{  //if there are no products to display
		btn_prev.style.visibility = "hidden";
		btn_next.style.visibility = "hidden";
	}
	
	/*set the number of products at current page*/
	//if(page != 1)
	changeShowing(page, productInfo.productPerPage);

}

function changeShowing(page, productAllow){
	var productAmount = productInfo.products.getElementsByClassName("col-md-4 col-sm-6").length;
	if(page == numPages() && productAmount % productAllow != 0)  //this is the last page		
		document.getElementById("currentPageProduct").innerHTML = productAmount % productAllow ; //show how many products are displayed at current page
	else{   //this page is not the last page 
		if(productAmount != 0)
			document.getElementById("currentPageProduct").innerHTML = productAllow;
		else  //if there are no products to display
			document.getElementById("currentPageProduct").innerHTML = 0;
	}
}

function deletePast(){
	var pagination = document.getElementsByClassName("pagination");
	var pageSet = pagination[0].getElementsByTagName("li");  //default: 3
		for(var i = pageSet.length; i > 2; i-- )    //clear past pages 
			pageSet[i-2].parentNode.removeChild(pageSet[i-2]);

}

function createPages(numPage ,page){
	var pagination = document.getElementsByClassName("pagination");
	var next = document.getElementById("next");
	var nextLi = next.parentNode;
	deletePast();
	
		for(var i = page; i <= numPages(); i ++){    //create page numbers
			var pageLi = document.createElement("li");
			var pageContainer = document.createElement("a");
			var pageCount = document.createTextNode(i);
			//pageContainer.setAttribute("href", "#");
			pageContainer.setAttribute("onClick", "changePage(this.innerHTML)");
			pageContainer.appendChild(pageCount);
			pageLi.appendChild(pageContainer);
			pagination[0].insertBefore(pageLi ,nextLi);	
			if(pageContainer.innerHTML == 1)
				pageLi.setAttribute("class", "active");		
		}
}

function changeHighlight(page){
	var pagination = document.getElementsByClassName("pagination");
	var allList = pagination[0].getElementsByTagName("li"); 
	//alert(allList[1].childNodes[0].nodeType);
	for(var i = 1; i < allList.length; i++){
		//alert(allList[i].childNodes[0].childNodes[0].nodeValue);
		if(allList[i].childNodes[0].childNodes[0].nodeValue == page){
			
			allList[i].setAttribute("class", "active");
	}
		else
			allList[i].setAttribute("class", ""); 
	}
}

function FilterType(type){
	if(document.getElementById("default") != null)
		document.getElementById("default").selected = true; //set the price sort to default status
	productInfo.currentPage = 1;  //set initial page No.
	productList = []; //clear previous products  
	var typeName = type.innerHTML;  //get the type limitaion of peoducts
	clearMark();  //clear all previous marks in "Brand" section 
	RemoveHighLightType();
	type.setAttribute("class", "bg-success"); //highlight current type in "Categories" section

	/* change the page information when swithing to different catageroies */
	if(typeName == "Chairs" ||  typeName == "Beds" || typeName == "Tables"|| typeName== "Storage" ){
		productCategory = "furniture";
		if(document.getElementById("FurniturePage").getAttribute("class") != "active"){
			document.getElementById("FurniturePage").setAttribute("class", "active");    //set FURNITURE category to active
			document.getElementById("AccessoryPage").setAttribute("class", "");   //set ACCESSORIES category to inactive
			document.getElementById("guideList").innerHTML = "Furniture";
			var box = document.getElementsByClassName("box");
			box[0].getElementsByTagName("h1")[0].innerHTML = "Furniture";
			box[0].getElementsByTagName("p")[0].innerHTML = "In our Furniture department we offer wide selection of the best furniture we have found and carefully selected worldwide.";
		} 
	}
	else{
		productCategory = "accessories";
		if(document.getElementById("AccessoryPage").getAttribute("class") != "active"){
			document.getElementById("AccessoryPage").setAttribute("class", "active");    //set ACCESSORIES category to active
			document.getElementById("FurniturePage").setAttribute("class", "");   //set FURNITURE category to inactive
			document.getElementById("guideList").innerHTML = "Accessories";
			var box = document.getElementsByClassName("box");
			box[0].getElementsByTagName("h1")[0].innerHTML = "Accessories";
			box[0].getElementsByTagName("p")[0].innerHTML = "In our Accessories department we offer wide selection of the best accessories we have found and carefully selected worldwide.";
		} 		
	}

	if(productCategory == "furniture"){   //if current webpage is shop-furniture.html
		if(typeName == "Chairs"){  //if the type is Chairs
			for(var i = 0; i < FurnitureType.Chairs.length; i ++)
				productList.push(FurnitureType.Chairs[i]);
			FurnitureType.typeMark = "Chairs";
		}
		else if(typeName == "Beds"){  //if the type is Beds
			for(var i = 0; i < FurnitureType.Beds.length; i ++)
				productList.push(FurnitureType.Beds[i]);
			FurnitureType.typeMark = "Beds";
		}
		else if(typeName == "Tables"){  //if the type is Tables
			for(var i = 0; i < FurnitureType.Tables.length; i ++)
				productList.push(FurnitureType.Tables[i]);
			FurnitureType.typeMark = "Tables";
		}
		else if(typeName == "Storage"){  //if the type is Storage
			for(var i = 0; i < FurnitureType.Storage.length; i ++)
				productList.push(FurnitureType.Storage[i]);
			FurnitureType.typeMark = "Storage";
		}
	}
	
	else if(productCategory == "accessories"){    //if current webpage is shop-accessories.html
		if(typeName == "Home Deco"){  //if the type is Home Deco
			for(var i = 0; i < AccessoryType.HomeDeco.length; i ++)
				productList.push(AccessoryType.HomeDeco[i]);
			AccessoryType.typeMark = "Home Deco";
		} 
		 else if(typeName == "Textiles &amp; Rugs"){  //if the type is Textiles & Rugs
			for(var i = 0; i < AccessoryType.TextilesRugs.length; i ++)
				productList.push(AccessoryType.TextilesRugs[i]);
			AccessoryType.typeMark = "Textiles & Rugs";
		}
		else if(typeName == "Plant pots &amp; Stands"){  //if the type is Plant pots & Stands
			for(var i = 0; i < AccessoryType.PlantpotsStands.length; i ++)
				productList.push(AccessoryType.PlantpotsStands[i]);
			AccessoryType.typeMark = "Plant pots & Stands";
		}
		else if(typeName == "Lighting"){  //if the type is Lighting
			for(var i = 0; i < AccessoryType.Lighting.length; i ++)
				productList.push(AccessoryType.Lighting[i]);
			AccessoryType.typeMark = "Lighting";
		} 
	}	
	else   //error page
		alert("error");
	initialize();
	calculateBrands();
}

function RemoveHighLightType(){	
	var preHighLight = document.getElementsByClassName("bg-success");
	if(preHighLight[0] != undefined){
		preHighLight[0].setAttribute("class", "");
	}
}

function filterBrand(){
	document.getElementById("default").selected = true; //set the price sort to default status
	var hobbies = document.getElementsByName("checkbox");
	var brand = new Array();
	var type = "";
	var count = 0;
	for(var i = 0; i < hobbies.length; i++){
		if(hobbies[i].checked){
			brand[count] = hobbies[i].value;
			count++;		
		}
	}
	if(productCategory == "furniture"){
		if(FurnitureType.typeMark == "Chairs")
			type = "Chairs";
		else if(FurnitureType.typeMark == "Beds")
			type = "Beds";
		else if(FurnitureType.typeMark == "Tables")
			type = "Tables";
		else if(FurnitureType.typeMark == "Storage")
			type = "Storage";
		else{
			type = "all";  //all furniture are displayed
		}
	}
	else if(productCategory == "accessories"){
		if(AccessoryType.typeMark == "Home Deco")
			type = "Home Deco";
		else if(AccessoryType.typeMark == "Textiles & Rugs")
			type = "Textiles & Rugs";
		else if(AccessoryType.typeMark == "Plant pots & Stands")
			type = "Plant pots & Stands";
		else if(AccessoryType.typeMark == "Lighting")
			type = "Lighting";
		else{
			type = "all";  //all accessories are displayed
		}
	}
	
	if(count == 0){           //if user does not choose anything
		for(var i = 0; i < hobbies.length; i++)
			brand[i] = hobbies[i].value;
	}
	applySetting(brand, type);
}

function applySetting(brand, type){
	productList = [];  //clear previous products
	//alert("type is " + type);
	if(productCategory == "furniture"){
		if(type == "Chairs"){   //if the current page presents Chairs 
			for (var i = 0; i < FurnitureType.Chairs.length; i ++){
				var currentBrandID = FurnitureType.Chairs[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(FurnitureType.Chairs[i]);
			}
			
		}
		else if(type == "Beds"){
			for (var i = 0; i < FurnitureType.Beds.length; i ++){
				var currentBrandID = FurnitureType.Beds[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(FurnitureType.Beds[i]);
			}
			
		}
		
		else if(type == "Tables"){
			for (var i = 0; i < FurnitureType.Tables.length; i ++){
				var currentBrandID = FurnitureType.Tables[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(FurnitureType.Tables[i]);
			}
			
		}
		
		else if(type == "Storage"){
			for (var i = 0; i < FurnitureType.Storage.length; i ++){
				var currentBrandID = FurnitureType.Storage[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(FurnitureType.Storage[i]);
			}
			
		}
		else if (type == "all"){   //if the current page presents all products (FurnitureType.typeMark == "")
			for (var i = 0; i < FurnitureType.Chairs.length; i ++){   //find identified furniture in chairs
				var currentBrandID = FurnitureType.Chairs[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
	
				if(brand.some(checkBrand, brandObject))
					productList.push(FurnitureType.Chairs[i]);
			}
			
			for (var i = 0; i < FurnitureType.Beds.length; i ++){
				var currentBrandID = FurnitureType.Beds[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(FurnitureType.Beds[i]);
			}
			
			for (var i = 0; i < FurnitureType.Tables.length; i ++){
				var currentBrandID = FurnitureType.Tables[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(FurnitureType.Tables[i]);
			}
			
			for (var i = 0; i < FurnitureType.Storage.length; i ++){
				var currentBrandID = FurnitureType.Storage[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(FurnitureType.Storage[i]);
			}			
		}
	}
	else if (productCategory == "accessories"){
		if(type == "Home Deco"){   //if the current page presents Home Deco 
			for (var i = 0; i < AccessoryType.HomeDeco.length; i ++){
				var currentBrandID = AccessoryType.HomeDeco[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(AccessoryType.HomeDeco[i]);
			}
			
		}
		else if(type == "Textiles & Rugs"){
			for (var i = 0; i < AccessoryType.TextilesRugs.length; i ++){
				var currentBrandID = AccessoryType.TextilesRugs[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(AccessoryType.TextilesRugs[i]);
			}
			
		}
		
		else if(type == "Lighting"){
			for (var i = 0; i < AccessoryType.Lighting.length; i ++){
				var currentBrandID = AccessoryType.Lighting[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(AccessoryType.Lighting[i]);
			}
			
		}
		
		else if(type == "Plant pots & Stands"){
			for (var i = 0; i < AccessoryType.PlantpotsStands.length; i ++){
				var currentBrandID = AccessoryType.PlantpotsStands[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(AccessoryType.PlantpotsStands[i]);
			}
			
		}
		else if (type == "all"){   //if the current page presents all products (FurnitureType.typeMark == "")
			//alert(brand[0]);
			for (var i = 0; i < AccessoryType.HomeDeco.length; i ++){
				var currentBrandID = AccessoryType.HomeDeco[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject)){
					productList.push(AccessoryType.HomeDeco[i]);
				}
			}
			
			for (var i = 0; i < AccessoryType.TextilesRugs.length; i ++){
				var currentBrandID = AccessoryType.TextilesRugs[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(AccessoryType.TextilesRugs[i]);
			}
			
			for (var i = 0; i < AccessoryType.Lighting.length; i ++){
				var currentBrandID = AccessoryType.Lighting[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(AccessoryType.Lighting[i]);
			}
			
			for (var i = 0; i < AccessoryType.PlantpotsStands.length; i ++){
				var currentBrandID = AccessoryType.PlantpotsStands[i].getElementsByClassName("brand");  //get the current brand ID in presenting products
				var brandObject = {currentBrand: currentBrandID[0].getAttribute("id")};  //get and store the current brand in presenting products in an object
				if(brand.some(checkBrand, brandObject))
					productList.push(AccessoryType.PlantpotsStands[i]);
			}			
		}
	}
	initialize();

}

function checkBrand (brandValue){
	return (brandValue == this.currentBrand);	
}

function clearMark(){
	var hobbies = document.getElementsByName("checkbox");
	for(var i = 0; i < hobbies.length; i++){
		hobbies[i].checked = false;         //set the status to default
	}
}

function clearSetting(){
	clearMark();
	
	/* reset to original product list of selected category */
	if(productCategory == "furniture"){
		if(FurnitureType.typeMark == "")
			UpdateProducts();
		else if(FurnitureType.typeMark == "Chairs"){
			productList = [];  //clear previous products
			for(var i = 0; i < FurnitureType.Chairs.length; i++)
				productList.push(FurnitureType.Chairs[i]);
			initialize();
		}
		else if(FurnitureType.typeMark == "Beds"){
			productList = [];  //clear previous products
			for(var i = 0; i < FurnitureType.Beds.length; i++)
				productList.push(FurnitureType.Beds[i]);
			initialize();
		}
		else if(FurnitureType.typeMark == "Tables"){
			productList = [];  //clear previous products
			for(var i = 0; i < FurnitureType.Tables.length; i++)
				productList.push(FurnitureType.Tables[i]);
			initialize();
		}
		else if(FurnitureType.typeMark == "Storage"){
			productList = [];  //clear previous products
			for(var i = 0; i < FurnitureType.Storage.length; i++)
				productList.push(FurnitureType.Storage[i]);
			initialize();
		}
	}
	else if (productCategory == "accessories"){
		//alert("clear setting test");
		if(AccessoryType.typeMark == "")
			UpdateProducts();
		else if(AccessoryType.typeMark == "Home Deco"){
			productList = [];  //clear previous products
			for(var i = 0; i < AccessoryType.HomeDeco.length; i++)
				productList.push(AccessoryType.HomeDeco[i]);
			initialize();
		}
		else if(AccessoryType.typeMark == "Textiles & Rugs"){
			productList = [];  //clear previous products
			for(var i = 0; i < AccessoryType.TextilesRugs.length; i++)
				productList.push(AccessoryType.TextilesRugs[i]);
			initialize();
		}
		else if(AccessoryType.typeMark == "Lighting"){
			productList = [];  //clear previous products
			for(var i = 0; i < AccessoryType.Lighting.length; i++)
				productList.push(AccessoryType.Lighting[i]);
			initialize();
		}
		else if(AccessoryType.typeMark == "Plant pots & Stands"){
			productList = [];  //clear previous products
			for(var i = 0; i < AccessoryType.PlantpotsStands.length; i++)
				productList.push(AccessoryType.PlantpotsStands[i]);
			initialize();
		}		
	}
		
}

function sortPrice(){
	var sequence = document.getElementsByName("sort-by");
	var index = sequence[0].selectedIndex;   //get selected index
	//var value = sequence.options[index].value;   //get selected value
	/*if(index == 0){
		if(productCategory == "furniture"){
			if(FurnitureType.typeMark == "Chairs")
				productList = FurnitureType.Chairs;
			else if(FurnitureType.typeMark == "Beds")
				productList = FurnitureType.Beds;
			else if(FurnitureType.typeMark == "Tables")
				productList = FurnitureType.Tables;
			else if(FurnitureType.typeMark == "Storage")
				productList = FurnitureType.Storage;
			//else
            //    productList =  FurnitureType.total;
			initialize();
		}
		else if (productCategory == "accessories"){
            if(AccessoryType.typeMark == "Textiles &amp; Rugs")
                productList = AccessoryType.TextilesRugs;
            else if(AccessoryType.typeMark == "Home Deco")
                productList = AccessoryType.HomeDeco;
            else if(AccessoryType.typeMark == "Plant pots &amp; Stands")
                productList = AccessoryType.PlantpotsStands;
            else if(AccessoryType.typeMark == "Lighting")
                productList = AccessoryType.Lighting;
            //else
            //    productList = AccessoryType.total;
            initialize();
		}
	}*/
	if(index == 1){
		productList = [];  //clear previous products (clear sequence)
		var currentNode = productInfo.products.getElementsByClassName("col-md-4 col-sm-6");   //get current Nodes displaying
		for(var i = 0; i < currentNode.length; i++)
			productList.push(currentNode[i]);   //get displaying products
		productList = bubbleSortUp(productList);
		initialize();
	} 
	else if(index == 2){
		productList = [];  //clear previous products (clear sequence)
		var currentNode = productInfo.products.getElementsByClassName("col-md-4 col-sm-6");   //get current Nodes displaying
		for(var i = 0; i < currentNode.length; i++)
			productList.push(currentNode[i]);   //get displaying products
		productList = bubbleSortDown(productList);
		initialize();
	} 
}

function bubbleSortUp(array){
	var length = array.length;
	var isSwap;
	for(var i = 0; i < length; i++){
		isSwap = false;
		for(var j = length - 1; j>= i+1; j--){
			(array[j].getElementsByClassName("price")[0].innerHTML).replace("$", "")*1 < (array[j-1].getElementsByClassName("price")[0].innerHTML).replace("$", "")*1 && (isSwap = true) && swap(j, j-1, array);
		}
		if(!isSwap)
			break;
	}
	return array;
}

function bubbleSortDown(array){
	var length = array.length;
	var isSwap;
	for(var i = 0; i < length; i++){
		isSwap = false;
		for(var j = length - 1; j>= i+1; j--){
			(array[j].getElementsByClassName("price")[0].innerHTML).replace("$", "")*1 > (array[j-1].getElementsByClassName("price")[0].innerHTML).replace("$", "")*1 && (isSwap = true) && swap(j, j-1, array);
		}
		if(!isSwap)
			break;
	}
	return array;
}

function swap(i,j,array){
  var temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}


/* initialize components*/	
function initialize(){
	while(productInfo.products.firstChild)   //clear all elements
		productInfo.products.removeChild(productInfo.products.firstChild);
	
	for(var i = 0; i < productList.length; i ++){   //initialize the product list on web page
		productInfo.products.appendChild(productList[i]);		
	}

	if(noLimits == true)
        productInfo.productPerPage = productList.length;

	createPages(numPages(), productInfo.currentPage);
	changePage(1);  //pages start from page 1
	changeShowing(1, productInfo.productPerPage); //initial page starts from page 1
	
	var productAllow;
	document.getElementById("AmountofProduct").innerHTML = productList.length;     //show the amount of total products
	productInfo.currentPage == 1;
	var productNumber = document.getElementsByClassName("products-number")[0]; 
	var numberSort = productNumber.getElementsByTagName("a");
	for(var i = 0; i < numberSort.length; i ++){
		if(numberSort[i].getAttribute("class") == "btn btn-default btn-sm btn-primary")
			productAllow = numberSort[i].innerHTML;  //get the amount of products allowed to show per page
	}
	if(productList.length <= productAllow || productAllow == "All")
		document.getElementById("currentPageProduct").innerHTML = productList.length; //if there is only one page, present the total amount
	
}

function getImportedProducts(furniture, accessory){
	var furnitureAmount = document.getElementById("furnitureAmount"); //show the amount of furniture
	var currentAmount = furniture.length;
	furnitureAmount.innerHTML = currentAmount;  

	var accessoryAmount = document.getElementById("accessoryAmount"); //show the amount of accessories 
	var currentAmount = accessory.length;
	accessoryAmount.innerHTML = currentAmount;
}

function CreateNodes(type, photoFront, photoBack, name, brand, price, details, material, care, description, ID){
	var image1 = document.createElement("img");          //<img src="img/product1.jpg" alt="" class="img-responsive">
	image1.setAttribute("src", photoFront);
	image1.setAttribute("alt", name);
	image1.setAttribute("class", "img-responsive");	
	
	var image2 = document.createElement("img");          //<img src="img/product2.jpg" alt="" class="img-responsive">
	image2.setAttribute("src", photoBack);
	image2.setAttribute("alt", name);
	image2.setAttribute("class", "img-responsive");
	
	var a1 = document.createElement("a");                 //<a href="detail.html"></a>
	a1.setAttribute("href", "detail.html");	
	a1.setAttribute("onclick", "passUrl(this)");
		
	
	var a2 = document.createElement("a");                 //<a href="detail.html"></a>
	a2.setAttribute("href", "detail.html");
	a2.setAttribute("onclick", "passUrl(this)");	
	
	a1.appendChild(image1);   //<a ...> <img /> </a>
	a2.appendChild(image2);
	
	var front = document.createElement("div");           //<div class="front"></div>
	front.setAttribute("class", "front");
	var back = document.createElement("div");            //<div class="back"></div>
	back.setAttribute("class", "back");
	
	front.appendChild(a1);     //<div class = "front"> <a> <img /> </a> </div>
	back.appendChild(a2);
	
	var flipper = document.createElement("div");  //<div class = "flipper"></div>
	flipper.setAttribute("class", "flipper");
	
	flipper.appendChild(front);
	flipper.appendChild(back);
	
	var flip_container = document.createElement("div");    //<div class="flip-container">
	flip_container.setAttribute("class", "flip-container");
	
	flip_container.appendChild(flipper);
	
	var image1_1 = document.createElement("img");
	image1_1.setAttribute("src", photoFront);
	image1_1.setAttribute("alt", name);
	image1_1.setAttribute("class", "img-responsive");
	
	var a3 = document.createElement("a");                 //<a href="detail.html" class="invisible"></a>
	a3.setAttribute("href", "detail.html");
	a3.setAttribute("class", "invisible");
	
	a3.appendChild(image1_1);
	
	var view_detail = document.createElement("a");
	var view_txt = document.createTextNode("View detail");
	//view_detail.setAttribute("href", "detail.html");
	view_detail.setAttribute("class", "btn btn-default");
	view_detail.setAttribute("onclick", "passUrl(this)");    //passing values test 
	
	view_detail.appendChild(view_txt);
	
	var i = document.createElement("i");
	i.setAttribute("class", "fa fa-shopping-cart");

	var add_to_cart = document.createElement("a");
	var add_txt = document.createTextNode("Add to cart");
	add_to_cart.setAttribute("href", "basket.php?action=add&id="+ID);
	add_to_cart.setAttribute("class", "btn btn-primary");
	
	add_to_cart.appendChild(i);
	add_to_cart.appendChild(add_txt);
	
	var buttons = document.createElement("p");
	buttons.setAttribute("class", "buttons");
	
	buttons.appendChild(view_detail);
	buttons.appendChild(add_to_cart);
	
	var money = document.createElement("p");
	var amount = document.createTextNode(price);
	money.setAttribute("class", "price");
	
	
	money.appendChild(amount);
	
	var pName = document.createElement("a");
	var Name = document.createTextNode(name);
	pName.setAttribute("href", "detail.html");
	pName.setAttribute("onclick", "passUrl(this)");
	pName.setAttribute("class", "name");
	
	pName.appendChild(Name);
	
	var h3 = document.createElement("h3");
	
	h3.appendChild(pName);
	
	var txt = document.createElement("div");     //<div class = "text"></div>
	txt.setAttribute("class", "text");
	
	txt.appendChild(h3);
	txt.appendChild(money);
	txt.appendChild(buttons);
	
	var product = document.createElement("div");
	product.setAttribute("class", "product");
	
	product.appendChild(flip_container);
	product.appendChild(a3);
	product.appendChild(txt);
	
	var product_type = document.createElement("div");    //store other product information
	product_type.setAttribute("class", "type");
	product_type.setAttribute("id", type);	
	
	var product_brand = document.createElement("div");    
	product_brand.setAttribute("class", "brand");
	product_brand.setAttribute("id", brand);
	
	var product_details = document.createElement("div");
	product_details.setAttribute("class", "details");
	product_details.setAttribute("id", details);
	
	var product_material = document.createElement("div");
	product_material.setAttribute("class", "material");
	product_material.setAttribute("id", material);
	
	var product_care = document.createElement("div");
	product_care.setAttribute("class", "care");
	product_care.setAttribute("id", care);
	
	var product_description = document.createElement("div");
	product_description.setAttribute("class", "description");
	product_description.setAttribute("id", description);
	
	var product_ID = document.createElement("div");
	product_ID.setAttribute("class", "productID");
	product_ID.setAttribute("id", ID);
	
	var newNode = document.createElement("div");
	newNode.setAttribute("class", "col-md-4 col-sm-6");
	
	newNode.appendChild(product);
	newNode.appendChild(product_type);
	newNode.appendChild(product_brand);
	newNode.appendChild(product_details);
	newNode.appendChild(product_material);
	newNode.appendChild(product_care);
	newNode.appendChild(product_description);
	newNode.appendChild(product_ID);
	
	return newNode;

}

function calculateBrands(){
	var universal = 0, Ikea = 0, The_factory = 0, Fantastic = 0, Artdeco = 0;
	//alert(document.getElementById("UniversalCount").innerHTML);  6
	var currentNode = productInfo.products.getElementsByClassName("col-md-4 col-sm-6");
	for(var i = 0; i < currentNode.length; i++){
		var currentProductID = currentNode[i].getElementsByClassName("brand")[0].getAttribute("id");
		//alert(currentProductID);
		if(currentProductID == "Universal")
			universal++;
		else if(currentProductID == "Ikea")
			Ikea++;
		else if(currentProductID == "The factory")
			The_factory++;
		else if(currentProductID == "Fantastic")
			Fantastic++;
		else if(currentProductID == "Artdeco")
			Artdeco++;
	}
	document.getElementById("UniversalCount").innerHTML = universal;
	document.getElementById("IkeaCount").innerHTML = Ikea;
	document.getElementById("FactoryCount").innerHTML = The_factory;
	document.getElementById("FantasticCount").innerHTML = Fantastic;
	document.getElementById("ArtdecoCount").innerHTML = Artdeco;
	//alert(currentNode[0].getElementsByClassName("brand")[0].getAttribute("id"));
	//alert(FurnitureType.Chairs[0].getElementsByClassName("brand")[0].getAttribute("id"));  //universal
}

/* Show live results based on user's input */
function showResult(input){
	if (input.length==0){
		document.getElementById("livesearch").innerHTML="";
		document.getElementById("livesearch").style.border="0px";
		return;
	}
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			//var testArray = xmlhttp.responseText.split("/");
			//alert(testArray);
			//$('#livesearch').typeahead({source: testArray});
			document.getElementById("livesearch").innerHTML=xmlhttp.responseText;
			document.getElementById("livesearch").style.border="1px solid #A5ACB2";
			document.getElementById("livesearch").setAttribute("style","border: 1px solid #A5ACB2; text-align:left; ");

 		}
	}
xmlhttp.open("GET","php/livesearch.php?target="+input,true);
xmlhttp.send();
}

/* Link to result page */
function search() {
	window.location.href = "search-results.html?searchValue=" + $('#searchtarget').val();
}

/* search the product when clicking product name in suggestion box and jump to detail page */
function jumpToDetail(productName) {
	/* Get the value of input field */
	//var productName = document.getElementById("searchtarget").value;
	
	/* Set the default brand amount */
	brand = [5, 6, 3, 4, 3];
	/* Set the default category */
	highlight = "furniture";
	Category = [16, 4, highlight];
	
	var isFound = false;
	
	/* Pass product name, price, detail, material, care, description, pic */
	var name, Detail, picture, price, material, care, description, id;
	
	/* Locate product detail info in XML */
	var furniture = xmlDoc.getElementsByTagName("Furnitures");
	var accessory = xmlDoc.getElementsByTagName("Accessories");
	
	/* Start searching from furniture to accessory */
	for(var i = 0; i < furniture.length; i ++){
		if(productName == furniture[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue){
			isFound = true;
			picture = furniture[i].getElementsByTagName("PhotoFront")[0].childNodes[0].nodeValue;
			name = productName;
			price = furniture[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
			Detail = furniture[i].getElementsByTagName("Details")[0].childNodes[0].nodeValue;
			material = furniture[i].getElementsByTagName("Material")[0].childNodes[0].nodeValue;
			care = furniture[i].getElementsByTagName("Care")[0].childNodes[0].nodeValue;
			description = furniture[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
			id = furniture[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
			
			/* Generate url and pass it to detail page */
			var url = "product.xml?brand=" + brand[0] + "&brand=" + brand[1] + "&brand=" + brand[2] + "&brand=" + brand[3] + "&brand=" + brand[4]
					+ "&Category=" + Category[0] + "&Category=" + Category[1] + "&Category=" + Category[2] + "&name=" + name + "&detail=" + Detail + "&description=" + description
					+ "&picture=" + picture + "&price=" + price + "&material=" + material + "&care=" + care + "&id=" + id;
			window.location.href = url;
		}
	}	
	for(var i = 0; i < accessory.length; i ++){
		if(productName == accessory[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue){
			isFound = true;
			picture = accessory[i].getElementsByTagName("PhotoFront")[0].childNodes[0].nodeValue;
			name = productName;
			price = accessory[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
			Detail = accessory[i].getElementsByTagName("Details")[0].childNodes[0].nodeValue;
			material = accessory[i].getElementsByTagName("Material")[0].childNodes[0].nodeValue;
			care = accessory[i].getElementsByTagName("Care")[0].childNodes[0].nodeValue;
			description = accessory[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
			id = furniture[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
		
			/* Generate url and pass it to detail page */
			var url = "product.xml?brand=" + brand[0] + "&brand=" + brand[1] + "&brand=" + brand[2] + "&brand=" + brand[3] + "&brand=" + brand[4]
					+ "&Category=" + Category[0] + "&Category=" + Category[1] + "&Category=" + Category[2] + "&name=" + name + "&detail=" + Detail + "&description=" + description
					+ "&picture=" + picture + "&price=" + price + "&material=" + material + "&care=" + care + "&id=" + id;
			window.location.href = url;
		}		
	}
	if(!isFound)
		alert("Product not found.");
}

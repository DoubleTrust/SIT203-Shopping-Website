<?xml version = "1.0" encoding="utf-8"?>
<xsl:stylesheet version = "1.0"
                xmlns:xsl = "http://www.w3.org/1999/XSL/Transform"
                xmlns:ext="http://exslt.org/common" exclude-result-prefixes="ext">
    <xsl:output method = "html" omit-xml-declaration = "yes" indent="yes"
                doctype-system ="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
                doctype-public = "-//W3C//DTD XHTML 1.0 Strict//EN" /> 

    <xsl:template match = "/">
<html>

<head>
    <meta charset="utf-8" />
    <meta name="robots" content="all,follow" />
    <meta name="googlebot" content="index,follow,snippet,archive"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <meta name="description" content="Universal Your furniture Shop"/>
    <meta name="author" content="Ondrej Svestka | ondrejsvestka.cz, modified by Shang Gao Deakin Uni June 2018."/>
    <meta name="keywords" content=""/>

    <title>
        Universal : Your Furniture Shop
    </title>

    <meta name="keywords" content=""/>
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,500,700,300,100' rel='stylesheet' type='text/css'/>
    <!-- styles -->
    <link href="css/font-awesome.css" rel="stylesheet"/>
    <link href="css/bootstrap.min.css" rel="stylesheet"/>
    <link href="css/animate.min.css" rel="stylesheet"/>
    <link href="css/owl.carousel.css" rel="stylesheet"/>
    <link href="css/owl.theme.css" rel="stylesheet"/>
    <!-- theme stylesheet -->
    <link href="css/style.default.css" rel="stylesheet" id="theme-stylesheet"/>
    <!-- your stylesheet with modifications -->
    <link href="css/custom.css" rel="stylesheet"/>
    <script src="js/respond.min.js" />
	<script src="js/getUrlParam.js" />
	<script src = "js/getProducts.js" />

    <link rel="shortcut icon" href="favicon.png"/>
</head>
<body>
    <!-- note: most content are the same as detail.html -->
    <!-- *** TOPBAR ***
 _________________________________________________________ -->
    <div id="top">
        <div class="container">
            <div class="col-md-6 offer" data-animate="fadeInDown">
                <a href="#" class="btn btn-success btn-sm" data-animate-hover="shake">Offer of the day</a>  
				<a href="#">Get flat 35% off on orders over $500!</a>
            </div>
            <div class="col-md-6" data-animate="fadeInDown">
                <ul class="menu">
                    <li><a href="#" data-toggle="modal" data-target="#login-modal">Login</a>
                    </li>
                    <li><a href="register.html">Register</a>
                    </li>
                    <li><a href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="Login" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
                        <h4 class="modal-title" id="Login">Customer login</h4>
                    </div>
                    <div class="modal-body">
                        <form id="loginForm" method = "get" action="">
                            <div class="form-group">
                                <input type="text" class="form-control" id="loginEmail" name = "loginEmail" placeholder="email" />
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="loginPassword" name = "loginPassword" placeholder="password" />
                            </div>

                            <p class="text-center">
                                <button type="button" id = "loginSubmit" onclick = "Login()" class="btn btn-primary"><i class="fa fa-sign-in"></i> Log in</button>
                            </p>
                        </form>
                        <p class="text-center text-muted">Not registered yet?</p>
                        <p class="text-center text-muted"><a href="register.html"><strong>Register now</strong></a>
						! It is easy and done in 1 nbsp minute and gives you access to special discounts and much more!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- *** TOP BAR END *** -->
    <!-- *** NAVBAR ***
 _________________________________________________________ -->
    <div class="navbar navbar-default yamm" role="navigation" id="navbar">
        <div class="container">
            <div class="navbar-header">

                <a class="navbar-brand home" href="index.html" data-animate-hover="bounce">
                    <img src="img/logo.png" alt="Universal logo" class="hidden-xs" />
                    <img src="img/logo-small.png" alt="Universal logo" class="visible-xs" /><span class="sr-only">Universal - go to homepage</span>
                </a>
                <div class="navbar-buttons">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                        <span class="sr-only">Toggle navigation</span>
                        <i class="fa fa-align-justify"></i>
                    </button>
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#search">
                        <span class="sr-only">Toggle search</span>
                        <i class="fa fa-search"></i>
                    </button>
                    <a class="btn btn-default navbar-toggle" href="basket.php">
                        <i class="fa fa-shopping-cart"></i>  <span class="hidden-xs">3 items in cart</span>
                    </a>
                </div>
            </div>
            <!--/.navbar-header -->

            <div class="navbar-collapse collapse" id="navigation">

                <ul class="nav navbar-nav navbar-left">
                    <li class="active"><a href="index.html">Home</a>
                    </li>
														
					<li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">Shop <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-6"> <!-- col-sm-3 is changed to col-sm-6 by Shang-->
                                            <h5>Furniture</h5>
                                            <ul>
                                                <li><a href="shop-furniture.html?value=Chairs">Chairs</a> <!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li>
                                                <li><a href="shop-furniture.html?value=Beds">Beds</a><!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li>												
                                                <li><a href="shop-furniture.html?value=Tables">Tables</a><!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li>
												<li><a href="shop-furniture.html?value=Storage">Storage</a><!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li>
												
                                            </ul>
                                        </div>                                        
                                        <div class="col-sm-6"> <!-- col-sm-3 is changed to col-sm-6 by Shang-->
                                            <h5>Accessories</h5>
                                            <ul>
                                                <li><a href="shop-furniture.html?value=HomeDeco">Home Deco</a><!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li>
                                                <li><a href="shop-furniture.html?value=TextilesRugs">Textiles and Rugs</a><!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li>
												<li><a href="shop-furniture.html?value=Lighting">Lighting</a><!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li>
												<li><a href="shop-furniture.html?value=PlantpotsStands">Plant pots and Stands</a><!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li>												
                                            </ul>
                                        </div>                                        
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                    </li>                   

                    <li class="dropdown yamm-fw">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="200">Site <b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="yamm-content">
                                    <div class="row">
                                        <div class="col-sm-3">
                                            <h5>Shop</h5>
                                            <ul>
                                                <li><a href="index.html">Homepage</a>
                                                </li>
                                                <li><a href="shop-furniture.html?value=furniture">Shop - furniture</a><!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li>
												<li><a href="shop-furniture.html?value=accessories">Shop - accessories</a> <!-- href changed by Wentao Yan at 03/08/2018 -->
                                                </li> 
                                            </ul>
                                        </div>
                                        <div class="col-sm-3">
                                            <h5>User</h5>
                                            <ul>
                                                <li><a href="#" id = "register.html" onclick = "CheckLogin(this)" >Register / login</a>
                                                </li>
                                                <li><a href="#" id = "customer-orders.php" onclick = "CheckLogin(this)">Orders history</a>
                                                </li>
                                                <!--<li><a href="customer-order.php" onclick = "CheckLogin(this.value)">Order history detail</a>
                                                </li> -->
                                                <li><a href="#" id = "customer-account.php" onclick = "CheckLogin(this)">Customer account / change password</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-sm-3">
                                            <h5>Order process</h5>
                                            <ul>
                                                <li><a href="basket.php">Shopping cart</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-sm-3">
                                            <h5>Information</h5>
                                            <ul>                                                
                                                <li><a href="aboutus.html">About us</a>
                                                </li>
												<li><a href="terms.html">Terms and conditions</a>
                                                </li>
												<li><a href="faq.html">FAQ</a>
                                                </li>                                                                                                
                                                <li><a href="contact.html">Contact</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- /.yamm-content -->
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>
            <!--/.nav-collapse -->

            <div class="navbar-buttons">

                <div class="navbar-collapse collapse right" id="basket-overview">
                    <a href="basket.php" class="btn btn-primary navbar-btn"><i id = "itemAmount" class="fa fa-shopping-cart"></i><span class="hidden-sm"></span></a>
                </div>
                <!--/.nav-collapse -->

                <div class="navbar-collapse collapse right" id="search-not-mobile">
                    <button type="button" class="btn navbar-btn btn-primary" data-toggle="collapse" data-target="#search">
                        <span class="sr-only">Toggle search</span>
                        <i class="fa fa-search"></i>
                    </button>
                </div>

            </div>

            <div class="collapse clearfix" id="search">

                 <form class="navbar-form" role="search">
                    <div class="input-group">
						<input id = "searchtarget" type="text" class="form-control" placeholder="Search" onkeyup="showResult(this.value)" />			
						<span class="input-group-btn">
							<button type="button" class="btn btn-primary" onclick = "search()"><i class="fa fa-search"></i></button>
						</span>	
					</div>
					<div id="livesearch"></div>
                </form>

            </div>
            <!--/.nav-collapse -->

        </div>
        <!-- /.container -->
    </div>
    <!-- /#navbar -->

    <!-- *** NAVBAR END *** -->

    <div id="all">

        <div id="content">
            <div class="container">

                <div class="col-md-12">
                    <ul class="breadcrumb">
                        <li><a href="index.html">Home</a>
                        </li>
                        <li><a id = "guideList" href="shop-furniture.html">Furniture</a> <!-- id added by Wentao Yan at 01/08/2018 -->
                        </li>
						<!--
                        <li><a href="#">Tops</a>
                        </li>
						-->
                        
                    </ul>

                </div>

                <div class="col-md-3">
                    <!-- *** MENUS AND FILTERS ***
 _________________________________________________________ -->
                    <div class="panel panel-default sidebar-menu">

                        <div class="panel-heading">
                            <h3 class="panel-title">Categories</h3>
                        </div>

                        <div class="panel-body">
                            <ul class="nav nav-pills nav-stacked category-menu">
                               <li  id =  "FurniturePage" class="active">
                                    <a href = "#" >furniture <span id = "furnitureAmount" class="badge pull-right">12</span></a> <!-- id added by Wentao Yan at 01/08/2018 -->
                                    <ul>
												<li><a href="shop-furniture.html?value=Chairs">Chairs</a><!-- href= "shop-accessories.html" changed by Wentao Yan at 01/08/2018 -->
                                                </li>
                                                <li><a href="shop-furniture.html?value=Beds">Beds</a><!-- href= "shop-accessories.html" changed by Wentao Yan at 01/08/2018 -->
                                                </li>
                                                <li><a href="shop-furniture.html?value=Tables">Tables</a><!-- href= "shop-accessories.html" changed by Wentao Yan at 01/08/2018 -->
                                                </li>
												<li><a href="shop-furniture.html?value=Storage">Storage</a><!-- href= "shop-accessories.html" changed by Wentao Yan at 01/08/2018 -->
                                                </li>
                                    </ul>
                                </li>
                                <li id = "AccessoryPage">
                                    <a href = "#" >Accessories  <span id = "accessoryAmount" class="badge pull-right">12</span></a><!-- id added by Wentao Yan at 01/08/2018 -->
                                    <ul>
                                                <li><a href="shop-furniture.html?value=HomeDeco">Home Deco</a><!-- href= "shop-accessories.html" changed by Wentao Yan at 01/08/2018 -->
                                                </li>
                                                <li><a href="shop-furniture.html?value=TextilesRugs">Textiles &amp; Rugs</a><!-- href= "shop-accessories.html" changed by Wentao Yan at 01/08/2018 -->
                                                </li>
												<li><a href="shop-furniture.html?value=Lighting">Lighting</a><!-- href= "shop-accessories.html" changed by Wentao Yan at 01/08/2018 -->
                                                </li>
												<li><a href="shop-furniture.html?value=PlantpotsStands">Plant pots &amp; Stands</a><!-- href= "shop-accessories.html" changed by Wentao Yan at 01/08/2018 -->
                                                </li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                    </div>

                    <div class="panel panel-default sidebar-menu">

                        <div class="panel-heading">
                            <h3 class="panel-title">Brands <a class="btn btn-xs btn-danger pull-right" href="#"><i class="fa fa-times-circle"></i> Clear</a></h3>
                        </div>

                        <div class="panel-body">

                            <form>
                                <div class="form-group">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name = "checkbox" value = "Universal"/>Universal  (<b id = "UniversalCount">.</b>)<!-- name, value, <b></b> and id added and href changed by Wentao Yan at 01/08/2018  -->
                                        </label>
                                    </div>
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name = "checkbox" value = "Ikea" />Ikea (<b id = "IkeaCount">6</b>)<!-- name, value, <b></b> and id added and href changed by Wentao Yan at 01/08/2018  -->
                                        </label>
                                    </div>
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name = "checkbox" value = "The factory" />The factory (<b id = "FactoryCount">6</b>)<!-- name, value, <b></b> and id added and href changed by Wentao Yan at 01/08/2018  -->
                                        </label>
                                    </div>
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name = "checkbox" value = "Fantastic" />Fantastic (<b id = "FantasticCount">6</b>)<!-- name, value, <b></b> and id added and href changed by Wentao Yan at 01/08/2018  -->
                                        </label>
                                    </div>
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name = "checkbox" value = "Artdeco" />Artdeco (<b id = "ArtdecoCount">6</b>)<!-- name, value, <b></b> and id added and href changed by Wentao Yan at 01/08/2018  -->
                                        </label>
                                    </div>
                                </div>

                                <button type = "button" class="btn btn-default btn-sm btn-primary" onclick = "filterBrand()" ><i class="fa fa-pencil"></i> Apply</button><!-- name, value, <b></b> and id added and href changed by Wentao Yan at 01/08/2018  -->

                            </form>

                        </div>
                    </div>

                    <!-- <div class="panel panel-default sidebar-menu">

                        <div class="panel-heading">
                            <h3 class="panel-title">Price <a class="btn btn-xs btn-danger pull-right" href="#"><i class="fa fa-times-circle"></i> Clear</a></h3>
                        </div>

                        <div class="panel-body">
							<form>						
			  
								<!- <input type="range" min="0" max="2000" step="50" />  -->
								<!-- <div class="checkbox">
									<label for="minimum">Minimum</label>
										<input type="number" min="0" max="2000" id="min" name="min"  />
									
									<label for="maximum">Maximum</label>
										<input type="number" min="0" max="2000" id="max" name="max"  />
								</div>
									<button class="btn btn-default btn-sm btn-primary"><i class="fa fa-pencil"></i> Apply</button>
							
                            </form>
							
						</div>
                    </div> --> 

					<!-- added by Shang for range slider -->
					<div class="panel panel-default sidebar-menu">

                        <div class="panel-heading">
                            <h3 class="panel-title">Price <a class="btn btn-xs btn-danger pull-right" href="#"><i class="fa fa-times-circle"></i> Clear</a></h3>
                        </div>

                        <div class="panel-body widget price">
							<form>						
			  
								<!-- <input type="range" min="0" max="2000" step="50" />  -->
								<div class="widget-desc">
									<div class="slider-range">
										<div data-min="10" data-max="1000" data-unit="$" class="slider-range-price ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" data-value-min="10" data-value-max="1000" data-label-result="">
											<div class="ui-slider-range ui-widget-header ui-corner-all"></div>
											<span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
											<span class="ui-slider-handle ui-state-default ui-corner-all" tabindex="0"></span>
										</div>
										<div class="range-price checkbox">$10 - $1000</div>
									</div>
								</div>
									<button class="btn btn-default btn-sm btn-primary"><i class="fa fa-pencil"></i> Apply</button>
							
                            </form>
							
						</div>
                    </div>

                    <!-- *** MENUS AND FILTERS END *** -->

                    <div class="banner">
                        <a href="#">
                            <img src="img/banner.jpg" alt="sales 2014" class="img-responsive" />
                        </a>
                    </div>
                </div>

                <div id="colmd9" class="col-md-9">
                    <div class="row" id="productMain">
                        <div class="col-sm-6">
                            <div id="mainImage">
                                <img id = "pic" alt="" class="img-responsive" /> <!-- id added by Wentao Yan at 01/08/2018 -->
                            </div>

                            <!-- <div class="ribbon sale">
                                <div class="theribbon">SALE</div>
                                <div class="ribbon-background"></div>
                            </div> -->
                            <!-- /.ribbon -->

                            <!-- <div class="ribbon new">
                                <div class="theribbon">NEW</div>
                                <div class="ribbon-background"></div>
                            </div> -->
                            <!-- /.ribbon -->

                        </div>
                        <div class="col-sm-6">
                            <div class="box">
                                <h1 id = "name" class="text-center"></h1> <!-- id added by Wentao Yan at 01/08/2018 -->
                                <p class="goToDescription"><a href="#details" class="scroll-to">Scroll to product details, material and care </a>
                                </p>
                                <p id="price" class = "price"></p> <!-- id added by Wentao Yan at 01/08/2018 -->

                                <p class="text-center buttons">
                                    <a id = "basketAddress" href="#" class="btn btn-primary"><i class="fa fa-shopping-cart"></i>Add to cart</a> 
									<!--
                                    <a href="basket.html" class="btn btn-default"><i class="fa fa-heart"></i> Add to wishlist</a>
									-->
                                </p>


                            </div>
						
							<!-- commented by Shang 04/07/2017
                            <div class="row" id="thumbs">
                                <div class="col-xs-4">
                                    <a href="img/detailbig1.jpg" class="thumb">
                                        <img src="img/detailsquare.jpg" alt="" class="img-responsive">
                                    </a>
                                </div>
                                <div class="col-xs-4">
                                    <a href="img/detailbig2.jpg" class="thumb">
                                        <img src="img/detailsquare2.jpg" alt="" class="img-responsive">
                                    </a>
                                </div>
                                <div class="col-xs-4">
                                    <a href="img/detailbig3.jpg" class="thumb">
                                        <img src="img/detailsquare3.jpg" alt="" class="img-responsive">
                                    </a>
                                </div>
                            </div>
							-->
                        </div>

                    </div>


                    <div class="box" id="details">
                        <p>
                            <h4>Product details</h4>
                            <p id =  "detail"></p> <!-- id added by Wentao Yan at 01/08/2018 -->
                            <h4>Material and care</h4>
                            <ul id = "ul">
                                <li id = "material"></li>

                            </ul>
                            <!-- <h4>Size & Fit</h4>
                            <ul>
                                <li>Regular fit</li>
                                <li>The model (height 5'8" and chest 33") is wearing a size S</li>
                            </ul> -->

                            <blockquote>
                                <p><em id = "description"></em> <!-- id added by Wentao Yan at 01/08/2018 -->
                                </p>
                            </blockquote>

                            <hr>
                            <div class="social">
                                <h4>Show it to your friends</h4>
                                <p>
                                    <a href="#" class="external facebook" data-animate-hover="pulse"><i class="fa fa-facebook"></i></a>
                                    <a href="#" class="external gplus" data-animate-hover="pulse"><i class="fa fa-google-plus"></i></a>
                                    <a href="#" class="external twitter" data-animate-hover="pulse"><i class="fa fa-twitter"></i></a>
                                    <a href="#" class="email" data-animate-hover="pulse"><i class="fa fa-envelope"></i></a>
                                </p>
                            </div>
                            </hr>
                        </p>
                    </div>

					<!-- commented by Shang 04/07/2017
                    <div class="row same-height-row">
                        <div class="col-md-3 col-sm-6">
                            <div class="box same-height">
                                <h3>You may also like these products</h3>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="product same-height">
                                <div class="flip-container">
                                    <div class="flipper">
                                        <div class="front">
                                            <a href="detail.html">
                                                <img src="img/product2.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                        <div class="back">
                                            <a href="detail.html">
                                                <img src="img/product2_2.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a href="detail.html" class="invisible">
                                    <img src="img/product2.jpg" alt="" class="img-responsive">
                                </a>
                                <div class="text">
                                    <h3>Fur coat</h3>
                                    <p class="price">$143</p>
                                </div>
                            </div>
                            <!- /.product -->
							<!--
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="product same-height">
                                <div class="flip-container">
                                    <div class="flipper">
                                        <div class="front">
                                            <a href="detail.html">
                                                <img src="img/product1.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                        <div class="back">
                                            <a href="detail.html">
                                                <img src="img/product1_2.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a href="detail.html" class="invisible">
                                    <img src="img/product1.jpg" alt="" class="img-responsive">
                                </a>
                                <div class="text">
                                    <h3>Fur coat</h3>
                                    <p class="price">$143</p>
                                </div>
                            </div>
                            <!- /.product -->
							<!--
                        </div>


                        <div class="col-md-3 col-sm-6">
                            <div class="product same-height">
                                <div class="flip-container">
                                    <div class="flipper">
                                        <div class="front">
                                            <a href="detail.html">
                                                <img src="img/product3.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                        <div class="back">
                                            <a href="detail.html">
                                                <img src="img/product3_2.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a href="detail.html" class="invisible">
                                    <img src="img/product3.jpg" alt="" class="img-responsive">
                                </a>
                                <div class="text">
                                    <h3>Fur coat</h3>
                                    <p class="price">$143</p>

                                </div>
                            </div>
                            <!- /.product -->
							<!--
                        </div>

                    </div>
					end of comments by Shang -->

					<!-- commented by Shang 04/07/2017
                    <div class="row same-height-row">
                        <div class="col-md-3 col-sm-6">
                            <div class="box same-height">
                                <h3>Products viewed recently</h3>
                            </div>
                        </div>


                        <div class="col-md-3 col-sm-6">
                            <div class="product same-height">
                                <div class="flip-container">
                                    <div class="flipper">
                                        <div class="front">
                                            <a href="detail.html">
                                                <img src="img/product2.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                        <div class="back">
                                            <a href="detail.html">
                                                <img src="img/product2_2.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a href="detail.html" class="invisible">
                                    <img src="img/product2.jpg" alt="" class="img-responsive">
                                </a>
                                <div class="text">
                                    <h3>Fur coat</h3>
                                    <p class="price">$143</p>
                                </div>
                            </div>
                            <!- /.product -->
							<!--
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="product same-height">
                                <div class="flip-container">
                                    <div class="flipper">
                                        <div class="front">
                                            <a href="detail.html">
                                                <img src="img/product1.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                        <div class="back">
                                            <a href="detail.html">
                                                <img src="img/product1_2.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a href="detail.html" class="invisible">
                                    <img src="img/product1.jpg" alt="" class="img-responsive">
                                </a>
                                <div class="text">
                                    <h3>Fur coat</h3>
                                    <p class="price">$143</p>
                                </div>
                            </div>
                            <!- /.product -->
							<!--
                        </div>


                        <div class="col-md-3 col-sm-6">
                            <div class="product same-height">
                                <div class="flip-container">
                                    <div class="flipper">
                                        <div class="front">
                                            <a href="detail.html">
                                                <img src="img/product3.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                        <div class="back">
                                            <a href="detail.html">
                                                <img src="img/product3_2.jpg" alt="" class="img-responsive">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <a href="detail.html" class="invisible">
                                    <img src="img/product3.jpg" alt="" class="img-responsive">
                                </a>
                                <div class="text">
                                    <h3>Fur coat</h3>
                                    <p class="price">$143</p>

                                </div>
                            </div>
                            <!- /.product -->
							<!--
                        </div>

                    </div>
					end of comments by Shang -->
				<!--		</xsl:for-each>
					</xsl:if>	
				</xsl:for-each > -->
                </div>
                <!-- /.col-md-9 -->
            </div>
            <!-- /.container -->
        </div>
        <!-- /#content -->


        <!-- *** FOOTER ***
 _________________________________________________________ -->
        <div id="footer" data-animate="fadeInUp">
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-sm-6">
                        <h4>Information</h4>

                        <ul>
                            <li><a href="aboutus.html">About us</a>
                            </li>
                            <li><a href="terms.html">Terms and conditions</a>
                            </li>
                            <li><a href="faq.html">FAQ</a>
                            </li>
                            <li><a href="contact.html">Contact us</a>
                            </li>
                        </ul>



                        <h4>User section</h4>

                        <ul>
                            <li><a href="#" data-toggle="modal" data-target="#login-modal">Login</a>
                            </li>
                            <li><a href="register.html">Regiter</a>
                            </li>
                        </ul>

                        <hr class="hidden-md hidden-lg hidden-sm"></hr>

                    </div>
                    <!-- /.col-md-3 -->

                    <div class="col-md-3 col-sm-6">

                        <h4>Top categories</h4>

                        <h5>Furniture</h5>

                        <ul>
                            <li><a href="shop-furniture.html?value=Chairs" >Chairs</a><!-- href changed by Wentao Yan at 01/08/2018 -->
                            </li>
                            <li><a href="shop-furniture.html?value=Beds">Beds</a><!-- href changed by Wentao Yan at 01/08/2018 -->
                            </li>
                            <li><a href="shop-furniture.html?value=Tables">Tables</a><!-- href changed by Wentao Yan at 01/08/2018 -->
                            </li>
                            <li><a href="shop-furniture.html?value=Storage">Storage</a><!-- href changed by Wentao Yan at 01/08/2018 -->
                            </li>
                        </ul>

                        <h5>Accessories</h5>
                        <ul>
                            <li><a href="shop-furniture.html?value=HomeDeco">Home Deco</a><!-- href changed by Wentao Yan at 01/08/2018 -->
                            </li>
                            <li><a href="shop-furniture.html?value=TextilesRugs">Textiles &amp; Rugs</a><!-- href changed by Wentao Yan at 01/08/2018 -->
                            </li>
                            <li><a href="shop-furniture.html?value=Lighting">Lighting</a><!-- href changed by Wentao Yan at 01/08/2018 -->
                            </li>
                            <li><a href="shop-furniture.html?value=PlantpotsStands">Plant pots &amp; Stands</a><!-- href changed by Wentao Yan at 01/08/2018 -->
                            </li>
                        </ul>

                        <hr class="hidden-md hidden-lg"></hr>

                    </div>
                    <!-- /.col-md-3 -->

                    <div class="col-md-3 col-sm-6">

                        <h4>Where to find us</h4>

                        <p><strong>Universal Ltd.</strong>
                            <br>500 Main Street</br>
                            <br>Geelong </br>
                            <br>Victoria 3200</br>
                            <br></br>
                            <strong>Australia</strong>
                        </p>

                        <a href="contact.html">Go to contact page</a>

                        <hr class="hidden-md hidden-lg"></hr>

                    </div>
                    <!-- /.col-md-3 -->



                    <div class="col-md-3 col-sm-6">

                        
                        <h4>Stay in touch</h4>

                        <p class="social">
                            <a href="#" class="facebook external" data-animate-hover="shake"><i class="fa fa-facebook"></i></a>
                            <a href="#" class="twitter external" data-animate-hover="shake"><i class="fa fa-twitter"></i></a>
                            <a href="#" class="instagram external" data-animate-hover="shake"><i class="fa fa-instagram"></i></a>
                            <a href="#" class="gplus external" data-animate-hover="shake"><i class="fa fa-google-plus"></i></a>
                            <a href="#" class="email external" data-animate-hover="shake"><i class="fa fa-envelope"></i></a>
                        </p>


                    </div>
                    <!-- /.col-md-3 -->

                </div>
                <!-- /.row -->

            </div>
            <!-- /.container -->
        </div>
        <!-- /#footer -->

        <!-- *** FOOTER END *** -->




        <!-- *** COPYRIGHT ***
 _________________________________________________________ -->
        <div id="copyright">
            <div class="container">
                <div class="col-md-6">
                    <p class="pull-left"> 2018 Universal Ltd.</p>

                </div>
                <div class="col-md-6">
                    <p class="pull-right">Template by <a href="https://bootstrapious.com/e-commerce-templates">Bootstrapious.com</a>
                         <!-- Not removing these links is part of the license conditions of the template. Thanks for understanding :) If you want to use the template without the attribution links, you can do so after supporting further themes development at https://bootstrapious.com/donate  -->
                    </p>
                </div>
            </div>
        </div>
        <!-- *** COPYRIGHT END *** -->



    </div>
    <!-- /#all -->


    

    <!-- *** SCRIPTS TO INCLUDE ***
 _________________________________________________________ -->
    <script src="js/jquery-1.11.0.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <script src="js/waypoints.min.js"></script>
    <script src="js/modernizr.js"></script>
    <script src="js/bootstrap-hover-dropdown.js"></script>
    <script src="js/owl.carousel.min.js"></script>
    <script src="js/front.js"></script>

	<!-- added by shang for range slider -->
	<!-- range slider plugins.js -->
    <script src="js/plugins.js"></script>
    <!-- range slider Active js -->
    <script src="js/active.js"></script>
    <script src = "js/getDetails.js"></script>

   	<!-- script added by Wentao Yan at 03/09/2018 -->
	<script src = "js/getProducts.js"></script> 
	<script src="js/ValidateInput.js"></script>
	<script src = "php/functions.inc.php?action=showAmount"></script> 
</body>

</html>

</xsl:template>

</xsl:stylesheet>  <!-- end of XSL -->
<?php /* This page is designed to set oracle user login and password info */
  $dbuser = "yanwe";  /* deakin login username */
  $dbpass = "change2015.";  /* deakin password */
  $dbname = "SSID"; 
  $db = oci_connect($dbuser, $dbpass, $dbname); 

  if (!$db)  {
    echo "An error occurred connecting to the database"; 
    exit; 
  }

?>
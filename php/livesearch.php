<?php /* This page is designed to do live search in navigation bar */
// Include database connection
require_once('global-connect.inc.php');

$search = strip_tags($_GET['target']);
$sql =	"SELECT * FROM products WHERE lower(Name) LIKE lower('%$search%')";

$stmt = oci_parse($db, $sql);

if(!$stmt)  {
	echo "An error occurred in parsing the sql string.\n"; 
	exit; 
  }
oci_execute($stmt); 
 
$output[] = '';

while(oci_fetch_array($stmt)) {
	$name= oci_result($stmt,"NAME");
	$output[] = '<label onMouseOver = "this.style.color = \'#00F\'" onMouseOut = "this.style.color = \'#000\'" onclick = "jumpToDetail(this.innerHTML);">'.$name.'</label><br />';
}
$output[] = '</ul>';
echo join('',$output);		
oci_close($db); 

  
?>
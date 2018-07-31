<?php
	$servername = ""; /*Redacted*/
	$username = ""; /*Redacted*/
	$password = ""; /*Redacted*/
	$dbname = ""; /*Redacted*/

	// Create connection
	$conn = new mysqli($servername, $username, $password);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	// Drop database
	$sql = "DROP DATABASE " . $dbname;
	if ($conn->query($sql) === TRUE) {
		echo "Database dropped successfully <br>";
	} else {
		echo "Couldn't drop database: " . $conn->error;
	}
	
	$conn->close();

?>

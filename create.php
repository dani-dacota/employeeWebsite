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
	
	// Create database
	$sql = "CREATE DATABASE " . $dbname;
	if ($conn->query($sql) === TRUE) {
		echo "Database created successfully <br>";
	} else {
		echo "Error creating database: " . $conn->error;
	}
	$conn->close();
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	// sql to create table
	$sql = "CREATE TABLE employee (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
	FirstName VARCHAR(11) NOT NULL,
	LastName VARCHAR(11) NOT NULL,
	Hours INT(11) NOT NULL,
	HourlyPay INT(11) NOT NULL
	)";
	if ($conn->query($sql) === TRUE) {
		echo "Table employeee created successfully <br>";
	} else {
		echo "Error creating table: " . $conn->error;
	}
	$conn->close();

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "INSERT INTO employee (FirstName, Lastname, Hours, HourlyPay)
	VALUES ('John', 'Doe', '13', '20')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO employee (FirstName, Lastname, Hours, HourlyPay)
	VALUES ('Jane', 'Doe', '15', '22')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO employee (FirstName, Lastname, Hours, HourlyPay)
	VALUES ('Tom', 'Riddle', '12', '17')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO employee (FirstName, Lastname, Hours, HourlyPay)
	VALUES ('Tom', 'Cruise', '13', '19')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	$sql = "INSERT INTO employee (FirstName, Lastname, Hours, HourlyPay)
	VALUES ('Harry', 'Potter', '19', '27')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO employee (FirstName, Lastname, Hours, HourlyPay)
	VALUES ('Prince', 'Harry', '23', '11')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO employee (FirstName, Lastname, Hours, HourlyPay)
	VALUES ('Evelyn', 'Pepper', '32', '21')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	$sql = "INSERT INTO employee (FirstName, Lastname, Hours, HourlyPay)
	VALUES ('Harry', 'Jr.', '19', '14')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	echo "Employees Table Complete!<br>";
	
	$sql = "CREATE TABLE revenue (
	month INT(11) AUTO_INCREMENT PRIMARY KEY,
	GrossIncome INT(11) NOT NULL,
	FixedCosts INT(11) NOT NULL,
	GrossProfit INT(11) NOT NULL
	)";
	if ($conn->query($sql) === TRUE) {
		echo "Table revenue created successfully <br>";
	} else {
		echo "Error creating table: " . $conn->error;
	}
	$conn->close();

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	$sql = "INSERT INTO revenue (GrossIncome, FixedCosts, GrossProfit)
	VALUES ('2500', '1500', '1200')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO revenue (GrossIncome, FixedCosts, GrossProfit)
	VALUES ('3000', '1800', '1500')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO revenue (GrossIncome, FixedCosts, GrossProfit)
	VALUES ('3500', '2000', '1200')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	$sql = "INSERT INTO revenue (GrossIncome, FixedCosts, GrossProfit)
	VALUES ('2700', '1100', '1300')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO revenue (GrossIncome, FixedCosts, GrossProfit)
	VALUES ('2100', '900', '800')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

	$sql = "INSERT INTO revenue (GrossIncome, FixedCosts, GrossProfit)
	VALUES ('1100', '500', '200')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully <br>";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
	
	echo "Revenue Table Complete!";
	
	$conn->close();
?>

<?php
	$servername = ""; /*Redacted*/
	$username = ""; /*Redacted*/
	$password = ""; /*Redacted*/
	$databaseName = ""; /*Redacted*/

	$request = $_GET['request'];

		 if ($request == "show"){
         $query = "SELECT * FROM employee";
		 }

		 if ($request == "search"){
         $searchInput = $_GET['q'];
         $query = "SELECT * FROM employee WHERE LastName Like '" . $searchInput ."%' OR FirstName Like '" . $searchInput ."%'";
		 }

		 if ($request == "add"){
         $fName = $_GET["first"];
		 $lName = $_GET["last"];
		 $hours = intval($_GET["hours"]);
		 $hourly = intval($_GET["hourly"]);
		 if ($fName == "" || $lName == "") die("Name Cannot be Blank! </body></html>");
         $query = "INSERT INTO employee ( FirstName, LastName, Hours, HourlyPay ) VALUES ('".$fName."', '".$lName."', '".$hours."', '".$hourly."')";
		 }

		 if ($request == "revenue"){
         $grossIncome = intval($_GET['q']);
		 $grossCost = 0;
         $query = "SELECT * FROM employee";
		 }
		 
		 if ($request == "addToRevenue"){
         $income = intval($_GET["income"]);
		 $costs = intval($_GET["costs"]);
		 $profit = intval($_GET["profit"]);
         $query = "INSERT INTO revenue (GrossIncome, FixedCosts, GrossProfit) VALUES ('".$income."', '".$costs."', '".$profit."')";
		 }
		 
		 if ($request == "draw"){
         $query = "SELECT * FROM revenue";
		 }

		 if ($request == "delete"){
         $id = intval($_GET['id']);
         $query = "DELETE FROM employee WHERE id = '". $id . "'";
		 }

		 if ($request == "addHours"){
         $id = intval($_GET['id']);
		 $hours = intval($_GET['hours']);
		 $hours++;
         $query = "UPDATE employee SET Hours ='". $hours ."' WHERE id = '". $id . "'";
		 }

		 if ($request == "deleteHours"){
         $id = intval($_GET['id']);
		 $hours = intval($_GET['hours']);
		 $hours--;
         $query = "UPDATE employee SET Hours ='". $hours ."' WHERE id = '". $id . "'";
		 }

		 if ($request == "addHourly"){
         $id = intval($_GET['id']);
		 $hourly = intval($_GET['hourly']);
		 $hourly++;
         $query = "UPDATE employee SET HourlyPay ='". $hourly ."' WHERE id = '". $id . "'";
		 }

		 if ($request == "deleteHourly"){
         $id = intval($_GET['id']);
		 $hourly = intval($_GET['hourly']);
		 $hourly--;
         $query = "UPDATE employee SET HourlyPay ='". $hourly ."' WHERE id = '". $id . "'";
		 }


         // Connect to mysql
         if ( !( $connection = mysqli_connect( $servername, $username, $password, $databaseName ) ) )
            die( "Could not connect to database </body></html>" );


         // query Employee database
		  if ( !( $result = mysqli_query( $connection, $query ) ) )
         {
            print( "<p>Could not execute query!</p>" );
            die( mysql_error() . "</body></html>" );
         }
		 if (!$result) {
			$message  = 'Invalid query: ' . mysql_error() . "\n";
			$message .= 'Whole query: ' . $query;
			die($message);
		}
		
		if ($request == "draw"){
			header ("Content-type: text/xml");
			echo "<?xml version='1.0' encoding='UTF-8'?>". PHP_EOL;
			echo "<report>". PHP_EOL;
			
			while($row = mysqli_fetch_assoc($result)){
				$x = array($row['month'], $row['GrossIncome'] , $row['FixedCosts'], $row['GrossProfit']);
				echo "<entry>". PHP_EOL;
				echo "<month>".$x[0]."</month>". PHP_EOL;
				echo "<income>".$x[1]."</income>". PHP_EOL;
				echo "<costs>".$x[2]."</costs>". PHP_EOL;
				echo "<profit>".$x[3]."</profit>". PHP_EOL;	
				echo "</entry>". PHP_EOL;
			}	
			echo ("</report>");
			die();
		}		

		if ($request == "show" || $request == "search" || $request == "revenue"){

			echo "<table border = '1'>
				<tr>
				<th>Firstname</th>
				<th>Lastname</th>
				<th>Hours</th>
				<th>Hourly Pay</th>";
				if ($request == "show" || $request == "search"){
					echo ("<th colspan=\"2\">Hours</th>");
					echo ("<th colspan=\"2\">Hourly Pay</th>");
					echo "<th>Delete</th>";
				}
				if ($request == "revenue"){
					echo "<th>Salary</th>";
				}
			echo "</tr>";


			while($row = mysqli_fetch_assoc($result)) {
				echo "<tr>";
				echo "<td>" . $row['FirstName'] . "</td>";
				echo "<td>" . $row['LastName'] . "</td>";
				echo "<td class = \"num\">" . $row['Hours'] . "</td>";
				echo "<td class = \"num\">" . $row['HourlyPay'] . "</td>";

				if ($request == "show" || $request == "search"){
					echo "<td class = \"del\">";
					echo "<input type=\"button\" id=\"".$row['id']."\" name=\"".$row['Hours']."\" value = \"-\" onClick = \"deleteHours(this)\"></input>";
					echo "</td>";

					echo "<td class = \"del\">";
					echo "<input type=\"button\" id=\"".$row['id']."\" name=\"".$row['Hours']."\" value = \"+\" onClick = \"addHours(this)\"></input>";
					echo "</td>";

					echo "<td class = \"del\">";
					echo "<input type=\"button\" id=\"".$row['id']."\" name=\"".$row['HourlyPay']."\" value = \"-\" onClick = \"deleteHourly(this)\"></input>";
					echo "</td>";

					echo "<td class = \"del\">";
					echo "<input type=\"button\" id=\"".$row['id']."\" name=\"".$row['HourlyPay']."\" value = \"+\" onClick = \"addHourly(this)\"></input>";
					echo "</td>";

					echo "<td class = \"del\">";
					echo "<input type=\"button\" id=\"".$row['id']."\" name=\"".$row['FirstName']."\" value = \"Delete\" onClick = \"deleteEmployee(this)\"></input>";
					echo "</td>";
				}

				if ($request == "revenue"){
					echo "<td class = \"num\">" . ($row['Hours']* $row['HourlyPay']) . "</td>";
					$grossCost += ($row['Hours']* $row['HourlyPay']) ;
				}

				echo "</tr>";
			}
			if ($request == "revenue"){
				echo ("<tr>");
				echo ("<td colspan=\"2\"><strong>Variable Costs</strong></td>");
				echo ("<td colspan=\"3\">".$grossCost."</td>");
				echo ("</tr>");
			}

			echo "</table>";

			if ($request == "revenue"){
				$grossProfit = $grossIncome-$grossCost;
				echo ("<br><strong>Gross Profit:</strong> ".$grossProfit."</p><br>");
				echo ("<input id = \"grossProfit\" type = \"hidden\" value = \"".$grossProfit."\">");
				echo ("<input id = \"addToRevenue\" type = \"button\" value = \"Save as End of Month Report\" onClick = \"addToRevenue()\">");
				echo ("<p id = \"addToRevenueResponse\"></p>");
			}
		}
		
		if ($request == "add"){
			echo "Added Successfully";
		}
		
		if ($request == "addToRevenue"){
			echo "Monthly Report Saved!";
		}
		
		mysqli_close( $connection );
?>

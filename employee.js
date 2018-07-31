view = "";
chart = new Array();
monthly = new Array();
	//window.addEventListener("load", getBrowser);
	window.addEventListener("load", showHome);
	window.addEventListener( 'resize', initializeChart, false);
	
	function getBrowser() {
	// Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;
	
	//var output = "unknown";
	//if (isOpera) output = "opera";
	//if (isFirefox) output = "firefox";
	//if (isSafari) output = "safari";
	//if (isIE) output = "ie";
	//if (isEdge) output = "edge";
	//if (isChrome) output = "chrome";
	//if (isBlink) output = "blink";
	//alert(output);
	
	if (isEdge || isIE) alert ("Please switch to a modern web browser (Chrome, Opera or Firefox) for full compatability.");
	}
	
	function resetArray(){
		monthly = [];
	}
		
	function resetChart(){
		chart = [];
	}
	
	function showHome(){
		document.getElementById("aboutUs").style.display = "none";
		document.getElementById("employees").style.display = "none";
		document.getElementById("budget").style.display = "none";
		document.getElementById("home").style.display = "block";
	}
	
	function showAboutUs(){
		document.getElementById("home").style.display = "none";
		document.getElementById("budget").style.display = "none";
		document.getElementById("employees").style.display = "none";
		document.getElementById("aboutUs").style.display = "block";
	}
	
	function showRevenueTool(){
		document.getElementById("home").style.display = "none";
		document.getElementById("employees").style.display = "none";
		document.getElementById("budget").style.display = "block";
		document.getElementById("aboutUs").style.display = "none";
		showRevenueForm();
	}
	
	function showRevenueGraph(){
		document.getElementById("home").style.display = "none";
		document.getElementById("employees").style.display = "none";
		document.getElementById("budget").style.display = "block";
		document.getElementById("aboutUs").style.display = "none";
		showGraphForm();
	}
	
	function showEmployeeAll(){
		document.getElementById("home").style.display = "none";
		document.getElementById("employees").style.display = "block";
		document.getElementById("budget").style.display = "none";
		document.getElementById("aboutUs").style.display = "none";
		showAllEmployees();
	}
	
	function showEmployeeAdd(){
		document.getElementById("home").style.display = "none";
		document.getElementById("employees").style.display = "block";
		document.getElementById("budget").style.display = "none";
		document.getElementById("aboutUs").style.display = "none";
		showAddEmployeeForm();
	}
	
	function showEmployeeSearch(){
		document.getElementById("home").style.display = "none";
		document.getElementById("employees").style.display = "block";
		document.getElementById("budget").style.display = "none";
		document.getElementById("aboutUs").style.display = "none";
		showSearchForm();
	}

	function showDatabase(){
		view = "database";
		document.getElementById("search").style.display = "none";
		document.getElementById("databaseEmployees").style.display = "block";
		document.getElementById("addEntry").style.display = "none";
	}


	function showAllEmployees(){
		showDatabase();
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("Database").innerHTML = xmlhttp.responseText;
			}
		};
		xmlhttp.open("GET","databaseMain.php?request=show",true);
        xmlhttp.send();
	}

	function showSearchForm(){
		view = "search";
		document.getElementById("search").style.display = "block";
		document.getElementById("databaseEmployees").style.display = "none";
		document.getElementById("addEntry").style.display = "none";
		document.getElementById("searchInput").focus();
	}

	function searchEmployee(){
		var str = document.getElementById("searchInput").value;
		if (str == "") {
			document.getElementById("Names").innerHTML = "";
			return;
		} else {
				xmlhttp = new XMLHttpRequest();
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						document.getElementById("Names").innerHTML = xmlhttp.responseText;
					}
				};
		}
		xmlhttp.open("GET","databaseMain.php?request=search&q="+str,true);
        xmlhttp.send();
	}

	function showRevenueForm(){
		view = "revenue";
		document.getElementById("revenue").style.display = "block";
		document.getElementById("graph").style.display = "none";
		document.getElementById("income").focus();
		calcRevenue();
	}
	
	function showGraphForm(){
		document.getElementById("revenue").style.display = "none";
		document.getElementById("graph").style.display = "block";
		getData();
		initializeChart();
	}

	function calcRevenue(){
		rev = (+income.value) - (+costs.value);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("calculatedRevenue").innerHTML = xmlhttp.responseText;
			}
		};
		xmlhttp.open("GET","databaseMain.php?request=revenue&q="+rev,true);
        xmlhttp.send();
	}

	function showAddEmployeeForm(){
		view = "add";
		document.getElementById("revenue").style.display = "none";
		document.getElementById("search").style.display = "none";
		document.getElementById("databaseEmployees").style.display = "none";
		document.getElementById("addEntry").style.display = "block";
		document.getElementById("first").focus();
	}

	function addEmployee(){
		data = 	 'first=' + document.getElementById("first").value +
				 '&last=' + document.getElementById("last").value +
				 '&hours=' + document.getElementById("hours").value +
				 '&hourly=' + document.getElementById("hourly").value;

		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("addResponse").innerHTML = xmlhttp.responseText;
			}
		};
		xmlhttp.open("GET","databaseMain.php?request=add&"+data,true);
        xmlhttp.send();
		document.getElementById("first").value= "";
		document.getElementById("last").value= "";
		document.getElementById("hours").value= "0";
		document.getElementById("hourly").value= "";
	}

	function deleteEmployee(item){
		if(document.getElementById("delCheck").checked || confirm("Are you sure you want to delete "+item.name+"?")){
			id = +(item.id);
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET","databaseMain.php?request=delete&id="+id,false);
			xmlhttp.send();
			if (view == "database")showAllEmployees();
			if (view == "search") searchEmployee();
		}
	}

	function deleteHours(item){
		hours = +(item.name);
		id =  +(item.id);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","databaseMain.php?request=deleteHours&id="+id+"&hours="+hours,false);
        xmlhttp.send();
		if (view == "database")showAllEmployees();
		if (view == "search") searchEmployee();
	}

	function addHours(item){
		hours = +(item.name);
		id =  +(item.id);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","databaseMain.php?request=addHours&id="+id+"&hours="+hours,false);
        xmlhttp.send();
		if (view == "database") showAllEmployees();
		if (view == "search") searchEmployee();
	}

	function deleteHourly(item){
		hourly = +(item.name);
		id =  +(item.id);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","databaseMain.php?request=deleteHourly&id="+id+"&hourly="+hourly,false);
        xmlhttp.send();
		if (view == "database")showAllEmployees();
		if (view == "search") searchEmployee();
	}

	function addHourly(item){
		hourly = +(item.name);
		id =  +(item.id);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.open("GET","databaseMain.php?request=addHourly&id="+id+"&hourly="+hourly,false);
        xmlhttp.send();
		if (view == "database") showAllEmployees();
		if (view == "search") searchEmployee();
	}
	
	function addToRevenue(){
		profit = +(grossProfit.value);
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				document.getElementById("addToRevenueResponse").innerHTML = xmlhttp.responseText;
			}
		};
		xmlhttp.open("GET","databaseMain.php?request=addToRevenue&income="+income.value+"&costs="+costs.value+"&profit="+profit,true);
		xmlhttp.send();
	}
	
	function getData(){
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				var xmlDoc = xmlhttp.responseXML;
				x = xmlDoc.getElementsByTagName("entry");
				resetArray();
				for (i = 0; i < x.length; i++){
					monthly [i] = {
					month: parseInt(x[i].getElementsByTagName("month")[0].childNodes[0].nodeValue),
					income: parseInt(x[i].getElementsByTagName("income")[0].childNodes[0].nodeValue),
					costs: parseInt(x[i].getElementsByTagName("costs")[0].childNodes[0].nodeValue), 
					profit: parseInt(x[i].getElementsByTagName("profit")[0].childNodes[0].nodeValue)
					};
				}
			}
		};
		xmlhttp.open("GET","databaseMain.php?request=draw",false);
		xmlhttp.send();
	}
	
	function setData(record){
		//record = document.getElementById("chartVertical").value;
		//record = "profit";
		resetChart();
		for ( i = 0; i < monthly.length; i++){
				xRecord = monthly[i].month;
				yRecord = "";
				if (record == "income") yRecord = monthly[i].income;
				if (record == "costs") yRecord = monthly[i].costs;
				if (record == "profit") yRecord = monthly[i].profit;
				chart [chart.length] ={x: xRecord, y: yRecord};
		}
	}
	
	function initializeChart(){
			c = document.getElementById("myCanvas");
			width = document.getElementById("content").offsetWidth;
			height = width*7/16;
			c.width = width;
			c.height = height;
			ctx = c.getContext("2d");
			ctx.clearRect(0, 0, width, height);
			scale = 0.05*width;
			bottomLeftX = scale;
			bottomLeftY = height - scale;
			topRightX = width - scale;
			topRightY = scale;
			yMaxValue = 0;
			yMinValue = 0;
			yMaxValueTemp = 0;
			yMinValue = 0;
			verticalValue = document.getElementById("chartVertical").value;
			if (verticalValue == "income") {
				setData("income");
				yMaxValue = yMax(chart);
				yMinValue = yMin(chart);
			}
			if (verticalValue == "costs") {
				setData("costs");
				yMaxValue = yMax(chart);
				yMinValue = yMin(chart);
			}
			if (verticalValue == "profit") {
				setData("profit");
				yMaxValue = yMax(chart);
				yMinValue = yMin(chart);
			}
			if (verticalValue == "all") {
				setData("income");
				yMaxValue = yMax(chart);
				yMinValue = yMin(chart);
				//console.log("min,max:"+yMinValue+","+yMaxValue);
				setData("costs");
				yMaxValueTemp = yMax(chart);
				yMinValueTemp = yMin(chart);
				//console.log("temp: min,max:"+yMinValueTemp+","+yMaxValueTemp);
				if (yMaxValueTemp > yMaxValue) yMaxValue = yMaxValueTemp;
				if (yMinValueTemp < yMinValue) yMinValue = yMinValueTemp;
				//console.log("min,max:"+yMinValue+","+yMaxValue);
				setData("profit");
				yMaxValueTemp = yMax(chart);
				yMinValueTemp = yMin(chart);
				//console.log("temp: min,max:"+yMinValueTemp+","+yMaxValueTemp);
				if (yMaxValueTemp > yMaxValue) yMaxValue = yMaxValueTemp;
				if (yMinValueTemp < yMinValue) yMinValue = yMinValueTemp;
				//console.log("min,max:"+yMinValue+","+yMaxValue);
			}
			
			xDist = width - (2*scale);
			yDist = height - (2*scale);
			xDiv = xDist/(chart.length-1);
			yRange = yMaxValue-yMinValue;
			yDiv = yDist/((yRange));
			ctx = c.getContext("2d");
			ctx.moveTo(bottomLeftX, bottomLeftY);
			ctx.lineTo(bottomLeftX, topRightY);
			ctx.stroke();
			increment = -yMinValue*yDiv;
			originX = bottomLeftX;
			originY = bottomLeftY-increment;
			ctx.moveTo(originX,originY);
			ctx.lineTo(topRightX, originY);
			ctx.stroke();
			ctx.font = (0.27*scale)+"px Arial";
			ctx.textAlign="end"; 
			divisions = 10;
			for (i = 0; i <= divisions; i++){
				unit = "";
				factor = 1;
				if (yMaxValue < 100000){
				
				}
				else if (yMaxValue > 100000 && yMaxValue < 10000000) {
					unit = "K";
					factor = 1000;
				}
				else if (yMaxValue > 10000000) {
					unit = "M";
					factor = 1000000;
				}
				ctx.fillText("$"+parseInt((yMinValue+(yRange*i/(divisions*factor))))+unit,bottomLeftX-(0.1*scale),bottomLeftY-(yDist*i/divisions)+0.05*scale);
				ctx.moveTo(bottomLeftX-0.05*scale,bottomLeftY-(yDist*i/divisions));
				ctx.lineTo(bottomLeftX+0.05*scale,bottomLeftY-(yDist*i/divisions));
				ctx.stroke();
			}
			ctx.textAlign="left"; 
			ctx.textBaseline="center"; 
			//ctx.fillText("",0.05*scale,originY);
			ctx.textAlign="left"; 
			ctx.textBaseline="top"; 
			ctx.font = (0.27*scale)+"px Arial";
			for (i = 0; i < chart.length;i++ ){ 
					ctx.beginPath();
					if (i == 1) ctx.textAlign="center"; 
					ctx.fillText(chart[i].x,(i*xDiv)+originX,originY+0.1*scale);
					ctx.moveTo((i*xDiv)+originX,originY-0.05*scale);
					ctx.lineTo((i*xDiv)+originX,originY+0.05*scale);
					ctx.stroke();
				}
			ctx.textAlign="center";
			ctx.textBaseline="bottom";
			ctx.font = (0.32*scale)+"px Arial";
			ctx.fillText("Months", width/2, height-(0.1*scale));
			function drawLine (color){
				ctx.textAlign="left"; 
				ctx.textBaseline="top"; 
				ctx.font = (0.27*scale)+"px Arial";
				for (i = 0; i < chart.length;i++ ){ 
					if (i != 0) {
						ctx.lineTo((i*xDiv)+originX,(originY)-((chart[i].y*yDiv)));
						ctx.strokeStyle=color;
						ctx.lineWidth=2;
						ctx.stroke();
						ctx.lineWidth=1;
						ctx.strokeStyle="black";
					}
				
					ctx.beginPath();
					if (i == 1) ctx.textAlign="center"; 
					ctx.moveTo((i*xDiv)+originX,(originY)-((chart[i].y*yDiv)));
				}
			}
			if (verticalValue != "all") {
				drawLine("green");
			}
			else {
				setData("profit");
				drawLine("red");
				ctx.textAlign="left";
				ctx.textBaseline="top";
				ctx.fillStyle="red";
				ctx.font = "bold"+(0.5*scale)+"px Arial";
				ctx.fillText("Profit",originX,(0.3*scale));
				setData("costs");
				drawLine("blue");
				ctx.textAlign="center";
				ctx.textBaseline="top";
				ctx.fillStyle="blue";
				ctx.font = "bold"+(0.5*scale)+"px Arial";
				ctx.fillText("Costs",originX+(xDist/2),(0.3*scale));
				setData("income");
				drawLine("green");
				ctx.textAlign="right";
				ctx.textBaseline="top";
				ctx.fillStyle="green";
				ctx.font = "bold"+(0.5*scale)+"px Arial";
				ctx.fillText("Income",width-scale,(0.3*scale));
				
			}
	}
	
	function yMax(items){
		yMaximum = items[0].y;
		for (i=1; i<items.length; i++){
			if (items[i].y > yMaximum) yMaximum = items[i].y;
		}
		return yMaximum;
	}
	
	function yMin(items){
		yMinimum = 0;
		for (i=1; i<items.length; i++){
			if (items[i].y < yMinimum) yMinimum = items[i].y;
		}
		return yMinimum;
	}
//function to open/close main manager page
function openManageSess(open){
	if(open){
		hideElems(["startPage"]);
		showElems(["managePage", "manageButs"]);
	}else{
		closeManager();
		showHelp(false);
		hideElems(["managePage", "manageButs", "dbManager", "mngAddForm", "mngAddStarter", "manBackBut"]);
		showElems(["startPage"]);
		//reload tables for pages since changes may have been made in manager
		fillSubjTable();
		hideSubjTable();
		createIndGoalTable();
		createDirGoalTable();
		createMethTaskPg();
		createUttPage();
		createDelivTable();
	}
}

//function to reset table manager, go back to the manage options
function resetMan(){
	closeManager();
	hideElems(["dbManager", "mngAddStarter", "mngAddForm", "manBackBut"]);
	showElems(["manageButs"]);
}

//function to close the open manager parts when navigating
function closeManager(){
	//loop through table and empty, reset title to empty
	var manTable = document.getElementById("manageTable");
	var mLength = manTable.rows.length;
	for(var clearCount = 0; clearCount<mLength-1; clearCount++){
		manTable.deleteRow(1);
	}	
	document.getElementById("manageTitle").innerHTML = '';
	document.getElementById("mngInput").value = '';
}

var tableType; //global table to type to track current table in manager
//function to display the selected tables' contents in manage mode
function manageType(tableContent){
	hideElems(["manageButs"]);
	showElems(["dbManager", "manBackBut"]);
	var manTable = document.getElementById("manageTable");
	tableType = tableContent;
	
	//different db transations for each table case
	switch (tableContent) {
		case "subject":
			document.getElementById("manageTitle").innerHTML = 'Manage Patients';
			document.getElementById("manText").innerHTML = '<b>Patient ID</b>';
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM SUBJ_INFO', [], function (tx, results) {
				var len = results.rows.length;
				var currRow, stateChange, grayText;
					for (i = 0; i < len; i++){ 
						currRow = manTable.insertRow(i+1);
						if(results.rows.item(i).showSubject == 1){
							stateChange = 'Hide';
							grayText = false;
						}else{
							stateChange = 'Show';
							grayText = true;
						}
						currRow.insertCell(0).innerHTML = '<input type="button" value="' + stateChange + '" onclick="changeVis(this)">';
						//currRow.insertCell(1).innerHTML = results.rows.item(i).subj_idText;
						var mngText = results.rows.item(i).subj_idText;
						if(grayText){currRow.insertCell(1).innerHTML = mngText.fontcolor("#616161");}else{currRow.insertCell(1).innerHTML = mngText;}
						currRow.insertCell(2).innerHTML = results.rows.item(i).subj_id; //hidden with CSS 
						currRow.insertCell(3).innerHTML = results.rows.item(i).showSubject; //hidden with CSS 
					}
				}, errorHandler);
			});
			break;

		case "indirect":
			document.getElementById("manageTitle").innerHTML = 'Manage Vocal Hygiene Goals';
			document.getElementById("manText").innerHTML = '<b>Goal text</b>';
			document.getElementById("mngAddStarter").innerHTML = 'Add New Goal';
			showElems(["mngAddStarter"]);
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM INDGOAL_ID', [], function (tx, results) {
				var len = results.rows.length;
				var currRow, stateChange, grayText;
					for (i = 0; i < len; i++){ 
						currRow = manTable.insertRow(i+1);
						if(results.rows.item(i).showIG == 1){
							stateChange = 'Hide';
							grayText = false;
						}else{
							stateChange = 'Show';
							grayText = true;
						}
						currRow.insertCell(0).innerHTML = '<input type="button" value="' + stateChange + '" onclick="changeVis(this)">';
						//currRow.insertCell(1).innerHTML = results.rows.item(i).iGoals;
						var mngText = results.rows.item(i).iGoals;
						if(grayText){currRow.insertCell(1).innerHTML = mngText.fontcolor("#616161");}else{currRow.insertCell(1).innerHTML = mngText;}
						currRow.insertCell(2).innerHTML = results.rows.item(i).ig_id; //hidden with CSS 
						currRow.insertCell(3).innerHTML = results.rows.item(i).showIG; //hidden with CSS 
					}
				}, errorHandler);
			});
			
			break;
		case "goals":
			document.getElementById("manageTitle").innerHTML = 'Manage Direct Intervention Goals';
			document.getElementById("manText").innerHTML = '<b>Goal text</b>';
			document.getElementById("mngAddStarter").innerHTML = 'Add New Goal';
			showElems(["mngAddStarter"]);
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM DIRGOAL_ID', [], function (tx, results) {
				var len = results.rows.length;
				var currRow, stateChange, grayText;
					for (i = 0; i < len; i++){ 
						currRow = manTable.insertRow(i+1);
						if(results.rows.item(i).showDG == 1){
							stateChange = 'Hide';
							grayText = false;
						}else{
							stateChange = 'Show';
							grayText = true;
						}
						currRow.insertCell(0).innerHTML = '<input type="button" value="' + stateChange + '" onclick="changeVis(this)">';
						var mngText = results.rows.item(i).dGoals;
						if(grayText){currRow.insertCell(1).innerHTML = mngText.fontcolor("#616161");}else{currRow.insertCell(1).innerHTML = mngText;}
						//currRow.insertCell(1).innerHTML = results.rows.item(i).dGoals;
						currRow.insertCell(2).innerHTML = results.rows.item(i).dg_id; //hidden with CSS 
						currRow.insertCell(3).innerHTML = results.rows.item(i).showDG; //hidden with CSS 
					}
				}, errorHandler);
			});			
			break;
		case "tools":
			document.getElementById("manageTitle").innerHTML = 'Manage Direct Intervention Tools';
			document.getElementById("manText").innerHTML = '<b>Tool text</b>';
			document.getElementById("mngAddStarter").innerHTML = 'Add New Tool';
			showElems(["mngAddStarter"]);
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM TOOL_ID', [], function (tx, results) {
				var len = results.rows.length;
				var currRow, stateChange, grayText;
					for (i = 0; i < len; i++){ 
						currRow = manTable.insertRow(i+1);
						if(results.rows.item(i).showTask == 1){
							stateChange = 'Hide';
							grayText = false;
						}else{
							stateChange = 'Show';
							grayText = true;
						}
						currRow.insertCell(0).innerHTML = '<input type="button" value="' + stateChange + '" onclick="changeVis(this)">';
						var mngText = results.rows.item(i).taskText;
						if(grayText){currRow.insertCell(1).innerHTML = mngText.fontcolor("#616161");}else{currRow.insertCell(1).innerHTML = mngText;}
						//currRow.insertCell(1).innerHTML = results.rows.item(i).taskText;
						currRow.insertCell(2).innerHTML = results.rows.item(i).toolID; //hidden with CSS 
						currRow.insertCell(3).innerHTML = results.rows.item(i).showTask; //hidden with CSS 
					}
				}, errorHandler);
			});				
			break;
		case "utter":
			document.getElementById("manageTitle").innerHTML = 'Manage Direct Intervention Utterance Levels';
			document.getElementById("manText").innerHTML = '<b>Utterance Level text</b>';
			document.getElementById("mngAddStarter").innerHTML = 'Add New Level';
			showElems(["mngAddStarter"]);
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM UTT_ID', [], function (tx, results) {
				var len = results.rows.length;
				var currRow, stateChange, grayText;
					for (i = 0; i < len; i++){ 
						emptySubs = false;
						currRow = manTable.insertRow(i+1);
						if(results.rows.item(i).showUtter == 1){
							stateChange = 'Hide';
							grayText = false;
						}else{
							stateChange = 'Show';
							grayText = true;
						}
						currRow.insertCell(0).innerHTML = '<input type="button" value="' + stateChange + '" onclick="changeVis(this)">';
						var mngText = results.rows.item(i).uttText;
						if(grayText){currRow.insertCell(1).innerHTML = mngText.fontcolor("#616161");}else{currRow.insertCell(1).innerHTML = mngText;}
						//currRow.insertCell(1).innerHTML = results.rows.item(i).uttText;
						currRow.insertCell(2).innerHTML = results.rows.item(i).utter_id; //hidden with CSS 
						currRow.insertCell(3).innerHTML = results.rows.item(i).showUtter; //hidden with CSS 
					}
				}, errorHandler);
			});					
			break;
		case "deliv":
			document.getElementById("manageTitle").innerHTML = 'Manage Direct Intervention Delivery Methods';
			document.getElementById("manText").innerHTML = '<b>Delivery Method text</b>';
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM DELIV_ID', [], function (tx, results) {
				var len = results.rows.length;
				var currRow, stateChange, grayText;
					for (i = 0; i < len; i++){ 
						currRow = manTable.insertRow(i+1);
						if(results.rows.item(i).showDeliv == 1){
							stateChange = 'Hide';
							grayText = false;
						}else{
							stateChange = 'Show';
							grayText = true;
						}
						currRow.insertCell(0).innerHTML = '<input type="button" value="' + stateChange + '" onclick="changeVis(this)">';
						var mngText = results.rows.item(i).delivText;
						if(grayText){currRow.insertCell(1).innerHTML = mngText.fontcolor("#616161");}else{currRow.insertCell(1).innerHTML = mngText;}
						//currRow.insertCell(1).innerHTML = results.rows.item(i).delivText;
						currRow.insertCell(2).innerHTML = results.rows.item(i).del_id; //hidden with CSS 
						currRow.insertCell(3).innerHTML = results.rows.item(i).showDeliv; //hidden with CSS 
					}
				}, errorHandler);
			});					
			break;
	}
}

//function to change visibility when click table item in manager
function changeVis(obj){
	var stateKey = obj.parentNode.parentNode.cells.item(2).innerHTML;
	var currState = obj.parentNode.parentNode.cells.item(3).innerHTML;
	var newState = 0;
	if (currState == '0'){newState = 1;}

	if(tableType == "subject"){
		db.transaction(function (tx) {tx.executeSql('UPDATE SUBJ_INFO SET showSubject = ? WHERE subj_id = ?', [newState, stateKey]);});
	}else if(tableType == "indirect"){
		db.transaction(function (tx) {tx.executeSql('UPDATE INDGOAL_ID SET showIG = ? WHERE ig_id = ?', [newState, stateKey]);});
	}else if(tableType == "goals"){
		db.transaction(function (tx) {tx.executeSql('UPDATE DIRGOAL_ID SET showDG = ? WHERE dg_id = ?', [newState, stateKey]);});
	}else if(tableType == "tools"){
		db.transaction(function (tx) {tx.executeSql('UPDATE TOOL_ID SET showTask = ? WHERE toolID = ?', [newState, stateKey]);});
	}else if(tableType == "utter"){
		db.transaction(function (tx) {tx.executeSql('UPDATE UTT_ID SET showUtter = ? WHERE utter_id = ?', [newState, stateKey]);});
	}else if(tableType == "deliv"){
		db.transaction(function (tx) {tx.executeSql('UPDATE DELIV_ID SET showDeliv = ? WHERE del_id = ?', [newState, stateKey]);});
	}
	//then reset and display new button with state change
	closeManager();
	manageType(tableType);
}

//function to add elements to db for certain tables
function mngAdd(open){
	if(open){
		showElems(["mngAddForm"]);
		hideElems(["mngAddStarter"]);
	}else{
		var newDbText = document.getElementById("mngInput").value;
		//add to db
		if(tableType == "indirect"){
			db.transaction(function (tx) {tx.executeSql('INSERT INTO INDGOAL_ID (ig_id, iGoals, showIG) VALUES (?, ?, ?)', [guid(), newDbText, 1], successHandler, errorHandler);});
		}else if(tableType == "goals"){
			db.transaction(function (tx) {tx.executeSql('INSERT INTO DIRGOAL_ID (dg_id, dGoals, showDG) VALUES (?, ?, ?)', [guid(), newDbText, 1], successHandler, errorHandler);});
		}else if(tableType == "tools"){
			db.transaction(function (tx) {tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, ?, ?, ?)', [guid(), newDbText, 16, 1], successHandler, errorHandler);});
		}else if(tableType == "utter"){
			db.transaction(function (tx) {tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, ?, ?)', [guid(), newDbText, 1], successHandler, errorHandler);});
		}
		document.getElementById("mngInput").value = '';	
		hideElems(["mngAddForm"]);
		showElems(["mngAddStarter"]);
		closeManager();
		manageType(tableType);
	}
}
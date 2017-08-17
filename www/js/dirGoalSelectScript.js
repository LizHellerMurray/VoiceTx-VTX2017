//function to create a table of direct goals in the database, resets each time 
function createDirGoalTable(){

	var dirTable = document.getElementById("dirSelectTable");
	var dLength = dirTable.rows.length;

	for(var clearCount = 0; clearCount<dLength-1; clearCount++){
		dirTable.deleteRow(1); 
	} 
	
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM DIRGOAL_ID WHERE showDG = ?', [1], function (tx, results) {	
			var len = results.rows.length;
			var currRow;				
				for (var i = 0; i < len; i++){ 
					currRow = dirTable.insertRow(i+1);
					currRow.insertCell(0).innerHTML = '<input type="button" value = "Select" onclick="changeDGoal(this)">';
					currRow.insertCell(1).innerHTML = results.rows.item(i).dGoals; //if(doneTest){currRow.insertCell(1).innerHTML = dirGoalStr.fontcolor("#616161");}else{}
					currRow.insertCell(2).innerHTML = results.rows.item(i).dg_id; //hidden with CSS
				}
			if(len == 0){document.getElementById("dTabMsg").innerHTML = "There are no direct intervention goals saved in database, add your own below.";}else{document.getElementById("dTabMsg").innerHTML = '&nbsp;';}
		}, errorHandler);	
	});	
}

//function to update current direct goal global and display in header buttons as move to method/tool selection page
function changeDGoal(obj){
	lastGoalType = 'Direct';
	lastGoalText = obj.parentNode.parentNode.cells.item(1).innerHTML;
	lastGoalID = obj.parentNode.parentNode.cells.item(2).innerHTML;
	
	//checks for gray font and removes font color tags to save only text and display in black
	if(lastGoalText.indexOf('<') !== -1){
		lastGoalText = lastGoalText.substring(lastGoalText.indexOf('>')+1, lastGoalText.lastIndexOf('<'));
	}
	
	//checkForPresets(); this is checked for in startDirSess
	startDirSess(1);
	updateCurrInfo(true, true, true, false, false, false, false);
}

//function to manage adding new direct goal to database - makes addDir textarea form visible if startForm true, adds text to db otherwise
function addNewDirGoal(startForm){
	if(startForm){
		showElems(["addDirForm"]);
		hideElems(["addNewDirBut"]);
	}else{
		if(document.getElementById("dirGoalInput").value == ''){ //check for blank
			alert("New goal text empty.")
		}else{
			var dGoalText = document.getElementById("dirGoalInput").value;
			db.transaction(function (tx) {tx.executeSql('INSERT INTO DIRGOAL_ID (dg_id, dGoals, showDG) VALUES (?, ?, ?)', [guid(), dGoalText, 1], createDirGoalTable(), errorHandler);});
			showElems(["addNewDirBut"]);
			hideElems(["addDirForm"]);
			document.getElementById("dirGoalInput").value = '';		//clears textarea
			document.getElementById("dTabMsg").innerHTML = '&nbsp;';
		}
	}
}

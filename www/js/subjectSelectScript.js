//this function fills the table on the subject selection page with subjects already existing in the database, displaying their subject ID and date of therapy
function fillSubjTable() {
	var subjTable = document.getElementById("subjSelectTable");
	var sLength = subjTable.rows.length;
	for(var clearCount = 0; clearCount<sLength-1; clearCount++){
		subjTable.deleteRow(1);
	}
	var emptySubs = true;
	db.transaction(function (tx) {
	    tx.executeSql('SELECT * FROM SUBJ_INFO WHERE showSubject = ?', [1], function (tx, results) {	
			var len = results.rows.length;
			var currRow;
				for (i = 0; i < len; i++){ 
					emptySubs = false;
					currRow = subjTable.insertRow(i+1);
					currRow.insertCell(0).innerHTML = '<input type="button" value = "Select" onclick="getSubjIndex(this)">'
					currRow.insertCell(1).innerHTML = results.rows.item(i).subj_idText;
					currRow.insertCell(2).innerHTML = results.rows.item(i).dateCreated;
					currRow.insertCell(3).innerHTML = results.rows.item(i).subj_id; //hidden with CSS 
					currRow.insertCell(4).innerHTML = results.rows.item(i).endGoalType; //hidden with CSS
					currRow.insertCell(5).innerHTML = results.rows.item(i).endGoalID; //hidden with CSS
					currRow.insertCell(6).innerHTML = results.rows.item(i).endSessionNotes; //hidden with CSS
					currRow.insertCell(7).innerHTML = results.rows.item(i).endGoalText; //hidden with CSS
				}
			checkEmptySubj();
			showElems(["subjSelectForm"]);
        }, errorHandler);

		//if table empty, option to create new patient
		function checkEmptySubj(){
			if(emptySubs){
				showElems(["newPatBut"]);
				document.getElementById("selectedSubjText").innerHTML = 'No available patients in database.';
			}
		}
	});	

}

//when row within existing subject table is chosen, the subject's primary key GUID, last goal type and last goal num are saved globally and user is prompted to move on
function getSubjIndex(obj){
	currSubjKey = obj.parentNode.parentNode.cells.item(3).innerHTML;
	currSubjID = obj.parentNode.parentNode.cells.item(1).innerHTML;
	lastGoalType = obj.parentNode.parentNode.cells.item(4).innerHTML;
	lastGoalID = obj.parentNode.parentNode.cells.item(5).innerHTML; 
	
	//search through db here to see if exists
		if(lastGoalID.length !== 36){lastGoalID = '';}
		//if(isNaN(lastGoalID)){lastGoalID = '';} from when ID was integer indexes
	var oldNotes = obj.parentNode.parentNode.cells.item(6).innerHTML;
	lastGoalText = obj.parentNode.parentNode.cells.item(7).innerHTML;

	if(lastGoalType === ''){
		document.getElementById("selectedSubjText").innerHTML = "Selected patient ID: <b>" + currSubjID + "</b><br><p>This patient has not yet completed any therapy goals.</p>";
		//continue from last session button change to say 
	}else{
		document.getElementById("selectedSubjText").innerHTML = "Selected patient: <b>" + currSubjID + "</b><br><p>Last session ended: " + lastGoalType + " intervention </p><p> Last goal: " + lastGoalText + "</p><p>Last session notes: " + oldNotes + "</p>";
	}
	updateCurrInfo(true, false, false, false, false, false, false);
	showElems(["subjSelectOptions"]);
}

//function to hide and reset subjtable
function hideSubjTable(){
	hideElems(["newPatBut", "subjSelectOptions"]);
	showElems(["subjBody", "patIDclaim"]);
	document.getElementById("selectedSubjText").innerHTML = "Select a patient from the table above.";
	document.getElementById("subjDBstatus").innerHTML = "";
}

//function will access subject's most recent goal session and start them in the same place, or go to the beginning of either intervention type
function subjContinue(choice){
	hideSubjTable();
	if(choice == 0){ //continue from last ----------- NOT USED IN PRESET VERSION
		hideElems(["subjSelectPage"]);
		if(lastGoalType == 'Direct'){
			//get meth task and utt text here
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM SUBJ_INFO WHERE subj_id = ?', [currSubjKey], function (tx, results) {
					lastMeth = results.rows.item(0).endMethText;
					lastTask = results.rows.item(0).endTaskText;
					lastUtt = results.rows.item(0).endUttText;
				}, errorHandler);	
			});
			if(lastGoalID == ''){
				subjContinue(1);
			}else{
				resetAllPages();
				if(lastMeth == ''){
					showElems(["dirGoalPage", "methTaskForm"]);
					checkForPresets();
					viewPreset(false);
					updateCurrInfo(true, true, true, false, false, false, false);
				}else if(lastUtt == ''){
					showElems(["dirGoalPage", "uttForm", "subUttBut"]);
					updateCurrInfo(true, true, true, true, true, true, false);
				}else{
					showElems(["dirGoalPage", "cueTitle", "cueLevListForm"]);
					updateCurrInfo(true, true, true, true, true, false, false);
				}
			}
		}else if(lastGoalType == 'Indirect'){
			showElems(["indGoalPage"]);
			if(lastGoalID.length == 36){
				setEditText(3);
				updateCurrInfo(true, true, true, false, false, false, false);
			}else if(lastGoalText == 'Counseling'){
				setEditText(5);
			}else if(lastGoalText == 'General Knowledge Enhancement'){
				setEditText(1);
			}
		}else{
			subjContinue(2); //also begins indirect intervention if empty str goal type saved/incomplete as backup
		}		
	}else if(choice == 1){ //go to beginning of direct intervention
		lastGoalType = "Direct";
		hideElems(["subjSelectPage", "intervSwitchButs"]);
		showElems(["dirGoalPage", "dirSelectPage"]); //
		lastGoalID = '';
		updateCurrInfo(true, true, false, false, false, false, false);
	}else if(choice == 2){ //go to beginning of indirect intervention
		lastGoalType = "Indirect"
		hideElems(["subjSelectPage", "intervSwitchButs"]);
		showElems(["indGoalPage", "startIndPed"]);
		lastGoalID = '';
		updateCurrInfo(true, true, false, false, false, false, false);	
	}
}

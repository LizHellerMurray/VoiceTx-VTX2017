var othDMcount = 0;
var longestDM = 0;
//function creates delivery method selection page from database
function createDelivTable(){

	var extCue = document.getElementById("cue1deliv");
	extCue.innerHTML = '';
	extCue.style.display = 'none';
	var exintCue = document.getElementById("cue2deliv");
	exintCue.innerHTML = '';
	exintCue.style.display = 'none';
	var intCue = document.getElementById("cue3deliv");
	intCue.innerHTML = '';
	intCue.style.display = 'none';

	db.transaction(function (tx) {
		//nested function for db asynch issues looping - calls itself
		buildDMlist(1);
		function buildDMlist(groupNum){  
			var cueStr = ''; //resets string with each new group
			tx.executeSql('SELECT * FROM DELIV_ID WHERE delivType = ? AND showDeliv = ?', [groupNum, 1], function (tx, results) {  
				var listLength = results.rows.length;
				if(listLength>longestDM){longestDM = listLength;}
				for(var dm = 0; dm < listLength; dm++){
					var dmID = "dm" + groupNum.toString() + dm.toString();
					var dmText = results.rows.item(dm).delivText;
					cueStr += "<label><input type=" + "\"checkbox\"" + " id=" + "\"" + dmID + "\"" + " value=" + "\"" + dmText + "\"" + ">" + dmText + "<br></label>";
				}
				if(groupNum == 1){
					extCue.innerHTML += "<form>Add a new delivery method: <input type=" + "\"text\"" + " id=" + "\"othDMeText\"" + "><button type=" + "\"button\"" + "onclick=" + "\"addDMText('othDMeText', 1)\"" + ">Submit</button><br/></form>";
					extCue.innerHTML += cueStr;
				}else if(groupNum == 2){
					exintCue.innerHTML += "<form>Add a new delivery method: <input type=" + "\"text\"" + " id=" + "\"othDMeiText\"" + "><button type=" + "\"button\"" + "onclick=" + "\"addDMText('othDMeiText', 2)\"" + ">Submit</button><br/></form>";	
					exintCue.innerHTML += cueStr;
				}else if(groupNum == 3){
					intCue.innerHTML += "<form>Add a new delivery method: <input type=" + "\"text\"" + " id=" + "\"othDMiText\"" + "><button type=" + "\"button\"" + "onclick=" + "\"addDMText('othDMiText', 3)\"" + ">Submit</button><br/></form>";	
					intCue.innerHTML += cueStr;
				}
				groupNum++;
				if(groupNum<4){
					buildDMlist(groupNum);
				}
			}, errorHandler);
		}
	}); 
}

var eDMval = false; //tracks button changes between false (closed) and true (open) as clicked
var eiDMval = false;
var iDMval = false;
//function to show or hide column of deliv method options depending on their current state
function showCues(cueColID){
	var delID = cueColID + "deliv";
	if(cueColID.indexOf('1') !== -1){
		if(eDMval){
			for(var d = 0; d < longestDM; d++){
				var delivMID = "dm1" + d.toString();
				if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked){document.getElementById(delivMID).checked = false;}
			}
			for(var od = 0; od < othDMcount; od++){
				var delivMID = "othdm1" + od.toString();
				if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked){document.getElementById(delivMID).checked = false;}
			}
			document.getElementById(delID).style.display = 'none';
			eDMval = false;
			document.getElementById("cue1").checked = false;
		}else{
			document.getElementById(delID).style.display = 'block';
			eDMval = true;
		}
	}else if(cueColID.indexOf('2') !== -1){
		if(eiDMval){
			for(var d = 0; d < longestDM; d++){
				var delivMID = "dm2" + d.toString();
				if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked){document.getElementById(delivMID).checked = false;}
			}
			for(var od = 0; od < othDMcount; od++){
				var delivMID = "othdm2" + od.toString();
				if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked){document.getElementById(delivMID).checked = false;}
			}
			document.getElementById(delID).style.display = 'none';
			eiDMval = false;
			document.getElementById("cue2").checked = false;
		}else{
			document.getElementById(delID).style.display = 'block';
			eiDMval = true;
		}	
	}else if(cueColID.indexOf('3') !== -1){
		if(iDMval){
			for(var d = 0; d < longestDM; d++){
				var delivMID = "dm3" + d.toString();
				if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked){document.getElementById(delivMID).checked = false;}
			}
			for(var od = 0; od < othDMcount; od++){
				var delivMID = "othdm3" + od.toString();
				if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked){document.getElementById(delivMID).checked = false;}
			}
			document.getElementById(delID).style.display = 'none';
			iDMval = false;
			document.getElementById("cue3").checked = false;
		}else{
			document.getElementById(delID).style.display = 'block';
			iDMval = true;
		}
	}
	showElems(["completeTrialBut"]);
}

//function to add delivery method text to database from user input
function addDMText(textID, group){
	var addedOthDM = document.getElementById(textID).value;
	var dmID = "othdm" + group.toString() + othDMcount.toString();
	othDMcount++;
	if(addedOthDM == ''){ //check for empty input
		alert("No text input")
	}else{
		db.transaction(function (tx) {tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, ?, ?, ?)', [guid(), addedOthDM, group, 1]);});
		var addID = "cue" + group.toString() + "deliv";
		document.getElementById(addID).innerHTML += "<label><input type=" + "\"checkbox\"" + " id=" + "\"" + dmID + "\"" + " value=" + "\"" + addedOthDM + "\"" + ">" + addedOthDM + "<br></label>"; 
		document.getElementById(textID).value = '';
	}
}


//function to set current delivery methods based on checked selection
function setDM(){
	var cueCount = 0;
	var checkedCueText = '';
	if(eDMval){
		for(var d = 0; d < longestDM; d++){
			var delivMID = "dm1" + d.toString();
			if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked)
			{
				if(cueCount > 0){checkedCueText += ", ";}
				cueCount++;
				checkedCueText += document.getElementById(delivMID).value;
			}
		}
		for(var od = 0; od < othDMcount; od++){
			var delivMID = "othdm1" + od.toString();
			if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked)
			{
				if(cueCount > 0){checkedCueText += ", ";}
				cueCount++;
				checkedCueText += document.getElementById(delivMID).value;
			}
		}
	}
	if(eiDMval){
		for(var d = 0; d < longestDM; d++){
			var delivMID = "dm2" + d.toString();
			if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked)
			{
				if(cueCount > 0){checkedCueText += ", ";}
				cueCount++;
				checkedCueText += document.getElementById(delivMID).value;
			}
		}
		for(var od = 0; od < othDMcount; od++){
			var delivMID = "othdm2" + od.toString();
			if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked)
			{
				if(cueCount > 0){checkedCueText += ", ";}
				cueCount++;
				checkedCueText += document.getElementById(delivMID).value;
			}
		}
	}
	if(iDMval){
		for(var d = 0; d < longestDM; d++){
			var delivMID = "dm3" + d.toString();
			if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked)
			{
				if(cueCount > 0){checkedCueText += ", ";}
				cueCount++;
				checkedCueText += document.getElementById(delivMID).value;
			}
		}
		for(var od = 0; od < othDMcount; od++){
			var delivMID = "othdm3" + od.toString();
			if(document.getElementById(delivMID) != null && document.getElementById(delivMID).checked)
			{
				if(cueCount > 0){checkedCueText += ", ";}
				cueCount++;
				checkedCueText += document.getElementById(delivMID).value;
			}
		}
	}
	if(checkedCueText != ''){
		currDelivLevel = checkedCueText;
		//fillSessionGoalTable(); //just saves goal type and goal session info (gives goal session unique guid)
		startDirSess(3);
		if(eDMval){ showCues('cue1');}
		if(eiDMval){ showCues('cue2');}
		if(iDMval){ showCues('cue3');}
	}else{
		alert("Select a delivery method before continuing.")
	}
}

var numCorrect = 0; //global trackers of trialboxes correct and attempted, reset every new trial
var numTried = 0;
//function will find out which state clicked trialbox is in, change to next state & adjust global count of number correct and number attempted
function changeState(buttonID) {
	if(document.getElementById("trialResetter").style.display == "block"){
		//if trial resetter showing, should nt be able to click and change buttons because they will not be counted towards score
	}else{
		if(buttonID.className.match(/(?:^|\s)unchecked(?!\S)/)){
			buttonID.className = buttonID.className.replace( /(?:^|\s)unchecked(?!\S)/g , 'correct' );
			numCorrect++;
			numTried++;
		}else if(buttonID.className.match(/(?:^|\s)correct(?!\S)/)){
			buttonID.className = buttonID.className.replace( /(?:^|\s)correct(?!\S)/g , 'incorrect' );
			numCorrect = numCorrect - 1;
		}else if(buttonID.className.match(/(?:^|\s)incorrect(?!\S)/)){
			buttonID.className = buttonID.className.replace( /(?:^|\s)incorrect(?!\S)/g , 'unchecked' );
			numTried = numTried - 1;
		}
	}
}

var perfStr;
var newPerfStr = false; //keeps track of if new string for performance needs to be saved when navigating away from page (true, will save)
//function called by trial complete trial button or when navigating away from trials (indicated by fromBut boolean value) - creates string of performance in trials, prep for reset trials option
function completeTrial(fromBut){
	var checkCorrect = numCorrect.toString();
	var checkTried = numTried.toString();
	
	if(fromBut){ //called from complete trial button
		if(numTried == 0){
			alert("No trials attempted. Navigate using header buttons or end session.")
			perfStr ="0/0";
			//if(currLevelPerf.length == 0){perfStr ="N/A";} -not necessary because other navigation after will take care of, 0/0 already ignored
		}else{
			perfStr = checkCorrect + "/" + checkTried;
			newPerfStr = true;
			document.getElementById("trialMsg").innerHTML = perfStr;
			hideElems(["completeTrialBut"]);
			showElems(["trialResetter"]);
		}
	}else{ //not from complete trial button
		if(currLevelPerf.length == 0 && numTried == 0){ 
			perfStr ="N/A";
			newPerfStr = true;
			document.getElementById("trialMsg").innerHTML = perfStr;
			hideElems(["completeTrialBut"]);
			showElems(["trialResetter"]);
		}else{
			perfStr = checkCorrect + "/" + checkTried;
			newPerfStr = true;
			document.getElementById("trialMsg").innerHTML = perfStr;
			hideElems(["completeTrialBut"]);
			showElems(["trialResetter"]);
		}
	}

}

//function to reset all trial boxes to gray (unchecked), ready for new trial, also resets trial boxes upon navigation away from trials page
function newTrial(){ 
	numCorrect = 0;
	numTried = 0;
	var trialNoteText = document.getElementById("trialNoteBox").value;
	document.getElementById("trialNoteBox").value = ''; //resets trial note box
	document.getElementById("trialMsg").innerHTML = '';	
		if(newPerfStr){ //should only push if is new perfstr (to avoid rep with end)
			if(perfStr != "0/0"){currLevelPerf.push(perfStr);} //should ignore 0/0 case if navigate away
			if(trialNoteText == ''){trialNoteText = 'none';}
			//if(trialNoteText !== ''){trialNotesPerf.push(trialNoteText);}
			trialNotesPerf.push(trialNoteText);
		} 
	//unchecks
	for(var tb = 1; tb < 11; tb++){
		var boxID = "tb" + tb;
		document.getElementById(boxID).className = "unchecked threestate";
	}
	hideElems(["trialResetter"]);
	showElems(["completeTrialBut"]);
	newPerfStr = false;
}

//function saves current performance array and empties array  
function resetPerfArray(){
	if(currLevelPerf.length !== 0){fillDirPerfTable(currDelivLevel, currLevelPerf, trialNotesPerf);}
	currLevelPerf = [];
	trialNotesPerf = [];
}

//function to save current trial set up as  preset trial under the patient
function savePreset(){
	var trialID = guid();
	//check for duplicates hre?
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO PRESET_TRIALS VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [trialID, currSubjKey, lastGoalID, lastGoalText, lastMeth, lastTask, lastUtt, currDelivLevel], successHandler, errorHandler); //should be lastGoalID determined - see globals notes
    });
	checkifPreset();
}

//function to check if the preset has been saved to the current patient before, control button and message appearance as necessary
function checkifPreset(){
	var presetExists = false;
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM PRESET_TRIALS WHERE subj_ref = ? AND goal_text = ? AND methodsArray = ? AND toolsArray = ? AND uttLevel = ? AND delivLevel = ?', [currSubjKey, lastGoalText, lastMeth, lastTask, lastUtt, currDelivLevel], function (tx, results) {
			var l = results.rows.length;
				if(l>0){presetExists = true;}
			//show saved preset or button depending on whether or not already saved or just saved
			if(presetExists){ 
				hideElems(["savePresetBut"]);
				showElems(["presetSavediv"]);
			}else{ 
				showElems(["savePresetBut"]);
				hideElems(["presetSavediv"]);
			}
		}, errorHandler);
    });
}

//a function to show preset button if options exist and establish dropdown menu from db
function checkForPresets(){
	//check if presets exist for the patient/goal combo
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM PRESET_TRIALS WHERE subj_ref = ? AND goal_text = ?', [currSubjKey, lastGoalText], function (tx, results) {
			var pLength = results.rows.length; 
				if(pLength>0){
					showElems(["viewPresetBut"]);
				//also, fill dropdown menu here
				/*same way fill tasks list?*/
				/*no i think i need to make it like a goal table, so all of the globals can be taken immediately when selected*/
				
					var presetsTab = document.getElementById("presetOpts");
					var pClear = presetsTab.rows.length;
					//clear in case any existing and recreate
					for(var clearCount = 0; clearCount<pClear-1; clearCount++){
						presetsTab.deleteRow(1);
					}

					var currRow;
					for (i = 0; i < pLength+1; i++){
						currRow = presetsTab.insertRow(i+1);
						if(i==0){
							currRow.insertCell(0).innerHTML = "";
							currRow.insertCell(1).innerHTML = "Method(s):";
							currRow.insertCell(2).innerHTML = "Tool(s):"; 
							currRow.insertCell(3).innerHTML = "Delivery:";
							currRow.insertCell(4).innerHTML = "Utterance:";
						}else{
							currRow.insertCell(0).innerHTML = '<input type="button" value = "Select Preset" onclick="getPresetInfo(this)">'
							currRow.insertCell(1).innerHTML = results.rows.item(i-1).methodsArray ;
							currRow.insertCell(2).innerHTML = results.rows.item(i-1).toolsArray; 
							currRow.insertCell(3).innerHTML = results.rows.item(i-1).delivLevel;
							currRow.insertCell(4).innerHTML = results.rows.item(i-1).uttLevel;
						}//dont need rows for patient or goal, becuase is already selected & global
					}
			showElems(["presetOpts"]); //?maybe
				}else{hideElems(["viewPresetBut"]);}
			}, errorHandler);
		});
}

//function to fill preset trial options dropdown adn show dropdown
function viewPreset(show){
	if(show){
		showElems(["presetSelectForm"]);
		hideElems(["viewPresetBut"]);//show dropdown menu in this div	
	}else{
		hideElems(["presetSelectForm"]);
		showElems(["viewPresetBut"]);
	}

	//after navigate away, clear dropdown menu
}

//functiont to collect preset trial info and navigate to start trial
function getPresetInfo(obj){
	submitMethTasks(true);//closes and unchecks lists on page
	viewPreset(false);
	//set globals from click
	lastGoalType = 'Direct';
	lastMeth = obj.parentNode.parentNode.cells.item(1).innerHTML;
	lastTask = obj.parentNode.parentNode.cells.item(2).innerHTML;
	currDelivLevel = obj.parentNode.parentNode.cells.item(3).innerHTML; 
	lastUtt = obj.parentNode.parentNode.cells.item(4).innerHTML;
	
	//save these in db goal sess
	fillSessionGoalTable();
	hideElems(["methTaskForm"]); //hide what on meth page, bat ALSO need to close things just in case? done above
	checkifPreset();
	showElems(["trialBoxes", "completeTrialBut"]);
	
	//navigate to trials page
	updateCurrInfo(true, true, true, true, true, true, true);
}
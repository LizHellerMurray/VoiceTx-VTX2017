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
		hideElems(["cueTitle", "cueLevListForm"]);
		showElems(["trialBoxes"]);	
		if(eDMval){ showCues('cue1');}
		if(eiDMval){ showCues('cue2');}
		if(iDMval){ showCues('cue3');}
		updateCurrInfo(true, true, true, true, true, true, true);
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
//function called by trial complete button - creates string of performance in trials, prep for reset trials option
function completeTrial(fromBut){
	var checkCorrect = numCorrect;
	var checkTried = numTried;
		
	if(fromBut){
		perfStr = checkCorrect + "/" + checkTried;
		newPerfStr = true;
	}else if(currLevelPerf.length == 0){ //N/A for trials if navigating and nothing complete
		if(checkCorrect == 0){
			checkCorrect = 'N';
		}
		if(checkTried == 0){
			checkTried = 'A';
		}
		perfStr = checkCorrect + "/" + checkTried;
		newPerfStr = true;
	}
	document.getElementById("trialMsg").innerHTML = perfStr;
	hideElems(["completeTrialBut"]);
	showElems(["trialResetter"]);
}

//function to reset all trial boxes to gray (unchecked), ready for new trial, also resets trial boxes upon navigation away from trials page
function newTrial(){
	numCorrect = 0;
	numTried = 0;
	var trialNoteText = document.getElementById("trialNoteBox").value;
	document.getElementById("trialNoteBox").value = ''; //resets trial note box
	document.getElementById("trialMsg").innerHTML = '';	
		if(newPerfStr){ //should only push if is new perfstr (to avoid rep with end)
			currLevelPerf.push(perfStr);
			if(trialNoteText !== ''){trialNotesPerf.push(trialNoteText);}
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
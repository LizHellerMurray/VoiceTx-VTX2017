//function for navigation within selecting pages (method, tool, levels) of the direct intervention goal
function startDirSess(partNum){
	if (partNum === 1){ //begin method and tool selection after goal
		hideElems(["dirSelectPage"]);
		showElems(["methTaskForm"]);
		updateCurrInfo(true, true, true, false, false, false, false);
	}else if (partNum === 2){ //from method/task form, go to select utt level
		hideElems(["methTaskForm"]);
		showElems(["uttForm", "subUttBut"]);
		updateCurrInfo(true, true, true, true, true, false, false);	
	}else if (partNum === 3){ //begin cue levels, after utt select
		hideElems(["uttForm"]);
		showElems(["cueLevListForm", "cueTitle"]);
		updateCurrInfo(true, true, true, true, true, true, false);
	}
}

var idCountOth = 0;
//function fills meth/tasks page from db
function createMethTaskPg(){

	var semMeth = document.getElementById("semMethodTasks");
	semMeth.innerHTML = '';
	semMeth.style.display = 'none';
	var audMeth = document.getElementById("audMethodTasks");
	audMeth.innerHTML = '';
	audMeth.style.display = 'none';
	var resMeth = document.getElementById("resMethodTasks");
	resMeth.innerHTML = '';
	resMeth.style.display = 'none';
	var vocMeth = document.getElementById("vocMethodTasks");
	vocMeth.innerHTML = '';
	vocMeth.style.display = 'none';
	var musMeth = document.getElementById("musMethodTasks");
	musMeth.innerHTML = '';
	musMeth.style.display = 'none';
	var othMeth = document.getElementById("othMethodTasks");
	othMeth.innerHTML = '';
	othMeth.style.display = 'none';
	
	db.transaction(function (tx) {
		//nested function for asynch issues looping - calls itself
		buildMTlist(0);
		function buildMTlist(grp){
			var groupNum = grp + 1;
			var tskStr = ''; //resets string with each new group
			tx.executeSql('SELECT * FROM TOOL_ID WHERE methGroupType = ? AND showTask = ?', [groupNum, 1], function (tx, results) {
				var taskLength = results.rows.length;
				if(taskLength !== 0){
					//tskStr += "<p>" + methGroup_IDArray[grp] + "</p>"; 
					tskStr += "<div class=\"methodGroup\"><p>" + methGroup_IDArray[grp] + "</p>"; 
				}
				for(var tk = 0; tk < taskLength; tk++){
					var tkID = "tk" + groupNum.toString() + tk.toString();
					var tkText = results.rows.item(tk).taskText;
					tskStr += "<label><input type=" + "\"checkbox\"" + " id=" + "\"" + tkID + "\"" + " value=" + "\"" + tkText + "\"" + ">" + tkText + "<br></label>";
				}
				tskStr += "</div>"; //end "methodGroup" div

				if(grp < 3){
					semMeth.innerHTML += tskStr;
				}else if(grp < 5){
					audMeth.innerHTML += tskStr;
				}else if(grp < 8){
					resMeth.innerHTML += tskStr;
				}else if(grp < 11){
					vocMeth.innerHTML += tskStr;
				}else if(grp < 15){
					musMeth.innerHTML += tskStr;
				}else{
					idCountOth = taskLength;
					if(taskLength == 0){
						tskStr = "No additional tool text saved in the database. <br>";
					}
					//add a form for adding a new tool
					var othFormStr = "<form" + " id=" + "\"tkOthForm\"" + ">Add a new tool: <input type=" + "\"text\"" + " id=" + "\"othText\"" + "><button type=" + "\"button\"" + "onclick=" + "\"addOthTask()\"" + ">Submit</button></form>";
					othMeth.innerHTML += othFormStr + tskStr;
					document.getElementById("subMTBut").style.display = 'block';
				}
				grp++;
				if(grp<methGroup_IDArray.length){buildMTlist(grp);}
			}, errorHandler);
		}
	});	
}

//function to add the written in task to the TOOL_ID database --- turns textbox input into text
function addOthTask(){
	var gn = 16;
	var tkID = "tk" + gn.toString() + idCountOth.toString();
	idCountOth++;
	var addedOthTask = document.getElementById("othText").value;
	if(addedOthTask == ''){ //check for empty input
		alert("No text input")
	}else{
		db.transaction(function (tx) {tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, ?, ?, ?)', [guid(), addedOthTask, 16, 1]);});
		var otherMethod = document.getElementById("othMethodTasks");
		otherMethod.innerHTML += "<div class=\"methodGroup\"><label><input type=" + "\"checkbox\"" + " id=" + "\"" + tkID + "\"" + " value=" + "\"" + addedOthTask + "\"" + ">" + addedOthTask + "</label></div>"; //THE NEW CHECK BOX
		document.getElementById("othText").value = ''; //clear when done
	}
}

//function to update method/task selection based on checked boxes
	//if a method is clicked, it will open the associated list of tools
	//if a method is unchecked, it will uncheck any tool sunder this method and hide the associated tool form again
function updateMethods(methID){
	var taskFormID = methID + "Tasks";
	if(document.getElementById(methID).checked){
		document.getElementById(taskFormID).style.display = 'block';
	}else{
		document.getElementById(taskFormID).style.display = 'none';
		var methTypeStr = methID.substring(0,3);
		if(methTypeStr == "sem"){
			for(var gn = 1; gn <4; gn++){
				for(var tn = 0; tn < 8; tn++){
					var tkOffID = "tk" + gn.toString() + tn.toString();
					if(document.getElementById(tkOffID) != null)
					{
						document.getElementById(tkOffID).checked = false;
					}
				}
			}
		}else if (methTypeStr == "aud"){
			for(var gn = 4; gn <6; gn++){
				for(var tn = 0; tn < 8; tn++){
					var tkOffID = "tk" + gn.toString() + tn.toString();
					if(document.getElementById(tkOffID) != null)
					{
						document.getElementById(tkOffID).checked = false;
					}
				}				
			}			
		}else if (methTypeStr == "res"){
			for(var gn = 6; gn <9; gn++){
				for(var tn = 0; tn < 8; tn++){
					var tkOffID = "tk" + gn.toString() + tn.toString();
					if(document.getElementById(tkOffID) != null)
					{
						document.getElementById(tkOffID).checked = false;
					}
				}				
			}			
		}else if (methTypeStr == "voc"){
			for(var gn = 9; gn <12; gn++){
				for(var tn = 0; tn < 8; tn++){
					var tkOffID = "tk" + gn.toString() + tn.toString();
					if(document.getElementById(tkOffID) != null)
					{
						document.getElementById(tkOffID).checked = false;
					}
				}				
			}			
		}else if (methTypeStr == "mus"){
			for(var gn = 12; gn <16; gn++){
				for(var tn = 0; tn < 8; tn++){
					var tkOffID = "tk" + gn.toString() + tn.toString();
					if(document.getElementById(tkOffID) != null)
					{
						document.getElementById(tkOffID).checked = false;
					}
				}				
			}			
		}else if (methTypeStr == "oth"){
			var gn = 16;
			for(var tn = 0; tn < idCountOth + 1; tn++){ //depends on how many the user has added - idCountOth global
				var tkOffID = "tk" + gn.toString() + tn.toString();
				if(document.getElementById(tkOffID) != null)
				{
					document.getElementById(tkOffID).checked = false;
				}
			}
		}
	}
}

//function creates a string list of methods and a string list of tasks selected to assign to globals lastMeth and lastTask and update header buttons
function submitMethTasks(end){	
	
	var methCount = 0;
	var methodText = '';
	var checkedTaskText = '';
	var taskCommaCount = 0;
	var checkedMethIDs = [];
	var allMethIDs = []; //catches all checked methods (even if are only open for viewing so no tool selected - allows full close)
	var isTaskSom = false;
	var isTaskAud = false;
	var isTaskRes = false;
	var isTaskVoc = false;
	var isTaskMus = false;
	var isTaskOth = false;
	
	if(document.getElementById("semMethod").checked){
		allMethIDs.push("semMethod");
		for(var gn = 1; gn <4; gn++){
			for(var tn = 0; tn < 10; tn++){
				var tkOffID = "tk" + gn.toString() + tn.toString();
				if(document.getElementById(tkOffID) != null && document.getElementById(tkOffID).checked == true)
				{	
					isTaskSom = true;
					if(taskCommaCount > 0){checkedTaskText += ", ";}
					taskCommaCount++;
					checkedTaskText += document.getElementById(tkOffID).value;
				}
			}
		}
		if(isTaskSom){
			methodText += "Somatosensory";
			methCount++;		
			checkedMethIDs.push("semMethod");
		}
	}
	if(document.getElementById("audMethod").checked){
		allMethIDs.push("audMethod");
		for(var gn = 4; gn <6; gn++){
			for(var tn = 0; tn < 10; tn++){
				var tkOffID = "tk" + gn.toString() + tn.toString();
				if(document.getElementById(tkOffID) != null && document.getElementById(tkOffID).checked == true)
				{
					isTaskAud = true;
					if(taskCommaCount > 0){checkedTaskText += ", ";}
					taskCommaCount++;
					checkedTaskText += document.getElementById(tkOffID).value;
				}
			}				
		}
		if(isTaskAud){
			if(methCount>0){methodText += ", ";}
			methodText += "Auditory";
			methCount++;	
			checkedMethIDs.push("audMethod");
		}
	}
	if(document.getElementById("resMethod").checked){
		allMethIDs.push("resMethod");
		for(var gn = 6; gn <9; gn++){
			for(var tn = 0; tn < 10; tn++){
				var tkOffID = "tk" + gn.toString() + tn.toString();
				if(document.getElementById(tkOffID) != null && document.getElementById(tkOffID).checked == true)
				{
					isTaskRes = true;
					if(taskCommaCount > 0){checkedTaskText += ", ";}
					taskCommaCount++;
					checkedTaskText += document.getElementById(tkOffID).value;
				}
			}				
		}
		if(isTaskRes){
			if(methCount>0){methodText += ", ";}
			methodText += "Respiratory";
			methCount++;
			checkedMethIDs.push("resMethod");
		}
	}
	if(document.getElementById("vocMethod").checked){
		allMethIDs.push("vocMethod");
		for(var gn = 9; gn <11; gn++){
			for(var tn = 0; tn < 10; tn++){
				var tkOffID = "tk" + gn.toString() + tn.toString();
				if(document.getElementById(tkOffID) != null && document.getElementById(tkOffID).checked == true)
				{
					isTaskVoc = true;
					if(taskCommaCount > 0){checkedTaskText += ", ";}
					taskCommaCount++;
					checkedTaskText += document.getElementById(tkOffID).value;
				}
			}				
		}
		if(isTaskVoc){
			if(methCount>0){methodText += ", ";}
			methodText += "Vocal Function";
			methCount++;			
			checkedMethIDs.push("vocMethod");
		}
	}
	if(document.getElementById("musMethod").checked){
		allMethIDs.push("musMethod");
		for(var gn = 11; gn <16; gn++){
			for(var tn = 0; tn < 10; tn++){
				var tkOffID = "tk" + gn.toString() + tn.toString();
				if(document.getElementById(tkOffID) != null && document.getElementById(tkOffID).checked == true)
				{
					isTaskMus = true;
					if(taskCommaCount > 0){checkedTaskText += ", ";}
					taskCommaCount++;
					checkedTaskText += document.getElementById(tkOffID).value;
				}
			}				
		}
		if(isTaskMus){
			if(methCount>0){methodText += ", ";}
			methodText += "Musculoskeletal";
			methCount++;			
			checkedMethIDs.push("musMethod");
		}
	}
	if(document.getElementById("othMethod").checked){
		allMethIDs.push("othMethod");
		var gn = 16;
			for(var tn = 0; tn < idCountOth + 1; tn++){
				var tkOffID = "tk" + gn.toString() + tn.toString();
				if(document.getElementById(tkOffID) != null && document.getElementById(tkOffID).checked == true)
				{
					isTaskOth = true;
					if(taskCommaCount > 0){checkedTaskText += ", ";}
					taskCommaCount++;
					checkedTaskText += document.getElementById(tkOffID).value;
				}
			}	
		if(isTaskOth){
			if(methCount>0){methodText += ", ";}
			methodText += "Other";
			methCount++;	
			checkedMethIDs.push("othMethod");
		}
	}
	
	//checks that both methods and tools have been selected before updating and continuing
	if(methCount==0 && !end){
		alert("No method/tool combination selected")
	}else if(taskCommaCount==0 && !end){
			alert("No tools selected")
	}else{
		if(!end){
			lastMeth = methodText;
			lastTask = checkedTaskText;
			updateCurrInfo(true, true, true, true, true, false);
			startDirSess(2); 
		}
		closeMethTasks();
	}

	//nested function to share variables and close/reset necesary checkboxes ONLY once they have selected both methods and tools
	function closeMethTasks(){
		for(var m = 0; m < allMethIDs.length; m++){
			var closeMethID = allMethIDs[m];
			document.getElementById(closeMethID).checked = false;
			updateMethods(closeMethID);
		}
	}
}


var globUttLength; //global to keep track of utterance level list length for loop efficiency
//function to create the utterance level selection page from db
function createUttPage(){
	var uttDiv = document.getElementById("uttLevels");
	uttDiv.innerHTML = '';
	
	db.transaction(function (tx) {
		//starts at utt 0 and resets every time
		var uttNum = 0; 
		var uttStr = ''; 
		tx.executeSql('SELECT * FROM UTT_ID WHERE showUtter = ?', [1], function (tx, results) {
			var uttLength = results.rows.length;
			globUttLength = uttLength;
			for(var ut = 0; ut < uttLength; ut++){
				var uttID = "utt" + ut;
				var uttText = results.rows.item(ut).uttText;
				uttStr += "<label><input type=" + "\"radio\"" + " name=\"uttRadio\" id=" + "\"" + uttID + "\"" + " value=" + "\"" + uttText + "\"" + ">" + uttText + "<br></label>";
			}
			uttDiv.innerHTML = uttStr;
			document.getElementById("subUttBut").style.display = 'block';
		}, errorHandler);
	});	
				
}

//function to insert the user-added text for a new utterence level into the UTT_ID table in the db
function addOthUtt(){
	var otherText = document.getElementById("uttOtherText").value;
	if(otherText == ''){
		alert("No text input")
	}else{
		var othUttID = "utt" + globUttLength;
		globUttLength++;
		db.transaction(function (tx) {tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, ?, ?)', [guid(), otherText, 1]);});
		document.getElementById("uttLevels").innerHTML += "<label><input type=" + "\"radio\"" + " name=\"uttRadio\" id=" + "\"" + othUttID + "\"" + " value=" + "\"" + otherText + "\"" + ">" + otherText + "<br></label>"; //adds new radio box
		document.getElementById("uttOtherText").value = '';
	}
}

//function to set global lastUtt to selected level, update header buttons and continue
function submitUttLevel(contUtt){ 
	var oneCheck = false;
	for(var u = 0; u < globUttLength; u++){
		var uttID = "utt" + u;
		if(document.getElementById(uttID).checked){
			if(contUtt){
				lastUtt = document.getElementById(uttID).value;
				lastGoalType = 'Direct';
				updateCurrInfo(true, true, true, true, true, true);
				document.getElementById(uttID).checked = false;
				fillSessionGoalTable(); //save goal type and goal session info (gives goal session unique guid)
				saveEndVariables(); //save end variables here now that all things set
				oneCheck = true;
			}else{document.getElementById(uttID).checked = false;}//unchecks for page change in header
		}
	}
	if(!oneCheck && contUtt){alert("Please select an utterance level.")}else{startDirSess(3); }	//checks for no selection, then continue
}

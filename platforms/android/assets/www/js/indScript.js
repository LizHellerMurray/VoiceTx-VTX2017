//this function creates a table of indirect vocal hygiene goals to choose from, clears and recreates table every time called(to control length & in case new goals added)
var indGoalTrack = true; //global to keep track of adding new goal to list
function createIndGoalTable(){
	indGoalTrack = true;
	var indTable = document.getElementById("indSelectTable");
	var iLength = indTable.rows.length;
	//resets table here
	for(var clearCount = 0; clearCount<iLength-1; clearCount++){
		indTable.deleteRow(1);
	}
	
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM INDGOAL_ID WHERE showIG = ?', [1], function (tx, results) {	
				var len = results.rows.length;
				var currRow;
					for (var i = 0; i < len; i++){
						currRow = indTable.insertRow(i+1);
						currRow.insertCell(0).innerHTML = '<input type="button" value = "Select" onclick="changeIGoal(this)">';
						currRow.insertCell(1).innerHTML = results.rows.item(i).iGoals;
						currRow.insertCell(2).innerHTML = results.rows.item(i).ig_id; //hidden with CSS
					}
				if(len == 0){
					document.getElementById("iTabMsg").innerHTML = "There are no indirect interevention goals saved in database, add your own below.";
				}else{
					document.getElementById("iTabMsg").innerHTML = '&nbsp;';
				}
			}, errorHandler);	
		});	
}

//function to set the current vocal hygiene goal from goal table click
function changeIGoal(obj){
	lastGoalType = 'Indirect';
	lastGoalText = obj.parentNode.parentNode.cells.item(1).innerHTML;
	lastGoalID = obj.parentNode.parentNode.cells.item(2).innerHTML;

	//checks for gray font and removes font color tags to save only text and display in black
	if(lastGoalText.indexOf('<') !== -1){
		lastGoalText = lastGoalText.substring(lastGoalText.indexOf('>')+1, lastGoalText.lastIndexOf('<'));
	}
	setEditText(3);
	updateCurrInfo(true, true, true, false, false, false, false);
}

//function to take new goal text from textarea, add to db, recreate the table with new text row and clear/hide the text area again
function addNewIndGoal(startForm){
	if(startForm){
		showElems(["addIndForm"]);
		hideElems(["addNewIndBut"]);
	}else{
		if(document.getElementById("indGoalInput").value == ''){ //check for blank
			alert("New goal text empty.")
		}else{
			var iGoalText = document.getElementById("indGoalInput").value;
			db.transaction(function (tx) {tx.executeSql('INSERT INTO INDGOAL_ID (ig_id, iGoals, showIG) VALUES (?, ?, ?)', [guid(), iGoalText, 1], createIndGoalTable(), errorHandler);});
			showElems(["addNewIndBut"]);		
			hideElems(["addIndForm"]);
			document.getElementById("indGoalInput").value = '';//clears	
			document.getElementById("iTabMsg").innerHTML = '&nbsp;';	
		}		
	}
}

//function to check the completion of the 4 indirect intervention questions and save the responses
function saveIndGoal(){
	if(document.getElementById("q1text").value == '' && document.getElementById("q2text").value == '' && document.getElementById("q3text").value == '' && document.getElementById("q4text").value == ''  && document.getElementById("q5text").value == ''){ //check for empty table entry and redirect
		alert("All inputs empty. Use the header buttons to navigate to a new indirect intervention session component.")
	}else{
		fillSessionGoalTable();
		fillIndPerfTable(document.getElementById("q1text").value, document.getElementById("q2text").value, document.getElementById("q3text").value, document.getElementById("q4text").value, document.getElementById("q5text").value);
			//reset text boxes
			document.getElementById("q1text").value = '';
			document.getElementById("q2text").value = '';
			document.getElementById("q3text").value = '';
			document.getElementById("q4text").value = '';
			document.getElementById("q5text").value = '';
		saveEndVariables();
		hideElems(["indVHGoalsDiv"]);
		showElems(["indSelectPage"]);
	}
}

//function to save new session of counseling text - if editing/updating past session, input param true
function saveCounselSess(edit){
	if(document.getElementById("cCounText").value == '' && document.getElementById("sCounText").value == '' && document.getElementById("tCounText").value == '' && document.getElementById("othCounText").value == ''){ //check for empty table entry and redirect
		alert("All inputs empty. Click 'Counseling' in the header buttons to navigate to a new indirect intervention session component.")
	}else{
		if(edit){
			updateCounsTable(document.getElementById("cCounText").value, document.getElementById("sCounText").value, document.getElementById("tCounText").value, document.getElementById("othCounText").value);
		}else{
			lastGoalType = "Indirect";
			lastGoalID = '';
			lastGoalText = "Counseling";
			fillSessionGoalTable();
			fillCounsTable(document.getElementById("cCounText").value, document.getElementById("sCounText").value, document.getElementById("tCounText").value, document.getElementById("othCounText").value);
		}
		//reset text boxes
				document.getElementById("cCounText").value = '';
				document.getElementById("sCounText").value = '';
				document.getElementById("tCounText").value = '';
				document.getElementById("othCounText").value = '';
			saveEndVariables();
			hideElems(["indCounselingDiv", "updateCounBut"]);
			showElems(["startIndCoun", "startIndPed", "endCounBut"]);
			updateCurrInfo(true, true, false, false, false, false, false);
	}
}

//function to save new session of GKE text - if editing/updating past session, input param true
function saveGKESess(edit){
	if(document.getElementById("gke0").value == '' && document.getElementById("gke1").value == '' && document.getElementById("gke2").value == '' && document.getElementById("gke3").value == ''){
		alert("All inputs empty. Click 'General Knowledge Enhancement' in the header buttons to navigate to a new indirect intervention session component.")
	}else{
		if(edit){
			updateGKETable(document.getElementById("gke0").value, document.getElementById("gke1").value, document.getElementById("gke2").value, document.getElementById("gke3").value);
		}else{
			lastGoalType = "Indirect";
			lastGoalID = '';
			lastGoalText = "General Knowledge Enhancement";
			fillSessionGoalTable();
			fillGKETable(document.getElementById("gke0").value, document.getElementById("gke1").value, document.getElementById("gke2").value, document.getElementById("gke3").value);
		}
		//reset text boxes
			document.getElementById("gke0").value = '';
			document.getElementById("gke1").value = '';
			document.getElementById("gke2").value = '';
			document.getElementById("gke3").value = '';
		saveEndVariables();
		hideElems(["gkeDiv", "updateGKEbut"]);
		showElems(["startIndCoun", "startIndPed", "endGKEbut"]);
		updateCurrInfo(true, true, false, false, false, false, false); 
	}
}

//this function begins the different indirect intervention sessions - changes between pages for counseling, gke and vocal hygiene based on parameter
function startIndSess(partNum){
	hideElems(["startIndCoun", "startIndPed", "pedChoices"]);
	if(partNum == 1){//starts session with general knowledge enhancement
		lastGoalText = 'General Knowledge Enhancement';
		showElems(["gkeDiv"]);
		updateCurrInfo(true, true, true, false, false, false, false);
	}else if(partNum == 2){//goes to goal selection for vocal hygiene
		showElems(["indSelectPage"]);
	}else if(partNum == 3){//moves from goal selection to goal questions
		hideElems(["indSelectPage"]); 
		showElems(["indVHGoalsDiv"]);
	}else if(partNum == 4){//return to indirect intervention choices
		hideElems(["gkeDiv", "indVHGoalsDiv", "indCounselingDiv", "indSelectPage"]);
		showElems(["startIndCoun", "startIndPed"]);
		updateCurrInfo(true, true, false, false, false, false, false);
	}else if(partNum == 5){//starts counseling session
		lastGoalText = 'Counseling';
		showElems(["indCounselingDiv"]);
		updateCurrInfo(true, true, true, false, false, false, false);
	}
}

//function to toggle pedagogy option between showing and hidden 
function pickPed(){
	if(document.getElementById("pedChoices").style.display == 'none'){
		showElems(["pedChoices"]);
	}else{
		hideElems(["pedChoices"]);
	}
}
//function to check if the user has already completed counseling, gke or indirect goals with the current patient -- will prompt to decide to edit or start new data
function setEditText(locNum){
	//search rlevant db table, if exists, prompt to edit, if not just go straight to indsess	
	var vhLastID = '';
	var counLastID = '';
//check if one, then ask if want to edit old, show based on these text saved globally
	//globals 
	editText1 = '';
	editText2 = '';
	editText3 = '';
	editText4 = '';
	
	db.transaction(function (tx) {
		if(locNum == 1){//gke start 
		var gkeLastID = '';
			tx.executeSql('SELECT * FROM SUBJ_INFO WHERE subj_id = ?', [currSubjKey], function (tx, subResults) {
				if (subResults.rows.length > 0){
						var gkeLastID = subResults.rows.item(0).lastGKE_id; 
						if(gkeLastID != ''){
							iTrackerID = gkeLastID; //set guid for session to current (so can update)
							tx.executeSql('SELECT * FROM GKE_PERF WHERE gkeSess_ID = ?', [gkeLastID], function (tx, gResults) {
								if(gResults.rows.length >0){
									editText1 = gResults.rows.item(0).gke1;
									editText2 = gResults.rows.item(0).gke2;
									editText3 = gResults.rows.item(0).gke3;
									editText4 = gResults.rows.item(0).gke4; 
								}
								if ((editText1 !== '') && (editText2 !== '')  && (editText3 !== '')  && (editText4 !== '')){
									document.getElementById("gke0").value = editText1;
									document.getElementById("gke1").value = editText2;
									document.getElementById("gke2").value = editText3;
									document.getElementById("gke3").value = editText4;
									makeEditPage(locNum);
								}else{
									startIndSess(locNum);
								}
							}, errorHandler);
						}
				}
			}, errorHandler);	
		
		}else if(locNum == 3){//vocal hygeine start of GOAL QUESTIONS
		/*
		tx.executeSql('SELECT * FROM SESSION_INFO WHERE subj_num = ? AND goal_id = ?', [currSubjKey, lastGoalID], function (tx, subResults) {
				if (subResults.rows.length > 0){
					//extract one matching curr goal id?
						var vhLastID = subResults.rows.item(subResults.rows.length - 1).goal_id;
						if(vhLastID != ''){
							iTrackerID = vhLastID; //set guid for session to current (so can update)
							tx.executeSql('SELECT * FROM GKE_PERF WHERE gkeSess_ID = ?', [gkeLastID], function (tx, gResults) {

							}, errorHandler);
						}
				}
			}, errorHandler);
			
		//still figuring this out -
		*/
		
		
		//temp just send on - no edit option
			startIndSess(locNum);
			
			
		}else if(locNum == 5){//counseling start
		/*db.transaction(function (tx) {});*/
			tx.executeSql('SELECT * FROM SUBJ_INFO WHERE subj_id = ?', [currSubjKey], function (tx, subResults) {
				if (subResults.rows.length > 0){
						var counLastID = subResults.rows.item(0).lastCoun_id; 
						if(counLastID != ''){
							iTrackerID = counLastID; //set guid for session to current (so can update)
							tx.executeSql('SELECT * FROM COUNSEL_PERF WHERE couns_ID = ?', [counLastID], function (tx, cResults) {
								if(cResults.rows.length >0){
									editText1 = cResults.rows.item(0).coping_strategies;
									editText2 = cResults.rows.item(0).stress_management;
									editText3 = cResults.rows.item(0).theraputic_interactions;
									editText4 = cResults.rows.item(0).other_counseling; 

								}
								//set textarea values - blank if none existing
								if ((editText1 !== '') && (editText2 !== '')  && (editText3 !== '')  && (editText4 !== '')){
									document.getElementById("cCounText").value = editText1;
									document.getElementById("sCounText").value = editText2;
									document.getElementById("tCounText").value = editText3;
									document.getElementById("othCounText").value = editText4;									
									makeEditPage(locNum);
								}else{
									startIndSess(locNum);
								}
							}, errorHandler);
						}
				}
			}, errorHandler);

			//
		}
	});	
}

//function to make edit page visible and create a sample of the text that would be edited
function makeEditPage(tracker){
	iTracker = tracker; 
	hideElems(["startIndCoun", "startIndPed", "pedChoices"]);
	//fill indEditText
	if (tracker == 1){
		document.getElementById("indEditText").innerHTML = '<b>Last General Knowledge Enhancement Session: </b><br>';
		document.getElementById("indEditText").innerHTML += 'Explain the vocal mechanism: ' + editText1 + '<br>';
		document.getElementById("indEditText").innerHTML += 'Explain results from the voice evaluation: ' + editText2 + '<br>';
		document.getElementById("indEditText").innerHTML += 'Explain deviant vocal characteristics noted: ' + editText3 + '<br>';
		document.getElementById("indEditText").innerHTML += 'Other general knowledge enhancement notes: ' + editText4 + '<br>';
		lastGoalText = 'General Knowledge Enhancement';
	}else if (tracker == 5){
		document.getElementById("indEditText").innerHTML = '<b>Last Counseling Session: </b><br>';
		document.getElementById("indEditText").innerHTML += 'Coping Strategies: ' + editText1 + '<br>';
		document.getElementById("indEditText").innerHTML += 'Stress Management: ' + editText2 + '<br>';
		document.getElementById("indEditText").innerHTML += 'Therapeutic Interactions: ' + editText3 + '<br>';
		document.getElementById("indEditText").innerHTML += 'Other: ' + editText4 + '<br>';
		lastGoalText = 'Counseling';
	}
	showElems(["indEditPage"]);
	updateCurrInfo(true, true, true, false, false, false, false);
}

//function to navigate based on choice in indEditPage if next session to be edited or not 
function editChoice(choice){
	document.getElementById("indEditText").innerHTML = '';
	hideElems(["indEditPage"]);
	if(choice == 1){ // chose to edit - already filled, go to form
		currGoalID = iTrackerID;
		startIndSess(iTracker); 
		showElems(["updateCounBut", "updateGKEbut"]);
		hideElems(["endCounBut", "endGKEbut"]);
	}else if(choice == 2){ // chose to start blank - clear and go to blank form
		if (iTracker == 1){
			document.getElementById("gke0").value = '';
			document.getElementById("gke1").value = '';
			document.getElementById("gke2").value = '';
			document.getElementById("gke3").value = '';
		}else if (iTracker == 5){
			document.getElementById("cCounText").value = '';
			document.getElementById("sCounText").value = '';
			document.getElementById("tCounText").value = '';
			document.getElementById("othCounText").value = '';
		}
		startIndSess(iTracker); //should be blank or unsaved
	}
}

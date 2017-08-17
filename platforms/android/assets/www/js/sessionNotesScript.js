//function to save session notes entered text in database in subjects' last sessiongoal, make next button appear
function saveNotes(){
	notesText = document.getElementById("sessNotes").value;
	document.getElementById("sessRes").innerHTML = "<b>Session notes: </b>" + notesText;
	hideElems(["sessRes"]);
	db.transaction(function (tx) {tx.executeSql('UPDATE SESSION_INFO SET sessionNotes = ? WHERE session_id = ?', [notesText, currSessionID]);}); 
	db.transaction(function (tx) {tx.executeSql('UPDATE SUBJ_INFO SET endSessionNotes = ? WHERE subj_id = ?', [notesText, currSubjKey]);}); 
	document.getElementById("saveSessBut").innerHTML = "Patient information saved.";
	showElems(["endPage"]);
	createSessionText();
}

//function to save the last goal info on the end of session notes page ***doesnt save deliv method
function saveEndVariables(){
	db.transaction(function (tx) {tx.executeSql('UPDATE SUBJ_INFO SET endGoalType = ?, endGoalID = ?, endGoalText = ?, endMethText = ?, endTaskText = ?, endUttText = ? WHERE subj_id = ?', [lastGoalType, lastGoalID, lastGoalText, lastMeth, lastTask, lastUtt, currSubjKey], successHandler, errorHandler);}); 
}

//function to create strings of text for a display of the session at the end (and for email option) - specifically indirect, calls getDirectGoalData() for direct int session info
function createSessionText(){
	//showElems(["endSendOpts", "fullEndBut"]);
	//var num = 0;
	var sessNum = sessIDarray.length;
	idataTextArray.push("<b>Indirect Intervention Data</b>");
	idataTextArray.push(" ");
	ddataTextArray.push("<b>Direct Intervention Data</b>");
	ddataTextArray.push(" ");
	extractFromDB(0);
	function extractFromDB(num){
	//while(num < sessNum){
		var sessID = sessIDarray[num]; //assigns first GUID in array to sessID and removes from array
		//db transaction to find if indirect intervention session activity
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM SESSION_INFO WHERE subj_num = ? AND session_id = ? AND goal_type = ?', [currSubjKey, sessID, 'Indirect'], function (tx, mainRes) {
				var ileng = mainRes.rows.length;
				if(ileng == 0){
					getDirectGoalData();
				}else{ 
					var indType = mainRes.rows.item(0).goal_text; //couns, gke or vh text
					var igoalPrintID = mainRes.rows.item(0).session_id;
					var iGoalPrint;					
					if(indType == 'Counseling'){
						iGoalPrint = "Counseling";
						tx.executeSql('SELECT * FROM COUNSEL_PERF WHERE session_num = ?', [igoalPrintID], function (tx, results){
							if(results.rows.length>0){
							idataTextArray.push(iGoalPrint);
							var copingData = "  -" + counselingArray[0] + ": " + results.rows.item(0).coping_strategies;
							var stressData = "  -" + counselingArray[1] + ": " + results.rows.item(0).stress_management;
							var therapData = "  -" + counselingArray[2] + ": " + results.rows.item(0).theraputic_interactions;
							var othCounselData = "  -" + counselingArray[3] + ": " + results.rows.item(0).other_counseling;
							idataTextArray.push(copingData); 
							idataTextArray.push(stressData);
							idataTextArray.push(therapData);
							idataTextArray.push(othCounselData);
							idataTextArray.push(" ");
							}
							getDirectGoalData()
							//nextSessPart(p);
						}, errorHandler);
					}else if(indType == 'General Knowledge Enhancement'){
						iGoalPrint = "General Knowledge Enhancement";
						tx.executeSql('SELECT * FROM GKE_PERF WHERE session_num = ?', [igoalPrintID], function (tx, results){
							if(results.rows.length>0){
							idataTextArray.push(iGoalPrint); 
							var vocMechData = "  -" + GKEArray[0] + ": " + results.rows.item(0).gke1; 
							var vocEvalData = "  -" + GKEArray[1] + ": " + results.rows.item(0).gke2;
							var vocCharData = "  -" + GKEArray[2] + ": " + results.rows.item(0).gke3;
							var othNotesData = "  -" + GKEArray[3] + ": " + results.rows.item(0).gke4;
							idataTextArray.push(vocMechData);
							idataTextArray.push(vocEvalData);
							idataTextArray.push(vocCharData);
							idataTextArray.push(othNotesData);
							idataTextArray.push(" ");
							}
							getDirectGoalData()
							//nextSessPart(p);
						}, errorHandler);	
					}else{
						iGoalPrint = "Vocal Hygiene Goal: " + indType;
						tx.executeSql('SELECT * FROM IND_PERF WHERE session_num = ?', [igoalPrintID], function (tx, results){
							if(results.rows.length>0){	//could be empty if null/false else capture
								idataTextArray.push(iGoalPrint);
								var q1data = "  -" + indQuestArray[0] + ": " + results.rows.item(0).q1;
								var q2data = "  -" + indQuestArray[1] + ": " + results.rows.item(0).q2;
								var q3data = "  -" + indQuestArray[2] + ": " + results.rows.item(0).q3;
								var q4data = "  -" + indQuestArray[3] + ": " + results.rows.item(0).q4;
								var qOthData = "  -" + indQuestArray[4] + ": " + results.rows.item(0).q5;
								idataTextArray.push(q1data);
								idataTextArray.push(q2data);
								idataTextArray.push(q3data);
								idataTextArray.push(q4data);
								idataTextArray.push(qOthData);
								idataTextArray.push(" "); 
							}
							getDirectGoalData()
						}, errorHandler);
					}
				}
		}, errorHandler); //end ind tx main
	});	//end db transaction
		
		//nested function only called by createSessionText() when indirect intervention session strings are complete
		function getDirectGoalData(){
			db.transaction(function (tx) {
				tx.executeSql('SELECT * FROM SESSION_INFO WHERE subj_num = ? AND session_id = ? AND goal_type = ?', [currSubjKey, sessID, 'Direct'], function (tx, resMainD) {
					var dleng = resMainD.rows.length;
					if(dleng == 0){
						if(num <sessNum){
							num++;
							extractFromDB(num);
						}
					}else{
						var dGoalText = resMainD.rows.item(0).goal_text;
						var dgoalPrintID = resMainD.rows.item(0).session_id;
						dGoalText = "Goal: " + dGoalText;
						tx.executeSql('SELECT * FROM DIR_PERF WHERE session_num = ?', [dgoalPrintID], function (tx, results){
							var dgleng = results.rows.length; 
							if(dgleng > 0){
								var methText = results.rows.item(0).methodsArray;
									methText = "Method(s): " + methText;
								var toolText = results.rows.item(0).toolsArray;
									toolText = "Tool(s): " + toolText;
								var delivText = results.rows.item(0).delivLevel;
									delivText = "Delivery Method: " + delivText;
								var uttText = results.rows.item(0).uttLevel;	
									uttText = "Utterance Level: " + uttText;
								ddataTextArray.push(dGoalText);
								ddataTextArray.push(methText);
								ddataTextArray.push(toolText);
								ddataTextArray.push(delivText);
								ddataTextArray.push(uttText); 
						
							var perfArray = results.rows.item(0).performanceVal;
								//var noteText = "Trial notes: " + results.rows.item(0).trialNotes; 
								var noteText = results.rows.item(0).trialNotes;
								var scoreindex = 0;
								//perfArray = perfArray.substring(0, perfArray.length-1);
								while (perfArray.length>0){
									scoreindex = perfArray.indexOf(",");
									notescoreindex = noteText.indexOf(",");
									if(scoreindex == -1){
										if(notescoreindex != -1){noteText = noteText.substring(0, notescoreindex);}
										var perfText = "  -(" + perfArray + ") trials successful. Trial notes: " + noteText; 
										ddataTextArray.push(perfText);
										perfArray = '';
									}else{
										var perfText = "  -(" + perfArray.substring(0, scoreindex)+ ") trials successful. Trial notes: " + noteText.substring(0, notescoreindex);
										ddataTextArray.push(perfText);
										perfArray = perfArray.substring(scoreindex+1);
										noteText = noteText.substring(notescoreindex+1);
									}
								}
								//ddataTextArray.push(noteText);
								ddataTextArray.push(" "); 
								if(num < sessNum -1){
									num++;
									extractFromDB(num);
								}
							}
						}, errorHandler); //perf tx
					}		
				}, errorHandler);//end of session tx
			});	//transaction
		} //fxn getdirgoaldata
	}
	//displaySession(false);	
}

//function to displays the strings created from the session - if forEmail, adds linebreaks here and opens email window through plugin
function displaySession(forEmail){
	//loop through the two arrays and print each element on a new line
	var iLen = idataTextArray.length;
	var dLen = ddataTextArray.length;
	
	//if either data text array is only 2 elements long (header & space), indicate no activity
	if(iLen == 2){idataTextArray.push("No direct intervention activity.");}
	if(dLen == 2){ddataTextArray.push("No direct intervention activity.");}
	
	var thisLineInd, thisLineDir;
	var bigIndStr = '';
	var bigDirStr = '';
	var subjStr = "Patient ID: " + currSubjID + "<br>" + todayToStr();
	
	for(ii = 0; ii<iLen; ii++){
		thisLineInd = "<br>" + idataTextArray[ii];
		bigIndStr += thisLineInd;
	}
	for(dd = 0; dd<dLen; dd++){
		thisLineDir = "<br>" + ddataTextArray[dd];
		bigDirStr += thisLineDir;
	}
	
	if(forEmail){
		var sessAllText = subjStr + "<br>" + bigIndStr + "<br>" + bigDirStr + "<br>" + document.getElementById("sessRes").innerHTML;
		var sessSubjLine = "VoiceTx " + currSubjID + " Session " + todayToStr(); 
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				if(isAvailable){
					cordova.plugins.email.open({
					to:      '',			
					subject: sessSubjLine,
					body:    sessAllText
					});
				}else{
					alert('Email service is not available on this device')
				}
			}
		);
		/*cordova.plugins.email.open({
		to:      '',
		subject: sessSubjLine,
		body:    sessAllText
		});*/
	}else{
		showElems(["endSendOpts", "fullEndBut"]);
		document.getElementById("subjRes").innerHTML = subjStr;
		document.getElementById("indRes").innerHTML = bigIndStr;
		document.getElementById("dirRes").innerHTML = bigDirStr;
		showElems(["sessRes"]);
	}	
}
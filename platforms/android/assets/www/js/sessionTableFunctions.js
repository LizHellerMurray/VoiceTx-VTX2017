//function to fill the session goal table after each goal has been set (after indirect vh goal or gke/counsel session save and after direct intervention goal cue levels begun)
function fillSessionGoalTable(){ 
	currSessionID = guid(); //sessionID only changes right before session saved 
	sessIDarray.push(currSessionID);
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO SESSION_INFO (session_id, subj_num, goal_type, goal_id, goal_text, dayStr) VALUES (?, ?, ?, ?, ?, ?)', [currSessionID, currSubjKey, lastGoalType, lastGoalID, lastGoalText, todayToStr()]);	
    });
	//alert("saved to session goal table (currSessionID, currSubjKey, lastGoalType, lastGoalID, lastGoalText, todayToStr()]): " + currSessionID + currSubjKey + lastGoalType + lastGoalID + lastGoalText + todayToStr())
}

//function to fill the indirect intervention vocal hygeine goals' performance table with text from each task taken as parameters
function fillIndPerfTable(text1, text2, text3, text4, text5){
	currGoalID = guid();
	db.transaction(function (tx) {
        tx.executeSql('INSERT INTO IND_PERF VALUES (?, ?, ?, ?, ?, ?, ?)', [currGoalID, currSessionID, text1, text2, text3, text4, text5], successHandler, errorHandler);	
    });
	//alert("saved to ind perf table (currGoalID, currSessionID, text1, text2, text3, text4): " + currGoalID + currSessionID + text1 + text2 + text3 + text4)
}

//function to fill DIR_PERF table with goal/meth/task/utt text combo and performances info
function fillDirPerfTable(cueLev, perfAr, noteAr){
	currGoalID = guid();
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO DIR_PERF VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [currGoalID, currSessionID, lastMeth, lastTask, lastUtt, cueLev, perfAr, noteAr], successHandler, errorHandler);
    });
	//alert("saved to dir perf table(currGoalID, currSessionID, lastMeth, lastTask, lastUtt, cueLev, perfAr): " + currSessionID) //+ lastMeth + lastTask + lastUtt + cueLev + perfAr)+ currGoalID 
}

//function to save the indirect intervention general knowledge enhancement table with the session text from 4 gke textboxes, taken as parameters
function fillGKETable(g1text, g2text, g3text, g4text){
	currGoalID = guid();
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO GKE_PERF VALUES (?, ?, ?, ?, ?, ?)', [currGoalID, currSessionID, g1text, g2text, g3text, g4text], successHandler, errorHandler);
    });
	//alert("saved to gke perf table(currGoalID, currSessionID, gke1 and 2...): " + currGoalID + currSessionID + g1text + g2text)
	db.transaction(function (tx) {tx.executeSql('UPDATE SUBJ_INFO SET lastGKE_id = ? WHERE subj_id = ?', [currGoalID, currSubjKey]);});
}

//function to save the indirect intervention counseling table with the session text from 4 counseling textboxes, taken as parameters
function fillCounsTable(copeText, stressText, therapText, othText){
	currGoalID = guid();
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO COUNSEL_PERF VALUES (?, ?, ?, ?, ?, ?)', [currGoalID, currSessionID, copeText, stressText, therapText, othText], successHandler, errorHandler);
    });
	db.transaction(function (tx) {tx.executeSql('UPDATE SUBJ_INFO SET lastCoun_id = ? WHERE subj_id = ?', [currGoalID, currSubjKey]);});
}

//function to update coundeling data from edit mode option
function updateCounsTable(copeText, stressText, therapText, othText){
	db.transaction(function (tx) {tx.executeSql('UPDATE COUNSEL_PERF SET coping_strategies = ?, stress_management = ?, theraputic_interactions = ?, other_counseling = ? WHERE couns_ID = ?', [copeText, stressText, therapText, othText, currGoalID], successHandler, errorHandler);});
}

//function to update gke data from edit mode option
function updateGKETable(g1text, g2text, g3text, g4text){
	//alert(g1text + g2text + g3text + g4text);
	db.transaction(function (tx) {tx.executeSql('UPDATE GKE_PERF SET gke1 = ?, gke2 = ?, gke3 = ?, gke4 = ? WHERE gkeSess_ID = ?', [g1text, g2text, g3text, g4text, currGoalID], successHandler, errorHandler);});
}

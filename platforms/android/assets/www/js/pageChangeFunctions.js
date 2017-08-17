hideElems(["pedChoices"]); //should automatically ensure pedChoices hidden at start

//if the user has elected to begin the session with an existing patient, this function brings up the page to select the patient
function choseExistingPatient(){
	hideElems(["startPage"]);
	showElems(["subjSelectPage", "subjSelectForm"]);
	//currSessionID = guid(); //is set before session saved anyway?
}

//if the user has elected to begin the session with a new patient, this function brings up the new subjectID form page  
function choseNewPatient(){
	cleanEndSession();
	hideElems(["startPage", "subjSelectPage"]);
	hideSubjTable();
	showElems(["subjIDPage"]);
	//currSessionID = guid(); //is set before session saved anyway?
	idataTextArray = [];
	ddataTextArray = [];
	document.getElementById("subjRes").innerHTML = '';
	document.getElementById("indRes").innerHTML = '';
	document.getElementById("dirRes").innerHTML = '';
}

//function to switch between intervention in header buttons navigation
function interventionSwitch(sender){
	if (sender === 1) { //to indirect intervention main menu
		resetAllPages();
		lastGoalType = "Indirect";
		showElems(["indGoalPage", "startIndPed"]);
	}
	if (sender === 2) { //to direct intervention goal page start
		resetAllPages();
		lastGoalType = "Direct";
		showElems(["dirGoalPage", "dirSelectPage"]);
	}
	updateCurrInfo(true, true, false, false, false, false, false);	
}

//this function brings user to start page at the end of a session and calls cleanEndSession to reset variables 
function fullSessionEnd(){
		document.getElementById("subjRes").value == '';
		document.getElementById("indRes").value == '';
		document.getElementById("dirRes").value == '';
		document.getElementById("sessRes").value == '';
		hideElems(["endPage", "sessNotesPage"]);
		showElems(["startPage"]);
		updateCurrInfo(false, false, false, false, false, false, false);
		cleanEndSession();
}

//function for back buttons on both select existing and create new subject pages
function startBack(){
	clearSubjForm();
	hideSubjTable();
	hideElems(["subjSelectPage", "subjIDPage"]);
	showElems(["startPage"]);
}

//function to end session and send user to session notes page
function endSess(){
	resetAllPages();
	document.getElementById("sessNotesPage").style.display = 'block';
	document.getElementById("helpPage").style.display = 'none';
	updateCurrInfo(true, false, false, false, false, false, false);
}

//function to control the visibility of the help page - paramater show true to make visible, false to hide
function showHelp(show){
	if(show){
		hideElems(["helpButi", "helpButd", "helpButm", "helpButss", "helpButns"]);
		//make hide help buttons visible
		document.getElementById("hideHelpButi").style.display = 'inline-block';
		document.getElementById("hideHelpButd").style.display = 'inline-block';
		document.getElementById("hideHelpButm").style.display = 'inline-block';
		document.getElementById("hideHelpButns").style.display = 'inline-block';
		document.getElementById("hideHelpButss").style.display = 'inline-block';
		//hide all text to start
		hideElems(["indHelpText", "dirHelpText", "mtHelpText", "dmHelpText", "noHelpText", "manageHelpText", "counsHelpText", "pedHelpText", "vocHygHelpText"]);
		showElems(["helpPage"]);

		var noDefs = true;
		//select definitions to show depending on page visible
		if(document.getElementById("indGoalPage").style.display === 'block'){
			showElems(["indHelpText"]);
			noDefs = false;
		}
		if(document.getElementById("dirGoalPage").style.display === 'block'){
			showElems(["dirHelpText"]);
			noDefs = false;
		}
		if(document.getElementById("indCounselingDiv").style.display === 'block'){
			showElems(["counsHelpText"]);
			noDefs = false;
		}
		if(document.getElementById("indVHGoalsDiv").style.display === 'block' || document.getElementById("gkeDiv").style.display === 'block'){
			showElems(["pedHelpText"]);
			noDefs = false;
		}
		if(document.getElementById("indVHGoalsDiv").style.display === 'block'){
			showElems(["vocHygHelpText"]);
			noDefs = false;
		}
		if(document.getElementById("methTaskForm").style.display === 'block'){
			showElems(["mtHelpText"]);
			noDefs = false;
		}
		if(document.getElementById("cueLevListForm").style.display === 'block' || document.getElementById("trialBoxes").style.display === 'block' ){
			showElems(["dmHelpText"]);
			noDefs = false;
		}
		if(document.getElementById("managePage").style.display === 'block'){
			showElems(["manageHelpText"]);
			noDefs = false;
		}
		if(noDefs){
			showElems(["noHelpText"]);
		}
	}else{	
		//hide help page and its internal text
		hideElems(["helpPage", "noHelpText", "indHelpText", "dirHelpText", "mtHelpText", "dmHelpText", "noHelpText", "manageHelpText", "counsHelpText", "pedHelpText", "vocHygHelpText"]);
		//hide Hide help buttons
		hideElems(["hideHelpButi", "hideHelpButd", "hideHelpButm", "hideHelpButss", "hideHelpButns"]);
		//show help buttons
		document.getElementById("helpButi").style.display = 'inline-block';
		document.getElementById("helpButd").style.display = 'inline-block';
		document.getElementById("helpButm").style.display = 'inline-block';
		document.getElementById("helpButns").style.display = 'inline-block';
		document.getElementById("helpButss").style.display = 'inline-block';
	}
}

//function to navigate within the session from the header buttons
function buttonPageChoose(whereto){
	resetAllPages(); //first, make everything hidden
	//switch to make the page change from header button
	switch (whereto) {
		case "startPage":
			showElems(["startPage"]);
			updateCurrInfo(false, false, false, false, false, false, false);
			break;
		case "subjSelectPage":
			showElems(["intervSwitchButs"]);
			updateCurrInfo(true, false, false, false, false, false, false);
			break;
		case "indGoalPage":
			//oh we fancy~~ either navigates to indirect options page or goal page
			if(lastGoalText == 'Counseling' || lastGoalText == 'General Knowledge Enhancement'){
				showElems(["indGoalPage"]);		
			}else{
				showElems(["indGoalPage", "indSelectPage"]);
				hideElems(["startIndCoun", "startIndPed"]);
			}
			updateCurrInfo(true, true, false, false, false, false, false);
			break;
		case "dirSelectPage":
			showElems(["dirGoalPage", "dirSelectPage"]);
			updateCurrInfo(true, true, false, false, false, false, false);
			break;
		case "methTaskForm":
			showElems(["dirGoalPage", "methTaskForm"]);
			checkForPresets();
			viewPreset(false);		
			updateCurrInfo(true, true, true, true, true, false, false);	
			break;
		case 'cueLevListForm':
			//currDelivLevel = '';
			showElems(["dirGoalPage", "cueLevListForm", "cueTitle"]);
			updateCurrInfo(true, true, true, true, true, true, false);
			break;
		case "uttForm":
			hideElems(["trialBoxes"]); //probably not necessary
			showElems(["dirGoalPage", "uttForm", "subUttBut"]);
			updateCurrInfo(true, true, true, true, true, true, true);	
			break;	
	}
}

//function to reset variables and clear textareas at the end of a session with a given patient
function cleanEndSession(){
	var resetButText = "<button type= 'button' onclick='saveNotes()'>Save</button>";	
	document.getElementById("saveSessBut").innerHTML = resetButText;
	document.getElementById("sessNotes").value = '';
	document.getElementById("subjRes").innerHTML = '';
	document.getElementById("indRes").innerHTML = '';
	document.getElementById("dirRes").innerHTML = '';
	hideElems(["sessRes", "endSendOpts", "fullEndBut"]);
	
	idataTextArray = [];
	ddataTextArray = [];

	//clears all globals
	currSubjKey = '';
	currSubjID = '';
	currSessionID = '';
	sessIDarray = [];
	//currDelivLevel = ''; this is like "last"
	currLevelPerf = [];
	trialNotesPerf = [];
	lastGoalType = '';
	lastGoalID = '';
	lastGoalText = '';
	lastMeth = '';
	lastTask = '';
	lastUtt = '';
}

//function to reset ALL visibility to original css - used before most navigations
function resetAllPages(){
	//start pages
		hideElems(["startPage", "subjSelectPage"]);
		hideSubjTable();
		clearSubjForm();
		hideElems(["subjIDPage"]);
	
	//indirect intervention components
		hideElems(["indGoalPage", "indSelectPage", "subjSelectPage", "gkeDiv", "indVHGoalsDiv","indCounselingDiv", "indEditPage", "updateCounBut", "updateGKEbut"]);
		showElems(["startIndCoun", "startIndPed", "endCounBut", "endGKEbut"]);
		document.getElementById("indEditText").value = '';
		
	//direct intervention performance saver
		if(document.getElementById("trialBoxes").style.display == 'block' && document.getElementById("dirGoalPage").style.display == 'block'){
			completeTrial(false); 
			newTrial();
			resetPerfArray();
			hideElems(["completeTrialBut", "trialBoxes", "trialResetter"]);
		}else{
			hideElems(["trialBoxes", "completeTrialBut", "trialResetter"]);
		}
	//direct intervention components
		hideElems(["dirSelectPage"]);
		//need to uncheck things here - because may end in the middle
		submitMethTasks(true); //unchecks tool checkboxes (end = true)
		submitUttLevel(false); //unchecks utt levels
		if(eDMval){ showCues('cue1');}
		if(eiDMval){ showCues('cue2');}
		if(iDMval){ showCues('cue3');}//uncheck DMs
		hideElems(["dirGoalPage", "methTaskForm", "uttForm", "subUttBut", "cueTitle", "cueLevListForm"]);
	
	//end page
		var resetButText = "<button type= 'button' onclick='saveNotes()'>Save</button>";	
		document.getElementById("saveSessBut").innerHTML = resetButText;
		document.getElementById("sessNotes").value = '';
		document.getElementById("subjRes").innerHTML = '';
		document.getElementById("indRes").innerHTML = '';
		document.getElementById("dirRes").innerHTML = '';
		hideElems(["sessRes"]);
	
	//hide notes and help
		showHelp(false);
		hideElems(["sessNotesPage", "endPage", "intervSwitchButs"]);
}

//function to show about page or go back to start from about page
function aboutVoiceTx(showAbout){
	if(showAbout){
		hideElems(["startPage", "noTermsBut", "CRdetails"]);
		showElems(["aboutUsPage", "termsBut"]);
	}else{
		showElems(["startPage"]);
		hideElems(["aboutUsPage", "noTermsBut", "CRdetails"]);
	}
}

//function to show/hide details of Terms of Use on About Us page
function showTerms(show){
	if(show){
		hideElems(["termsBut"]);
		showElems(["noTermsBut", "CRdetails"]);
	}else{
		showElems(["termsBut"]);
		hideElems(["noTermsBut", "CRdetails"]);
	}
}

//function to show/hide page with instructions to email full db
function emailAllPg(showEmail){
	if(showEmail){
		hideElems(["startPage", "noInstructBut", "emailInstruct"]);
		showElems(["emailAllPage", "instructBut"]);
	}else{
		showElems(["startPage", "instructBut"]);
		hideElems(["emailAllPage", "noInstructBut", "emailInstruct"]);
		//clear email box to reset?
	}
}

//function to show/hide DB Browser instructions on email page
function showInstruct(showInstr){
	if(showInstr){
		hideElems(["instructBut"]);
		showElems(["noInstructBut", "emailInstruct"]);
	}else{
		showElems(["instructBut"]);
		hideElems(["noInstructBut", "emailInstruct"]);
	}
}

//function to show/hide page with instructions to import full DB
function openImportPg(opening){
	if(opening){
		hideElems(["startPage", "importInstruct"]);
		showElems(["importDataPage", "showImportBut"]);
	}else{
		showElems(["startPage", "showImportBut"]);
		hideElems(["importDataPage", "importInstruct"]);
	}
}

//function to show/hide import textbox and instructions on import data page
function showImport(){
		hideElems(["showImportBut"]);
		showElems(["importInstruct"]);
}
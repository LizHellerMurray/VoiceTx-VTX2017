//some global variables established here
	var currSubjKey; 				//primary GUID for a patient
	var currSubjID;					//patient name more recognizable to user
	
	var currSessionID; 				//GUID for session, which tracks type of goal session completed
	var currGoalID;					//GUID for session goal, changes for each new goal (a goal is Counseling, General Knowledge Enhancement, Vocal Hygeine Goal or a Direct Intervention Goal)
	var currDelivLevel = ''; 		//contains patient's delivery level text for saving in direct intervention
	var currLevelPerf = []; 		//tracks patient performance on tri-state checkboxes (trialboxes) in direct intervention(note: SAVES AS STRING #correct/#completed)
	var trialNotesPerf = []; 		//saves notes associated with the trialboxes page
	
	//"last" globals saved to subject info - mainly for "return to where left off" option in subject table
	var lastGoalType = ''; 			//contains string defining intervention type: either "Indirect" or "Direct"
	var lastGoalID; 				//GUID identifier of last goal completed
	var lastGoalText = '';			//string last goal (or type of indirect intervention i.e. Counseling)
	var lastMeth = ''; 				// string of last methods if last completed direct intervention
	var lastTask = ''; 				//string of last tools if last completed direct intervention
	var lastUtt = ''; 				//string of last utterance level if last completed direct intervention

	//globals used during printing
	var idataTextArray = []; 		//array of strings describing indirect intervention session for end of session summary and emailing
	var ddataTextArray = []; 		//'' direct intervention session ''
	var indQuestArray = ["Identify the behavior", "Describe the effects", "Define specific occurrences", "Plan for modifying behavior", "Other"]; 	//Vocal Hygiene Goal focus questions
	var counselingArray = ["Coping Strategies", "Stress Management", "Theraputic Interactions", "Other"]; 											// Counseling session focuses
	var GKEArray = ["Explain the vocal mechanism", "Explain results from the voice evaluation", "Explain deviant vocal characteristics noted", "Other general knowledge enhancement notes"]; //general knowledge enhancement focuses
	
	//method and group text global arrays
	var meth_IDArray = ["Somatosensory", "Auditory", "Respiratory", "Vocal Function", "Musculoskeletal", "Other"]; 	//array of main methods text
	var methGroup_IDArray = ["Discrimination", "Nocioception", "Visual Processing", "Conduction", "Sensorineural", "Loudness Modification", "Respiratory Coordination", "Respiratory Support", "Glottal Contact Exercises", "Pitch Modification", "Vegetative Vocalizations", "Neck Modification", "Orofacial Modification", "Postural Alignment", "Stretching", "Other"]; //array of method subgroup text
	
	//string globals to display text for editing when changing between indirect intervention types - to allow counseling or gke sessions to be editable within same session
	var editText1 = '';
	var editText2 = '';
	var editText3 = '';
	var editText4 = '';
	var iTracker = 0; //tracker for ind goal type
	var iTrackerID = '';
	
//here the database is established (if it does not already exist on the device) with the default tables and editable tables (goals, tasks, utterance levels, etc)
	var db = [];
	
	//called from index.html after pass onload and deviceready
	function startDb() { 

		db = sqlitePlugin.openDatabase('voiceTxDBtrialNotes4', '1.0', 'VoiceTx', 2 * 1024 * 1024); //=3MB storage
		//DB name that went out to WI and WA (tables since updated): voiceTxDBmain1

		db.transaction(function (tx) {
			//creates reference tables for goals (empty on first open)
				tx.executeSql('CREATE TABLE IF NOT EXISTS INDGOAL_ID (ig_id VARCHAR(36), iGoals VARCHAR(255), showIG INTEGER, PRIMARY KEY (ig_id))');
				tx.executeSql('CREATE TABLE IF NOT EXISTS DIRGOAL_ID (dg_id VARCHAR(36), dGoals VARCHAR(255), showDG INTEGER, PRIMARY KEY (dg_id))');

			//tools, utterance levels and delivery methods tables (CHANGING)				
				tx.executeSql('CREATE TABLE IF NOT EXISTS TOOL_ID (toolID CHARACTER(36), taskText VARCHAR(255), methGroupType INTEGER, showTask INTEGER, PRIMARY KEY (toolID))');
				tx.executeSql('SELECT * FROM TOOL_ID', [], taskTabCheck, errorHandler);
				
				function taskTabCheck( tx, results ){	
					if(results.rows.length < 1) {
						//if empty (first open), drops and recreates
						tx.executeSql('DROP TABLE IF EXISTS TOOL_ID');
						tx.executeSql('CREATE TABLE IF NOT EXISTS TOOL_ID (toolID CHARACTER(36), taskText VARCHAR(255), methGroupType INTEGER, showTask INTEGER, PRIMARY KEY (toolID))');
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Effort", 1, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Placement", 1, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Semi-occluded vocal tract", 1, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Tactile", 1, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Discomfort", 2, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Pain", 2, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Soreness", 2, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Thermal Stimulation", 2, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Drawing", 3, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Gestures", 3, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Mirror use", 3, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Physical models", 3, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Video", 3, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Bone conduction occlusion", 4, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Delayed auditory feedback", 4, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "External ear canal occlusion", 4, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Masking", 4, 1)', [guid()]);	
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Loudness assessment", 5, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Pitch assessment", 5, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Voice quality filters", 5, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Voice quality source effect", 5, 1)', [guid()]);

						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Loudness modification", 6, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Maximum phonation time, various loudnesses", 6, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Messa di voice", 6, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Easy onset", 7, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Flow", 7, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Gargling", 7, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Held voice/voiceless fricatives", 7, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Inhalation phonation", 7, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Maximum phonation time", 7, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Stacatto", 7, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Abdominal breathing", 8, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Expiratory muscle training", 8, 1)', [guid()]);	
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Incentive spirometry", 8, 1)', [guid()]);	
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Easy onset", 9, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Glottal fry", 9, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Glottal stop", 9, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Maximum phonation time", 9, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Pitch change", 9, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Push/pull", 9, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Sniff", 9, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Voice rest", 9, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Inflection", 10, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Lip trills", 10, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Maximum phonation time, various pitches", 10, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Pitch flexibility", 10, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Pitch range", 10, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Tongue trills", 10, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Cough", 11, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Cry", 11, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Laugh", 11, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Mmmhmmm", 11, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Throat clear", 11, 1)', [guid()]);
					
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Anterior neck", 12, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Digital manipulation", 12, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Lateral neck", 12, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Myofascial release", 12, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Posterior neck", 12, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Alter tongue, lip, mouth, oropharynx", 13, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Chewing", 13, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Myofascial release", 13, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Open mouth", 13, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Orofacial massage", 13, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Yawn-sign", 13, 1)', [guid()]);	
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Atlanto-occipital alignment", 14, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Body posture", 14, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Head/neck position", 14, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Dynamic positions for lengthening muscles", 15, 1)', [guid()]);
						tx.executeSql('INSERT INTO TOOL_ID (toolID, taskText, methGroupType, showTask) VALUES (?, "Held position for lengthening muscles", 15, 1)', [guid()]);
					} 
				}
				
				tx.executeSql('CREATE TABLE IF NOT EXISTS UTT_ID (utter_id CHARACTER(36), uttText VARCHAR(255), showUtter INTEGER, PRIMARY KEY (utter_id))');
				tx.executeSql('SELECT * FROM UTT_ID', [], uttTabCheck, errorHandler);
				
				function uttTabCheck( tx, results ){	
					if(results.rows.length < 1) {
						//if empty (first open), drops and recreates
						tx.executeSql('DROP TABLE IF EXISTS UTT_ID');
						tx.executeSql('CREATE TABLE IF NOT EXISTS UTT_ID (utter_id CHARACTER(36), uttText VARCHAR(255), showUtter INTEGER, PRIMARY KEY (utter_id))');
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "No stimuli", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Elicit behavior", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Single sound", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Syllables/sound: 2 syllables", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Syllables/sound: 3-4 syllables", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Phrase/sentence: 5-6 syllables", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Phrase/sentence: 7-8 syllables", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Phrase/sentence: 9-10 syllables", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Long sentence: 11-15 syllables", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Long sentence: 16-20 syllables", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Reading: paragraph", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Short response", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Long response", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Conversational", 1)', [guid()]);
						tx.executeSql('INSERT INTO UTT_ID (utter_id, uttText, showUtter) VALUES (?, "Emotional/motivating spontaneous speech", 1)', [guid()]);
					} 
				}
								
				tx.executeSql('CREATE TABLE IF NOT EXISTS DELIV_ID (del_id CHARACTER(36), delivText VARCHAR(255), delivType INTEGER, showDeliv INTEGER, PRIMARY KEY (del_id))');
				tx.executeSql('SELECT * FROM DELIV_ID', [], delivTabCheck, errorHandler);
				
				function delivTabCheck( tx, results){	
					if(results.rows.length < 1) {
						//if empty (first open), drops and recreates
						tx.executeSql('DROP TABLE IF EXISTS DELIV_ID');
						tx.executeSql('CREATE TABLE IF NOT EXISTS DELIV_ID (del_id CHARACTER(36), delivText VARCHAR(255), delivType INTEGER, showDeliv INTEGER, PRIMARY KEY (del_id))');
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Exploration", 1, 1)', [guid()]);
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Hierarchy", 1, 1)', [guid()]);
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Modeling", 1, 1)', [guid()]);
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Psychotherapeutic", 1, 1)', [guid()]);
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Teaching", 1, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Augmented feedback", 2, 1)', [guid()]);
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Deliberate practice", 2, 1)', [guid()]);
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Home program", 2, 1)', [guid()]);
						
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Self-evaluation", 3, 1)', [guid()]);
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Self-correction", 3, 1)', [guid()]);
						tx.executeSql('INSERT INTO DELIV_ID (del_id, delivText, delivType, showDeliv) VALUES (?, "Self-cueing", 3, 1)', [guid()]);						
					}
				}
				
		//establishes subjects' documentation/performance tables
			tx.executeSql('CREATE TABLE IF NOT EXISTS SUBJ_INFO (subj_id CHARACTER(36), subj_idText VARCHAR(255), age VARCHAR(15), gender VARCHAR(6), diagnosis VARCHAR(255), dateCreated CHARACTER(10), endGoalType VARCHAR(8), endGoalID VARCHAR(36), endGoalText VARCHAR(255), endMethText VARCHAR(255), endTaskText VARCHAR(255), endUttText VARCHAR(255), endSessionNotes VARCHAR(255), lastGKE_id VARCHAR(36), lastCoun_id VARCHAR(36), showSubject INTEGER, PRIMARY KEY (subj_id))');
			
			tx.executeSql('CREATE TABLE IF NOT EXISTS SESSION_INFO (session_id CHARACTER(36), subj_num CHARACTER(36), goal_type VARCHAR(8), goal_id VARCHAR(36), goal_text VARCHAR(255), dayStr CHARACTER(10), sessionNotes VARCHAR(255), PRIMARY KEY (session_id), FOREIGN KEY (subj_num) REFERENCES SUBJ_INFO(subj_id))'); 
            
			tx.executeSql('CREATE TABLE IF NOT EXISTS IND_PERF (indID CHARACTER(36), session_num CHARACTER(36), q1 VARCHAR(255), q2 VARCHAR(255), q3 VARCHAR(255), q4 VARCHAR(255), q5 VARCHAR(255), PRIMARY KEY (indID), FOREIGN KEY (session_num) REFERENCES SESSION_INFO(session_id))'); //should foreign key link to goal table?
           
			tx.executeSql('CREATE TABLE IF NOT EXISTS DIR_PERF (dirID CHARACTER(36), session_num CHARACTER(36), methodsArray ARRAY, toolsArray ARRAY, uttLevel CHARACTER(36), delivLevel VARCHAR(255), performanceVal ARRAY, trialNotes ARRAY, PRIMARY KEY (dirID), FOREIGN KEY (session_num) REFERENCES SESSION_INFO(session_id))');
            
			tx.executeSql('CREATE TABLE IF NOT EXISTS GKE_PERF (gkeSess_ID CHARACTER(36), session_num CHARACTER(36), gke1 VARCHAR(255), gke2 VARCHAR(255), gke3 VARCHAR(255), gke4 VARCHAR(255), PRIMARY KEY (gkeSess_ID), FOREIGN KEY (session_num) REFERENCES SESSION_INFO(session_id))');
			
			tx.executeSql('CREATE TABLE IF NOT EXISTS COUNSEL_PERF (couns_ID CHARACTER(36), session_num CHARACTER(36), coping_strategies VARCHAR(255), stress_management VARCHAR(255), theraputic_interactions VARCHAR(255), other_counseling VARCHAR(255), PRIMARY KEY (couns_ID), FOREIGN KEY (session_num) REFERENCES SESSION_INFO(session_id))');
			
			//calls functions to establish pages that build tables from the database
			fillSubjTable();
			createIndGoalTable();
			hideElems(["pedChoices"]); //to fix first click problem
			createDirGoalTable();
			createMethTaskPg();
			createUttPage();
			createDelivTable();
		});
	} 
	
//function to update header buttons displaying global variables describing: the current subject, intervention type, goal (...method, tool, utterance level, delivery method if direct)
function updateCurrInfo(showSubj, showInt, showGoal, showMeth, showTool, showUtt, showDem){
	var subBut = document.getElementById("subjHeadBut");
	subBut.style.display = 'none';
	var intIndBut = document.getElementById("intIndHeadBut");
	intIndBut.style.display = 'none';
	var intDirBut = document.getElementById("intDirHeadBut");
	intDirBut.style.display = 'none';
	var indGoalBut = document.getElementById("indGoalHeadBut");
	indGoalBut.style.display = 'none';
	var dirGoalBut = document.getElementById("dirGoalHeadBut");
	dirGoalBut.style.display = 'none';
	var methBut = document.getElementById("methHeadBut");
	methBut.style.display = 'none';
	var toolBut = document.getElementById("toolHeadBut");
	toolBut.style.display = 'none';
	var uttBut = document.getElementById("uttHeadBut");
	uttBut.style.display = 'none';
	var demBut = document.getElementById("demHeadBut");
	demBut.style.display = 'none';
	
	//make all arrows hidden first, select which to show based on true parameters
	hideElems(["arrow1", "arrow2", "arrow3", "arrow4", "arrow5", "arrow6"]);

	if(showSubj){
		subBut.innerHTML = currSubjID;
		subBut.style.display = 'block';
	}
	if(showInt){
		if(lastGoalType == "Indirect"){
			intIndBut.style.display = 'block';			
		}else{
			intDirBut.style.display = 'block';				
		}
		document.getElementById("arrow1").style.display = 'inline-block';
	}
	if(showGoal){
		if(lastGoalType == "Indirect"){
			indGoalBut.innerHTML = lastGoalText;
			indGoalBut.style.display = 'block';	
		}else{
			dirGoalBut.innerHTML = lastGoalText;
			dirGoalBut.style.display = 'block';
		}
		document.getElementById("arrow2").style.display = 'inline-block';	
	} 
	if(showMeth){
		methBut.innerHTML = lastMeth;
		methBut.style.display = 'block';
		document.getElementById("arrow3").style.display = 'inline-block';	
	}
	if(showTool){
		toolBut.innerHTML = lastTask;
		toolBut.style.display = 'block';
		document.getElementById("arrow4").style.display = 'inline-block';	
	}
	if(showUtt){
		uttBut.innerHTML = lastUtt;
		uttBut.style.display = 'block';	
		document.getElementById("arrow5").style.display = 'inline-block';			
	}
	if(showDem){
		demBut.innerHTML = currDelivLevel;
		demBut.style.display = 'block';
		document.getElementById("arrow6").style.display = 'inline-block';
	}
}
		
//functions to handle alerts for success/error in database transactions
function errorHandler(transaction, error) {
    alert("Error : " + error.message);
}
function successHandler(transaction) {
    //alert("Success : added stuff to db");
}

//functions to streamline code to show/hide html elements, takes array of strings of IDs to display (block) or hide (none)
function showElems(elemArr){ 
	var showLen = elemArr.length;
	for(s = 0; s < showLen; s++){
		document.getElementById(elemArr[s]).style.display = 'block';
	}
}

function hideElems(elemArr){
	var hideLen = elemArr.length;
	for(h = 0; h < hideLen; h++){
		document.getElementById(elemArr[h]).style.display = 'none';
	}	
}

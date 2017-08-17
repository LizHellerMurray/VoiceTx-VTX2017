//goals
						/*
						//adds 7 goals
						tx.executeSql('INSERT INTO INDGOAL_ID (iGoals) VALUES ("Client will increase internal and external hydration per client report.")');
						tx.executeSql('INSERT INTO INDGOAL_ID (iGoals) VALUES ("Client will decrease drying agents (such as coffee, or smoking) per client report.")');
						tx.executeSql('INSERT INTO INDGOAL_ID (iGoals) VALUES ("Client will decrease throat clearing per client report.")');
						tx.executeSql('INSERT INTO INDGOAL_ID (iGoals) VALUES ("Client will follow physician instructions regarding reflux management and adhere to reflux diet  per client report.")');
						tx.executeSql('INSERT INTO INDGOAL_ID (iGoals) VALUES ("Client will limit loud and excessive talking per client report.")');
						tx.executeSql('INSERT INTO INDGOAL_ID (iGoals) VALUES ("Client will balance extra vocal demands and vocal rest per client report.")');
						tx.executeSql('INSERT INTO INDGOAL_ID (iGoals) VALUES ("Client will limit voice use when sick per client report.")'); */
						
												/*
						//adds 7 goals
						tx.executeSql('INSERT INTO DIRGOAL_ID (dGoals) VALUES ("Independently maintain oral resonance")');
						tx.executeSql('INSERT INTO DIRGOAL_ID (dGoals) VALUES ("Independently maintain breath support")');
						tx.executeSql('INSERT INTO DIRGOAL_ID (dGoals) VALUES ("Independently maintain appropriate pitch")');
						tx.executeSql('INSERT INTO DIRGOAL_ID (dGoals) VALUES ("Independently maintain appropriate loudness")');
						tx.executeSql('INSERT INTO DIRGOAL_ID (dGoals) VALUES ("Independently maintain appropriate voice quality")');
						tx.executeSql('INSERT INTO DIRGOAL_ID (dGoals) VALUES ("Independently perform neck and orofacial massage and neck stretches")');
						tx.executeSql('INSERT INTO DIRGOAL_ID (dGoals) VALUES ("Independently maintain appropriate posture.")'); */
						
										
			//create reference tables for methods, taskGroups (UNCHANGING) MADE ARRAYs
			/*
				tx.executeSql('DROP TABLE IF EXISTS METH_ID');
				tx.executeSql('CREATE TABLE IF NOT EXISTS METH_ID (method_id INTEGER PRIMARY KEY, methText VARCHAR(255))');
				tx.executeSql('INSERT INTO METH_ID (methText) VALUES ("Somatosensory")');
				tx.executeSql('INSERT INTO METH_ID (methText) VALUES ("Auditory")');
				tx.executeSql('INSERT INTO METH_ID (methText) VALUES ("Respiratory")');
				tx.executeSql('INSERT INTO METH_ID (methText) VALUES ("Vocal Function")');
				tx.executeSql('INSERT INTO METH_ID (methText) VALUES ("Musculoskeletal")');	
				tx.executeSql('INSERT INTO METH_ID (methText) VALUES ("Other")');
			
				tx.executeSql('DROP TABLE IF EXISTS METHGROUP_ID');
				tx.executeSql('CREATE TABLE IF NOT EXISTS METHGROUP_ID (group_id INTEGER PRIMARY KEY, groupText VARCHAR(255))');
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Proprioception")');
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Nocioception")');
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Visual Processing")');
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Sensorineural")');
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Conduction")');					
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Respiratory Support")');
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Loudness Modification")');
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Respiratory Coordination")');
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Ab/Adduction Exercises")');
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Vegetative Vocalizations")');	
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Pitch Modification")');	
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Neck Modification")');	
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Stretching")');	
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Postural Alignment")');	
				tx.executeSql('INSERT INTO METH_ID (groupText) VALUES ("Orofacial Modification")');
			*/
			
							tx.executeSql('SELECT * FROM INDGOAL_ID WHERE ig_id > ?', ['0'], indTabCheck, errorHandler);
				
				function indTabCheck( tx, results ){	
					if(results.rows.length < 1) {
						//if not full (first open), drops and recreates
						tx.executeSql('DROP TABLE IF EXISTS INDGOAL_ID');
						tx.executeSql('CREATE TABLE IF NOT EXISTS INDGOAL_ID (ig_id INTEGER PRIMARY KEY, iGoals VARCHAR(255))');
					} 
				} 
								tx.executeSql('SELECT * FROM DIRGOAL_ID WHERE dg_id > ?', ['0'], dirTabCheck, errorHandler);
				
				function dirTabCheck( tx, results ){	
					if(results.rows.length < 1) {
						//if not full (first open), drops and recreates
						tx.executeSql('DROP TABLE IF EXISTS DIRGOAL_ID');
						tx.executeSql('CREATE TABLE IF NOT EXISTS DIRGOAL_ID (dg_id INTEGER PRIMARY KEY, dGoals VARCHAR(255))');
					} 
				} 
				  /*Kate
  -moz-box-shadow: 0px 10px 14px -7px #276873;
  -webkit-box-shadow: 0px 10px 14px -7px #276873;
  box-shadow: 0px 10px 14px -7px #276873;
	/*background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #CCCCCC), color-stop(1, #408c99));
	background:-moz-linear-gradient(top, #CCCCCC 5%, #408c99 100%);
	background:-webkit-linear-gradient(top, #CCCCCC 5%, #408c99 100%);
	background:-o-linear-gradient(top, #CCCCCC 5%, #408c99 100%);
	background:-ms-linear-gradient(top, #CCCCCC 5%, #408c99 100%);
	background:linear-gradient(to bottom, #CCCCCC 5%, #408c99 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#CCCCCC', endColorstr='#408c99',GradientType=0);
	*/
		
		#trialBoxes1{display:none;}		
		#trialBoxes2{display:none;}
		#trialBoxes3{display:none;}	
		
		
		<div class ="tmpHide">
		<form id="trialBoxes1">
			<div id="1tb1" class="unchecked threestate" onclick="changeState(this)">1</div>
			<div id="1tb2" class="unchecked threestate" onclick="changeState(this)">2</div>
			<div id="1tb3" class="unchecked threestate" onclick="changeState(this)">3</div>
			<div id="1tb4" class="unchecked threestate" onclick="changeState(this)">4</div>
			<div id="1tb5" class="unchecked threestate" onclick="changeState(this)">5</div>
			<div id="1tb6" class="unchecked threestate" onclick="changeState(this)">6</div>	
			<div id="1tb7" class="unchecked threestate" onclick="changeState(this)">7</div>
			<div id="1tb8" class="unchecked threestate" onclick="changeState(this)">8</div>
			<div id="1tb9" class="unchecked threestate" onclick="changeState(this)">9</div>
			<div id="1tb10" class="unchecked threestate" onclick="changeState(this)">10</div>
			
				<button type="button" class="submitted tmpHide" onclick="countCorrect(this, 1)">Trial Complete</button><br>
		</form>
				
		
			<br><br><br>
			<form id="trialBoxes2">
				
				<div id="2tb1" class="unchecked threestate" onclick="changeState(this)">1</div>
				<div id="2tb2" class="unchecked threestate" onclick="changeState(this)">2</div>
				<div id="2tb3" class="unchecked threestate" onclick="changeState(this)">3</div>
				<div id="2tb4" class="unchecked threestate" onclick="changeState(this)">4</div>
				<div id="2tb5" class="unchecked threestate" onclick="changeState(this)">5</div>
				<div id="2tb6" class="unchecked threestate" onclick="changeState(this)">6</div>	
				<div id="2tb7" class="unchecked threestate" onclick="changeState(this)">7</div>
				<div id="2tb8" class="unchecked threestate" onclick="changeState(this)">8</div>
				<div id="2tb9" class="unchecked threestate" onclick="changeState(this)">9</div>
				<div id="2tb10" class="unchecked threestate" onclick="changeState(this)">10</div>
				
					<button type="button" class="submitted" onclick="countCorrect(this, 2)">Trial Complete</button>
				
			</form>	
			<br><br><br>
			<form id="trialBoxes3">
				
				<div id="3tb1" class="unchecked threestate" onclick="changeState(this)">1</div>
				<div id="3tb2" class="unchecked threestate" onclick="changeState(this)">2</div>
				<div id="3tb3" class="unchecked threestate" onclick="changeState(this)">3</div>
				<div id="3tb4" class="unchecked threestate" onclick="changeState(this)">4</div>
				<div id="3tb5" class="unchecked threestate" onclick="changeState(this)">5</div>
				<div id="3tb6" class="unchecked threestate" onclick="changeState(this)">6</div>	
				<div id="3tb7" class="unchecked threestate" onclick="changeState(this)">7</div>
				<div id="3tb8" class="unchecked threestate" onclick="changeState(this)">8</div>
				<div id="3tb9" class="unchecked threestate" onclick="changeState(this)">9</div>
				<div id="3tb10" class="unchecked threestate" onclick="changeState(this)">10</div>
				
					<button type="button" class="submitted" onclick="countCorrect(this, 3)">Trial Complete</button>
				
			</form>
		</div>
		
		//get rid of below?
//function to determine if trial was successful, object as first and trial number taken as second parameter, reset boxes for next trials, and take to options when done/fail 
function countCorrect(submitID, trialNum) {
	var correctCheck = numCorrect;
	numCorrect = 0;
	var idNum = trialNum + 1;
	var trialBoxID = "trialBoxes" + idNum;
	
	//adds to array any time clicked, clearing taken care of in save
	currLevelPerf.push(correctCheck);
	
	if(currCueLevel === 5){
		if(correctCheck>=8){
			fillPerformanceTable(5, currLevelPerf);
			alert("All cue levels complete! Select new methods, tasks, or utterance level.") //go to options to begin new
			newTrial();
			document.getElementById("level" + currCueLevel + "Title").style.display = 'none';
			directChoices(0);
		}else if(trialNum === 1 || trialNum === 2){
			alert("Failed trial number " + trialNum + ", begin trial " + idNum);
			document.getElementById(trialBoxID).style.display = 'block';
		}else if(trialNum === 3){
			fillPerformanceTable(5, currLevelPerf);
			alert("All 3 trials in cue level " + currCueLevel + " failed. Select new methods, tasks, or utterance level.") //go to options to begin new
			newTrial();
			document.getElementById("level" + currCueLevel + "Title").style.display = 'none';
			directChoices(0);
		}
	}else if(currCueLevel === 3 || currCueLevel === 4){
		if(correctCheck>=8){
			fillPerformanceTable(currCueLevel, currLevelPerf);
			alert("Cue level " + currCueLevel + " complete") //bring up next level, make 2 trials disappear
			newTrial();
			document.getElementById("level" + currCueLevel + "Title").style.display = 'none';
			currCueLevel++;
			document.getElementById("level" + currCueLevel + "Title").style.display = 'block';
		}else if(trialNum === 1 || trialNum === 2){ 
			alert("Failed trial number " + trialNum + ", begin trial " + idNum);
			document.getElementById(trialBoxID).style.display = 'block';
		}else if(trialNum === 3){
			fillPerformanceTable(currCueLevel, currLevelPerf);
			alert("All 3 trials in cue level " + currCueLevel + " failed. Select new methods, tasks, or utterance level.") //go to options to begin new
			newTrial();
			document.getElementById("level" + currCueLevel + "Title").style.display = 'none';
			directChoices(0);
		}
	}
}
/* --------------DNE
//function to fill CUELEVEL_PERFORMANCE with results from the level ---------- takes currLevelPerf array as a parameter so it doesnt get cleared before the transaction is done
function fillPerformanceTable(cueNum, perfArray){
	//fills CUELEVEL_PERFORMANCE
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO CUELEVEL_PERFORMANCE (methTaskUtt_num, delivLevel, performanceVal) VALUES (?, ?, ?)', [currMethtoolID, cueNum, perfArray]);	
		currLevelPerf = []; //clears global after save to avoid asynch issues
    });
	
}*/

			
			//tx.executeSql('CREATE TABLE IF NOT EXISTS DIR_METHTASKS (methTOOL_ID CHARACTER(36), session_num CHARACTER(36), methText VARCHAR(255), taskText VARCHAR(255), uttLevelText VARCHAR(255), PRIMARY KEY (methTOOL_ID), FOREIGN KEY (session_num) REFERENCES SESSION_INFO(session_id))');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS CUELEVEL_PERFORMANCE (methTaskUtt_num CHARACTER(36), delivLevel INTEGER, performanceVal ARRAY, FOREIGN KEY (methTaskUtt_num) REFERENCES DIR_TASKS(methTOOL_ID))');
			
			
			
			
			
		<!--<div id="methodTaskForm">		
			<form id="taskTextForm"> Select methods and corresponding tasks below: <br>
			<div class="taskCategory"> <input type="checkbox" id="semMethod" onclick="updateMethods(this.id)"><b>Somatosensory</b><br>
				<div id="semMethodTasks">
				<p>Proprioception</p>
				<label><input type="checkbox" id="tk1" value="Placement">Placement<br></label>
				<label><input type="checkbox" id="tk2" value="Tactile">Tactile<br></label>
				<label><input type="checkbox" id="tk3" value="Effort">Effort<br></label>
				<label><input type="checkbox" id="tk4" value="Semi-occluded vocal tract">Semi-occluded vocal tract<br></label>
				<p>Nociception</p>
				<input type="checkbox" id="tk5" value="Pain">Pain<br>
				<input type="checkbox" id="tk6" value="Discomfort">Discomfort<br>
				<input type="checkbox" id="tk7" value="Soreness">Soreness<br>
				<input type="checkbox" id="tk8" value="Thermal stimulation">Thermal stimulation<br>
				<p>Visual Processing</p>
				<input type="checkbox" id="tk9" value="Mirror use">Mirror use<br>
				<input type="checkbox" id="tk10" value="Gestures">Gestures<br>
				<input type="checkbox" id="tk11" value="Physical models">Physical models<br>
				<input type="checkbox" id="tk12" value="Drawing">Drawing<br>
				<input type="checkbox" id="tk13" value="Video (endoscopy, visi-pitch, etc.)">Video (endoscopy, visi-pitch, etc.)<br>
				Other:<input type="text" id="tk14">
				</div></div>
			<div class="taskCategory"><input type="checkbox" id="audMethod" onclick="updateMethods(this.id)"><b>Auditory</b><br>
				<div id="audMethodTasks">
				<p>Sensorineural</p>
				<input type="checkbox" id="tk15" value="Pitch assessment">Pitch assessment<br>
				<input type="checkbox" id="tk16" value="Loudness assessment">Loudness assessment<br>
				<input type="checkbox" id="tk17" value="Voice quality filters (i.e. brighter, nasal)">Voice quality filters (i.e. brighter, nasal)<br>
				<p>Conduction</p>
				<input type="checkbox" id="tk18" value="Masking">Masking<br>
				<input type="checkbox" id="tk19" value="External ear canal occlusion">External ear canal occlusion<br>
				<input type="checkbox" id="tk20" value="Bone conduction occlusion">Bone conduction occlusion<br>
				<input type="checkbox" id="tk21" value="Delayed auditory feedback">Delayed auditory feedback<br>
				Other:<input type="text" id="tk22">
				</div></div>
			<div class="taskCategory"><input type="checkbox" id="resMethod" onclick="updateMethods(this.id)"><b>Respiratory</b><br>
				<div id="resMethodTasks">
				<p>Respiratory Support</p>
				<input type="checkbox" id="tk23" value="Incentive Spirometry">Incentive Spirometry<br>
				<input type="checkbox" id="tk24" value="Abdominal breathing">Abdominal breathing<br>
				<input type="checkbox" id="tk25" value="Expiratory muscle training">Expiratory muscle training<br>
				<p>Loudness Modification</p>
				<input type="checkbox" id="tk26" value="Loudness modification">Loudness modification<br>
				<input type="checkbox" id="tk27" value="Maximum phonation time at various loudnesses">Maximum phonation time at various loudnesses<br>
				<input type="checkbox" id="tk28" value="Messa di voice">Messa di voice<br>
				<p>Respiratory Coordination</p>
				<input type="checkbox" id="tk29" value="Inhalation phonation">Inhalation phonation<br>
				<input type="checkbox" id="tk30" value="Held voice/voiceless fricatives">Held voice/voiceless fricatives<br>
				<input type="checkbox" id="tk31" value="Maximum phonation time">Maximum phonation time<br>
				<input type="checkbox" id="tk32" value="Flow">Flow<br>
				<input type="checkbox" id="tk33" value="Stacatto">Stacatto<br>
				<input type="checkbox" id="tk34" value="Gargling">Gargling<br>
				Other:<input type="text" id="tk35">				
				</div></div>
			<div class="taskCategory"><input type="checkbox" id="vocMethod" onclick="updateMethods(this.id)"><b>Vocal Function</b><br>
				<div id="vocMethodTasks">
				<p>Ab/Adduction Exercises</p>
				<input type="checkbox" id="tk36" value="Push/pull">Push/pull<br>
				<input type="checkbox" id="tk37" value="Maximum phonation time">Maximum phonation time<br>
				<input type="checkbox" id="tk38" value="Glottal fry">Glottal fry<br>
				<input type="checkbox" id="tk39" value="Sniff">Sniff<br>
				<input type="checkbox" id="tk40" value="Easy onset">Easy onset<br>
				<input type="checkbox" id="tk41" value="Pitch change">Pitch change<br>
				<input type="checkbox" id="tk42" value="Glottal stop">Glottal stop<br>
				<input type="checkbox" id="tk43" value="Voice rest">Voice rest<br>
				<p>Vegetative Vocalizations</p>
				<input type="checkbox" id="tk44" value="Throat clear">Throat clear<br>
				<input type="checkbox" id="tk45" value="Laugh">Laugh<br>
				<input type="checkbox" id="tk46" value="Cry">Cry<br>
				<input type="checkbox" id="tk47" value="Cough">Cough<br>
				<input type="checkbox" id="tk48" value="Mmmhmmm">Mmmhmmm<br>
				<p>Pitch Modification</p>
				<input type="checkbox" id="tk49" value="Pitch range">Pitch range<br>
				<input type="checkbox" id="tk50" value="Pitch flexibility">Pitch flexibility<br>
				<input type="checkbox" id="tk51" value="Inflexion">Inflexion<br>
				<input type="checkbox" id="tk52" value="Lip trills">Lip trills<br>
				<input type="checkbox" id="tk53" value="Tongue trills">Tongue trills<br>
				<input type="checkbox" id="tk54" value="Maximum phonation time at various pitches">Maximum phonation time at various pitches<br>
				Other:<input type="text" id="tk55">				
				</div></div>
			<div class="taskCategory"><input type="checkbox" id="musMethod" onclick="updateMethods(this.id)"><b>Musculoskeletal</b><br>
				<div id="musMethodTasks">
				<p>Neck Modification</p>
				<input type="checkbox" id="tk56" value="Anterior neck">Anterior neck<br>
				<input type="checkbox" id="tk57" value="Posterior neck">Posterior neck<br>
				<input type="checkbox" id="tk58" value="Lateral neck">Lateral neck<br>
				<input type="checkbox" id="tk59" value="Digital manipulation">Digital manipulation<br>
				<input type="checkbox" id="tk60" value="Myofacial release">Myofacial release<br>
				<p>Stretching</p>
				<input type="checkbox" id="tk61" value="Held position for lengthening muscles">Held position for lengthening muscles<br>
				<input type="checkbox" id="tk62" value="Dynamic positions for lengthening muscles">Dynamic positions for lengthening muscles<br>
				<p>Postural Alignment</p>
				<input type="checkbox" id="tk63" value="Head/neck position">Head/neck position<br>
				<input type="checkbox" id="tk64" value="Body posture">Body posture<br>
				<input type="checkbox" id="tk65" value="Atlanto-occipital alignment">Atlanto-occipital alignment<br>
				<p>Orofacial Modification</p>
				<input type="checkbox" id="tk66" value="Alter tongue, lip, mouth, oropharynx">Alter tongue, lip, mouth, oropharynx<br>
				<input type="checkbox" id="tk67" value="Oropharynx massage">Oropharynx massage<br>
				<input type="checkbox" id="tk68" value="Open mouth">Open mouth<br>
				<input type="checkbox" id="tk69" value="Chewing">Chewing<br>
				<input type="checkbox" id="tk70" value="Myofacial release">Myofacial release<br>
				<input type="checkbox" id="tk71" value="Yaw-sign">Yaw-sign<br>
				Other:<input type="text" id="tk72">	
				</div></div>
			<button type="button" id="submitTaskForm" onclick="submitMethTasks(false)">Submit Selection</button>
			</form>
		<button type="button" id="subMTBut" onclick="startDirSess(2); submitMethTasks(true)">Select Utterance Level</button>			
		</div>
		
		
			
	//tasks list here

	for(var taskNum = 1; taskNum < 73; taskNum++){
		var toolID = "tk" + taskNum;
		if(taskNum == 14 || taskNum == 22 || taskNum == 35 || taskNum == 55 || taskNum == 72){
			if(document.getElementById(toolID).value != ''){
				if(taskCommaCount1>0){checkedTaskText += ", ";}
				otherTaskText += document.getElementById(toolID).value;
				taskCommaCount1++;
				if(final){document.getElementById(toolID).value = '';}
			}
		}else{
			if(document.getElementById(toolID).checked){
				if(taskCommaCount2>0){checkedTaskText += ", ";}
				checkedTaskText += document.getElementById(toolID).value;
				taskCommaCount2++;
				if(final){document.getElementById(toolID).checked = false;}
			}
		}
	}
	
	//methods list here 	
	var methCount = 0;
	var methodText = '';
	if(document.getElementById("semMethod").checked){
		methodText += "Somatosensory";
		methCount++;
		if(final){
			document.getElementById("semMethod").checked = false;
			updateMethods("semMethod");
		}
	}
	if(document.getElementById("audMethod").checked){
		if(methCount>0){methodText += ", ";}
		methodText += "Auditory";
		methCount++;
		if(final){
			document.getElementById("audMethod").checked = false;
			updateMethods("audMethod");
		}
	}
	if(document.getElementById("resMethod").checked){
		if(methCount>0){methodText += ", ";}
		methodText += "Respiratory";
		methCount++;
		if(final){
			document.getElementById("resMethod").checked = false;
			updateMethods("resMethod");
		}
	}
	if(document.getElementById("vocMethod").checked){
		if(methCount>0){methodText += ", ";}
		methodText += "Vocal Function";
		methCount++;
		if(final){document.getElementById("vocMethod").checked = false;}
	}
	if(document.getElementById("musMethod").checked){
		if(methCount>0){methodText += ", ";}
		methodText += "Musculoskeletal";
		methCount++;
		if(final){
			document.getElementById("musMethod").checked = false;
			updateMethods("musMethod");
		}
	}
	
	if(methCount==0){
		alert("No methods were selected. Resubmit selection.")
	}else{
		if(otherTaskText != ''){var innerComma = ", ";}
		document.getElementById("currentMethodsText").innerHTML = "Current method(s): " + methodText; 
		document.getElementById("currentTasksText").innerHTML = "Current task(s): " + checkedTaskText + innerComma + otherTaskText; 
		lastMeth = methodText;
		lastTask = checkedTaskText + innerComma + otherTaskText;
		
		
		
update curr info stuff
	
	
	//FOR SCREENSHOT OF TOOL SELECTION PAGE
//	document.getElementById("currInfoButs").innerHTML = '<button type="button" class="headerButton subjButton" onclick="buttonPageChoose(&quot;startPage&quot;)">Client: '+currSubjID+'</button> <button type="button" class="headerButton intTypeButton" onclick="">Direct Intervention</button> <button type="button" class="headerButton goalButton" onclick="">'+lastGoalText+'</button> <button type="button" class="headerButton methodButton tmpHide" onclick="buttonPageChoose(&quot;Method&quot;)">'+lastMeth+'</button> <button type="button" class="headerButton toolButton tmpHide" onclick="buttonPageChoose(&quot;Tool&quot;)">'+lastTask+'</button> <button type="button" class="headerButton stimButton tmpHide" onclick="buttonPageChoose(&quot;Stim Level&quot;)">'+lastUtt+'</button>';
	//v2
	//document.getElementById("currInfoButs").innerHTML = '<button type="button" class="headerButton subjButton" onclick="buttonPageChoose(&quot;startPage&quot;)">Client: '+currSubjID+'</button><div class="arrow-right"></div><button type="button" class="headerButton intTypeButton" onclick="">Direct Intervention</button> <div class="arrow-right"></div> <button type="button" class="headerButton goalButton" onclick="">'+lastGoalText+'</button> <button type="button" class="headerButton methodButton tmpHide" onclick="buttonPageChoose(&quot;Method&quot;)">'+lastMeth+'</button><button type="button" class="headerButton toolButton tmpHide" onclick="buttonPageChoose(&quot;Tool&quot;)">'+lastTask+'</button><button type="button" class="headerButton stimButton tmpHide" onclick="buttonPageChoose(&quot;Stim Level&quot;)">'+lastUtt+'</button>';
	
	//FOR SCREENSHOT OF DIRECT INTERVENTION CHECKBOX PAGE
	//document.getElementById("currInfoButs").innerHTML = '<button type="button" class="headerButton subjButton" onclick="buttonPageChoose(&quot;startPage&quot;)">Client: '+currSubjID+'</button><div class="arrow-right"></div><button type="button" class="headerButton intTypeButton" onclick="">Direct Intervention</button> <div class="arrow-right"></div> <button type="button" class="headerButton goalButton" onclick="">'+lastGoalText+'</button> <br> <div class="arrow-right"></div> <button type="button" class="headerButton methodButton " onclick="buttonPageChoose(&quot;Method&quot;)">'+lastMeth+'</button> <div class="arrow-right"></div> <button type="button" class="headerButton toolButton " onclick="buttonPageChoose(&quot;Tool&quot;)">'+lastTask+'</button> <div class="arrow-right"></div> <button type="button" class="headerButton stimButton" onclick="buttonPageChoose(&quot;Stim Level&quot;)">'+lastUtt+'</button>';

		
		
		
						<input type="radio" id="utt1" value="(1) Elicit behavior (if applicable)">(1) Elicit behavior (if applicable)<br>
				<input type="radio" id="utt2" value="(2) Single Sound">(2) Single Sound<br>
				<input type="radio" id="utt3" value="(3) Syllables/sound: 2 syllables">(3) Syllables/sound: 2 syllables<br>
				<input type="radio" id="utt4" value="(4) Syllables/sound: 3-4 syllables">(4) Syllables/sound: 3-4 syllables<br>
				<input type="radio" id="utt5" value="(5) Phrase/Sentence: 5-6 syllables">(5) Phrase/Sentence: 5-6 syllables<br>
				<input type="radio" id="utt6" value="(6) Phrase/Sentence: 7-8 syllables">(6) Phrase/Sentence: 7-8 syllables<br>
				<input type="radio" id="utt7" value="(7) Phrase/Sentence: 9-10 syllables">(7) Phrase/Sentence: 9-10 syllables<br>
				<input type="radio" id="utt8" value="(8) Long Sentence: 11-15 syllables">(8) Long Sentence: 11-15 syllables<br>
				<input type="radio" id="utt9" value="(9) Long Sentence: 16-20 syllables">(9) Long Sentence: 16-20 syllables<br>
				<input type="radio" id="utt10" value="(10) Reading: Paragraph">(10) Reading: Paragraph<br>
				<input type="radio" id="utt11" value="(11) Short Response">(11) Short Response<br>
				<input type="radio" id="utt12" value="(12) Long Response">(12) Long Response<br>
				<input type="radio" id="utt13" value="(13) Conversational">(13) Conversational<br>
				<input type="radio" id="utt14" value="(14) Emotional/Motivating situation or story re-tell">(14) Emotional/Motivating situation or story re-tell<br>
				<input type="radio" id="uttOther" value="">Other: <input type="text" id="uttOtherText"><br>
				
				
				
//from update header info:



	//WORKING ####MJC document.getElementById("headerButtons").innerHTML = '<button type="button" class="headerButton subjButton" onclick="buttonPageChoose(&quot;startPage&quot;)">Client: '+currSubjID+'</button> <button type="button" class="headerButton intTypeButton" onclick="">'+lastGoalType+'</button> <button type="button" class="headerButton goalButton" onclick="">'+lastGoalText+'</button> <button type="button" class="headerButton methodButton" onclick="buttonPageChoose(&quot;Method&quot;)">'+lastMeth+'</button> <button type="button" class="headerButton toolButton" onclick="buttonPageChoose(&quot;Tool&quot;)">'+lastTask+'</button> <button type="button" class="headerButton stimButton" onclick="buttonPageChoose(&quot;Stim Level&quot;)">'+lastUtt+'</button>';

	//change the inner html of buttons dep on input parameters?
	
	//FOR SCREENSHOT OF INDIRECT INTERVENTION
	//document.getElementById("headerButtons").innerHTML = '<button type="button" class="headerButton subjButton" onclick="buttonPageChoose(&quot;startPage&quot;)">Client: '+currSubjID+'</button><div class="arrow-right"></div><button type="button" class="headerButton intTypeButton" onclick="">Indirect Intervention</button> <div class="arrow-right"></div> <button type="button" class="headerButton goalButton" onclick="">'+lastGoalText+'</button> ';
	
	//OLD
	//"Current subject: " + currSubjID + "<br>Last goal type:" + lastGoalType + "<br>Last goal number:" + lastGoalID + "<br>Goal text:" + lastGoalText + " <br>" + lastMeth + dirColon + " " + lastTask + "<br>" + lastUtt; 
	
	
			<!--<p>&nbsp;</p>-->
		<div id="tmpHide">
			<!--Display current goal, method and task here-->
			<p id="currentDirGoal">Current Direct Goal:</p> 
			<p id="currentMethodsText">Current method(s): </p>
			<p id="currentTasksText">Current task(s): </p>
			<p id="currentUttText">Utterance Level: </p>
		</div>
		
		
//function to display all meth/task/utt text
function showMethTaskUttdisplay(){
	document.getElementById("currentMethodsText").style.display = 'block';
	document.getElementById("currentTasksText").style.display = 'block';
	document.getElementById("currentUttText").style.display = 'block';	
}

//function to hide all meth/task/utt text
function hideMethTaskUttdisplay(){
		document.getElementById("currentMethodsText").style.display = 'none';
		document.getElementById("currentTasksText").style.display = 'none';
		document.getElementById("currentUttText").style.display = 'none';
}

		#currentDirGoal{display:none;}
		#currentMethodsText{display:none;}
		#currentTasksText{display:none;}
		#currentUttText{display:none;}
		
		
//function to empty meth/task/utt strings displayed to user (boolean parameters tell which to clear)
function emptyMethTaskUttdisplay(clearMethTask, clearUtt){
	if(clearMethTask){
		document.getElementById("currentMethodsText").innerHTML = "Current method(s): ";
		document.getElementById("currentTasksText").innerHTML = "Current task(s): ";		
	}
	if(clearUtt){
		document.getElementById("currentUttText").innerHTML = "Utterance Level: ";
		if(!clearMethTask){
			document.getElementById("currentMethodsText").innerHTML = "Current method(s): " + lastMeth;
			document.getElementById("currentTasksText").innerHTML = "Current task(s): " + lastTask;
		}
	}
}


	<br><button type="button" id="backButton2i" class="backButton tmpHide" onclick="backPage(2)">Return to Subject Selection</button>
			<br><button type="button" id="backButton2d" class="backButton tmpHide" onclick="backPage(2)">Return to Subject Selection</button>
	
#backButton2i{display:none;}
#backButton2d{display:none;}

	<!--	<div class="button_headers"><button type="button" class="chooseLevel" id="level1submit" onclick="teachingCheck(false)">Augmented Feedback</button></div> -->
	
	
	
	
	
	
	
			<div id ="startOptionsForm">
			<button type="button" id="goalListBut" onclick="startNewOptions(1)">Select new goal</button>
			<button type="button" id="startOptionsBut" onclick="startNewOptions(2)">Show other options</button>
		</div>
			#startOptionsForm{display:none;}
			
			
			
			
			
			//function for the 2 option buttons at the top of the direct intervention
function startNewOptions(sender){
	if(sender == 1){
		document.getElementById("dirSelectPage").style.display = 'block';
		document.getElementById("dirEndChoices").style.display = 'none';		
	}else if(sender == 2){
		document.getElementById("dirEndChoices").style.display = 'block';
		hideDirGoalTable();		
	}
}				
				
				
//in progress
	function displayITable(){
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM INDGOAL_ID', [], function (tx, results) {	
				var len = results.rows.length;
				var currRow;
					for (var i = 0; i < len; i++){
						var checkID = "iGoalCheck" + i.toString();
						var doneTest = false;
						var iTest = i + 1;
						for(var gg = 0; gg < grayArray.length; gg++){
							if(grayArray[gg] == iTest){doneTest = true;} 
						}
						currRow = indTable.insertRow(i+1);
						currRow.insertCell(0).innerHTML = "<label><input type='checkbox' id='"+ checkID + "' onclick='changeIGoal(this)'></label>";
						var indGoalStr = results.rows.item(i).iGoals;
							if(doneTest){currRow.insertCell(1).innerHTML = indGoalStr.fontcolor("#616161");}else{currRow.insertCell(1).innerHTML = indGoalStr;}
						currRow.insertCell(2).innerHTML = results.rows.item(i).ig_id; //hidden with CSS
					}
				document.getElementById("fillIndBut").style.display = 'none';
				document.getElementById("indSelectPage").style.display = 'block';
				document.getElementById("indSelectForm").style.display = 'block';
				document.getElementById("addNewIndBut").style.display = 'block';
			}, errorHandler);	
		});	
	}
}


		<form id="level1form">			
			<h1 style="display:inline">Level 1:</h1><h2 style="display:inline">Teaching</h2>
			<h6>*Only complete level 1 and 2 if new task*</h6>
			<p>Check box to indicate success: <input type="checkbox" id="teaching1"></p>
			<button type="button" id="level1submit" onclick="teachingCheck(false)">Done</button>
			<br>
			<button type="button" id="level1skip" onclick="teachingCheck(true)">Skip Level 1</button>
			<button type="button" id="endLev1" onclick="directChoices(0)">End cue levels</button>	
		</form>
		
		<form id="level2form">
			<h1 style="display:inline">Level 2:</h1> <h2 style="display:inline">Clinical Modeling</h2>
			<h6>*Only complete level 1 and 2 if new task*</h6>
			<p>Check boxes to indicate completion: 
			<input type="checkbox" id="modeling1">
			<input type="checkbox" id="modeling2">
			<input type="checkbox" id="modeling3"></p>
			<button type="button" id="level2submit" onclick="modelingCheck(false)">Done</button><br>
			<button type="button" id="level2skip" onclick="modelingCheck(true)">Skip Level 2</button>
			<button type="button" id="endLev2" onclick="directChoices(0)">End cue levels</button>
		</form>
		
		<div id="level3Title">
			<h1 style="display:inline">Level 3:</h1> <h2 style="display:inline">Augmented Feedback Trials</h2>
			<br><button type="button" id="level3skip" onclick="skipCueLevel(3)">Skip Level 3</button>
			<button type="button" id="endLev3" onclick="directChoices(0)">End cue levels</button>
		</div>
		
		<div id="level4Title">
			<h1 style="display:inline">Level 4:</h1> <h2 style="display:inline">Self-Cueing Trials</h2>
			<br><button type="button" id="level4skip" onclick="skipCueLevel(4)">Skip Level 4</button>
			<button type="button" id="endLev4" onclick="directChoices(0)">End cue levels</button>
		</div>
		
		<div id="level5Title">
			<h1 style="display:inline">Level 5:</h1> <h2 style="display:inline">Self-Correcting Trials</h2>
			<br><button type="button" id="level5skip" onclick="skipCueLevel(5)">Skip Level 5</button>
			<button type="button" id="endLev5" onclick="directChoices(0)">End cue levels</button>
		</div>		
		
		
		//checks state of teaching checkbox and tells if cue level 1 complete/incomplete		
function teachingCheck(skip){
	if(document.getElementById("teaching1").checked || skip){
		document.getElementById("level1form").style.display = 'none';
		document.getElementById("level2form").style.display = 'block';
		currCueLevel = 2;
	}
	else{
		alert("Level 1 incomplete.")
	}
}

//checks state of modeling checkboxes and tells if cue level 2 complete/incomplete
function modelingCheck(skip){
	if((document.getElementById("modeling1").checked && document.getElementById("modeling2").checked && document.getElementById("modeling3").checked) || skip){
		document.getElementById("level2form").style.display = 'none';
		document.getElementById("trialBoxes").style.display = 'block';
		document.getElementById("level3Title").style.display = 'block';	
		currCueLevel = 3;		
	}else{
		alert("Complete all 3 models before proceeding.")
	}
}


//function to reset cue levels to number 1
function resetPerfArray(){
	currLevelPerf = [];
	document.getElementById("level2form").style.display = 'none';
	for(var threeCount = 1; threeCount < 4; threeCount++){
		var titleID = "level" + (threeCount + 2) + "Title";
		document.getElementById(titleID).style.display = 'none';
		
	}
	document.getElementById("trialBoxes").style.display = 'none';
	document.getElementById("level1form").style.display = 'block';
}

			<table id="cueLevTable">
			<tr>
			<td><button type="button" id="cue1" onclick="cueLevUpdate(this.id)">1</button></td>
			<td><button type="button" id="cue2" onclick="cueLevUpdate(this.id)">2</button></td>
			<td><button type="button" id="cue3" onclick="cueLevUpdate(this.id)">3</button></td>
			<td><button type="button" id="cue4" onclick="cueLevUpdate(this.id)">4</button></td>
			<td><button type="button" id="cue5" onclick="cueLevUpdate(this.id)">5</button></td>
			</tr>
			</table>
			
			
//function to end level			
function endCueLevel(){
	currLevelPerf.push(perfStr);
	fillDirPerfTable(currCueLevel, currLevelPerf);
	currLevelPerf = [];
	newTrial();

	if(currCueLevel === 5){
		document.getElementById("level" + currCueLevel + "Title").style.display = 'none';
		directChoices(0);	
		//resetPerfArray();	
	}else if(currCueLevel === 3 || currCueLevel === 4){
		document.getElementById("level" + currCueLevel + "Title").style.display = 'none';
		currCueLevel++;
		document.getElementById("level" + currCueLevel + "Title").style.display = 'block';
	}
}


//function to reset cue levels to number 1
function resetPerfArray(){
	currLevelPerf = [];
	document.getElementById("trialBoxes").style.display = 'none';
}


10/22/15

//this function verifies that all 3 parts of general knowledge enhancement are complete before the goals begin (NOTHING SAVED FROM THIS SECTION)
function indGenSubmit(skip){
	if(document.getElementById("indGen1").checked && document.getElementById("indGen2").checked && document.getElementById("indGen3").checked || skip){
		document.getElementById("endGKEbut").style.display = 'none';
		document.getElementById("gkeForm").style.display = 'none';
		document.getElementById("indGoalStartBut").style.display = 'block';
	} else {alert("Complete all three general knowledge enhancements before continuing.")}
}
					<button type="button" onclick="indGenSubmit(false)">Done</button>
					
					
failed and aborted checkbox for goals table	/*
	function displayITable(){
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM INDGOAL_ID', [], function (tx, results) {	
				var len = results.rows.length;
				var currRow;
					for (var i = 0; i < len; i++){
						var checkID = "iGoalCheck" + i.toString();
						var doneTest = false;
						var iTest = i + 1;
						for(var gg = 0; gg < grayArray.length; gg++){
							if(grayArray[gg] == iTest){doneTest = true;} 
						}
						currRow = indTable.insertRow(i+1);
						currRow.insertCell(0).innerHTML = "<label><input type='checkbox' id='"+ checkID + "' onclick='changeIGoal(this)'></label>";
						var indGoalStr = results.rows.item(i).iGoals;
							if(doneTest){currRow.insertCell(1).innerHTML = indGoalStr.fontcolor("#616161");}else{currRow.insertCell(1).innerHTML = indGoalStr;}
						currRow.insertCell(2).innerHTML = results.rows.item(i).ig_id; //hidden with CSS
					}
				document.getElementById("fillIndBut").style.display = 'none';
				document.getElementById("indSelectPage").style.display = 'block';
				document.getElementById("indSelectForm").style.display = 'block';
				document.getElementById("addNewIndBut").style.display = 'block';
			}, errorHandler);	
		});	
	} */
	
					<button type="button" id="cancelIndGoal" onclick="startIndSess(4)">Cancel this goal & choose new</button>
					
					else if(partNum == 4){ //moves from goal questions back to selection
		document.getElementById("indVHGoalsDiv").style.display = 'none';
		document.getElementById("indSelectPage").style.display = 'block';
	}
	
	
//page navigartion

	if (sender === 2) { //very beginning of indirect (gen knowledge only) or direct intervention back to selection page-buttons only available based on select subj options 
        document.getElementById("indGoalPage").style.display = 'none';
		document.getElementById("indSelectPage").style.display = 'none';
		document.getElementById("dirGoalPage").style.display = 'none';
		document.getElementById("helpPage").style.display = 'none';
		document.getElementById("subjSelectPage").style.display = 'block';
	}
	if (sender === 3) { //direct goal (only very start) back to indirect goal selection
        document.getElementById("dirGoalPage").style.display = 'none';
        document.getElementById("indGoalPage").style.display = 'block';
		document.getElementById("indSelectPage").style.display = 'block';
	}
	if (sender === 4) { //session notes pack (very end of session) back to direct
        document.getElementById("sessNotesPage").style.display = 'none';
        document.getElementById("dirGoalPage").style.display = 'block';
		document.getElementById("helpPage").style.display = 'block';
	}
}
		<br><button type="button" id="backButton3" class="backButton" onclick="backPage(3)">Return to Indirect Intervention</button>
				<!--<br><button type="button" id="backButton4" class="backButton" onclick="backPage(4)">Back to Direct Intervention</button>-->
				
//maybe?
function interventionSwitch(sender){
	if (sender === 1) { //direct goal (only very start) back to indirect goal selection
        document.getElementById("dirGoalPage").style.display = 'none';
        document.getElementById("indGoalPage").style.display = 'block';
		document.getElementById("indSelectPage").style.display = 'block';
	}
	if (sender === 2) { //session notes pack (very end of session) back to direct
        document.getElementById("sessNotesPage").style.display = 'none';
        document.getElementById("dirGoalPage").style.display = 'block';
		document.getElementById("helpPage").style.display = 'block';
	}
}


	if(choiceNum === 0){ //called after cue level 5 complete, earlier fail or select to end early
		resetPerfArray();
		document.getElementById("dirCueForm").style.display = 'none';
		document.getElementById("dirChoicesReminder").style.display = 'block';
		//document.getElementById("dirChoicesReminder").innerHTML = "Remember, you last completed: <br>Method(s): " + lastMeth + "<br>Task(s): " + lastTask + "<br>Utterance Level " + lastUtt;
	}else{
		
		<p id="dirChoicesReminder">Click one of the header buttons to change therapy task, or continue with the same:</p>
		
		
		
<!--Form for next objective after cue levels-->	
		<div id="dirEndChoices">			
			<!--<button type="button" id="dirEndNewUtt" onclick="directChoices(1)">Select a new utterance level</button><br>-->
			<button type="button" id="dirEndSameUtt" onclick="directChoices(2)">Continue with the same utterance level</button><br>
			<!--<button type="button" id="dirEndNewMethTask" onclick="directChoices(3)">Add/change methods and/or tasks</button><br>-->
		</div>
		
//opens up next action in direct intervention based on selection in dirEndChoices form
function directChoices(choiceNum){
	resetPerfArray();
	document.getElementById("dirCueForm").style.display = 'none';
	if(choiceNum === 1){ //new utterance level
		if(lastMeth == ''){
			alert("Select a goal and/or methods and tasks first")
		}else{
			document.getElementById("uttForm").style.display = 'block';
			document.getElementById("dirEndChoices").style.display = 'none';
		}
	}else if(choiceNum === 2){ //same utterance level
		if(lastUtt == ''){
			alert("No utterance level to continue")
		}else{
			document.getElementById("dirCueForm").style.display = 'block';
			document.getElementById("dirEndChoices").style.display = 'none';
		}
	}else if(choiceNum === 3){ //new methods and tasks
			document.getElementById("methTaskForm").style.display = 'block';
			document.getElementById("dirEndChoices").style.display = 'none';
			document.getElementById("beginDGoalBut").style.display = 'none';
			hideDirGoalTable();
	}
}

//10/23/15

//work on GKE added to db and adding
//old gke page
			<form id="gkeForm">
				<p>General Knowledge Enhancement</p> 
				<div>
					<input type="checkbox" id="indGen1">Explain the vocal mechanism<br>
					<input type="checkbox" id="indGen2">Explain results from the voice evaluation<br>
					<input type="checkbox" id="indGen3">Explain deviant vocal characteristics noted<br>
			</form>
				<button type="button" id="endGKEbut" onclick="indGenSubmit()">Done</button>
				<button type="button" id="indGoalStartBut" onclick="startIndSess(2)">Select First Indirect Goal</button>
				
//10/28/15

//changes the meth task page so that it wont close until they have a complete selection (cant continue without tools)

		//document.getElementById("othMethod").checked = false;
		//updateMethods("othMethod");

changing cue meth 
			<div id="cue1" class="cueClass notSelectedCue" onclick="cueLevUpdate(this)">1</div>
			<div id="cue2" class="cueClass notSelectedCue" onclick="cueLevUpdate(this)">2</div>
			<div id="cue3" class="cueClass notSelectedCue" onclick="cueLevUpdate(this)">3</div>
			<div id="cue4" class="cueClass notSelectedCue" onclick="cueLevUpdate(this)">4</div>
			<div id="cue5" class="cueClass notSelectedCue" onclick="cueLevUpdate(this)">5</div>		
			
			
function cueLevUpdate(cueButObj){ //parameter is object 
	var cueButID = cueButObj.id;
	var numCues = 5;
	for(var c = 0; c < numCues; c++){
		cNum = c+1;
		var currCID = "cue" + cNum.toString(); 
		if(currCID === cueButID){
			currCueLevel = cueTextArray[c];			//set global to level text 
			document.getElementById("cueTitle").innerHTML = "<b>" + currCueLevel + "</b>"; 
			document.getElementById(currCID).className = "cueClass selectedCue";
		}else{
			document.getElementById(currCID).className = "cueClass notSelectedCue";
		}
	}
	//set current cue level here and display
}


//not necessary because of top button navigation now


//function to ensure clear page when start new dir goal
function clearDirPage(){
	document.getElementById("methTaskForm").style.display = 'none';
	document.getElementById("uttForm").style.display = 'none';
	document.getElementById("cueLevListForm").style.display = 'none';
	document.getElementById("trialBoxes").style.display = 'none';
	document.getElementById("trialResetter").style.display = 'none';
}


/*Cue level buttons*/
.cueClass{
	height:8vw;  /*8% of "view width" https://developer.mozilla.org/en-US/docs/Web/CSS/length#Viewport-percentage_lengthswidth:8vw;*/ 
	width:8vw;
	float: left;
	text-align:center;
	/*font-size:5vw;*/
	font-weight:bold;
	border:1px #000000 solid;
	margin-right:1vw;
}
.notSelectedCue{
	background:white;
}
.selectedCue{
	background:#999999;
}

/*Styling for the blue start page buttons*/
.blueButton {/*
	-moz-box-shadow: 0px 10px 14px -7px #276873;
	-webkit-box-shadow: 0px 10px 14px -7px #276873;
	box-shadow: 0px 10px 14px -7px #276873;
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #599bb3), color-stop(1, #408c99));
	background:-moz-linear-gradient(top, #599bb3 5%, #408c99 100%);
	background:-webkit-linear-gradient(top, #599bb3 5%, #408c99 100%);
	background:-o-linear-gradient(top, #599bb3 5%, #408c99 100%);
	background:-ms-linear-gradient(top, #599bb3 5%, #408c99 100%);
	background:linear-gradient(to bottom, #599bb3 5%, #408c99 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#599bb3', endColorstr='#408c99',GradientType=0);
	background-color:#599bb3;
	-moz-border-radius:8px;
	-webkit-border-radius:8px;
	border-radius:8px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:20px;
	font-weight:bold;
	padding:13px 32px;
	text-decoration:none;
	text-shadow:0px 1px 0px #3d768a;*/
}

.blueButton:hover {
	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #408c99), color-stop(1, #599bb3));
	background:-moz-linear-gradient(top, #408c99 5%, #599bb3 100%);
	background:-webkit-linear-gradient(top, #408c99 5%, #599bb3 100%);
	background:-o-linear-gradient(top, #408c99 5%, #599bb3 100%);
	background:-ms-linear-gradient(top, #408c99 5%, #599bb3 100%);
	background:linear-gradient(to bottom, #408c99 5%, #599bb3 100%);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#408c99', endColorstr='#599bb3',GradientType=0);
	background-color:#408c99;
}

	}else if (sender === 3) {//end direct goal sand go to session notes
		document.getElementById("dirGoalPage").style.display = 'none';
		document.getElementById("sessNotesPage").style.display = 'block';
		document.getElementById("helpPage").style.display = 'none';	
		
			if (sender === 1) {//begin indirect intervention with new subject
		lastGoalType = "Indirect";
		document.getElementById("subjIDPage").style.display = 'none';
		document.getElementById("indGoalPage").style.display = 'block';
		document.getElementById("helpPage").style.display = 'block';
		updateCurrInfo(true, true, false, false, false, false);
	}else if (sender === 2) {//go to direct intervention from indirect or new subject?
		lastGoalType = "Direct";
        document.getElementById("indGoalPage").style.display = 'none';
		document.getElementById("indSelectPage").style.display = 'none';
        document.getElementById("dirGoalPage").style.display = 'block';
		document.getElementById("startDirBut").style.display = 'block';
		updateCurrInfo(true, true, false, false, false, false);
		
		
		
11/11/15

//working on help button: considered 4 seaparate help buttons, but willmake function to fill depending on sender?
//...
	//otherwsie 
#indHelpPage{display:none;}
	#hideHelpBut{display:none;}
	#helpText{display:none;}
#dirHelpPage{display:none;}
	#hideHelpBut{display:none;}
	#helpText{display:none;}
#mtHelpPage{display:none;}
	#hideHelpBut{display:none;}
	#helpText{display:none;}
#dmHelpPage{display:none;}
	#hideHelpBut{display:none;}
	#helpText{display:none;}
	
	
			<div id="indHelpPage">
		<button type="button" class="helpButton" id="indHelpBut" class="blueButton" onclick="showHelp(true, 1)">Help</button>
		<button type="button" class="helpButton" id="indHideHelpBut" class="blueButton" onclick="showHelp(false, 1)">Hide Help</button>
		<p id="helpText">Indirect intervention info here.</p>
	</div>
	<div id="dirHelpPage">
		<button type="button" class="helpButton" id="helpBut" class="blueButton" onclick="showHelp(true, 2)">Help</button>
		<button type="button" class="helpButton" id="hideHelpBut" class="blueButton" onclick="showHelp(false, 2)">Hide Help</button>
		<p id="helpText">Direct intervention info here.</p>
	</div>
	<div id="mtHelpPage">
		<button type="button" class="helpButton" id="helpBut" class="blueButton" onclick="showHelp(true, 3)">Help</button>
		<button type="button" class="helpButton" id="hideHelpBut" class="blueButton" onclick="showHelp(false, 3)">Hide Help</button>
		<p id="helpText">DI method/tool info here.</p>
	</div>
	<div id="dmHelpPage">
		<button type="button" class="helpButton" id="helpBut" class="blueButton" onclick="showHelp(true, 4)">Help</button>
		<button type="button" class="helpButton" id="hideHelpBut" class="blueButton" onclick="showHelp(false, 4)">Hide Help</button>
		<p id="helpText">Delivery method info here.</p>
	</div>
	
	what if you differentiate by what page visible>

	
	
	11/22
	//subject adding to db text not neccessary
	
				/*
			tx.executeSql('SELECT * FROM SUBJ_INFO', [], function (tx, results) {
					var len = results.rows.length;
					msg = "<p>Number of subjects in database: " + len + "</p>";
					document.getElementById("subjDBstatus").innerHTML +=  msg;
						
					var i = len-1;
					
					
						msg = "<p> The following subject was added to the database: <b>" + results.rows.item(i).subj_idText + "</b></p>"; 
						
			}, errorHandler);*/
			
			
	11/23 Liz decide GKE does not need to be added to.... functions below

	<!--Form1-->
			<div id="gkeDiv">
			<form id="gkeForm"><p>General Knowledge Enhancement</p> 
				<div id="gkeBoxes">
				</div>
			</form><br>
			<form>Add new topic: <input type="text" id="gkeAddText"><button type="button" id="gkeSubmit" onclick="addGKE()">Add</button>
			<br>
			</form>
				<button type="button" id="endGKEbut" onclick="startIndSess(2)">Done</button>
			</div>
//function to add a general knowledge enhancement topic to the database and update the list on the page
function addGKE(){
	var newText = document.getElementById("gkeAddText").value;
	if(newText == ''){
		alert("No text input")
	}else{
		var gkeNewID = "gke" + globGKELength;
		globGKELength++;
		db.transaction(function (tx) {tx.executeSql('INSERT INTO GKE_ID (gkeText) VALUES (?)', [newText], successHandler, errorHandler);});
		document.getElementById("gkeBoxes").innerHTML += "<label><input type=" + "\"checkbox\"" + " id=" + "\"" + gkeNewID + "\""  + "\"" + ">" + newText + "<br></label>"; //adds new radio box
		document.getElementById("gkeAddText").value = '';
	}
}
				tx.executeSql('CREATE TABLE IF NOT EXISTS GKE_ID (genke_id INTEGER PRIMARY KEY, gkeGUID CHARACTER(36), gkeText VARCHAR(255))');
				tx.executeSql('SELECT * FROM GKE_ID WHERE genke_id > ?', ['0'], gkeTabCheck, errorHandler);
				
			
								tx.executeSql('CREATE TABLE IF NOT EXISTS GKE_ID (genke_id INTEGER PRIMARY KEY, gkeGUID CHARACTER(36), gkeText VARCHAR(255))');
				tx.executeSql('SELECT * FROM GKE_ID WHERE genke_id > ?', ['0'], gkeTabCheck, errorHandler);
				
			
								function gkeTabCheck( tx, results ){	
					if(results.rows.length < 1) {
						//if not full (first open), drops and recreates
						tx.executeSql('DROP TABLE IF EXISTS GKE_ID');
						tx.executeSql('CREATE TABLE IF NOT EXISTS GKE_ID ()');
						tx.executeSql('INSERT INTO GKE_ID (gkeGUID, gkeText) VALUES (?, "Explain the vocal mechanism")', [guid()]);
						tx.executeSql('INSERT INTO GKE_ID (gkeGUID, gkeText) VALUES (?, "Explain results from the voice evaluation")', [guid()]);
						tx.executeSql('INSERT INTO GKE_ID (gkeGUID, gkeText) VALUES (?, "Explain deviant vocal characteristics noted")', [guid()]);
						tx.executeSql('INSERT INTO GKE_ID (gkeGUID, gkeText) VALUES (?, "Other general knowledge enhancement notes")', [guid()]);
					} 
				}			
				
	11/24
		
<!--Help Pages. Provide definitions to main terms during either goal session onclick. User can hide list when done.------------------------------------------------------------------->

	<div id="helpPage">
		<button type="button" class="helpButton" id="helpBut" class="blueButton" onclick="showHelp(true)">Help</button>
		<button type="button" class="helpButton" id="hideHelpBut" class="blueButton" onclick="showHelp(false)">Hide Help</button>
		<p id="indHelpText">Indirect intervention definitions here.	</p>
		<!--<p id="dirHelpText">Direct intervention goal definitions here.</p>-->
		<p id="mtHelpText">Method/tool definitions here.</p>
		<!--<p id="uttHelpText">Utterance level definitions here.</p>-->
		<p id="dmHelpText">Delivery method definitions here.</p>
	</div>
	
	1/6/15
					//tx.executeSql('SELECT * FROM TOOL_ID WHERE task_int > ?', ['0'], taskTabCheck, errorHandler);
					
					
		because gke now boxes...			
/*
function createGKEPage(){
	var gkeDiv = document.getElementById("gkeBoxes"); //only need if addable
	gkeDiv.innerHTML = '';
	
	db.transaction(function (tx) {
		var gkeStr = ''; 
		tx.executeSql('SELECT * FROM GKE_ID', [], function (tx, results) {
			var gkeLength = results.rows.length; 
			for(var g = 0; g < gkeLength; g++){
				var gkeID = "gke" + g;
				var gkeText = results.rows.item(g).gkeText;
				gkeStr += "<p>" + gkeText + "</p><br><textarea id =" + "\"" + gkeID + "\"" + "></textarea><br />";
			}
			gkeDiv.innerHTML = gkeStr;
		}, errorHandler);
	});	
}*/

	#startDirBut{display:none;}
			
			<button type="button" id="startDirBut" onclick="startDirSess(1)">Start</button>
			
			
			
	
var print = {
  // Application Constructor
  initialize: function() {
	this.onDeviceReady();
	getPDFData();
  }, //chose to bypass binding because not startup
  onDeviceReady: function() {
	print.receivedEvent('deviceready');
  },
 // Update DOM on a Received Event
	receivedEvent: function(id) {
	var parentElement = document.getElementById(id);
	var listeningElement = parentElement.querySelector('.listening');
	var receivedElement = parentElement.querySelector('.received');

	listeningElement.setAttribute('style', 'display:none;');
	receivedElement.setAttribute('style', 'display:block;');
  }
};

			/*tx.executeSql('SELECT * FROM SESSION_INFO WHERE subj_num = ? AND dayStr = ? AND goal_type = ?', [currSubjKey, todayTest, 'Direct'], function (tx, results) {
				var dleng = results.rows.length;
					if(dleng == 0){
						ddataTextArray.push("None");
					}else{ 
						for(var q = 0; q < dleng; q++){
							var dGoalTextPDF = results.rows.item(q).goal_text;
							var dgoalPrintID = results.rows.item(q).session_id;
							var dGoalText = "Goal: " + dGoalTextPDF;
							tx.executeSql('SELECT * FROM DIR_METHTASKS WHERE session_num = ?', [dgoalPrintID], function (tx, results){
								var dgleng = results.rows.length;
								for(var r = 0; r < dgleng; r++){
									var dMethtoolID = results.rows.item(r).methTOOL_ID;
									var dMethPrint = results.rows.item(r).methText;
										var dMethText = "Method: " + dMethPrint;
									var dTaskPrint = results.rows.item(r).taskText;
										var dTaskText = "Task: " + dTaskPrint;
									var dUttPrint = results.rows.item(r).uttLevelText;	
										var dUttText = "Utterance Level: " + dUttPrint;
									tx.executeSql('SELECT * FROM CUELEVEL_PERFORMANCE WHERE methTaskUtt_num = ?', [dMethtoolID], function (tx, results){
										var dgcleng = results.rows.length;
										ddataTextArray.push(dGoalText);
										ddataTextArray.push(dMethText);
										ddataTextArray.push(dTaskText);
										ddataTextArray.push(dUttText); 
										for(var s = 0; s < dgcleng; s++){
											var cueLevPrint = results.rows.item(s).delivLevel;
											cueLevPrint = "Cue Level " + cueLevPrint.toString();
											ddataTextArray.push(cueLevPrint);
											var perfArrayPrint = results.rows.item(s).performanceVal;
											if(perfArrayPrint.length > 0){
												for(var i = 0; i < perfArrayPrint.length; i++){
													var perfText = "  " + perfArrayPrint[i] + "/10 trials successful.";
													ddataTextArray.push(perfText);
													i++; //extra increment to avoid printing the ","
												}
											}else{
												perfArrayPrint = perfArrayPrint.toString();
												var perfText = "  " + perfArrayPrint + "/10 trials successful."
												ddataTextArray.push(perfText);
											}
										}
										ddataTextArray.push(" ");
									}, errorHandler);
								}

							}, errorHandler);
						}	
					}			
			}, errorHandler);*/
			
			these db vals saved as text i guess
			
							//for(var m=0; m<methArr.length; m++){
								//if(m==0){var methText = methArr[m];}else{methText += ", " + methArr[m];}
							//}	
							//if(q==0){var methText = methArr[0];}else{methText += ", " + methArr[0];}
							
							//for(var t=0; t<toolArr.length; t++){
								//if(t==0){var toolText = toolArr[t];}else{toolText += ", " + toolArr[t];}	
							//}
							//if(q==0){var toolText = toolArr[0];}else{toolText += ", " + toolArr[0];}
							
<icon src="www/img/drawable-ldpi-icon.png" platform="android" density="ldpi" />
<icon src="www/img/drawable-mdpi-icon.png" platform="android" density="mdpi" />
<icon src="www/img/drawable-hdpi-icon.png" platform="android" density="hdpi" />
<icon src="www/img/drawable-xhdpi-icon.png" platform="android" density="xhdpi" />
<icon src="www/img/drawable-xxhdpi-icon.png" platform="android" density="xxhdpi" />
<icon src="www/img/drawable-xxxhdpi-icon.png" platform="android" density="xxxhdpi" />
														
														
														
/*
for(var i = 0; i < perfArray.length; i=i+4){
	var perfText = "  -(" + perfArray[i] + perfArray[i+1] + perfArray[i+2] + ") trials successful.";
	ddataTextArray.push(perfText);
	i++; //extra increment to avoid printing the "," taken care of in top now
}*/
								
								
				4/6/16				

/*		tx.executeSql('SELECT * FROM SESSION_INFO WHERE subj_num = ? AND goal_type = ? ', [currSubjKey, 'Indirect'], function (tx, subResults) {//, todayToStr()AND dayStr = ? 
			if (subResults>0){ alert("has results")
				while(resCount < subResults){
					var gText = subResults.rows.item(resCount).goal_text;
					if(gText == "General Knowledge Enhancement"){
						gkeLastID = subResults.rows.item(resCount).session_id;
					}else if(gText == "Counseling"){
						counLastID = subResults.rows.item(resCount).session_id;
					}else{
						vhLastID = subResults.rows.item(resCount).session_id;
					}
				resCount++;
				}
				if(resCount == subResults){getLocData();}
			}else{getLocData();}
		}, errorHandler);*/
		
//file writer stuff
    //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
/*	
function fail(error) {
    console.log(error.code);
}*/

//funtion to clear text area passed in
function clearTextArea(clearFor){
	if(clearFor == 1){ //gke
		iTracker
	}else if (clearFor)
		
	}
}
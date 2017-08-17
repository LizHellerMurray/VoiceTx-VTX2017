//function checks which gender was selected by the user on the subject form, returns as a string ("Male" or "Female")
function checkGender(){
    var subjGen = '';
    if(document.getElementById("genMale").checked){subjGen="Male";
	}else if(document.getElementById("genFemale").checked){subjGen="Female";}
    return subjGen;
}

//function to generate a random 36 character GUID for unique keys in db
function guid() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

//function to create and return string of current date
function todayToStr() {
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
		if (dd < 10) { dd = "0" + dd;}
		if (mm < 10) { mm = "0" + mm;}
    var todayStr = mm + "/" + dd + "/" + yyyy;
	return todayStr;
}

//function to fill the database from the subject info on the subjID form page when submitted, set status when done
function fillSubjInfo(){
    var subjIn = document.getElementById("subjID").value;
    var ageIn = document.getElementById("ageInput").value;
    var diagIn = document.getElementById("diagnosisInput").value;
    currSubjKey = guid();
	
	//patient ID only required input
	if(subjIn == ''){
		alert("Patient ID required.")
	}else{
		//to check existing subj IDs
		db.transaction(function (tx) {
			tx.executeSql('SELECT * FROM SUBJ_INFO WHERE subj_idText = ?', [subjIn], function (tx, results) {
				if(results.rows.length > 0){
					alert("Patient ID already exists in database. Please input unique patient identification.")
				}else{savePatient();}
			}, errorHandler);
		});	
	}
	
	//nested function to allow check for existing patient
	function savePatient(){	
		db.transaction(function (tx) {
			tx.executeSql('INSERT INTO SUBJ_INFO (subj_id, subj_idText, age, gender, diagnosis, dateCreated, showSubject) VALUES (?, ?, ?, ?, ?, ?, ?)', [currSubjKey, subjIn, ageIn, checkGender(), diagIn, todayToStr(), 1]);
		});	

		currSubjID = subjIn;
		document.getElementById("subjDBstatus").innerHTML = "Patient added to database.";
		updateCurrInfo(true, false, false, false, false, false, false);
		hideElems(["subjbutton", "patIDclaim"]);
		showElems(["beginNewButs"]);
		lastGoalID = '';
	}
}

//function to reset the subject form 
function clearSubjForm(){
	document.getElementById("subjID").value = '';
	document.getElementById("ageInput").value = '';
	document.getElementById("diagnosisInput").value = '';
	if(document.getElementById("genMale").checked){document.getElementById("genMale").checked = false;}
	if(document.getElementById("genFemale").checked){document.getElementById("genFemale").checked = false;}
	hideElems(["beginNewButs"]);
	showElems(["subjbutton"]);
}
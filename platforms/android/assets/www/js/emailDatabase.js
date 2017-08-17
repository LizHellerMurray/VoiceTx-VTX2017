//this function puts an email in the draft with the DB attached
var successFn = function(sql, count){
	console.log("Exported SQL: "+sql);
	/*//alert("Exported SQL contains "+count+" statements");
	cordova.plugins.email.open({
	to:      '',					//user will be able to input own email
	subject: 'VoiceTx Database',
	body:    sql
	});
	*/
	cordova.plugins.email.isAvailable(
    function (isAvailable) {
		if(isAvailable){
			cordova.plugins.email.open({
			to:      '',				//user will be able to input own email
			subject: 'VoiceTx Database',
			body:    sql
	});
		}else{
			alert('Email service is not available on this device')
		}
    }
	);
	
};

var errorFn = function(error){
	alert("Database export error occurred: " +error.message)
};

//function to handle emailing the database through the cordova email plugin	
function emailDatabase(){
	//cordova.plugins.sqlitePorter.exportDbToSql(db); 
	
	//this is not being executed:
	//WHY
	cordova.plugins.sqlitePorter.exportDbToSql(db, { 
		successFn: successFn,
		errorFn: errorFn
		}); 

//	//Build text string ----left from MC, leave commented
//	db.readTransaction(function(tx) {
//		tx.executeSql("select * from "+"INDGOAL_ID", [], function(tx,results) {
//			console.log(results);
//			var data = results;
			
//			
//			window.plugin.email.open({
//			to:      '----@bu.edu',   			//change to tester's email
//			subject: 'Greetings',
//			body:    data
//			});
//		});
//	}, dbError);

}


//error check and alert for email
/*function dbError(error){
	alert('Something went wrong: ', error);
}*/

//function to open a blank email to the stepp lab for sending feedback
function blankSteppEmail(){
	cordova.plugins.email.isAvailable(
    function (isAvailable) {
		if(isAvailable){
			cordova.plugins.email.open({
			to:      'stepplab@gmail.com',			
			subject: 'VoiceTx Feedback',
			body:    ''
	});
		}else{
			alert('Email service is not available on this device')
		}
    }
	);
	/*window.plugins.socialsharing.shareViaEmail(
		'', //message
		'VoiceTx Feedback', //subject line
		['stepplab@gmail.com'], // TO: must be null or an array
		[''], // CC: must be null or an array
		[''], // BCC: must be null or an array
		[''], // FILES: can be null, a string, or an array
		onSuccess, // called when sharing worked, but also when the user cancelled sharing via email. On iOS, the callbacks' boolean result parameter is true when sharing worked, false if cancelled. On Android, this parameter is always true so it can't be used). See section "Notes about the successCallback" below.
		errorFn // called when BAd
	);*/

}

/*
//function to send just session string
function emailSession(){
	//cordova.plugins.sqlitePorter.exportDbToSql(db);
	//alert('exported');
	var iLen = idataTextArray.length;
	var dLen = ddataTextArray.length;
	
	var thisLineInd, thisLineDir;
	var bigIndStr = '';
	var bigDirStr = '';
	var subjStr = "Patient ID: " + currSubjID + "<br>" + todayToStr();
	
	for(ii = 0; ii<iLen; ii++){
		thisLineInd = "\n" + idataTextArray[ii];
		bigIndStr += thisLineInd;
	}
	for(dd = 0; dd<dLen; dd++){
		thisLineDir = "\n" + ddataTextArray[dd];
		bigDirStr += thisLineDir;
	}
	
	var sessAllText = subjStr + "\n" + bigIndStr + "\n" + bigDirStr + "\n" + document.getElementById("sessRes").innerHTML;

	var sessSubjLine = "VoiceTx " + currSubjID + " Session " + todayToStr(); //alert(sessSubjLine + " Prepared for sending.")
	
	window.plugin.email.open({
	to:      '',
	subject: sessSubjLine,
	body:    sessAllText
	});
}
*/
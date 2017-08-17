//this function puts an email in the draft with the DB attached
var successFn = function(sql, count){
	console.log("Exported SQL: "+sql);
	//alert("Exported SQL contains "+count+" statements");
	
	window.plugin.email.open({
	to:      '',					//user will be able to input own email
	subject: 'VoiceTx Database',
	body:    sql
	});
};

//function to handle emailing the database through the cordova email plugin	
function emailDatabase(){
	//cordova.plugins.sqlitePorter.exportDbToSql(db);
	//alert('exported');

	cordova.plugins.sqlitePorter.exportDbToSql(db, {
		successFn: successFn
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
function dbError(error){
	alert('Something went wrong: ', error);
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

	var sessSubjLine = "VoiceTx " + currSubjID + " Session " + todayToStr(); alert(sessSubjLine + " Prepared for sending.")
	
	window.plugin.email.open({
	to:      '',
	subject: sessSubjLine,
	body:    sessAllText
	});
}
*/
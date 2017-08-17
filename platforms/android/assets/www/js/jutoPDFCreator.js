var JutoPDFCreator = {
  createPDF: function(filename) {
    //var dataTextArray = getPDFData();
	var doc = new jsPDF();
	doc.setFontSize(10);
    doc.text(20, 20, "Voice therapy session for " + currSubjID + "          Date: " + todayToStr());
    doc.text(20, 30, "Session notes: " + notesText);
	doc.text(20, 40, "Indirect intervention goals completed: ");
	doc.text(20, 50, idataTextArray);
	doc.addPage();
	doc.text(20, 20, "Direct intervention goals completed: ");
	doc.text(20, 30, ddataTextArray);

    var uristring = doc.output('datauristring');
    
    // the email plugin uses a non-standard URI format, so the filename can be specified.
    if (filename) {
      var uristringparts = uristring.split(',');
      uristringparts[0] = "base64:" + escape(filename) + "//";

      var moddeduristring =  uristringparts.join("");
      return moddeduristring;
    } else {
      return uristring;
    }
  },
  displayPDF: function(uristring) {
    var ref = window.open(uristring, "_blank", "EnableViewPortScale=yes,location=no,disallowoverscroll=yes,allowInlineMediaPlayback=yes,toolbarposition=top,transitionstyle=fliphorizontal");
    return ref;
  },
  createAndDisplayPDF: function(filename) {
    var uristring = this.createPDF(filename);
    var ref = this.displayPDF(uristring);
    return ref;
  }
};
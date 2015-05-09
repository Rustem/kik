var _ = require('lodash');
var ConclusionTypes = require('./constants/appConstants').ConclusionTypes;
var pkbData = null;//require('./external_sources/pkb.js');
var gcvpData = null;//require('./external_sources/gcvp.js');


function isConclusionsCollected(application) {
	var conclusions = JSON.parse(localStorage.getItem('conclusions'));

	function filter(conclusions, application, type) {
		var by_app = _.where(conclusions, { application_id: application.id });
		return _.first(_.where(by_app, { type: type }))
	}

    var riskConclusion = filter(conclusions, application, ConclusionTypes.RISK);
    var legalConclusion = filter(conclusions, application, ConclusionTypes.LEGAL);
    var securConclusion = filter(conclusions, application, ConclusionTypes.SECUR);

    return riskConclusion  !== undefined &&
	       legalConclusion !== undefined &&
	       securConclusion !== undefined
}

function print_doc(template_name, params) {
	var loadFile=function(url,callback){
        JSZipUtils.getBinaryContent(url,callback);
    }
    loadFile("src/doc_templates/"+template_name, function(err,content){
        if (err) { throw err};
        doc=new Docxgen(content);
        doc.setData( params );
        doc.render();
        out=doc.getZip().generate({type:"blob"})
        saveAs(out,"doc_"+params.id+".docx")
    })
}

function checkPersonDetails(data) {

    var i=0;
    for(i; i<pkbData.length; i++){
        if(pkbData[i].iin === data.iin)
            break
    }

    var k=0;
    for(k; k<gcvpData.length; k++){
        if(gcvpData[k].iin === data.iin){
            break
        }
    }
    console.log(pkbData[i].iin);
    console.log(pkbData[i].firstname);
    console.log(pkbData[i].lastname);
    console.log(pkbData[i].middlename);
    console.log(pkbData[i].birthday);
    console.log(pkbData[i].credits.length);
    for(var j=0; j<pkbData[i].credits.length; j++){
        console.log(pkbData[i].credits[j].status);
        console.log(pkbData[i].credits[j].opened_date);
        console.log(pkbData[i].credits[j].closed_date);
        console.log(pkbData[i].credits[j].delay_days);
    }




    /*
    console.log(gcvpData[k].iin);
    console.log(gcvpData[k].firstname);
    console.log(gcvpData[k].lastname);
    console.log(gcvpData[k].middlename);
    console.log(gcvpData[k].birthday);*/
    console.log(gcvpData[k].income.main.type);
    for(var j=0; j<gcvpData[k].income.main.receipts.length; j++){
      console.log(gcvpData[k].income.main.receipts[j].date);
      console.log(gcvpData[k].income.main.receipts[j].value);
     }
    for(var j=0; j<gcvpData[k].income.additional.receipts.length; j++){
        console.log(gcvpData[k].income.additional.receipts[j].date);
        console.log(gcvpData[k].income.additional.receipts[j].value);
    }

}


module.exports = {
  isConclusionsCollected: isConclusionsCollected,
  print_doc: print_doc,
  checkPersonDetails: checkPersonDetails,
}

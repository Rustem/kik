var _ = require('lodash');
var ConclusionTypes = require('./constants/appConstants').ConclusionTypes;

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

module.exports = {
  isConclusionsCollected: isConclusionsCollected,
  print_doc: print_doc,
}
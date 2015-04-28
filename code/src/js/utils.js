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

module.exports = {
  isConclusionsCollected: isConclusionsCollected,
}
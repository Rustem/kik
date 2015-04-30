var _ = require('lodash');
var moment = require('moment');
var ConclusionStore = require('../../stores/ConclusionStore');
var UserStore = require('../../stores/UserStore');
var RiskForm = require('../../forms/RiskForm.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;
var TEMPLATES = require('../../constants/appConstants').TEMPLATES;
var utils = require('../../utils');
var AppContextMixin = require('../../mixins/AppContextMixin');


var FullConclusion = React.createClass({
	mixins: [AppContextMixin],
	PropTypes: {
		onHandleSubmit: React.PropTypes.func,
		application: React.PropTypes.object,
	},

	getConclusions: function() {
		var application = this.props.application;
		var conclusions = ConclusionStore.getByApplication(application);
		return {
			risk: _.findWhere(conclusions, { type: ConclusionTypes.RISK }),
			legal: _.findWhere(conclusions, { type: ConclusionTypes.LEGAL }),
			secur: _.findWhere(conclusions, { type: ConclusionTypes.SECUR }),
		}
	},

	genDoc: function(application) {
		var conclusions = this.getConclusions();
		var author = this.getUser();
		var params = {
			id: application.id,
			program: application.program,
			author: author.lastname+" "+author.firstname[0]+".",
			lastname: application.lastname,
			firstname: application.firstname,
			middlename: application.middlename,
			area: application.area,
			region: application.region,
			city: application.city,
			house: application.house,
			pd: conclusions.risk.pd,
			od: conclusions.risk.od,
			risk_remark: conclusions.risk.remark,
			risk_output: conclusions.risk.output,
			legal_output: conclusions.legal.output,
			secur_remark: conclusions.secur.remark,
			secur_output: conclusions.secur.output,
		}
		// console.log(params);

		utils.print_doc(TEMPLATES.FULL, params);
	},

	render: function() {
		var conclusions = this.getConclusions();
		return  <div className="row">
						<h3>Управление риск-менеджмента</h3>
						<div className="well well-sm" style={{backgroundColor:'white'}}>
							<p><b>Резюме:</b></p>
							{conclusions.risk.output}
						</div>
						
						<h3>Юридическое управление</h3>
						<div className="well well-sm" style={{backgroundColor:'white'}}>
							<p><b>Резюме:</b></p>
							{conclusions.legal.output}
						</div>
						
						<h3>Управление службы безопасности и режима</h3>
						<div className="well well-sm" style={{backgroundColor:'white'}}>
							<p><b>Заключение и выводы:</b></p>
							{conclusions.secur.output}
						</div>
						<div className="text-center">
							<button className="btn btn-info" onClick={this.genDoc.bind(null, this.props.application)}>Скачать документ</button>
						</div>
				</div>
		
	}
});

module.exports = FullConclusion;
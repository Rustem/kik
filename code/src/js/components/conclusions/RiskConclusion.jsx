var moment = require('moment');
var ConclusionStore = require('../../stores/ConclusionStore');
var UserStore = require('../../stores/UserStore');
var RiskForm = require('../../forms/RiskForm.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;
var TEMPLATES = require('../../constants/appConstants').TEMPLATES;
var utils = require('../../utils');


var RiskConclusion = React.createClass({
	PropTypes: {
		onHandleSubmit: React.PropTypes.func,
		application: React.PropTypes.object,
	},

	getConclusion: function() {
		var application = this.props.application;
		return ConclusionStore.getByApplicationAndType(application, ConclusionTypes.RISK);
	},

	genDoc: function(application) {
		var conclusion = this.getConclusion();
		var author = UserStore.get(application.author_id);
		var params = {
			id: application.id,
			program: application.program,
			date: moment.unix(conclusion.date_created/1000).format("DD.MM.YYYY"),
			author: author.firstname[0]+". "+author.lastname,
			lastname: application.lastname,
			firstname: application.firstname,
			middlename: application.middlename,
			area: application.area,
			region: application.region,
			city: application.city,
			house: application.house,
			finCondition: conclusion.finCondition,
			pd: conclusion.pd,
			od: conclusion.od,
			creditCapacity: conclusion.creditCapacity,
			ratingCapacity: conclusion.ratingCapacity,
			riskGroup: conclusion.riskGroup,
			remark: conclusion.remark,
			miniminMethods: conclusion.miniminMethods,
			output: conclusion.output,

		}
		// console.log(params.date)

		utils.print_doc(TEMPLATES.RISK, params);
	},

	render: function() {
		var conclusion = this.getConclusion();
		return  <div>
					{
					conclusion == undefined ? 
						<RiskForm application={this.props.application} onHandleSubmit={this.props.onHandleSubmit} />
					:
						<div>
							{conclusion.text}
							<button onClick={this.genDoc.bind(null, this.props.application)}>Скачать документ</button>
						</div>
					}
				</div>
		
	}
});

module.exports = RiskConclusion;
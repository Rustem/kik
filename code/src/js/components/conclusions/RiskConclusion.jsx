var ConclusionStore = require('../../stores/ConclusionStore');
var RiskForm = require('../../forms/RiskForm.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;


RiskConclusion = React.createClass({
	PropTypes: {
		onHandleSubmit: React.PropTypes.func,
		application: React.PropTypes.object,
	},

	getConclusion: function() {
		var application = this.props.application;
		return ConclusionStore.getByApplicationAndType(application, ConclusionTypes.RISK);
	},

	render: function() {
		var conclusion = this.getConclusion();
		return  <div>
					{
					conclusion == undefined ? 
						<RiskForm application={this.props.application} onHandleSubmit={this.props.onHandleSubmit} />
					:
						<div>{conclusion.text}</div>
					}
				</div>
		
	}
});

module.exports = RiskConclusion;
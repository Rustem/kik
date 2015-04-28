var ConclusionStore = require('../../stores/ConclusionStore');
var RiskForm = require('../../forms/RiskForm.jsx');

var TYPE = 0;

RiskConclusion = React.createClass({
	PropTypes: {
		onHandleSubmit: React.PropTypes.func,
		application: React.PropTypes.object,
	},

	getConclusion: function() {
		var application = this.props.application;
		return ConclusionStore.getByApplicationAndType(application, TYPE);
	},

	render: function() {
		var conclusion = this.getConclusion();
		return  <div>
					{
					conclusion.length == 0 ? 
						<RiskForm application={this.props.application} onHandleSubmit={this.props.onHandleSubmit} />
					:
						<div>{conclusion[0].text}</div>
					}
				</div>
		
	}
});

module.exports = RiskConclusion
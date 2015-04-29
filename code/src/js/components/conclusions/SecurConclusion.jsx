var ConclusionStore = require('../../stores/ConclusionStore');
var SecurForm = require('../../forms/SecurForm.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;


var SecurConclusion = React.createClass({
	PropTypes: {
		onHandleSubmit: React.PropTypes.func,
		application: React.PropTypes.object,
	},

	getConclusion: function() {
		var application = this.props.application;
		return ConclusionStore.getByApplicationAndType(application, ConclusionTypes.SECUR);
	},

	render: function() {
		var conclusion = this.getConclusion();
		return  <div className="row">
						<h3>Управление службы безопасности и режима</h3>
						{
						conclusion == undefined ? 
							<SecurForm application={this.props.application} onHandleSubmit={this.props.onHandleSubmit} />
						:
							<div className="well well-sm" style={{backgroundColor:'white'}}>
								<p><b>Заключение и выводы:</b></p>
								{conclusion.output}
							</div>
						}
				</div>
		
	}
});

module.exports = SecurConclusion;
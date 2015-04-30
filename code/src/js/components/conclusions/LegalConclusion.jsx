var ConclusionStore = require('../../stores/ConclusionStore');
var LegalForm = require('../../forms/LegalForm.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;


var LegalConclusion = React.createClass({
	PropTypes: {
		onHandleSubmit: React.PropTypes.func,
		application: React.PropTypes.object,
	},

	getConclusion: function() {
		var application = this.props.application;
		return ConclusionStore.getByApplicationAndType(application, ConclusionTypes.LEGAL);
	},

	render: function() {
		var conclusion = this.getConclusion();
		return  <div className="row">
						<h3>Юридическое управление</h3>
						{
						conclusion == undefined ? 
							<LegalForm application={this.props.application} onHandleSubmit={this.props.onHandleSubmit} />
						:
							<div className="well well-sm" style={{backgroundColor:'white'}}>
								<p><b>Резюме:</b></p>
								{conclusion.output}
							</div>
						}
				</div>
		
	}
});

module.exports = LegalConclusion;
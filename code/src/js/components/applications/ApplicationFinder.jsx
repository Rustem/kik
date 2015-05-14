var StageHeader = require('../stages/StageHeader.jsx');
var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationFinderForm = require('../../forms/ApplicationFinderForm.jsx');
var ApplicationList = require('./ApplicationList.jsx');

var ApplicationFinder = React.createClass({

	getInitialState: function() {
		return {
			'lastname': ''
		}
	},

	onSearch: function(object) {
		this.setState({ lastname: object.lastname });
	},

	findApplication: function() {
		var lastname = this.state.lastname;
		if(lastname.length > 0)
			return ApplicationStore.getByLastname(lastname);
		return []
	},

	render: function() {
		return  <div className="page-container">
	                <StageHeader />
	                <div className="row" style={{marginTop:'90px'}}>
	            	    <ApplicationFinderForm onHandleSubmit={this.onSearch} />
						<ApplicationList applications={this.findApplication()} />
	                </div>
				</div>
	}
});


module.exports = ApplicationFinder;
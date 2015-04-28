var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationList = require('../applications/ApplicationList.jsx');
var ApplicationForm = require('../forms/ApplicationForm.jsx');


var Stage0 = React.createClass({
	getInitialState: function() {
		return {
			applications: ApplicationStore.getZero(),
		}
	},

	render: function() {
		return (
      <div>
        <ApplicationList applications={this.state.applications} />
        <ApplicationForm />
      </div>
    );
	}
});

module.exports = Stage0;
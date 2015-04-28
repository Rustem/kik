var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationList = require('../applications/ApplicationList.jsx');

var Stage3 = React.createClass({
	getInitialState: function() {
		return {
			applications: ApplicationStore.getByStatus(3),
		}
	},

	render: function() {
		return <ApplicationList applications={this.state.applications} />;
	}
});

module.exports = Stage3;
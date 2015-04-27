var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationList = require('../applications/ApplicationList.jsx');

var Stage0 = React.createClass({
	getInitialState: function() {
		return {
			applications: ApplicationStore.getZero(),
		}
	},

	render: function() {
		return <ApplicationList applications={this.state.applications} />;
	}
});

module.exports = Stage0;
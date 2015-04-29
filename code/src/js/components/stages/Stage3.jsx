var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationList = require('../applications/ApplicationList.jsx');

var Stage3 = React.createClass({
	getInitialState: function() {
		return {
			applications: ApplicationStore.getByStatus(3),
		}
	},

	render: function() {
		var applications = this.state.applications
		return 	<div>
					{applications.length > 0 ? 
						[<h4>Заявления</h4>,
						 <ApplicationList applications={applications} />]
					: <h4>Новых заявлений нет</h4>}
				</div>
	}
});

module.exports = Stage3;
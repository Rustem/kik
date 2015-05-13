var _ = require('lodash');
var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationList = require('../applications/ApplicationList.jsx');

var Stage3 = React.createClass({
	getInitialState: function() {
		return {
			applications: ApplicationStore.getAll(),
		}
	},

	render: function() {
		var my_applications = _.filter(this.state.applications, { status: 3 });
    	var other_applications = _.reject(this.state.applications, { status: 3 });
		return 	<div>
					<h4>Мои заявления</h4>
					{my_applications.length > 0 ? 
						<ApplicationList applications={my_applications} />
					: <h6>Заявлений нет</h6>}
					<br /><br />
					<h4>Остальные заявления</h4>
					{other_applications.length > 0 ? 
						<ApplicationList applications={other_applications} />
					: <h6>Заявлений нет</h6>}
				</div>
	}
});

module.exports = Stage3;
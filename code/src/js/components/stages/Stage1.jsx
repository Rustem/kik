var _ = require('lodash');
var ApplicationStore = require('../../stores/ApplicationStore');
var ConclusionStore = require('../../stores/ConclusionStore');
var ApplicationList = require('../applications/ApplicationList.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;

var Stage1 = React.createClass({

	getInitialState: function() {
		return {
			applications: ApplicationStore.getAll(),
		}
	},

	render: function() {
		var my_applications = _.filter(this.state.applications, { status: 1 });
    	var other_applications = _.reject(this.state.applications, { status: 1 });
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

module.exports = Stage1;
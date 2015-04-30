var _ = require('lodash');
var ApplicationStore = require('../../stores/ApplicationStore');
var ConclusionStore = require('../../stores/ConclusionStore');
var ApplicationList = require('../applications/ApplicationList.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;

var Stage1 = React.createClass({

	getInitialState: function() {
		return {
			applications: ApplicationStore.getByStatus(1),
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

module.exports = Stage1;
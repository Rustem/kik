var _ = require('lodash');
var ApplicationStore = require('../../stores/ApplicationStore');
var ConclusionStore = require('../../stores/ConclusionStore');
var ApplicationList = require('../applications/ApplicationList.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;

var Stage20 = React.createClass({
	
	getInitialState: function() {
		return {
			applications: ApplicationStore.getByStatus(2),
		}
	},

	render: function() {
		var waiting = [], ready = [];
		_.forEach(this.state.applications, function(a){
			if(ConclusionStore.getByApplicationAndType(a, ConclusionTypes.RISK) !== undefined)
				ready.push(a);
			else
				waiting.push(a);
		});
		return <div>
				<h1>Ждут заключения</h1>
					<ApplicationList applications={waiting} />
				<h1>Готовы</h1>
					<ApplicationList applications={ready} />
			   </div>
	}
});

module.exports = Stage20;
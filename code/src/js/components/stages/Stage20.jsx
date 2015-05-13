var _ = require('lodash');
var ApplicationStore = require('../../stores/ApplicationStore');
var ConclusionStore = require('../../stores/ConclusionStore');
var ApplicationList = require('../applications/ApplicationList.jsx');
var ConclusionTypes = require('../../constants/appConstants').ConclusionTypes;

var Stage20 = React.createClass({
	
	getInitialState: function() {
		return {
			applications: ApplicationStore.getAll(),
		}
	},

	render: function() {
		var my_applications = _.filter(this.state.applications, { status: 2 });
    	var other_applications = _.reject(this.state.applications, { status: 2 });

		var waiting = [], ready = [];
		_.forEach(my_applications, function(a){
			if(ConclusionStore.getByApplicationAndType(a, ConclusionTypes.RISK) !== undefined)
				ready.push(a);
			else
				waiting.push(a);
		});
		return  <div>
					<h4>Ждут заключения</h4>
					{waiting.length > 0 ? 
						 <ApplicationList applications={waiting} />
					: <h6>Новых заявлений нет</h6>}
					<br /><br />
					<h4>Готовы</h4>
					{ready.length > 0 ? 
						 <ApplicationList applications={ready} />
					: <h6>Обработанных заявлений нет</h6>}
					<br /><br />
					<h4>Остальные заявления</h4>
					{other_applications.length > 0 ? 
						<ApplicationList applications={other_applications} />
					: <h6>Заявлений нет</h6>}
			    </div>
	}
});

module.exports = Stage20;
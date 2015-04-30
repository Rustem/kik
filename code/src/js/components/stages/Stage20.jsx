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
				{waiting.length > 0 ? 
					[<h4>Ждут заключения</h4>,
					 <ApplicationList applications={waiting} />]
				: <h4>Новых заявлений нет</h4>}
				<br />
				{ready.length > 0 ? 
					[<h4>Готовы</h4>,
					 <ApplicationList applications={ready} />]
				: <h4>Обработанных заявлений нет</h4>}
			   </div>
	}
});

module.exports = Stage20;
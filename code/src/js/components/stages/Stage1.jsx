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
		var my_applications_0 = _.filter(this.state.applications, { status: 1, round: 0 });
	    var other_applications_0 = _.reject(_.filter(this.state.applications, {round: 0}), { status: 1 });
	    var my_applications_1 = _.filter(this.state.applications, { status: 1, round: 1 });
	    var other_applications_1 = _.reject(_.filter(this.state.applications, {round: 1}), { status: 1 });
		return 	<div>
					<h3 className="text-center">Первичное рассмотрение</h3>
					<h4>Мои заявления</h4>
					{my_applications_0.length > 0 ? 
					 <ApplicationList applications={my_applications_0} />
					: <h6>Заявлений нет</h6>}
					<br /><br />
					<h4>Остальные заявления</h4>
					{other_applications_0.length > 0 ? 
					 <ApplicationList applications={other_applications_0} />
					: <h6>Заявлений нет</h6>}

					<br /><br /><br />
					{my_applications_1.length > 0 || other_applications_1.length > 0 ? 
					<div>
					<h3 className="text-center">Повторное рассмотрение</h3>
					<h4>Мои заявления</h4>
					{my_applications_1.length > 0 ? 
					   <ApplicationList applications={my_applications_1} />
					: <h6>Заявлений нет</h6>}
					<br /><br />
					<h4>Остальные заявления</h4>
					{other_applications_1.length > 0 ? 
					   <ApplicationList applications={other_applications_1} />
					: <h6>Заявлений нет</h6>}
					</div> : null}
				</div>
	}
});

module.exports = Stage1;
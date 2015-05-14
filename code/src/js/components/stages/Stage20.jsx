var _ = require('lodash');
var Router = require('react-router');
var Link = Router.Link;
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
		var my_applications_0 = _.filter(this.state.applications, { status: 2, round: 0 });
	    var other_applications_0 = _.reject(_.filter(this.state.applications, {round: 0}), { status: 2 });
	    var my_applications_1 = _.filter(this.state.applications, { status: 2, round: 1 });
	    var other_applications_1 = _.reject(_.filter(this.state.applications, {round: 1}), { status: 2 });

		var waiting_0 = [], ready_0 = [];
		_.forEach(my_applications_0, function(a){
			if(ConclusionStore.getByApplicationAndType(a, ConclusionTypes.RISK) !== undefined)
				ready_0.push(a);
			else
				waiting_0.push(a);
		});
		var waiting_1 = [], ready_1 = [];
		_.forEach(my_applications_1, function(a){
			if(ConclusionStore.getByApplicationAndType(a, ConclusionTypes.RISK) !== undefined)
				ready_1.push(a);
			else
				waiting_1.push(a);
		});
		return  <div>
					<p className='text-right'>
			            <Link to="application_finder"
			                className="btn btn-default">
			                Поиск заявления
			            </Link>
			        </p>
			        <br />
					<h3 className="text-center">Первичное рассмотрение</h3>
					<h4>Ждут заключения</h4>
					{waiting_0.length > 0 ? 
						 <ApplicationList applications={waiting_0} />
					: <h6>Новых заявлений нет</h6>}
					<br /><br />
					<h4>Готовы</h4>
					{ready_0.length > 0 ? 
						 <ApplicationList applications={ready_0} />
					: <h6>Обработанных заявлений нет</h6>}
					<br /><br />
					<h4>Остальные заявления</h4>
					{other_applications_0.length > 0 ? 
						<ApplicationList applications={other_applications_0} />
					: <h6>Заявлений нет</h6>}

					<br /><br /><br />
					{my_applications_1.length > 0 || other_applications_1.length > 0 ? 
					<div>
					<h3 className="text-center">Повторное рассмотрение</h3>
					<h4>Ждут заключения</h4>
					{waiting_1.length > 0 ? 
						 <ApplicationList applications={waiting_1} />
					: <h6>Новых заявлений нет</h6>}
					<br /><br />
					<h4>Готовы</h4>
					{ready_1.length > 0 ? 
						 <ApplicationList applications={ready_1} />
					: <h6>Обработанных заявлений нет</h6>}
					<br /><br />
					<h4>Остальные заявления</h4>
					{other_applications_1.length > 0 ? 
					   <ApplicationList applications={other_applications_1} />
					: <h6>Заявлений нет</h6>}
					</div> : null}
			    </div>
	}
});

module.exports = Stage20;
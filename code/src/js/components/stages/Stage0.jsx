var Router = require('react-router');
var Link = Router.Link;
var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationList = require('../applications/ApplicationList.jsx');

var Stage0 = React.createClass({
	getInitialState: function() {
		return {
			applications: ApplicationStore.getByStatus(0),
		}
	},

	render: function() {
		var applications = this.state.applications;
		return  <div>
					<p className='text-right'>
						<Link to="person_finder"
							  className="btn btn-default">
							  Найти человека
						</Link>
					</p>
					<br />
					{applications.length > 0 ? 
						[<h4>Заявления</h4>,
						 <ApplicationList applications={applications} />]
					: <h4>Заявлений нет</h4>}
				</div>
	}
});

module.exports = Stage0;
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
		return  <div>
					<Link to="person_finder">
						  Найти человека
					</Link>
					<ApplicationList applications={this.state.applications} />
				</div>
	}
});

module.exports = Stage0;
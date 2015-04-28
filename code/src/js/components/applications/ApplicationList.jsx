var Router = require('react-router');
var Link = Router.Link;

ApplicationListItem = React.createClass({
	PropTypes: {
		idx: React.PropTypes.number,
		application: React.PropTypes.object,
	},

	render: function() {
		var application = this.props.application;
		return <p>
				<span>{application.id}</span>: 
				<span>{application.status}</span>
				<Link to="application_detail"
					  params={{id: application.id}}>
					  Посмотреть детали
				</Link>
			   </p>
		
	}
});

ApplicationList = React.createClass({
	PropTypes: {
		applications: React.PropTypes.array,
	},

	renderItem: function(application, idx) {
		return <ApplicationListItem application={application} key={'app_item__'+idx} />
	},

	render: function() {
		return  <div>
					{this.props.applications.map(this.renderItem)}
				</div>
	}
});

module.exports = ApplicationList;
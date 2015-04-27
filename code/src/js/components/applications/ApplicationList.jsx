var SessionStore = require('../../stores/SessionStore');
var ApplicationStore =require('../../stores/ApplicationStore');

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
			   </p>
		
	}
})

ApplicationList = React.createClass({
	statics: {
	    willTransitionTo: function (transition, params) {
	      if (!SessionStore.current_user()) {
	        transition.abort();
	        transition.redirect('login', {}, {});
	      }
	    },
	},

	getInitialState: function() {
		return {
			applications: ApplicationStore.getZero(),
		}
	},

	renderItem: function(application, idx) {
		return <ApplicationListItem application={application} idx={idx} />
	},

	render: function() {
		return  <div>
					{this.state.applications.map(this.renderItem)}
				</div>
	}
});

module.exports = ApplicationList;
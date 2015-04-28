var Router = require('react-router');
var ApplicationStore = require('../../stores/ApplicationStore');
var AppContextMixin = require('../../mixins/AppContextMixin');
var RiskForm = require('../../forms/RiskForm.jsx');


ApplicationDetail = React.createClass({
	mixins: [AppContextMixin, Router.State],

	getApplication: function() {
		var params = this.getParams();
		return ApplicationStore.get(params.id)
	},

	getComponent: function(application) {
		var user = this.getUser();
		switch(user.position) {
			case 0:
				return null;
			case 1:
				return null;
			case 20:
				return <RiskForm application={application} />
			case 21:
				return null;
			case 22:
				return null;
		}
	},

	render: function() {
		var application = this.getApplication(),
			Component = this.getComponent(application);
		return  <div>
					<p>
						<span>{application.id}</span>: 
						<span>{application.status}</span>
					</p>
					{Component ? <Component application={application} /> : null}
				</div>
		
	}
});


module.exports = ApplicationDetail;
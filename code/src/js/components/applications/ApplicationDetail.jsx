var Router = require('react-router');
var ApplicationStore = require('../../stores/ApplicationStore');
var AppContextMixin = require('../../mixins/AppContextMixin');
var RiskConclusion = require('../conclusions/RiskConclusion.jsx');
var ConclusionActions = require('../../actions/ConclusionActions');


ApplicationDetail = React.createClass({
	mixins: [AppContextMixin, Router.State, Router.Navigation],

	onRiskSubmit: function(object) {
		var promise = ConclusionActions.create(object);
		promise.done(function() {
            this.transitionTo('index');
            
        }.bind(this));
	},

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
				return <RiskConclusion application={application} onHandleSubmit={this.onRiskSubmit} />
			case 21:
				return null;
			case 22:
				return null;
		}
		return null
	},

	render: function() {
		var application = this.getApplication(),
			Component = this.getComponent(application);
		return  <div>
					<p>
						<span>{application.id}</span>: 
						<span>{application.status}</span>
					</p>
					{Component}
				</div>
		
	}
});


module.exports = ApplicationDetail;
var Router = require('react-router');
var ApplicationStore = require('../../stores/ApplicationStore');
var AppContextMixin = require('../../mixins/AppContextMixin');
var ConclusionActions = require('../../actions/ConclusionActions');
var ApplicationActions = require('../../actions/ApplicationActions');
var NoteActions = require('../../actions/NoteActions');
var RiskConclusion = require('../conclusions/RiskConclusion.jsx');
var LegalConclusion = require('../conclusions/LegalConclusion.jsx');
var SecurConclusion = require('../conclusions/SecurConclusion.jsx');
var FullConclusion = require('../conclusions/FullConclusion.jsx');
var ApprovalConclusion = require('../conclusions/ApprovalConclusion.jsx');
var StageHeader = require('../stages/StageHeader.jsx');
var ApplicationInfo = require('./ApplicationInfo.jsx');


var ApplicationDetail = React.createClass({
	mixins: [AppContextMixin, Router.State, Router.Navigation],

	onConclusionSubmit: function(object) {
		var promise = ConclusionActions.create(object);
		promise.done(function() {
            this.transitionTo('index');
            
        }.bind(this));
	},

	onApplicationApprove: function() {
		var application = this.getApplication();
		var promise = ApplicationActions.approve(application);
		promise.done(function() {
            this.transitionTo('index');
            
        }.bind(this));
	},

	onApplicationReject: function(object) {
		var promise = NoteActions.create(object);
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
				return <ApprovalConclusion application={application} onApplicationApprove={this.onApplicationApprove}  onApplicationReject={this.onApplicationReject} />;
			case 20:
				return <RiskConclusion application={application} onHandleSubmit={this.onConclusionSubmit} />;
			case 21:
				return <LegalConclusion application={application} onHandleSubmit={this.onConclusionSubmit} />;
			case 22:
				return <SecurConclusion application={application} onHandleSubmit={this.onConclusionSubmit} />;
			case 3:
				return <FullConclusion application={application} onHandleSubmit={this.onConclusionSubmit} />;
		}
		return null
	},

	render: function() {
		var application = this.getApplication(),
			Component = this.getComponent(application);
		return  <div className="page-container">
	                <StageHeader />
	                <div className="row" style={{marginTop:'90px'}}>
		                <ApplicationInfo application={application} />
		                {Component}
	                </div>
	            </div>		
	}
});


module.exports = ApplicationDetail;
var _ = require('lodash');
var Router = require('react-router');
var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationActions = require('../../actions/ApplicationActions');
var ApplicationForm = require('../../forms/ApplicationForm.jsx');
var StageHeader = require('../stages/StageHeader.jsx');

var ApplicationNew = React.createClass({
  mixins: [Router.State, Router.Navigation],

  onSave: function(application) {
    var promise = ApplicationActions.save(application);
    promise.done(function() {
            this.transitionTo('index');
            
        }.bind(this));
  },

  onAccept: function(application) {
    var promise = ApplicationActions.accept(application);
    promise.done(function() {
            this.transitionTo('index');
            
        }.bind(this));
  },

  getApplication: function() {
    var id = this.getParams().id;
    if(id)
      return ApplicationStore.get(id);
    return undefined;
  },

	render: function() {
		return (
      <div className="page-container">
          <StageHeader />
          <div className="row" style={{marginTop:'90px'}}>
            <ApplicationForm application={this.getApplication()} onSave={this.onSave} onAccept={this.onAccept} />
          </div>
      </div>  
    );
	}
});

module.exports = ApplicationNew;
var _ = require('lodash');
var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationWebAPI = require('../../api/ApplicationWebAPI');
var ApplicationList = require('../applications/ApplicationList.jsx');
var ApplicationForm = require('../../forms/ApplicationForm.jsx');


var Stage0 = React.createClass({
	getInitialState: function() {
		return {
			applications: ApplicationStore.getByStatus(0),
		}
	},

  handleFormAction: function(action, application) {
    var actions = {
          save: function() {
            var newApplication = _.assign({
              status: 0
            }, application);
            ApplicationWebAPI.create(newApplication);
          },
          accept: function() {
            var newApplication = _.assign({
              status: 1
            }, application);
            ApplicationWebAPI.create(newApplication);
          }
        };

    _.isFunction(actions[action]) && actions[action]();

    console.log(action, application);
    // var newApplication = _.assign({
    //   status: 0
    // }, application);
    // ApplicationWebAPI.create(newApplication);
  },

	render: function() {
		return (
      <div>
        <ApplicationList applications={this.state.applications} />
        <ApplicationForm onAction={this.handleFormAction} />
      </div>
    );

	}
});

module.exports = Stage0;
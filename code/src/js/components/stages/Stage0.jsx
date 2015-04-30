var _ = require('lodash');
var Router = require('react-router');
var Link = Router.Link;
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
    var applications = this.state.applications;
		return (
      <div>
        <div>
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

        <ApplicationForm onAction={this.handleFormAction} />
      </div>
    );
	}
});

module.exports = Stage0;
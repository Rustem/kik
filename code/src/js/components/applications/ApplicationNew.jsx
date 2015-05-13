var _ = require('lodash');
var Router = require('react-router');
var PeopleStore = require('../../stores/PeopleStore');
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
    var application = {};
    var id = this.getParams().id;
    var iin = this.getQuery().iin;
    if(id)
      application = ApplicationStore.get(id);
    if(iin) {
      var person = PeopleStore.getByIIN(iin);
      application = _.assign(application, {
        income_mainwork: person.mock_gcvp_payment*10,
        person: {
          lastname: person.lastname,
          firstname: person.firstname,
          middlename: person.middlename,
          address: person.address,
          birthday: person.birthdate,
          phonenumber: person.tel,
        }
      })
    }
    return application;
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
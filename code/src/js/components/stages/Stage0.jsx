var ApplicationStore = require('../../stores/ApplicationStore');
var ApplicationList = require('../applications/ApplicationList.jsx');
var ApplicationForm = require('../../forms/ApplicationForm.jsx');


var Stage0 = React.createClass({
	getInitialState: function() {
		return {
			applications: ApplicationStore.getByStatus(0),
		}
	},

  _onSubmit: function(application) {
    console.log(application);
  },

	render: function() {
		return (
      <div>
        <ApplicationList applications={this.state.applications} />
        <ApplicationForm onSubmit={this._onSubmit}/>
      </div>
    );
	}
});

module.exports = Stage0;
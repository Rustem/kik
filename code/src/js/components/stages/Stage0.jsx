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
			applications: ApplicationStore.getAll(),
		}
	},

	render: function() {
    var my_applications = _.filter(this.state.applications, { status: 0 });
    var other_applications = _.reject(this.state.applications, { status: 0 });
		return (
      <div>
        <div>
          <p className='text-right'>
            <Link to="application_new"
                className="btn btn-default">
                Новое заявление
            </Link>&nbsp;
            <Link to="person_finder"
                className="btn btn-default">
                Найти человека
            </Link>
          </p>
          <br />
          <h4>Мои заявления</h4>
          {my_applications.length > 0 ? 
             <ApplicationList applications={my_applications} />
          : <h6>Заявлений нет</h6>}
          <br /><br />
          <h4>Остальные заявления</h4>
          {other_applications.length > 0 ? 
             <ApplicationList applications={other_applications} />
          : <h6>Заявлений нет</h6>}
        </div>
      </div>
    );
	}
});

module.exports = Stage0;
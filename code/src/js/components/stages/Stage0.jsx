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
    var my_applications_0 = _.filter(this.state.applications, { status: 0, round: 0 });
    var other_applications_0 = _.reject(_.filter(this.state.applications, {round: 0}), { status: 0 });
    var my_applications_1 = _.filter(this.state.applications, { status: 0, round: 1 });
    var other_applications_1 = _.reject(_.filter(this.state.applications, {round: 1}), { status: 0 });
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
          <h3 className="text-center">Первичное рассмотрение</h3>
          <h4>Мои заявления</h4>
          {my_applications_0.length > 0 ? 
             <ApplicationList applications={my_applications_0} />
          : <h6>Заявлений нет</h6>}
          <br /><br />
          <h4>Остальные заявления</h4>
          {other_applications_0.length > 0 ? 
             <ApplicationList applications={other_applications_0} />
          : <h6>Заявлений нет</h6>}

          <br /><br /><br />
          {my_applications_1.length > 0 || other_applications_1.length > 0 ? 
          <div>
            <h3 className="text-center">Повторное рассмотрение</h3>
            <h4>Мои заявления</h4>
            {my_applications_1.length > 0 ? 
               <ApplicationList applications={my_applications_1} />
            : <h6>Заявлений нет</h6>}
            <br /><br />
            <h4>Остальные заявления</h4>
            {other_applications_1.length > 0 ? 
               <ApplicationList applications={other_applications_1} />
            : <h6>Заявлений нет</h6>}
          </div> : null}

        </div>
      </div>
    );
	}
});

module.exports = Stage0;
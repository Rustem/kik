var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
var constants = require('../../constants/appConstants'); 
var PROGRAMS = constants.PROGRAMS;
var APPLICATION_STATUS = constants.APPLICATION_STATUS;

var ApplicationListItem = React.createClass({
	PropTypes: {
		idx: React.PropTypes.number,
		application: React.PropTypes.object,
	},

	render: function() {
		var application = this.props.application;
		return  <tr>
			        <th scope="row">{this.props.idx+1}</th>
			        <td>{application.person.lastname} {application.person.firstname} {application.person.middlename} </td>
			        <td>{PROGRAMS[application.program]}</td>
			        <td>{moment(application.date_created).format("DD.MM.YYYY")}</td>
					<td>{APPLICATION_STATUS[application.status]}</td>
			        <td>
			          	<Link to="application_detail"
						  params={{id: application.id}}>
						  Посмотреть детали
						</Link>
					</td>
		        </tr>
		
	}
});

var ApplicationList = React.createClass({
	PropTypes: {
		applications: React.PropTypes.array,
	},

	renderItem: function(application, idx) {
		return <ApplicationListItem application={application} key={'app_item__'+idx} idx={idx}/>
	},

	render: function() {
		return  <table className="table table-striped">
					<thead>
				        <tr>
				          <th>#</th>
				          <th>ФИО</th>
				          <th>Программа</th>
				          <th>Дата подачи заявления</th>
				          <th>Статус</th>
				          <th></th>
				        </tr>
			      	</thead>
			      	<tbody>
						{this.props.applications.map(this.renderItem)}
			      	</tbody>
				</table>
	}
});

module.exports = ApplicationList;
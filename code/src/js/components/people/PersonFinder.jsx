var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
var StageHeader = require('../stages/StageHeader.jsx');
var PeopleStore = require('../../stores/PeopleStore');
var PeopleFinderForm = require('../../forms/PeopleFinderForm.jsx');
var AppContextMixin = require('../../mixins/AppContextMixin');
var TEMPLATES = require('../../constants/appConstants').TEMPLATES;
var utils = require('../../utils');

var PeopleListItem = React.createClass({
	mixins: [AppContextMixin],
	PropTypes: {
		idx: React.PropTypes.number,
		person: React.PropTypes.object,
	},

	genZayavlenie: function(person) {
		var author = this.getUser();
		var params = {
			id: person.id,
			date: moment().format("DD.MM.YYYY"),
			author: author.lastname+" "+author.firstname,
			lastname: person.lastname,
			firstname: person.firstname,
			middlename: person.middlename,
			address: person.address,
			tel: person.tel,

		}
		// console.log(params)

		utils.print_doc(TEMPLATES.ZAYAVLENIE, params);
	},

	genSoglasie: function(person) {
		var author = this.getUser();
		var params = {
			id: person.id,
			date: moment().format("DD.MM.YYYY"),
			time: moment().format("HH:mm"),
			author: author.lastname+" "+author.firstname,
			lastname: person.lastname,
			firstname: person.firstname,
			middlename: person.middlename,
			birthdate: person.birthdate,
			address: person.address,
			udv_n: person.udv_n,
			udv_date: person.udv_date,

		}
		// console.log(params)

		utils.print_doc(TEMPLATES.SOGLASIE, params);
	},

	render: function() {
		var person = this.props.person;
		return  <tr>
			        <th scope="row">{this.props.idx+1}</th>
			        <td>{person.lastname} {person.firstname} {person.middlename} </td>
			        <td>{person.iin}</td>
			        <td>
			          	<button className="btn btn-default btn-xs" onClick={this.genZayavlenie.bind(null, person)}>Распечатать заявление</button>
						<button className="btn btn-default btn-xs" onClick={this.genSoglasie.bind(null, person)}>Распечатать согласие</button>
						<Link to="application_new"
							  query={{iin: person.iin}}
							  className="btn btn-primary btn-xs">
							Создать заявку
						</Link>
					</td>
		        </tr>
	},
});

var PeopleList = React.createClass({
	PropTypes: {
		people: React.PropTypes.array,
	},

	renderItem: function(person, idx) {
		return <PeopleListItem person={person} key={'person__'+idx} idx={idx} />
	},

	render: function() {
		var people = this.props.people;
		return  <div>
					{people ? 
						<table className="table table-striped">
							<thead>
						        <tr>
						          <th>#</th>
						          <th>ФИО</th>
						          <th>ИИН</th>
						          <th></th>
						        </tr>
					      	</thead>
					      	<tbody>
								{people.map(this.renderItem)}
					      	</tbody>
						</table>
					: null}
				</div>
	}
});

var PeopleFinder = React.createClass({

	getInitialState: function() {
		return {
			'iin': ''
		}
	},

	onSearch: function(object) {
		this.setState({ iin: object.iin });
	},

	findPeople: function() {
		var iin = this.state.iin;
		if(iin.length > 0)
			return [PeopleStore.getByIIN(iin)];
		return []
	},

	render: function() {
		return  <div className="page-container">
	                <StageHeader />
	                <div className="row" style={{marginTop:'90px'}}>
	            	    <PeopleFinderForm onHandleSubmit={this.onSearch} />
						<PeopleList people={this.findPeople()} />
	                </div>
				</div>
	}
});


module.exports = PeopleFinder;
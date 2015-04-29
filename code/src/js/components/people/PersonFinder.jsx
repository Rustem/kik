var moment = require('moment');
var PeopleStore = require('../../stores/PeopleStore');
var PeopleFinderForm = require('../../forms/PeopleFinderForm.jsx');
var utils = require('../../utils');
var AppContextMixin = require('../../mixins/AppContextMixin');

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
		console.log(params)

		// utils.print_doc(TEMPLATES.ZAYAVLENIE, params);
	},

	genSoglasie: function(person) {
		var author = this.getUser();
		var params = {
			id: person.id,
			date: moment().format("hh:mm"),
			author: author.lastname+" "+author.firstname,
			lastname: person.lastname,
			firstname: person.firstname,
			middlename: person.middlename,
			birthdate: person.birthdate,
			address: person.address,
			udv_n: person.udv_n,
			udv_date: person.udv_date,

		}
		console.log(params)

		// utils.print_doc(TEMPLATES.SOGLASIE, params);
	},

	render: function() {
		var person = this.props.person;
		return  <p>
					{person.lastname} {person.firstname} {person.middlename}
					<button onClick={this.genZayavlenie.bind(null, person)}>Распечатать заявление</button>
					<button onClick={this.genSoglasie.bind(null, person)}>Распечатать согласие</button>
				</p>
	},
});

var PeopleList = React.createClass({
	PropTypes: {
		people: React.PropTypes.array,
	},

	renderItem: function(person, idx) {
		return <PeopleListItem person={person} key={'person__'+idx} />
	},

	render: function() {
		var people = this.props.people;
		return  <div>
					{people ? people.map(this.renderItem) : null}
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
		return PeopleStore.getByIIN(iin);
	},

	render: function() {
		return  <div>
					<PeopleFinderForm onHandleSubmit={this.onSearch} />
					<PeopleList people={this.findPeople()} />
				</div>
	}
});


module.exports = PeopleFinder;
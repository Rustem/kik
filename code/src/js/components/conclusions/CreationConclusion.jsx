var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
var NoteStore = require('../../stores/NoteStore');
var UserStore = require('../../stores/UserStore');

var CreationConclusion = React.createClass({
	PropTypes: {
		application: React.PropTypes.object,
	},

	renderNote: function(note, idx) {
		var author = UserStore.get(note.author_id).lastname,
			date = moment(note.date_created).format("DD.MM.YYYY");
		return (
			<div className="well well-sm" style={{backgroundColor:'white'}} key={'note__'+idx}>
				{note.text}
				<p className="text-right"><b>{author} {date}</b></p>
			</div>
		)
	},

	getNotes: function() {
		return NoteStore.getByApplication(this.props.application);
	},

	render: function() {
		var application = this.props.application;
		var notes = this.getNotes();
		return  <div className="row">
					{notes.length > 0 ?
						[<h3>Замечания</h3>,
						 notes.map(this.renderNote)]
					:
						null
					}
					<div className="text-center">
						<Link to="application_edit"
							  className="btn btn-primary"
							  params={{id: application.id}}>
							 Редактировать
						</Link>
					</div>
				</div>
		
	}
});

module.exports = CreationConclusion;
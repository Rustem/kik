var moment = require('moment');
var UserStore = require('../../stores/UserStore');
var NoteStore = require('../../stores/NoteStore');
var NoteForm = require('../../forms/NoteForm.jsx');

var ApprovalConclusion = React.createClass({
	PropTypes: {
		onHandleSubmit: React.PropTypes.func,
		application: React.PropTypes.object,
	},

	getInitialState: function() {
		return {
			approve_mode: true,
		}
	},

	rejectToggle: function() {
		this.setState({
			approve_mode: !this.state.approve_mode,
		})
	},

	getAuthor: function(author_id) {
		return UserStore.get(author_id);
	},

	renderNote: function(note, idx) {
		var author = this.getAuthor(note.author_id).lastname,
			date = moment(note.date_created).format("DD.MM.YYYY");
		return  <div className="well well-sm" style={{backgroundColor:'white'}} key={'note__'+idx}>
					<p><b>Заметка:</b></p>
					{note.text}
					<p className="text-right"><b>{author} {date}</b></p>
				</div>
	},

	getNotes: function() {
		var application = this.props.application;
		return NoteStore.getByApplication(application);
	},

	render: function() {
		var notes = this.getNotes();
		return  <div className="row">
						{notes.length > 0 ?
							[<h3>Замечания</h3>,
							 notes.map(this.renderNote)]
						:
							null
						}
						{
						this.state.approve_mode ? 
							<div className="text-center">
								<button onClick={this.props.onApplicationApprove} className="btn btn-success">Согласовать</button>&nbsp;
								<button onClick={this.rejectToggle} className="btn btn-danger">Отправить на доработку</button>
							</div>
						:
							<NoteForm application={this.props.application} onHandleSubmit={this.props.onApplicationReject} onCancelSubmit={this.rejectToggle} />
						}
				</div>
		
	}
});

module.exports = ApprovalConclusion;
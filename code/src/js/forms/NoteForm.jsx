var forms = require('newforms');
var BootstrapForm = require('newforms-bootstrap');
var ConclusionTypes = require('../constants/appConstants').ConclusionTypes;
var AppContextMixin = require('../mixins/AppContextMixin');

var NoteFormDefinition = forms.Form.extend({
  text: forms.CharField({
  	label: 'Заметка',
    widget: forms.Textarea({attrs: {rows: 6, cols: 60}})
  }),
});

var NoteForm = React.createClass({
	mixins:[AppContextMixin],
	propTypes: {
		application: React.PropTypes.object,
	    onHandleSubmit: React.PropTypes.func,
	    onCancelSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.NoteForm.getForm();
	    var isValid = form.validate();
	    if (isValid) {
	    	var rv = form.cleanedData;
	    	rv['application_id'] = this.props.application.id;
	      	rv['author_id'] = this.getUser.id;
	      	this.props.onHandleSubmit(rv);
	    }
	},

	onCancelHandle: function(e) {
		e.preventDefault();
		this.props.onCancelSubmit();
	},

    render: function() {
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={NoteFormDefinition} ref="NoteForm">
			        	<BootstrapForm/>
			        </forms.RenderForm>
			        <div className="text-center">
						<button type="submit" className="btn btn-success">Отправить</button>
						<button onClick={this.onCancelHandle} className="btn btn-link">Отменить</button>
					</div>
			    </form>
    },
});

module.exports = NoteForm;
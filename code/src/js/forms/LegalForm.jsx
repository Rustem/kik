var forms = require('newforms');
var ConclusionTypes = require('../constants/appConstants').ConclusionTypes;

var LegalFormDefinition = forms.Form.extend({
  text: forms.CharField({
    widget: forms.Textarea({attrs: {rows: 6, cols: 60}})
  }),
});

var LegalForm = React.createClass({
	propTypes: {
		application: React.PropTypes.object,
	    onHandleSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.LegalForm.getForm();
	    var isValid = form.validate();
	    if (isValid) {
	    	var rv = form.cleanedData;
	    	rv['type'] = ConclusionTypes.LEGAL;
	    	rv['application_id'] = this.props.application.id;
	      	this.props.onHandleSubmit(rv);
	    }
	},

    render: function() {
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={LegalFormDefinition} ref="LegalForm"/>
			        <button>Отправить</button>
			    </form>
    },
});

module.exports = LegalForm;
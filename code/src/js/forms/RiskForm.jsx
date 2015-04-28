var forms = require('newforms');

var RiskFormDefinition = forms.Form.extend({
  text: forms.CharField({
    widget: forms.Textarea({attrs: {rows: 6, cols: 60}})
  }),
});

var RiskForm = React.createClass({
	propTypes: {
		application: React.PropTypes.object,
	    onHandleSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.riskForm.getForm();
	    var isValid = form.validate();
	    if (isValid) {
	    	var rv = form.cleanedData;
	    	rv['type'] = 0;
	    	rv['application_id'] = this.props.application.id;
	      	this.props.onHandleSubmit(rv);
	    }
	},

    render: function() {
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={RiskFormDefinition} ref="riskForm"/>
			        <button>Отправить</button>
			    </form>
    },
});

module.exports = RiskForm;
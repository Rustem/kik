var forms = require('newforms');

var RiskFormDefinition = forms.Form.extend({
  conclusion: forms.TextField(),
});

var RiskForm = React.createClass({
	
	propTypes: {
	    onHandleSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.riskForm.getForm();
	    var isValid = form.validate();
	    if (isValid) {
	      this.props.onHandleSubmit(form.cleanedData);
	    }
	},

    render: function() {
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={RiskFormDefinition} ref="riskForm"/>
			        <button>Log In</button>
			    </form>
    },
});

module.exports = RiskForm;
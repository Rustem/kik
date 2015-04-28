var forms = require('newforms');

var LogInFormDefinition = forms.Form.extend({
  email: forms.EmailField(),
  password: forms.CharField({widget: forms.PasswordInput}),
});

var LogInForm = React.createClass({
	
	propTypes: {
	    onHandleSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.loginForm.getForm();
	    var isValid = form.validate();
	    if (isValid) {
	      this.props.onHandleSubmit(form.cleanedData);
	    }
	},

    render: function() {
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={LogInFormDefinition} ref="loginForm"/>
			        <button>Log In</button>
			    </form>
    },
});

module.exports = LogInForm;
var forms = require('newforms');

var LogInFormDefinition = forms.Form.extend({
  email: forms.EmailField({
  	label: 'E-mail',
  }),
  password: forms.CharField({
  	label: 'Пароль',
  	widget: forms.PasswordInput
  }),
});

var LogInForm = React.createClass({
	
	propTypes: {
	    onHandleSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.LoginForm.getForm();
	    var isValid = form.validate();
	    if (isValid) {
	      this.props.onHandleSubmit(form.cleanedData);
	    }
	},

    render: function() {
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={LogInFormDefinition} ref="LoginForm"/>
			        <button>Войти</button>
			    </form>
    },
});

module.exports = LogInForm;
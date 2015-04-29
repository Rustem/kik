var forms = require('newforms');
var BootstrapForm = require('newforms-bootstrap')

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
			        <forms.RenderForm form={LogInFormDefinition} ref="LoginForm">
			        	<BootstrapForm/>
			        </forms.RenderForm>
			        <div className="text-center">
			        	<button type="button" className="btn btn-block btn-success">Войти</button>
			        </div>
			    </form>
    },
});

module.exports = LogInForm;
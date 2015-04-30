var forms = require('newforms');
var BootstrapForm = require('newforms-bootstrap');
var ConclusionTypes = require('../constants/appConstants').ConclusionTypes;
var AppContextMixin = require('../mixins/AppContextMixin');

var SecurFormDefinition = forms.Form.extend({
    remark: forms.CharField({
    	label: "Замечания",
    	widget: forms.Textarea({attrs: {rows: 6, cols: 60}})
    }),
    output: forms.CharField({
    	label: "Заключение и выводы",
    	widget: forms.Textarea({attrs: {rows: 6, cols: 60}})
    }),
});

var SecurForm = React.createClass({
	mixins:[AppContextMixin],
	propTypes: {
		application: React.PropTypes.object,
	    onHandleSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.SecurForm.getForm();
	    var isValid = form.validate();
	    if (isValid) {
	    	var rv = form.cleanedData;
	    	rv['type'] = ConclusionTypes.SECUR;
	    	rv['application_id'] = this.props.application.id;
	      	rv['author_id'] = this.getUser.id;
	      	this.props.onHandleSubmit(rv);
	    }
	},

    render: function() {
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={SecurFormDefinition} ref="SecurForm">
			        	<BootstrapForm/>
			        </forms.RenderForm>
			        <div className="text-center">
						<button type="submit" className="btn btn-success">Отправить</button>
					</div>
			    </form>
    },
});

module.exports = SecurForm;
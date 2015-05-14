var forms = require('newforms');
var BootstrapForm = require('newforms-bootstrap');

var ApplicationFinderFormDefinition = forms.Form.extend({
  lastname: forms.CharField({
  	required: false, 
  	label: 'Фамилия'
  }),
});

var ApplicationFinderForm = React.createClass({
	
	propTypes: {
	    onHandleSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.ApplicationFinderForm.getForm();
	    var isValid = form.validate();
	    if (isValid) {
	      this.props.onHandleSubmit(form.cleanedData);
	    }
	},

    render: function() {
    	var Col = BootstrapForm.Col, 
    		Container = BootstrapForm.Container, 
    		Row = BootstrapForm.Row, 
    		Field = BootstrapForm.Field;
	    return  <form onSubmit={this.onHandleSubmit} className="form-inline">
			        <forms.RenderForm form={ApplicationFinderFormDefinition} ref="ApplicationFinderForm">
			        	<Container>
						    <Row>
						        <Field name="lastname" md="4"/>
						        <Col md="2">
			        				<button type="submit" className="btn btn-default">Найти</button>
						        </Col>
						    </Row>
						</Container>
			        </forms.RenderForm>
			    </form>
    },
});

module.exports = ApplicationFinderForm;
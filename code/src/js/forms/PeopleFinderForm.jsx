var forms = require('newforms');
var BootstrapForm = require('newforms-bootstrap');

var PeopleFinderFormDefinition = forms.Form.extend({
  iin: forms.CharField({
  	label: 'ИИН'
  }),
});

var PeopleFinderForm = React.createClass({
	
	propTypes: {
	    onHandleSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.PeopleFinderForm.getForm();
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
			        <forms.RenderForm form={PeopleFinderFormDefinition} ref="PeopleFinderForm">
			        	<Container>
						    <Row>
						        <Field name="iin" md="3"/>
						        <Col md="2">
			        				<button type="submit" className="btn btn-default">Найти</button>
						        </Col>
						    </Row>
						</Container>
			        </forms.RenderForm>
			    </form>
    },
});

module.exports = PeopleFinderForm;
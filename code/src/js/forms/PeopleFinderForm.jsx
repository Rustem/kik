var forms = require('newforms');

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
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={PeopleFinderFormDefinition} ref="PeopleFinderForm"/>
			        <button type="button" className="btn btn-default">Найти</button>
			    </form>
    },
});

module.exports = PeopleFinderForm;
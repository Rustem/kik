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
	    	console.log(form.cleanedData)
	      this.props.onHandleSubmit(form.cleanedData);
	    }
	},

    render: function() {
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={PeopleFinderFormDefinition} ref="PeopleFinderForm"/>
			        <button>Найти</button>
			    </form>
    },
});

module.exports = PeopleFinderForm;
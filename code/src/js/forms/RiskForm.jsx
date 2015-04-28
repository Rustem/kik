var forms = require('newforms');
var ConclusionTypes = require('../constants/appConstants').ConclusionTypes;
var AppContextMixin = require('../mixins/AppContextMixin');

var RiskFormDefinition = forms.Form.extend({
  text: forms.CharField({
    widget: forms.Textarea({attrs: {rows: 6, cols: 60}})
  }),
});

var RiskForm = React.createClass({
	mixins:[AppContextMixin],
	propTypes: {
		application: React.PropTypes.object,
	    onHandleSubmit: React.PropTypes.func,
	},

	onHandleSubmit: function(e) {
		e.preventDefault();

	    var form = this.refs.RiskForm.getForm();
	    var isValid = form.validate();
	    if (isValid) {
	    	var rv = form.cleanedData;
	    	rv['type'] = ConclusionTypes.RISK;
	    	rv['application_id'] = this.props.application.id;
	    	rv['author_id'] = this.getUser.id;
	      	this.props.onHandleSubmit(rv);
	    }
	},

    render: function() {
	    return  <form onSubmit={this.onHandleSubmit}>
			        <forms.RenderForm form={RiskFormDefinition} ref="RiskForm"/>
			        <button>Отправить</button>
			    </form>
    },
});

module.exports = RiskForm;
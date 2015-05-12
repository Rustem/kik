var forms = require('newforms');
var BootstrapForm = require('newforms-bootstrap');
var ConclusionTypes = require('../constants/appConstants').ConclusionTypes;
var AppContextMixin = require('../mixins/AppContextMixin');

			        
var RiskFormDefinition = forms.Form.extend({
	finCondition: forms.ChoiceField({
		required: false,
		label: "Финансовое состояние",
		choices: ["Стабильное", "Плохое", "Хорошее"]
	}),
	pd: forms.CharField({
		required: false,
		label: "П/Д",
	}),
	od: forms.CharField({
		required: false,
		label: "О/Д",
	}),
	creditCapacity: forms.CharField({
		required: false,
		label: "Класс кредитоспособности",
		widget: forms.Textarea({attrs: {rows: 6, cols: 60}})
	}),
	ratingCapacity: forms.ChoiceField({
		required: false,
		label: "Рейтинг платежеспособности",
		choices: ["Низкий", "Стандартный", "Высокий"]
	}),
	riskGroup: forms.ChoiceField({
		required: false,
		label: "Группа риска",
		choices: ["минимальный", "нормальный", "максимальный"]
	}),
	remark: forms.CharField({
		required: false,
		label: "Замечания, выявленные по проекту на момент проведения экспертизы",
	    widget: forms.Textarea({attrs: {rows: 6, cols: 60}})
	}),
	miniminMethods: forms.CharField({
		required: false,
		label: "Методы минимизации выявленных рисков",
	    widget: forms.Textarea({attrs: {rows: 6, cols: 60}})
	}),
	output: forms.CharField({
		required: false,
		label: "Резюме (выводы и рекомендации)",
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
			        <forms.RenderForm form={RiskFormDefinition} ref="RiskForm">
			        	<BootstrapForm/>
			        </forms.RenderForm>
			        <div className="text-center">
						<button type="submit" className="btn btn-success">Отправить</button>
					</div>
			    </form>
    },
});

module.exports = RiskForm;
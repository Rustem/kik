var _ = require('lodash');
var forms = require('../../lib/newforms/newforms');
var PersonWidget = require('../widgets/PersonWidget.jsx');

var NATIONALITY_CHOICES = [['rus', 'Русский'], ['kaz',' Казах']];
var FAMILYSTATUS_CHOICES = [['married', 'Женат'], ['single', 'Холост'], ['divorced', 'Разведен']];

var fields = [
  forms.CharField({label: "ФАМИЛИЯ", required: true}),
  forms.CharField({label: "ИМЯ", required: true}),
  forms.CharField({label: "ОТЧЕСТВО", required: true}),
  forms.CharField({label: "ДАТА РОЖДЕНИЯ", required: false}),
  forms.ChoiceField({label: "НАЦИОНАЛЬНОСТЬ", choices: NATIONALITY_CHOICES, required: false}),
  forms.ChoiceField({label: "СЕМЕЙНЫЙ СТАТУС", choices: FAMILYSTATUS_CHOICES, widget: forms.RadioSelect, required: false}),
  forms.CharField({label: "АДРЕС ПРОЖИВАНИЯ", required: false}),
  forms.CharField({label: "НОМЕР ТЕЛЕФОНА", required: false})
];
var fiels_name = ['lastname', 'firstname', 'middlename', 'birthday', 'nationality', 'familystatus', 'address', 'phonenumber'];


var PersonField = forms.MultiValueField.extend({
  widget: PersonWidget,
  defaultErrorMessages: {
    invalidDate: 'Enter a valid date.',
    invalidTime: 'Enter a valid time.'
  },

  constructor: function PersonField(kwargs) {
    console.log('here')
    // if (!(this instanceof PersonField)) { return new PersonField(kwargs) }
    kwargs = _.assign({fields: fields}, kwargs);
    var errors = _.assign({}, this.defaultErrorMessages);
    if (typeof kwargs.errorMessages != 'undefined') {
      _.assign(errors, kwargs.errorMessages)
    }
    forms.MultiValueField.call(this, kwargs);
  },

  compress: function(values) {
    console.log('compress:', values);
    var d = _.reduce(fiels_name, function(acc, value, index) {
      acc[value] = values[index];
    }, {});
    return d;
  }

});

module.exports = PersonField;




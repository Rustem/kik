var _ = require('lodash');
var forms = require('../../lib/newforms/newforms');


var NATIONALITY_CHOICES = [['rus', 'Русский'], ['kaz',' Казах']];
var FAMILYSTATUS_CHOICES = [['married', 'Женат'], ['single', 'Холост'], ['divorced', 'Разведен']];


var PersonWidget = forms.MultiWidget.extend({
  constructor: function(kwargs) {
    kwargs = _.assign({attrs: {}}, kwargs);
    widgets = [
      forms.TextInput({}),
      forms.TextInput({}),
      forms.TextInput({}),
      forms.DateInput({}),
      forms.Select({choices: NATIONALITY_CHOICES}),
      forms.RadioSelect({choices: FAMILYSTATUS_CHOICES}),
      forms.Textarea({}),
      forms.TextInput({})
    ];
    forms.MultiWidget.call(this, widgets, kwargs);
  },

/*
  lastname: forms.CharField({label: "ФАМИЛИЯ", required: true}),
  firstname: forms.CharField({label: "ИМЯ", required: true}),
  middlename: forms.CharField({label: "ОТЧЕСТВО", required: true}),
  birthday: forms.CharField({label: "ДАТА РОЖДЕНИЯ", required: false}),
  nationality: forms.ChoiceField({label: "НАЦИОНАЛЬНОСТЬ", choices: NATIONALITY_CHOICES, required: false}),
  familystatus: forms.ChoiceField({label: "СЕМЕЙНЫЙ СТАТУС", choices: FAMILYSTATUS_CHOICES, widget: forms.RadioSelect, required: false}),
  address: forms.CharField({label: "АДРЕС ПРОЖИВАНИЯ", required: false}),
  phonenumber: forms.CharField({label: "НОМЕР ТЕЛЕФОНА", required: false}),
*/

  formatOutput: function(renderedWidgets) {
    //return React.createElement('div', null, renderedWidgets)
    return (
      <div>
        <div data-row-span="3">
          <div data-field-span="1"><label>ФАМИЛИЯ</label>{renderedWidgets[0]}</div>
          <div data-field-span="1"><label>ИМЯ</label>{renderedWidgets[1]}</div>
          <div data-field-span="1"><label>ОТЧЕСТВО</label>{renderedWidgets[2]}</div>
        </div>
        <div data-row-span="2">
          <div data-field-span="1"><label>ДАТА РОЖДЕНИЯ</label>{renderedWidgets[3]}</div>
          <div data-field-span="1"><label>НАЦИОНАЛЬНОСТЬ</label>{renderedWidgets[4]}</div>
        </div>
        <div data-row-span="3">
          <div data-field-span="1"><label>СЕМЕЙНЫЙ СТАТУС</label>{renderedWidgets[5]}</div>
          <div data-field-span="1"><label>АДРЕС ПРОЖИВАНИЯ</label>{renderedWidgets[6]}</div>
          <div data-field-span="1"><label>НОМЕР ТЕЛЕФОНА</label>{renderedWidgets[7]}</div>
        </div>
      </div>
    );
  }

});

module.exports = PersonWidget;
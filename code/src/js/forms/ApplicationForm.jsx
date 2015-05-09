var _ = require('lodash');
var forms = require('../lib/newforms/newforms');
var GridForms = require('newforms-gridforms');
var GridForm = GridForms.GridForm;
var Section = GridForms.Section;
var Row = GridForms.Row;
var Field = require('../lib/newforms-gridforms/Field'); // own Field with errorMessage
var FieldLabel = require('../lib/newforms-gridforms/FieldLabel');
var FieldPureRender = require('../lib/newforms-gridforms/FieldPureRender');
var PersonField = require('./fields/PersonField.jsx');
var MultiPersonField = require('./fields/MultiPersonField.jsx');


var PROGRAM_CHOICES = [
  [undefined, ''],
  ['kz_2020', 'Доступное жилье - 2020'],
  ['other', 'Другая программа']
];
var REGION_CHOICES = [
  [undefined, ''],
  ['reg_1', 'Алматинская обл.'],
  ['reg_2', 'Акмолинская обл.']
];
var ROOMS_CHOICES = [[1, 1], [2, '2-x'], [3, '3-x']];
var RENT_CHOICES = [['3160.72', '5 лет за 3160,72 тенге'], ['2469.60', '7 лет за 2469.60 тенге'], ['1800.10', '12 лет за 1800.10 тенге']];
var NATIONALITY_CHOICES = [['rus', 'Русский'], ['kaz',' Казах']];
var FAMILYSTATUS_CHOICES = [['married', 'Женат'], ['single', 'Холост'], ['divorced', 'Разведен']];

var DATA = {
  cities: {
    reg_1: [['ala', 'Алматы'], ['tlg', 'Талдыкорган']],
    reg_2: [['ast', 'Астана']]
  },
  houses: {
    ala: [['h1', 'Базис'], ['h2', 'Essentai Park'], ['h3', 'Чешские террасы']],
    ast: [['h11', 'Империал'], ['h12', 'Москва']],
    tlg: [['h21', 'Аккент'], ['h22', 'Асыл Арман']]
  },
  flats: [
    {'rooms': 1, 'house': 'h1', 'number': '32', 'podiezd': 1, 'level': 6, 'area': 87},
    {'rooms': 1, 'house': 'h1', 'number': '56', 'podiezd': 2, 'level': 3, 'area': 60},
    {'rooms': 2, 'house': 'h1', 'number': '21', 'podiezd': 4, 'level': 6, 'area': 110},
    {'rooms': 3, 'house': 'h1', 'number': '07a', 'podiezd': 3, 'level': 6, 'area': 125},

    {'rooms': 1, 'house': 'h2', 'number': '32', 'podiezd': 1, 'level': 6, 'area': 87},
    {'rooms': 1, 'house': 'h2', 'number': '56', 'podiezd': 2, 'level': 3, 'area': 60},
    {'rooms': 2, 'house': 'h2', 'number': '21', 'podiezd': 4, 'level': 6, 'area': 110},
    {'rooms': 3, 'house': 'h2', 'number': '07a', 'podiezd': 3, 'level': 6, 'area': 125},

    {'rooms': 1, 'house': 'h3', 'number': '32', 'podiezd': 1, 'level': 6, 'area': 87},
    {'rooms': 1, 'house': 'h3', 'number': '56', 'podiezd': 2, 'level': 3, 'area': 60},
    {'rooms': 2, 'house': 'h3', 'number': '21', 'podiezd': 4, 'level': 6, 'area': 110},
    {'rooms': 3, 'house': 'h3', 'number': '07a', 'podiezd': 3, 'level': 6, 'area': 125},


    {'rooms': 1, 'house': 'h11', 'number': '32', 'podiezd': 1, 'level': 6, 'area': 87},
    {'rooms': 1, 'house': 'h11', 'number': '56', 'podiezd': 2, 'level': 3, 'area': 60},
    {'rooms': 2, 'house': 'h11', 'number': '21', 'podiezd': 4, 'level': 6, 'area': 110},
    {'rooms': 3, 'house': 'h11', 'number': '07a', 'podiezd': 3, 'level': 6, 'area': 125},


    {'rooms': 1, 'house': 'h12', 'number': '32', 'podiezd': 1, 'level': 6, 'area': 87},
    {'rooms': 1, 'house': 'h12', 'number': '56', 'podiezd': 2, 'level': 3, 'area': 60},
    {'rooms': 2, 'house': 'h12', 'number': '21', 'podiezd': 4, 'level': 6, 'area': 110},
    {'rooms': 3, 'house': 'h12', 'number': '07a', 'podiezd': 3, 'level': 6, 'area': 125},

    {'rooms': 1, 'house': 'h21', 'number': '32', 'podiezd': 1, 'level': 6, 'area': 87},
    {'rooms': 1, 'house': 'h21', 'number': '56', 'podiezd': 2, 'level': 3, 'area': 60},
    {'rooms': 2, 'house': 'h21', 'number': '21', 'podiezd': 4, 'level': 6, 'area': 110},
    {'rooms': 3, 'house': 'h21', 'number': '07a', 'podiezd': 3, 'level': 6, 'area': 125},

    {'rooms': 1, 'house': 'h22', 'number': '32', 'podiezd': 1, 'level': 6, 'area': 87},
    {'rooms': 1, 'house': 'h22', 'number': '56', 'podiezd': 2, 'level': 3, 'area': 60},
    {'rooms': 2, 'house': 'h22', 'number': '21', 'podiezd': 4, 'level': 6, 'area': 110},
    {'rooms': 3, 'house': 'h22', 'number': '07a', 'podiezd': 3, 'level': 6, 'area': 125},
  ]
};

var DEPENDENT_FIELDS = ['region', 'city', 'house', 'rooms', 'flat', 'podiezd', 'level', 'area'];


var ApplicationForm = forms.Form.extend({
  program: forms.ChoiceField({label: "ПРОГРАММА", choices: PROGRAM_CHOICES, required: true}),
  region: forms.ChoiceField({label: "РЕГИОН", choices: REGION_CHOICES, required: true}),
  city: forms.ChoiceField({label: "ГОРОД", required: false}),
  house: forms.ChoiceField({label: "ЖИЛОЙ КОМПЛЕКС", required: true}),
  rooms: forms.ChoiceField({label: "КОЛИЧЕСТВО КОМНАТ", choices: ROOMS_CHOICES, widget: forms.RadioSelect, required: true}),
  flat: forms.ChoiceField({label: "НОМЕР КВАРТИРЫ", required: true}),
  podiezd: forms.CharField({label: "ПОДЪЕЗД", required: false}),
  level: forms.CharField({label: "ЭТАЖ", required: false}),
  area: forms.CharField({label: "КВАДРАТУРА", required: false, required: true}),
  rent_area_payment: forms.ChoiceField({label: "СТОИМОСТЬ АРЕНДЫ ЗА 1 М2ПРИ СРОКЕ АРЕНДЫ В", choices: RENT_CHOICES, widget: forms.RadioSelect, required: true}),
  interest_rate: forms.CharField({label: "ПРОЦЕНТНАЯ СТАВКА", required: false}),

  cost_rent_payment: forms.CharField({label: "Ежемесячный платеж по аренде", required: true}),
  cost_insurance_items: forms.CharField({label: "Платеж по страхованию имущества", required: false}),
  cost_insurance_life: forms.CharField({label: "Платеж по страхованию жизни", required: false}),
  cost_insurance_payments: forms.CharField({label: "Платеж по страхованию риска неплатежей по аренде", required: false}),
  cost_utility: forms.CharField({label: "Коммунальные платежи", required: false}),
  cost_maintenance: forms.CharField({label: "Услуги по техническому обслуживанию имущества", required: false}),
  cost_taxes: forms.CharField({label: "Платеж по налогу на имущество", required: false}),
  cost_other: forms.CharField({label: "Другие платежи", required: false}),
  cost_total: forms.CharField({label: "ИТОГО ежемесячный платеж", required: true}),

  person: PersonField({attrs:{label: "Данные клиента"}}),
  person_guarantor: PersonField({attrs:{label: "Поручитель"}}),
  persons: MultiPersonField({
    required: false,
    attrs:{label: "Persons"},
    person_number: 0,
    person_label: "Individ Person"
  }), // see contstructor()


  income_mainwork: forms.CharField({label: "ДОХОД ПО ОСНОВНОМУ МЕСТУ РАБОТЫ", required: false}),
  income_extrawork: forms.CharField({label: "ДОХОДЫ ПО ДОП. МЕСТУ РАБОТЫ", required: false}),
  income_dividend: forms.CharField({label: "ДОХОДЫ В ВИДЕ ДИВЕДЕНДОВ", required: false}),
  income_emolument: forms.CharField({label: "ДОХОД В ВИДЕ ВОЗНАГРАЖД. И РЕГУЛЯРНЫХ СТРАХОВЫХ ВЫПЛАТ", required: false}),
  income_pension: forms.CharField({label: "ПЕНСИОННЫЕ ВЫПЛАТЫ И СТИПЕНДИИ", required: false}),
  income_rental: forms.CharField({label: "ДОХОД В ВИДЕ АРЕНДНОЙ ПЛАТЫ", required: false}),
  income_aliment: forms.CharField({label: "АЛЕМЕНТЫ ПОЛУЧАЕМЫЕ", required: false}),
  income_extra: forms.CharField({label: "ДРУГИЕ ДОХОДЫ", required: false}),
  income_total: forms.CharField({label: "ИТОГО", required: true}),
  od: forms.CharField({label: "О/Д", required: true}),
  pd: forms.CharField({label: "П/Д", required: true}),

  constructor: function(data, kwargs) {
    // Call the constructor of whichever form you're extending so that the
    // forms.Form constructor eventually gets called - this.fields doesn't
    // exist until this happens.
    forms.Form.call(this, kwargs)

    this.fields.persons = MultiPersonField({
      attrs:{label: "Persons"},
      person_number: kwargs.persons_number,
      person_label: "Individ Person"
    });


    // Now that this.fields is a thing, make whatever changes you need to -
    // in this case, we're going to creata a list of pairs of project ids
    // and names to set as the project field's choices.
    _.forEach(kwargs.fields_choices, function(val, key) {
      this.fields[key].setChoices(val || []);
    }.bind(this));
  }
});


var ApplicationFormView = React.createClass({

  handleSubmit: function(evt) {
    evt.preventDefault();
    this.handleAction('save');
  },

  handleAction: function(action) {
    var form = this._getForm(),
        isValid = form.validate();
    if (isValid) {
      var application = _.assign(this.props.application,
        this._getApplication(form.cleanedData)
      );
      switch(action) {
        case 'save':
          this.props.onSave(application);
          break;
        case 'accept':
          this.props.onAccept(application);
          break;
      }
    }
    else
      alert("Заполните обязательные поля");
  },

  _getApplication: function(formData) {
    return _.assign({}, _.omit(formData, []))
  },

  getInitialState: function() {
    return {
      form_data: _.assign({
        region: REGION_CHOICES[0][0],
        interest_rate: '18%',
        cost_utility: 10000.0
      }, this.props.application),
      form_choices: {},
      persons_number: 1
    }
  },

  componentDidMount: function() {
    var newState = _.assign(this.state, this._getNewState(this.state.form_data));
    this.setState(newState);
  },

  _getForm: function() {
    return this.refs.application_form.getForm();
  },

  _normalizeData: function(data, prev_data) {
    var reset_flag = false;
    DEPENDENT_FIELDS.forEach(function(field) {
      if( reset_flag )
        delete data[field];
      else {
        if( data[field] !== prev_data[field] )
          reset_flag = true;
      }
    });
    return data;
  },

  _filterChoices: function(data) {
    var choices = {},
        data = _.clone(data, true),
        _getFirstChoice = function(choices) {
          return _.isEmpty(choices) ? null : (_.isArray(choices[0]) && !_.isEmpty(choices[0])) ? choices[0][0] : choices[0];
        },
        marker_fields = {
          region: function(val) {
            val && (choices.city = DATA.cities[val], !data.city && (data.city = _getFirstChoice(choices.city)));
          },
          city: function(val) {
            val && (choices.house = DATA.houses[val], !data.house && (data.house = _getFirstChoice(choices.house)));
          },
          rooms: function(val) {
            var f = function(rooms, house) {
                var flats = _.filter(DATA.flats, {'rooms': parseInt(rooms,10), 'house': house});
                return _.map(flats, 'number');
              };
            val && data.house && (choices.flat = f(val, data.house), !data.flat && (data.flat = _getFirstChoice(choices.flat)));
          },
          flat: function(val) {
            if( !val ) return;
            var flatData = _.filter(DATA.flats, {'rooms': parseInt(data.rooms,10), 'house': data.house, 'number': val})[0];
            data.podiezd = flatData.podiezd;
            data.level = flatData.level;
            data.area = flatData.area;
          }
        };

    ['region', 'city', 'rooms', 'flat'].forEach(function(field) {
      marker_fields[field](data[field]);
    });

    return [data, choices];
  },

  _computeData: function(data) {
    var _getF = function(field) {
          return parseFloat(data[field],10);
        },
        _getI = function(field) {
          return parseInt(data[field],10);
        },
        _retS = function(val) {
          return (val==='NaN' || _.isNaN(val)) ? '' : val;
        },
        _getSum = function(fields) {
          var sum = _.reduce(fields, function(acc, field) {
                acc += _getF(field) || 0;
                return acc;
              }, 0.0);
          return sum;
        };
    data.cost_rent_payment = _retS( (_getF('rent_area_payment') * _getF('area')).toFixed(2) );
    data.cost_taxes = _retS( ((_getF('area')*198000*0.015)/12).toFixed(2) );
    data.cost_total = _retS( _getSum([
            'cost_rent_payment', 'cost_insurance_items', 'cost_insurance_life',
            'cost_insurance_payments', 'cost_utility', 'cost_maintenance',
            'cost_other', 'cost_taxes'
            ]) );
    data.pd = _retS((_getF('cost_rent_payment')/_getF('income_total')*100).toFixed(2)) + '%';
    data.od = _retS((_getF('cost_total')/_getF('income_total')*100).toFixed(2)) + '%';
    data.income_total = _retS((_getSum([
      'income_extra', 'income_aliment', 'income_rental', 'income_pension',
      'income_emolument', 'income_dividend', 'income_extrawork', 'income_mainwork'
      ])));

    return data;
  },

  _getNewState: function(new_data) {
    var choices = null;
    // new_data -> choices -> data & choices -> compute data
    new_data = this._normalizeData(new_data, this.state.form_data);
    var ret = this._filterChoices(new_data);
    new_data = ret[0];
    choices = ret[1];
    new_data = this._computeData(new_data);

    return {
      form_data: new_data,
      form_choices: choices
    }
  },

  handleAddPersons: function(evt) {
    evt.preventDefault();
    this.setState({persons_number: this.state.persons_number + 1});
  },

  handleRemovePersons: function(evt) {
    evt.preventDefault();
    this.setState({persons_number: this.state.persons_number + 1});
  },

  onFormChange: function() {
    var data = this._getForm().data;

    console.log('onFormChange:', data, this._getForm().cleanedData);

    this.setState(this._getNewState(data));
  },

  render: function() {
    // data -> choices -> data
    var form_data = _.clone(this.state.form_data, true),
        f = new ApplicationForm(null, {
          data: form_data, fields_choices: this.state.form_choices,
          persons_number: this.state.persons_number,
          controlled: true, onChange: this.onFormChange,
          emptyPermitted: true
        });

    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <forms.RenderForm form={f} ref='application_form'>
            <GridForm>
              <Section name="Пожалуйста, выберите программу">
                <Row>
                  <Field name="program"/>
                </Row>
                <Row>
                  <Field name="region"/>
                  <Field name="city"/>
                  <Field name="house"/>
                </Row>
                <Row>
                  <Field name="rooms"/>
                  <Field name="flat"/>
                </Row>
                <Row>
                  <FieldLabel name="podiezd"/>
                  <FieldLabel name="level"/>
                  <FieldLabel name="area"/>
                </Row>
                <Row>
                  <Field name="rent_area_payment"/>
                </Row>
                <Row>
                  <FieldLabel name="interest_rate"/>
                </Row>
              </Section>
              <Section name="Параметры арендной недвижимости">
                <Row>
                  <Field name="cost_rent_payment"/>
                </Row>
                <Row>
                  <Field name="cost_insurance_items"/>
                  <Field name="cost_insurance_life"/>
                  <Field name="cost_insurance_payments"/>
                </Row>
                <Row>
                  <Field name="cost_utility"/>
                  <Field name="cost_maintenance"/>
                  <Field name="cost_taxes"/>
                  <Field name="cost_other"/>
                </Row>
                <Row>
                  <Field name="cost_total"/>
                </Row>
              </Section>
              <Section name="Анкета (демографические данные)">
                <Row>
                  <FieldPureRender name="person"/>
                </Row>
                <Row>
                  <FieldPureRender name="person_guarantor"/>
                </Row>
                <Row>
                  <FieldPureRender name="persons"/>
                  <a className="btn btn-default" onClick={this.handleAddPersons}>Add</a>
                </Row>
              </Section>
              <Section name="Информация о доходах/расходах">
                <Row>
                  <Field name="income_mainwork"/>
                </Row>
                <Row>
                  <Field name="income_extrawork"/>
                </Row>
                <Row>
                  <Field name="income_dividend"/>
                </Row>
                <Row>
                  <Field name="income_emolument"/>
                </Row>
                <Row>
                  <Field name="income_pension"/>
                </Row>
                <Row>
                  <Field name="income_rental"/>
                </Row>
                <Row>
                  <Field name="income_aliment"/>
                </Row>
                <Row>
                  <Field name="income_extra"/>
                </Row>
                <Row>
                  <FieldLabel name="income_total"/>
                </Row>
              </Section>
              <Section name="Коэффициенты (авто)">
                <Row>
                  <FieldLabel name="od"/>
                  <FieldLabel name="pd"/>
                </Row>
              </Section>
            </GridForm>
          </forms.RenderForm>
        </form>
        <br />
        <div className="row">
          <div className="text-center">
            <button className="btn btn-info" onClick={this.handleSubmit}>Сохранить</button>&nbsp;
            <button className="btn btn-success" onClick={this.handleAction.bind(null, 'accept')}>Отправить на согласование</button>
          </div>
        </div>
      </div>
    );
  },

});


module.exports = ApplicationFormView;
module.exports.ApplicationForm = ApplicationForm;

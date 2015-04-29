var _ = require('lodash');
var forms = require('newforms');
var GridForms = require('newforms-gridforms');
var GridForm = GridForms.GridForm;
var Section = GridForms.Section;
var Row = GridForms.Row;
var Field = GridForms.Field;


var PROGRAM_CHOICES = [
  ['kz_2020', 'Доступное жилье - 2020'],
  ['other', 'Другая программа']
];
var REGION_CHOICES = [
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
    ast: [['h12', 'Империал'], ['h13', 'Москва']]
  },
  flats: [
    {'rooms': 1, 'house': 'h1', 'number': '32', 'podiezd': 1, 'level': 6, 'area': 87},
    {'rooms': 1, 'house': 'h1', 'number': '56', 'podiezd': 2, 'level': 3, 'area': 60},
    {'rooms': 3, 'house': 'h2', 'number': '21', 'podiezd': 4, 'level': 6, 'area': 110},
    {'rooms': 3, 'house': 'h2', 'number': '07a', 'podiezd': 3, 'level': 6, 'area': 125},
    {'rooms': 2, 'house': 'h12', 'number': '333', 'podiezd': 1, 'level': 6, 'area': 95}
  ]
};

var DEPENDENT_FIELDS = ['region', 'city', 'house', 'rooms', 'flat', 'podiezd', 'level', 'area'];


var ApplicationForm = forms.Form.extend({
  program: forms.ChoiceField({label: "ПРОГРАММА", choices: PROGRAM_CHOICES}),
  region: forms.ChoiceField({label: "РЕГИОН", choices: REGION_CHOICES}),
  city: forms.ChoiceField({label: "ГОРОД"}),
  house: forms.ChoiceField({label: "ЖИЛОЙ КОМПЛЕКС"}),
  rooms: forms.ChoiceField({label: "КОЛИЧЕСТВО КОМНАТ", choices: ROOMS_CHOICES, widget: forms.RadioSelect}),
  flat: forms.ChoiceField({label: "НОМЕР КВАРТИРЫ"}),
  podiezd: forms.CharField({label: "ПОДЪЕЗД"}),
  level: forms.CharField({label: "ЭТАЖ"}),
  area: forms.CharField({label: "КВАДРАТУРА"}),
  rent_area_payment: forms.ChoiceField({label: "СТОИМОСТЬ АРЕНДЫ ЗА 1 М2ПРИ СРОКЕ АРЕНДЫ В", choices: RENT_CHOICES, widget: forms.RadioSelect}),
  interest_rate: forms.CharField({label: "ПРОЦЕНТНАЯ СТАВКА"}),

  cost_rent_payment: forms.CharField({label: "Ежемесячный платеж по аренде"}),
  cost_insurance_items: forms.CharField({label: "Платеж по страхованию имущества"}),
  cost_insurance_life: forms.CharField({label: "Платеж по страхованию жизни"}),
  cost_insurance_payments: forms.CharField({label: "Платеж по страхованию риска неплатежей по аренде"}),
  cost_utility: forms.CharField({label: "Коммунальные платежи"}),
  cost_maintenance: forms.CharField({label: "Услуги по техническому обслуживанию имущества"}),
  cost_taxes: forms.CharField({label: "Платеж по налогу на имущество"}),
  cost_other: forms.CharField({label: "Другие платежи"}),
  cost_total: forms.CharField({label: "ИТОГО ежемесячный платеж"}),

  lastname: forms.CharField({label: "ФАМИЛИЯ"}),
  firstname: forms.CharField({label: "ИМЯ"}),
  middlename: forms.CharField({label: "ОТЧЕСТВО"}),
  dob: forms.CharField({label: "ДАТА РОЖДЕНИЯ"}),
  nationality: forms.ChoiceField({label: "НАЦИОНАЛЬНОСТЬ", choices: NATIONALITY_CHOICES}),
  familystatus: forms.ChoiceField({label: "СЕМЕЙНЫЙ СТАТУС", choices: FAMILYSTATUS_CHOICES, widget: forms.RadioSelect}),
  address: forms.CharField({label: "АДРЕС ПРОЖИВАНИЯ"}),
  phonenumber: forms.CharField({label: "НОМЕР ТЕЛЕФОНА"}),
  income_mainwork: forms.CharField({label: "ДОХОД ПО ОСНОВНОМУ МЕСТУ РАБОТЫ"}),
  income_extrawork: forms.CharField({label: "ДОХОДЫ ПО ДОП. МЕСТУ РАБОТЫ"}),
  income_dividend: forms.CharField({label: "ДОХОДЫ В ВИДЕ ДИВЕДЕНДОВ"}),
  income_emolument: forms.CharField({label: "ДОХОД В ВИДЕ ВОЗНАГРАЖД. И РЕГУЛЯРНЫХ СТРАХОВЫХ ВЫПЛАТ"}),
  income_pension: forms.CharField({label: "ПЕНСИОННЫЕ ВЫПЛАТЫ И СТИПЕНДИИ"}),
  income_rental: forms.CharField({label: "ДОХОД В ВИДЕ АРЕНДНОЙ ПЛАТЫ"}),
  income_aliment: forms.CharField({label: "АЛЕМЕНТЫ"}),
  income_extra: forms.CharField({label: "ДРУГИЕ ДОХОДЫ"}),
  income_total: forms.CharField({label: "ИТОГО"}),
  od: forms.CharField({label: "О/Д"}),
  pd: forms.CharField({label: "П/Д"}),
  
  constructor: function(data, kwargs) {
    // Call the constructor of whichever form you're extending so that the
    // forms.Form constructor eventually gets called - this.fields doesn't
    // exist until this happens.
    forms.Form.call(this, kwargs)

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
    alert('Hi!')
  },

  getInitialState: function() {
    return {
      form_data: {region: REGION_CHOICES[0][0], interest_rate: '18%'},
      form_choices: {}
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
    console.log('nd1:', data, prev_data);
    var reset_flag = false;
    DEPENDENT_FIELDS.forEach(function(field) {
      if( reset_flag )
        delete data[field];
      else {
        if( data[field] !== prev_data[field] )
          reset_flag = true;
      }
    });
    console.log('nd2:', data);    
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

   console.log('I:', choices, data, this.state.form_data);

    ['region', 'city', 'rooms', 'flat'].forEach(function(field) {
      marker_fields[field](data[field]);
    });

   console.log('O:', choices, data);

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
          return (val==='NaN') ? '' : t;
        },
        t;
    data.cost_rent_payment = _retS((_getF('rent_area_payment') * _getF('area')).toFixed(2));

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

  onFormChange: function() {
    var data = this._getForm().data
    this.setState(this._getNewState(data));
  },

  render: function() {
    // data -> choices -> data
    var form_data = _.clone(this.state.form_data, true),
        f = new ApplicationForm(null, {
          data: form_data, fields_choices: this.state.form_choices,
          controlled: true, onChange: this.onFormChange
        });

    return (
      <form onSubmit={this.handleSubmit}>

        <forms.RenderForm form={f} ref='application_form' >
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
                <Field name="podiezd"/>
                <Field name="level"/>
                <Field name="area"/>
              </Row>
              <Row>
                <Field name="rent_area_payment"/>
              </Row>
              <Row>
                <Field name="interest_rate"/>
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
                <Field name="lastname"/>
                <Field name="firstname"/>
                <Field name="middlename"/>
              </Row>
              <Row>
                <Field name="dob"/>
                <Field name="nationality"/>
              </Row>
              <Row>
                <Field name="familystatus"/>
                  <Field name="address"/>
                  <Field name="phonenumber"/>
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
                <Field name="income_total"/> 
              </Row>
            </Section>
            <Section name="Коэффициенты (авто)">
              <Row>
                <Field name="od"/>
                <Field name="pd"/>
              </Row>
            </Section>
          </GridForm>
        </forms.RenderForm>

        <button type='submit'>Red Button!</button>
      </form>
    );
  },

});


module.exports = ApplicationFormView;
module.exports.ApplicationForm = ApplicationForm;
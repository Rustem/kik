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
    {'rooms': 1, 'house': 'h1', 'number': '32'},
    {'rooms': 1, 'house': 'h1', 'number': '56'},
    {'rooms': 3, 'house': 'h2', 'number': '21'},
    {'rooms': 3, 'house': 'h2', 'number': '07a'},
    {'rooms': 2, 'house': 'h12', 'number': '333'}
  ]
};

var DEPENDENT_FIELDS = ['region', 'city', 'house', 'flat']; // 'podiezd', 'level', 'area'


var ApplicationForm = forms.Form.extend({
  program: forms.ChoiceField({label: "ПРОГРАММА", choices: PROGRAM_CHOICES}),
  region: forms.ChoiceField({label: "РЕГИОН", choices: REGION_CHOICES}),
  city: forms.ChoiceField({label: "ГОРОД"}),
  house: forms.ChoiceField({label: "ЖИЛОЙ КОМПЛЕКС"}),
  rooms: forms.ChoiceField({label: "КОЛИЧЕСТВО КОМНАТ", choices: ROOMS_CHOICES, widget: forms.RadioSelect}),
  flat: forms.ChoiceField({label: "НОМЕР КВАРТИРЫ"}),
  name: forms.CharField({label: "ИМЯ"}),


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
      form_data: {region: REGION_CHOICES[0][0]},
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
    // ['region', 'city', 'house', 'flat'].forEach(function(field) {
    //   !data[field] && !_.isEmpty(choices[field]) && (data[field] = choices[field][0][0]);
    // });
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
          return _.isEmpty(choices) ? null : _.isEmpty(choices[0]) ? choices[0] : choices[0][0];
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
          }
        };

   console.log('I:', choices, data, this.state.form_data);

    ['region', 'city', 'rooms'].forEach(function(field) {
      marker_fields[field](data[field]);
    });

   console.log('O:', choices, data);

    return [data, choices];
  },

  _getNewState: function(new_data) {
    var choices = null;
    // new_data -> choices -> data & choices
    new_data = this._normalizeData(new_data, this.state.form_data);
    var ret = this._filterChoices(new_data);
    new_data = ret[0];
    choices = ret[1];

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
    var f = new ApplicationForm(null, {
      data: _.clone(this.state.form_data, true), fields_choices: this.state.form_choices,
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
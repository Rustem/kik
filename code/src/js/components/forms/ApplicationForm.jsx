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
    ast: [['h12', 'Империал'], ['h12', 'Москва']]
  },
  flats: [
    {rooms: 1, house: 'h1', number: '32'},
    {rooms: 1, house: 'h1', number: '56'},
    {rooms: 3, house: 'h2', number: '21'},
    {rooms: 3, house: 'h2', number: '07a'},
    {rooms: 2, house: 'h12', number: '333'}
  ]
};



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
      form_data: {region: REGION_CHOICES[0][0]}
    }
  },

  _getForm: function() {
    return this.refs.application_form.getForm();
  },

  _normalizeData: function(data, choices) {
    console.log('t1:', data, choices);
    ['region', 'city', 'house', 'flat'].forEach(function(field) {
      !data[field] && !_.isEmpty(choices[field]) && (data[field] = choices[field][0][0]);
    });
    console.log('t2:', data);
    return data;
  },

  _filterChoices: function(data) {
    var choices = {},
        data = _.clone(data),
        marker_fields = {
          region: function(val) {
            val && (choices.city = DATA.cities[val], data.city = choices.city[0][0]);
          },
          city: function(val) {
            val && (choices.house = DATA.houses[val], data.house = choices.house[0][0]);
          },
          rooms: function(val) {
            var f = function(rooms, house) {
                var flats = _.filter(DATA.flats, {rooms: rooms, house: house});
                return _.map(flats, 'number');
              };
            val && data.house && (choices.flat = f(val, data.house), data.flat = choices.flat[0][0]);
          }
        };

    console.log('I:', choices, data);

    ['region', 'city', 'rooms'].forEach(function(field) {
      marker_fields[field](data[field]);
    });

    console.log('O:', choices, data);

    return [data, choices];
  },

  onFormChange: function() {
    var data = this._getForm().data;
    // data = this._normalizeData(data);
    this.setState({
      form_data: data
    });
  },

  render: function() {
    // data -> choices -> data
    var ret = this._filterChoices(this.state.form_data);
    var f = new ApplicationForm(null, {
      data: ret[0], fields_choices: ret[1],
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
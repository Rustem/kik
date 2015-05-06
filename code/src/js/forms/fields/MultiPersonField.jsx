var _ = require('lodash');
var forms = require('../../lib/newforms/newforms');
var MultiPersonWidgetFactory = require('../widgets/MultiPersonWidgetFactory.jsx');
var PersonField = require('./PersonField.jsx');


var MultiPersonField = forms.MultiValueField.extend({
  constructor: function MultiPersonField(kwargs) {
    if (!(this instanceof MultiPersonField)) { return new MultiPersonField(kwargs) }
    kwargs = _.assign({person_number: 1, person_label: "Person"}, kwargs);

    _.assign({
      fields:  MultiPersonField({label: "_t_"})
      // _.reduce(_.range(kwargs.person_number), function(acc, index) {
      //   acc.push(MultiPersonField({label: kwargs.person_label + ' ' + index}));
      //   return acc;
      // }, [])
    }, kwargs);

    this.widget = MultiPersonWidgetFactory(kwargs.person_number);

    var errors = _.assign({}, this.defaultErrorMessages);
    // if (typeof kwargs.errorMessages != 'undefined') {
    //   _.assign(errors, kwargs.errorMessages)
    // }
    forms.MultiValueField.call(this, kwargs);
  },

  compress: function(values) {
    console.log('compress:', values);
    return values;
  }

});

module.exports = MultiPersonField;




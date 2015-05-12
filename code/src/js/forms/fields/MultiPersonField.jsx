var _ = require('lodash');
var forms = require('../../lib/newforms/newforms');
var MultiPersonWidgetFactory = require('../widgets/MultiPersonWidgetFactory.jsx');
var PersonField = require('./PersonField.jsx');
var decompressDataOfPersonField = require('./PersonField.jsx').decompressData;


var decompressData = function(compressedDataArray, name) {
  return _.reduce(compressedDataArray[name], function(acc, val, index) {
    var t = name+'_'+index,
        d = {};
    d[t] = val;

    acc = _.assign(acc, decompressDataOfPersonField(d, t));

    return acc;
  }, {})
};


var MultiPersonField = forms.MultiValueField.extend({
  constructor: function MultiPersonField(kwargs) {
    if (!(this instanceof MultiPersonField)) { return new MultiPersonField(kwargs) }
    kwargs = _.assign({person_number: 1, person_label: "Person #", attrs: {}}, kwargs);
    kwargs = _.assign({
      fields: _.reduce(_.range(kwargs.person_number), function(acc, index) {
        acc.push(PersonField({label: kwargs.person_label + ' ' + index}));
        return acc;
      }, [])
    }, kwargs);

    this.widget = MultiPersonWidgetFactory(kwargs.person_number, kwargs.person_label);

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
module.exports.decompressData = decompressData;



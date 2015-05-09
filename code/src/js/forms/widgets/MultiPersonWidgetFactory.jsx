var _ = require('lodash');
var forms = require('../../lib/newforms/newforms');
var PersonWidget = require('./PersonWidget.jsx');


var MultiPersonWidgetFactory = function(number, label) {

  var MultiPersonWidget = forms.MultiWidget.extend({
    constructor: function(kwargs) {
      kwargs = _.assign({attrs: {}}, kwargs);
      widgets = _.reduce(_.range(number), function(acc, index) {
        acc.push(PersonWidget({attrs: {label: label + ' ' + index}}));
        return acc;
      }, []);
      forms.MultiWidget.call(this, widgets, kwargs);
    },
    formatOutput: function(renderedWidgets) {
      return React.createElement('div', null, renderedWidgets);
    }
  });

  return MultiPersonWidget;
};


module.exports = MultiPersonWidgetFactory;

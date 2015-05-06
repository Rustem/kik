var _ = require('lodash');
var forms = require('../../lib/newforms/newforms');
var PersonWidget = require('./PersonWidget.jsx');


var MultiPersonWidgetFactory = function(number) {


  var MultiPersonWidget = forms.MultiWidget.extend({
    constructor: function(kwargs) {
      kwargs = _.assign({attrs: {}}, kwargs);
      widgets = PersonWidget({});
      // _.reduce(_.range(number), function(acc, index) {
      //   acc.push(PersonWidget({}));
      //   return acc;
      // }, []);
      forms.MultiWidget.call(this, widgets, kwargs);
    },

    formatOutput: function(renderedWidgets) {
      return React.createElement('<div data-row-span="1">', null, renderedWidgets);
    }

  });


  return MultiPersonWidget;  
};


module.exports = MultiPersonWidgetFactory;
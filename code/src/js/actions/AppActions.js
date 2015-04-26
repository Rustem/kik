var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;

module.exports = {
  load: function(object) {
    AppDispatcher.handleAction({
      type: ActionTypes.APP_LOAD_SUCCESS,
      object: object
    });
  },
};
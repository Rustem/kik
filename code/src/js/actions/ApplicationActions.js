var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var ApplicationWebAPI = require('../api/ApplicationWebAPI');

module.exports = {
  create: function(object){
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_APPLICATION,
      object: object
    });
    ApplicationWebAPI.create(object, function(object){
        dispatcher.handleServerAction({
            type: ActionTypes.CREATE_APPLICATION_SUCCESS,
            object: object
        });
    }.bind(this), function(error){
        dispatcher.handleServerAction({
            type: ActionTypes.CREATE_APPLICATION_FAIL,
            error: error
        });
    });
  },
};

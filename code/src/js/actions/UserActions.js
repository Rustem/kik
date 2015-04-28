var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var UserWebAPI = require('../api/UserWebAPI');
var promise = require('when').promise;

module.exports = {
  login: function(object){
    return promise(function (resolve, reject) {
      AppDispatcher.handleAction({
        type: ActionTypes.LOG_IN,
        object: object
      });
      UserWebAPI.login(object, function(object){
          AppDispatcher.handleAction({
              type: ActionTypes.LOG_IN_SUCCESS,
              object: object
          });
          resolve(object);
      }.bind(this), function(error){
          AppDispatcher.handleAction({
              type: ActionTypes.LOG_IN_FAIL,
              error: error
          });
          reject(error);
      });
    });
  },
};

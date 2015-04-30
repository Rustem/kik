var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var ApplicationWebAPI = require('../api/ApplicationWebAPI');
var promise = require('when').promise;

module.exports = {
  create: function(object){
    return promise(function (resolve, reject) {
      AppDispatcher.handleAction({
        type: ActionTypes.CREATE_APPLICATION,
        object: object
      });
      ApplicationWebAPI.create(object, function(object){
          AppDispatcher.handleAction({
              type: ActionTypes.CREATE_APPLICATION_SUCCESS,
              object: object
          });
          resolve(object);
      }.bind(this), function(error){
          AppDispatcher.handleAction({
              type: ActionTypes.CREATE_APPLICATION_FAIL,
              error: error
          });
          reject(error);
      });
    });
  },

  approve: function(object){
    return promise(function (resolve, reject) {
      AppDispatcher.handleAction({
        type: ActionTypes.APPROVE_APPLICATION,
        object: object
      });
      ApplicationWebAPI.approve(object, function(object){
          AppDispatcher.handleAction({
              type: ActionTypes.APPROVE_APPLICATION_SUCCESS,
              object: object
          });
          resolve(object);
      }.bind(this), function(error){
          AppDispatcher.handleAction({
              type: ActionTypes.APPROVE_APPLICATION_FAIL,
              error: error
          });
          reject(error);
      });
    });
  },
};

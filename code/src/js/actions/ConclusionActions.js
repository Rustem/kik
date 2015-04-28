var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var ConclusionWebAPI = require('../api/ConclusionWebAPI');
var promise = require('when').promise;

module.exports = {
  create: function(object){
    return promise(function (resolve, reject) {
      AppDispatcher.handleAction({
        type: ActionTypes.CREATE_CONCLUSION,
        object: object
      });
      ConclusionWebAPI.create(object, function(object){
          AppDispatcher.handleAction({
              type: ActionTypes.CREATE_CONCLUSION_SUCCESS,
              object: object
          });
          resolve(object);
      }.bind(this), function(error){
          AppDispatcher.handleAction({
              type: ActionTypes.CREATE_CONCLUSION_FAIL,
              error: error
          });
          reject(error);
      });
    });
  },
};

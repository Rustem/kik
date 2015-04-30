var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var NoteWebAPI = require('../api/NoteWebAPI');
var promise = require('when').promise;

module.exports = {
  create: function(object){
    return promise(function (resolve, reject) {
      AppDispatcher.handleAction({
        type: ActionTypes.CREATE_NOTE,
        object: object
      });
      NoteWebAPI.create(object, function(object){
          AppDispatcher.handleAction({
              type: ActionTypes.CREATE_NOTE_SUCCESS,
              object: object
          });
          resolve(object);
      }.bind(this), function(error){
          AppDispatcher.handleAction({
              type: ActionTypes.CREATE_NOTE_FAIL,
              error: error
          });
          reject(error);
      });
    });
  },
};

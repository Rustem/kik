var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var ApplicationWebAPI = require('../api/ApplicationWebAPI');
var promise = require('when').promise;

module.exports = {
  save: function(object){
    return promise(function (resolve, reject) {
      AppDispatcher.handleAction({
        type: ActionTypes.SAVE_APPLICATION,
        object: object
      });
      ApplicationWebAPI.save(object, function(object){
          AppDispatcher.handleAction({
              type: ActionTypes.SAVE_APPLICATION_SUCCESS,
              object: object
          });
          resolve(object);
      }.bind(this), function(error){
          AppDispatcher.handleAction({
              type: ActionTypes.SAVE_APPLICATION_FAIL,
              error: error
          });
          reject(error);
      });
    });
  },

  accept: function(object){
    return promise(function (resolve, reject) {
      AppDispatcher.handleAction({
        type: ActionTypes.ACCEPT_APPLICATION,
        object: object
      });
      ApplicationWebAPI.accept(object, function(object){
          AppDispatcher.handleAction({
              type: ActionTypes.ACCEPT_APPLICATION_SUCCESS,
              object: object
          });
          resolve(object);
      }.bind(this), function(error){
          AppDispatcher.handleAction({
              type: ActionTypes.ACCEPT_APPLICATION_FAIL,
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

  reconsider: function(object) {
    return promise(function (resolve, reject) {
      AppDispatcher.handleAction({
        type: ActionTypes.RECONSIDER_APPLICATION,
        object: object
      });
      ApplicationWebAPI.reconsider(object, function(object){
          AppDispatcher.handleAction({
              type: ActionTypes.RECONSIDER_APPLICATION_SUCCESS,
              object: object
          });
          resolve(object);
      }.bind(this), function(error){
          AppDispatcher.handleAction({
              type: ActionTypes.RECONSIDER_APPLICATION_FAIL,
              error: error
          });
          reject(error);
      });
    });
  }
};

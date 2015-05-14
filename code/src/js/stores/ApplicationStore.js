var _ = require('lodash');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var ConclusionStore = require('./ConclusionStore');
var NoteStore = require('./NoteStore');

var CHANGE_EVENT = 'change';

var _applications = {};

var addItem = function(item){
  _applications[item.id] = item;
};

var removeItem = function(item){
  delete _applications[item.id];
}

var ApplicationStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  get: function(id) {
    return _applications[id];
  },

  getAll: function(){
    return _applications;
  },

  // 0 - applications are just created
  // 1 - applications wait for confirmation
  // 2 - applications have been confirmed
  // 3 - applications are ready
  getByStatus: function(status) {
    return _.where(_applications, { status: status });
  },

  getByLastname: function(lastname) {
    return  _.filter(_applications, function(a) { 
              return a.person.lastname.indexOf(lastname) > -1
            });
  },

});

ApplicationStore.dispatchToken = AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.type){
    case ActionTypes.APP_LOAD_SUCCESS:
      _.forEach(action.object.applications, function(application){
        addItem(application);
      });
      ApplicationStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.SAVE_APPLICATION_SUCCESS:
      addItem(action.object);
      ApplicationStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.ACCEPT_APPLICATION_SUCCESS:
      addItem(action.object);
      ApplicationStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.APPROVE_APPLICATION_SUCCESS:
      addItem(action.object);
      ApplicationStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.CREATE_CONCLUSION_SUCCESS:
      AppDispatcher.waitFor([ConclusionStore.dispatchToken]);
      addItem(action.object.application);
      ApplicationStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.CREATE_NOTE_SUCCESS:
      AppDispatcher.waitFor([ConclusionStore.dispatchToken]);
      addItem(action.object.application);
      ApplicationStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.RECONSIDER_APPLICATION_SUCCESS:
      addItem(action.object);
      ApplicationStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = ApplicationStore;
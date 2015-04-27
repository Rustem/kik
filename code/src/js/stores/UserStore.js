var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _users = {};


var UserStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  store: function(data) {
    _users = data;
  },
  getAll: function(){
    return _users;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CREATE_APPLICATION_SUCCESS:
      UserStore.store(action.object.users);
      UserStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = UserStore;
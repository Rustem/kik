var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _applications = {};

var addItem = function(item){
  _store[item.id] = item;
};

var removeItem = function(item){
  delete _store[item.id];
}

var ApplicationStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getAll: function(){
    return _store;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CREATE_APPLICATION_SUCCESS:
      addItem(action.object);
      ApplicationStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = ApplicationStore;
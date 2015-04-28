var _ = require('lodash');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _users = {};

var addItem = function(item){
  _users[item.id] = item;
};

var removeItem = function(item){
  delete _users[item.id];
}

var UserStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  get: function(id) {
    return _users[id];
  },

  getAll: function(){
    return _users;
  },

});

UserStore.dispatchToken = AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.type){
    case ActionTypes.APP_LOAD_SUCCESS:
      _.forEach(action.object.users, function(user){
        addItem(user);
      });
      UserStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = UserStore;
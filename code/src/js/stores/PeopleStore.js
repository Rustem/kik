var _ = require('lodash');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _people = {};

var addItem = function(item){
  _people[item.id] = item;
};

var removeItem = function(item){
  delete _people[item.id];
}

var PeopleStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  get: function(id){
    return _people[id];
  },

  getAll: function(){
    return _people;
  },

  getByIIN: function(iin) {
    return _.where(_people, { iin: iin });
  },

});

PeopleStore.dispatchToken = AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.type){
    case ActionTypes.APP_LOAD_SUCCESS:
      _.forEach(action.object.people, function(person){
        addItem(person);
      });
      PeopleStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = PeopleStore;
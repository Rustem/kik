var _ = require('lodash');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _conclusions = {};

var addItem = function(item){
  _conclusions[item.id] = item;
};

var removeItem = function(item){
  delete _conclusions[item.id];
}

var ConclusionStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  getAll: function(){
    return _conclusions;
  },

  getByApplication: function(application) {
    return _.where(_conclusions, { application_id: application.id });
  },

  getByApplicationAndType: function(application, type) {
    return _.first(_.where(this.getByApplication(application), { type: type }));
  }

});

ConclusionStore.dispatchToken = AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.type){
    case ActionTypes.APP_LOAD_SUCCESS:
      _.forEach(action.object.conclusions, function(conclusion){
        addItem(conclusion);
      });
      ConclusionStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.CREATE_CONCLUSION_SUCCESS:
      addItem(action.object);
      ConclusionStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = ConclusionStore;
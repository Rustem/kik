var _ = require('lodash');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var ConclusionStore = require('./ConclusionStore');

var CHANGE_EVENT = 'change';

var _notes = {};

var addItem = function(item){
  _notes[item.id] = item;
};

var removeItem = function(item){
  delete _notes[item.id];
}

var NoteStore = objectAssign({}, EventEmitter.prototype, {

  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  get: function(id) {
    return _notes[id];
  },

  getAll: function(){
    return _notes;
  },

  getByApplication: function(application) {
    return _.where(_notes, { application_id: application.id });
  },

});

NoteStore.dispatchToken = AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.type){
    case ActionTypes.APP_LOAD_SUCCESS:
      _.forEach(action.object.notes, function(note){
        addItem(note);
      });
      NoteStore.emit(CHANGE_EVENT);
      break;
    case ActionTypes.CREATE_NOTE_SUCCESS:
      addItem(action.object);
      NoteStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = NoteStore;
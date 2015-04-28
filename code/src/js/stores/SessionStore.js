var _ = require('lodash');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ActionTypes = require('../constants/appConstants').ActionTypes;

var CHANGE_EVENT = 'change';

var _current_user = undefined,
    _current_session = undefined;

var SessionStore = objectAssign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    current_user: function() {
        return _current_user;
    },

    current_session: function() {
        return _current_session;
    },

    setCurrent: function(user) {
        return _current_user = user;
    },

    setSession: function(session) {
        return _current_session = session;
    },
});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.type) {
        case ActionTypes.LOG_IN_SUCCESS:
            SessionStore.setCurrent(action.object);
            SessionStore.emitChange();
            break;
    }
});

module.exports = SessionStore;

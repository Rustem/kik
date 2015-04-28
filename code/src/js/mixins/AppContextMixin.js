var SessionStore = require('../stores/SessionStore');

var AppContextMixin = {
    
    getUser: function() {
        return SessionStore.current_user();
    },

};

module.exports = AppContextMixin;

var _ = require('lodash');

module.exports = {
    getAll: function(success, failure) {
        var users = JSON.parse(localStorage.getItem('users'));
        setTimeout(function(){
            success(users);
        }, 0);
    },

    login: function(object, success, failure) {
        var users = JSON.parse(localStorage.getItem('users'));

        var current_user = _.findWhere(users, { 'email': object.email });
        setTimeout(function(){
            success(current_user);
        }, 0);
    },

}
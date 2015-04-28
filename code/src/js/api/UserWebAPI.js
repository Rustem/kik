var _ = require('lodash');

module.exports = {
    getAll: function(success, failure) {
        var users = JSON.parse(localStorage.getItem('users'));
        setTimeout(function(){
            success(users);
        }, 0);
    },

    getCurrentUser: function(success, failure) {
        var current_user = JSON.parse(localStorage.getItem('current_user'));
        setTimeout(function(){
            success(current_user);
        }, 0);
    },

    login: function(object, success, failure) {
        var users = JSON.parse(localStorage.getItem('users'));

        var current_user = _.findWhere(users, { 'email': object.email });

        localStorage.setItem('current_user', JSON.stringify(current_user));
        setTimeout(function(){
            success(current_user);
        }, 0);
    },

}
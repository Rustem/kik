var _ = require('lodash');

module.exports = {
    getAll: function(success, failure) {
        var users = JSON.parse(localStorage.getItem('users'));
        setTimeout(function(){
            success(users);
        }, 0);
    },

    create: function(object, success, failure) {
        var timeNow = Date.now();
        var object = _.extend({}, {
            id: 'user_' + timeNow,
            date_created: timeNow,
        }, object);

        var rawUsers = JSON.parse(localStorage.getItem('users')) || [];
        rawUsers.push(object);
        localStorage.setItem('users', JSON.stringify(rawUsers));
        setTimeout(function() {
            success(object);
        }, 0);
    },
}
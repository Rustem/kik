var _ = require('lodash');

module.exports = {
    getAll: function(success, failure) {
        var people = JSON.parse(localStorage.getItem('people'));
        setTimeout(function(){
            success(people);
        }, 0);
    },

}
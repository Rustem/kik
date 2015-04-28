var _ = require('lodash');

module.exports = {
    getAll: function(success, failure) {
        var conclusions = JSON.parse(localStorage.getItem('conclusions'));
        setTimeout(function(){
            success(conclusions);
        }, 0);
    },

    create: function(object, success, failure) {
        var timeNow = Date.now();
        var object = _.extend({}, {
            id: 'conc_' + timeNow,
            date_created: timeNow,
        }, object);

        var rawConclusions = JSON.parse(localStorage.getItem('conclusions')) || [];
        rawConclusions.push(object);
        localStorage.setItem('conclusions', JSON.stringify(rawConclusions));
        setTimeout(function() {
            success(object);
        }, 0);
    },
}
var _ = require('lodash');

module.exports = {
    getAll: function(success, failure) {
        var applications = JSON.parse(localStorage.getItem('applications'));
        setTimeout(function(){
            success(applications);
        }, 0);
    },

    create: function(object, success, failure) {
        var timeNow = Date.now();
        var object = _.extend({}, {
            id: 'appl_' + timeNow,
            date_created: timeNow,
        }, object);

        var rawApplications = JSON.parse(localStorage.getItem('applications')) || [];
        rawApplications.push(object);
        localStorage.setItem('applications', JSON.stringify(rawActivities));
        setTimeout(function() {
            success(object);
        }, 0);
    },
}
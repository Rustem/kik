var _ = require('lodash');

module.exports = {
    getAll: function(success, failure) {
        var applications = JSON.parse(localStorage.getItem('applications'));
        setTimeout(function(){
            success(applications);
        }, 0);
    },

    save: function(object, success, failure) {
        if(!object.id) {
            var timeNow = Date.now();
            var object = _.extend({}, {
                id: 'appl_' + timeNow,
                date_created: timeNow,
                status: 0,
            }, object);
        }

        var rawApplications = JSON.parse(localStorage.getItem('applications')) || [];
        rawApplications.push(object);
        localStorage.setItem('applications', JSON.stringify(rawApplications));

        setTimeout(function() {
            success(object);
        }, 0);
    },

    approve: function(object, success, failure) {

        var rawApplications = JSON.parse(localStorage.getItem('applications')) || [];
        object.status = 2;
        
        for(var i = 0; i<rawApplications.length; i++) {
            var cur = rawApplications[i];
            if(cur.id === object.id) {
                rawApplications[i] = object;
                break;
            }
        }

        localStorage.setItem('applications', JSON.stringify(rawApplications));
        setTimeout(function() {
            success(object);
        }, 0);
    },
}
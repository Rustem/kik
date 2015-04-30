var _ = require('lodash');
var utils = require('../utils');

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
        
        // temporary
        var ApplicationStore = require('../stores/ApplicationStore');
        var application = ApplicationStore.get(object.application_id);
        if(utils.isConclusionsCollected(application)){
            application.status = 3;

            var rawApplications = JSON.parse(localStorage.getItem('applications')) || [];
            for(var i = 0; i<rawApplications.length; i++) {
                var cur = rawApplications[i];
                if(cur.id == application.id) {
                    rawApplications[i] = application;
                    break;
                }
            }
            localStorage.setItem('applications', JSON.stringify(rawApplications));
        }


        setTimeout(function() {
            success({
                conclusion: object,
                application: application,
            });
        }, 0);
    },
}
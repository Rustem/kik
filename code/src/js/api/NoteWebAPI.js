var _ = require('lodash');

module.exports = {
    getAll: function(success, failure) {
        var notes = JSON.parse(localStorage.getItem('notes'));
        setTimeout(function(){
            success(notes);
        }, 0);
    },

    create: function(object, success, failure) {
        var timeNow = Date.now();
        var object = _.extend({}, {
            id: 'note_' + timeNow,
            date_created: timeNow,
        }, object);

        var rawNotes = JSON.parse(localStorage.getItem('notes')) || [];
        rawNotes.push(object);
        localStorage.setItem('notes', JSON.stringify(rawNotes));

        // temporary
        var ApplicationStore = require('../stores/ApplicationStore');
        var application = ApplicationStore.get(object.application_id);
        
        application.status = 0;

        var rawApplications = JSON.parse(localStorage.getItem('applications')) || [];
        for(var i = 0; i<rawApplications.length; i++) {
            var cur = rawApplications[i];
            if(cur.id == application.id) {
                rawApplications[i] = application;
                break;
            }
        }
        localStorage.setItem('applications', JSON.stringify(rawApplications));

        setTimeout(function() {
            success({
                note: object,
                application: application,
            });
        }, 0);
    },
}
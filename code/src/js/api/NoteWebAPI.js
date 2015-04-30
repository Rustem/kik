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
        setTimeout(function() {
            success(object);
        }, 0);
    },
}
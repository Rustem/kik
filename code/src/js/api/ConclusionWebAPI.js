var _ = require('lodash');

module.exports = {
    getAll: function(success, failure) {
        var conclusions = JSON.parse(localStorage.getItem('conclusions'));
        setTimeout(function(){
            success(conclusions);
        }, 0);
    },

    // create: function(object, success, failure) {
    //     var timeNow = Date.now();
    //     var object = _.extend({}, {
    //         id: 'appl_' + timeNow,
    //         date_created: timeNow,
    //     }, object);

    //     var rawApplications = JSON.parse(localStorage.getItem('conclusions')) || [];
    //     rawApplications.push(object);
    //     localStorage.setItem('conclusions', JSON.stringify(rawActivities));
    //     setTimeout(function() {
    //         success(object);
    //     }, 0);
    // },
}
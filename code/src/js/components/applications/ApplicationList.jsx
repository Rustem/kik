var SessionStore = require('../../stores/SessionStore');

ApplicationList = React.createClass({
	statics: {
	    willTransitionTo: function (transition, params) {
	      if (!SessionStore.current_user()) {
	        transition.abort();
	        transition.redirect('login', {}, {});
	      }
	    },
	},

	render: function() {
		return <span>Yes</span>
	}
});

module.exports = ApplicationList;
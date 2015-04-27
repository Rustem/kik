var SessionStore = require('../stores/SessionStore');

var Hub = React.createClass({
	statics: {
	    willTransitionTo: function (transition, params) {
	    	var current_user = SessionStore.current_user();
	    	console.log(current_user);
	        transition.abort();
	        if (!current_user) {
	           transition.redirect('login', {}, {});
	        } else 
	        switch(current_user.position) {
	        	case 0:
	        		console.log(0);
	        		transition.redirect('stage0', {}, {});
	        		break;
	        	case 1:
	        		console.log(1);
	        		transition.redirect('stage1', {}, {});
	        		break;
	        	case 20:
	        		transition.redirect('stage20', {}, {});
	        		break;
	        	case 21:
	        		transition.redirect('stage21', {}, {});
	        		break;
	        	case 22:
	        		transition.redirect('stage22', {}, {});
	        		break;
	        }
	    },
	},


	render: function() {
		return null;
	}
});

module.exports = Hub;
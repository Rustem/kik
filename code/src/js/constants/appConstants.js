var keyMirror = require('react/lib/keyMirror');

var appConstants = {
	ActionTypes: keyMirror({
		APP_LOAD_SUCCESS: null,
		CREATE_APPLICATION: null,
		CREATE_APPLICATION_SUCCESS: null,
	})
};

module.exports = appConstants;
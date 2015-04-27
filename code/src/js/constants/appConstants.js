var keyMirror = require('react/lib/keyMirror');

var appConstants = {
	ActionTypes: keyMirror({
		APP_LOAD_SUCCESS: null,
		CREATE_APPLICATION: null,
		CREATE_APPLICATION_SUCCESS: null,
		CREATE_APPLICATION_FAIL: null,
		LOG_IN: null,
		LOG_IN_SUCCESS: null,
		LOG_IN_FAIL: null,
	})
};

module.exports = appConstants;
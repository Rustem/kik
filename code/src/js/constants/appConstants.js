var keyMirror = require('react/lib/keyMirror');

var appConstants = {
	ActionTypes: keyMirror({
		APP_LOAD_SUCCESS: null,
		LOG_IN: null,
		LOG_IN_SUCCESS: null,
		LOG_IN_FAIL: null,
		CREATE_APPLICATION: null,
		CREATE_APPLICATION_SUCCESS: null,
		CREATE_APPLICATION_FAIL: null,
		CREATE_CONCLUSION: null,
		CREATE_CONCLUSION_SUCCESS: null,
		CREATE_CONCLUSION_FAIL: null,
	})
};

module.exports = appConstants;
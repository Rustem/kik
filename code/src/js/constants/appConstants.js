var keyMirror = require('react/lib/keyMirror');

var appConstants = {
	ActionTypes: keyMirror({
		APP_LOAD_SUCCESS: null,
		LOG_IN: null,
		LOG_IN_SUCCESS: null,
		LOG_IN_FAIL: null,
		LOG_OUT: null,
		LOG_OUT_SUCCESS: null,
		LOG_OUT_FAIL: null,
		CREATE_APPLICATION: null,
		CREATE_APPLICATION_SUCCESS: null,
		CREATE_APPLICATION_FAIL: null,
		CREATE_CONCLUSION: null,
		CREATE_CONCLUSION_SUCCESS: null,
		CREATE_CONCLUSION_FAIL: null,
	}),

	ConclusionTypes: {
		RISK: 0,
		LEGAL: 1,
		SECUR: 2,
	},

	TEMPLATES: {
		RISK: 'risk.docx',
		// LEGAL: 'legal.docx',
		// SECUR: 'secur.docx',
		FULL: 'full.docx',
		ZAYAVLENIE: 'zayavlenie.docx',
		SOGLASIE: 'soglasie.docx',
	}
};

module.exports = appConstants;
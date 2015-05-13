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
		SAVE_APPLICATION: null,
		SAVE_APPLICATION_SUCCESS: null,
		SAVE_APPLICATION_FAIL: null,
		ACCEPT_APPLICATION: null,
		ACCEPT_APPLICATION_SUCCESS: null,
		ACCEPT_APPLICATION_FAIL: null,
		APPROVE_APPLICATION: null,
		APPROVE_APPLICATION_SUCCESS: null,
		APPROVE_APPLICATION_FAIL: null,
		RECONSIDER_APPLICATION: null,
		RECONSIDER_APPLICATION_SUCCESS: null,
		RECONSIDER_APPLICATION_FAIL: null,
		CREATE_CONCLUSION: null,
		CREATE_CONCLUSION_SUCCESS: null,
		CREATE_CONCLUSION_FAIL: null,
		CREATE_NOTE: null,
		CREATE_NOTE_SUCCESS: null,
		CREATE_NOTE_FAIL: null,
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
		FULL_APPROVE: 'full_approve.docx',
		FULL_REJECT: 'full_reject.docx',
		FULL_MANUAL: 'full_manual.docx',
		ZAYAVLENIE: 'zayavlenie.docx',
		SOGLASIE: 'soglasie.docx',
	},

	APPLICATION_STATUS: {
		0: 'Создание заявки',
		1: 'На рассмотрении у кредитного менеджера',
		2: 'Согласовано кредитным менеджером',
		3: 'Вынесение решения',
	},

	PROGRAMS: {
		'kz_2020': 'Доступное жилье - 2020',
  		'other': 'Другая программа',
	},

	REGIONS: {
		'reg_1': 'Алматинская обл.',
  		'reg_2': 'Акмолинская обл.',
	},

	ROOMS: {
		1: 1,
		2: '2-x',
		3: '3-x',
	},

	RENT: {
		'3160.72': '5 лет за 3160,72 тенге',
		'2469.60': '7 лет за 2469,60 тенге',
		'1800.10': '12 лет за 1800,10 тенге',
	},

	NATIONALITY: {
		'rus': 'Русский',
		'kaz': 'Казах',
	},

	FAMILYSTATUS: {
		'married': 'Женат',
		'single': 'Холост',
		'divorced': 'Разведен',
	},

};

module.exports = appConstants;
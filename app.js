var users = [
	{
		"id": 1,
		"full_name": "Сидни Кросби",
		"personal_number": 1,
		"docs": [
			{
				"id": 1,
				"doc_type": "Паспорт",
				"doc_country": "Канада",
				"doc_series": "CN",
				"doc_number": "12345",
				"doc_name_rus": "Паспорт",
				"doc_name_blr": "Пашпарт",
				"doc_date_get": "08/24/2012",
				"doc_date_start": "08/24/2012",
				"doc_date_end": "08/24/2016"
			}
		]
	},

	{
		"id": 2,
		"full_name": "Евгений Малкин",
		"personal_number": 2,
		"docs": [
			{
				"id": 1,
				"doc_type": "Паспорт",
				"doc_country": "Россия",
				"doc_series": "RU",
				"doc_number": "12345",
				"doc_name_rus": "Паспорт",
				"doc_name_blr": "Пашпарт",
				"doc_date_get": "08/12/2014",
				"doc_date_start": "08/12/2014",
				"doc_date_end": "08/12/2018"
			},
			{
				"id": 2,
				"doc_type": "Паспорт",
				"doc_country": "Канада",
				"doc_series": "CN",
				"doc_number": "678910",
				"doc_name_rus": "Паспорт",
				"doc_name_blr": "Пашпарт",
				"doc_date_get": "01/01/2015",
				"doc_date_start": "01/01/2015",
				"doc_date_end": "01/01/2020"
			}
		]
	}
];

webix.ui({
	height: '100%',
	cols: [

		// Search form
		{
			minWidth: 200,
			maxWidth: 320,
			rows: [
				{ type: 'header', template: 'Поиск' },

				{
					view: 'form',
					id: 'search-form',
					elements: [
						{ view: 'text', name: 'personal_number', placeholder: 'Личный номер', label: 'Личный номер', labelPosition: 'top' },
						{ view: 'text', name: 'full_name', placeholder: 'Введите Ф.И.О.', label: 'ФИО', labelPosition: 'top' },
						{ view: 'text', name: 'doc_number', placeholder: 'Введите номер документа', label: 'Документ', labelPosition: 'top' },
						{
							cols: [
								{ view: 'button', type: 'form', value: 'Поиск', click: 'searchUser' },
								{ view: 'button', value: 'Очистить', click: "$$('search-form').clear()" }
							]
						}
					]
				}
			]
		},

		// Search results
		{
			minWidth: 400,
			rows: [
				{
					view: 'toolbar',
					cols: [
						{ view: 'label', label: 'Результаты поиска:' },
						{ view: 'button', type: 'iconButton', icon: 'file-excel-o', width: 225, label: 'Внести новый документ', align: 'right', click: 'showPopupNewDocForm' }
					]
				},

				{
					view: 'datatable',
					minHeight: 200,
					id: 'user-list',
					select: true,
					columns: [
						{ id: 'full_name', header: 'ФИО', adjust: true }
					],
					data: users
				},

				{ view: 'resizer' },

				{
					view: 'tabview',
					minHeight: 300,
					cells: [
						{
							header: 'Документы',
							width: 200,
							body: {
								type: 'space',
								padding: 8,
								rows: [
									{
										view: 'datatable',
										id: 'doc-list',
										columns: [
											{ id: 'doc_type', header: 'Тип', adjust: true },
											{ id: 'doc_number', header: 'Номер', adjust: true },
											{ id: 'doc_series', header: 'Серия', adjust: true },
											{ id: 'doc_country', header: 'Страна', adjust: true },
											{ id: 'doc_issued_by', header: 'Кем выдан', adjust: true },
											{ id: 'doc_date_end', header: 'Дата', adjust: true }
										]
									}
								]
							}
						}
					]
				}
			]
		}
	]
});

webix.ui({
	view: 'window',
	id: 'newdoc-popup',
	modal: true,
	minWidth: 450,
	maxWidth: 800,
	position: 'center',
	head: {
		view: 'toolbar',
		cols: [
			{ view: 'label', label: 'Создание нового документа' },
			{ view: 'button', type: 'iconButton', icon: 'close', width: 24, css: 'btn_close', click: "$$('newdoc-popup').hide()" }
		]
	},
	body: {
		view: 'form',
		id: 'newdoc-form',
		rules: {
			'doc_type': webix.rules.isNotEmpty,
			'doc_country': webix.rules.isNotEmpty,
			'doc_series': webix.rules.isNotEmpty,
			'doc_number': webix.rules.isNotEmpty,
			'doc_number': webix.rules.isNumber,
			'doc_date_end': webix.rules.isNotEmpty
		},
		elementsConfig: {
			bottomPadding: 36,
		},
		rows: [
			{
				view: 'richselect',
				id: 'doc-type',
				name: 'doc_type',
				label: 'Тип документа',
				labelPosition: 'top',
				placeholder: 'Выберите тип документа',
				options: ['Паспорт'],
				invalidMessage: 'Это поле обязательно для заполнения'
			},
			{
				cols: [
					{
						view: 'richselect',
						id: 'doc-country',
						name: 'doc_country',
						label: 'Страна выдачи',
						labelPosition: 'top',
						options: ['Беларусь', 'Канада',	'Россия'],
						invalidMessage: 'Это поле обязательно для заполнения'
					},
					{
						view: 'text',
						name: 'doc_series',
						label: 'Серия',
						labelPosition: 'top',
						invalidMessage: 'Это поле обязательно для заполнения'
					},
					{
						view: 'text',
						name: 'doc_number',
						label: 'Номер',
						labelPosition: 'top',
						invalidMessage: 'Это поле обязательно для заполнения и должно содержать только цифры'
					}
				]
			},
			{
				view: 'fieldset',
				label: 'Кем выдан документ',
				body: {
					rows: [
						{
							cols: [
								{ view: 'text', name: 'doc_name_rus', placeholder: 'Название на русском' },
								{ view: 'text', name: 'doc_name_blr', placeholder: 'Название на белорусском' }
							]
						},
						{ height: 20 },
						{
							cols: [
								{
									view: 'datepicker',
									name: 'doc_date_get',
									label: 'Дата выдачи',
									labelPosition: 'top',
									date: new Date(),
									stringResult: true,
									format: '%m/%d/%Y'
								},
								{
									view: 'datepicker',
									name: 'doc_date_start',
									label: 'Действителен с',
									labelPosition: 'top',
									date: new Date(),
									stringResult: true,
									format: '%m/%d/%Y'
								},
								{
									view: 'datepicker',
									name: 'doc_date_end',
									label: 'Действителен по',
									labelPosition: 'top',
									date: new Date(),
									stringResult: true,
									format: '%m/%d/%Y',
									invalidMessage: 'Это поле обязательно для заполнения'
								}
							]
						}
					]
				}
			},
			{ view: 'button', value: 'Создать', inputWidth: 180, align: 'center', click: 'addNewDoc' }
		]
	}
});

$$('user-list').attachEvent('onAfterSelect', function(id){
	var docList = this.getItem(id).docs;

	$$('doc-list').clearAll(); // remove all items

	// Add all docs of selected user into $$('doc-list')
	for (var doc in docList) {
		$$('doc-list').add(docList[doc]);
	}
});

// When user add a new doc it's must to update the doc list for selected user.
// The doc list is update when user select some row in user list, so simulate selection of row
$$('user-list').attachEvent('onDataUpdate', function(){
	var userSelectedID = this.getSelectedId().id;

	// Simulate selection of row
	this.unselect(userSelectedID);
	this.select(userSelectedID);
});

function showPopupNewDocForm() {
	// Show error message if user don't select some row in user table
	// for adding a new doc
	if (!$$('user-list').getSelectedId()) {
		webix.message({
			type: 'error',
			text: 'Для добавления нового документа необходимо выбрать пользователя',
			expire: 4000
		});

		$$('newdoc-popup').hide();

		return;
	}
	else {
		$$('newdoc-popup').show();
	}
}

function searchUser() {
	var reqData = $$('search-form').getValues(),
		user = {
			'personal_number': reqData.personal_number,
			'full_name': reqData.full_name,
			'doc_number': reqData.doc_number
		};

	var valCompare = function(str1, str2) {
		str1 = str1.toString().toLowerCase();
		str2 = str2.toString().toLowerCase();

		return str1.localeCompare(str2) === 0;
	}

	$$('user-list').filter(function(obj){
		for (var requisite in user) {
			// We're interested in not empty fields
			if (user[requisite] !== "") {

				// Try to access value with key = requisite
				var nextRequisite = obj[requisite];

				// If nextRequisite is undefined then we need
				// to search value in `docs` property of user obj
				if (!nextRequisite) {
					for (var doc in obj['docs']) {
						if (valCompare(obj['docs'][doc][requisite], user[requisite])) {
							nextRequisite = obj['docs'][doc][requisite];
							break;
						}
					}
				}

				// If nextRequisite is undefined or 
				// data can't be found in datastore then return false
				if (!nextRequisite || !valCompare(nextRequisite, user[requisite])) {
					return false;
				}
			}
		}

		return true;
	});

	// Update doc list after updating of user list
	// TO-DO: try to fire event "onAfterFilter" on $$('doc-list')
	$$('doc-list').clearAll();
}

function addNewDoc() {
	// At first validate the form
	if (!$$('newdoc-form').validate()) return;

	var userSelectedID = $$('user-list').getSelectedId().id,
		reqData = $$('newdoc-form').getValues(),
		newDoc = {
			"doc_type": reqData.doc_type,
			"doc_country": reqData.doc_country,
			"doc_series": reqData.doc_series,
			"doc_number": reqData.doc_number,
			"doc_name_rus": reqData.doc_name_rus,
			"doc_name_blr": reqData.doc_name_blr,
			"doc_date_get": reqData.doc_date_get,
			"doc_date_start": reqData.doc_date_start,
			"doc_date_end": reqData.doc_date_end
		};

	var userUpdate = $$('user-list').getItem(userSelectedID);

	userUpdate['docs'].push(newDoc); // Update doc list for selected user
	$$('user-list').updateItem(userSelectedID, userUpdate);

	// Clear form
	$$('newdoc-form').clear();
	webix.message('Новый документ успешно добавлен');
}

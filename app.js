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
								{ view: 'button', type: 'form', value: 'Поиск' },
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
						{ view: 'button', type: 'iconButton', icon: 'file-excel-o', width: 225, label: 'Внести новый документ', align: 'right', click: "$$('newdoc-popup').show()" }
					]
				},

				{
					view: 'datatable',
					minHeight: 200,
					columns: [
						{ id: 'full_name', header: 'ФИО', adjust: true }
					],
					data: []
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
										columns: [
											{ id: 'type', header: 'Тип', adjust: true },
											{ id: 'number', header: 'Номер', adjust: true },
											{ id: 'series', header: 'Серия', adjust: true },
											{ id: 'country', header: 'Страна', adjust: true },
											{ id: 'issued_by', header: 'Кем выдан', adjust: true },
											{ id: 'date', header: 'Дата', adjust: true }
										],
										data: []
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
		rows: [
			{ view: 'richselect', name: 'doc_type', label: 'Тип документа', labelPosition: 'top', placeholder: 'Выберите тип документа', options: [] },
			{
				cols: [
					{ view: 'richselect', name: 'doc_country', label: 'Страна выдачи', labelPosition: 'top', options: [] },
					{ view: 'text', name: 'doc_series', label: 'Серия', labelPosition: 'top' },
					{ view: 'text', name: 'doc_number', label: 'Номер', labelPosition: 'top' }
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
								{ view: 'datepicker', name: 'doc_date_get', label: 'Дата выдачи', labelPosition: 'top', date: new Date(), stringResult: true },
								{ view: 'datepicker', name: 'doc_date_start', label: 'Действителен с', labelPosition: 'top', date: new Date(), stringResult: true },
								{ view: 'datepicker', name: 'doc_date_end', label: 'Действителен по', labelPosition: 'top', date: new Date(), stringResult: true }
							]
						}
					]
				}
			},
			{ view: 'button', value: 'Создать', inputWidth: 180, align: 'center' }
		]
	}
});

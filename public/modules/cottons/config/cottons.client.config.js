'use strict';

// Configuring the Articles module
angular.module('cottons').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cottons', 'cottons', 'dropdown', '/cottons(/create)?');
		Menus.addSubMenuItem('topbar', 'cottons', 'List Cottons', 'cottons');
		Menus.addSubMenuItem('topbar', 'cottons', 'New Cotton', 'cottons/create');
	}
]);
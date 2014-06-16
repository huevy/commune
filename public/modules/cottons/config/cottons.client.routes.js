'use strict';

//Setting up route
angular.module('cottons').config(['$stateProvider',
	function($stateProvider) {
		// Cottons state routing
		$stateProvider.
		state('listCottons', {
			url: '/cottons',
			templateUrl: 'modules/cottons/views/list-cottons.client.view.html'
		}).
		state('createCotton', {
			url: '/cottons/create',
			templateUrl: 'modules/cottons/views/create-cotton.client.view.html'
		}).
		state('viewCotton', {
			url: '/cottons/:cottonId',
			templateUrl: 'modules/cottons/views/view-cotton.client.view.html'
		}).
		state('editCotton', {
			url: '/cottons/:cottonId/edit',
			templateUrl: 'modules/cottons/views/edit-cotton.client.view.html'
		});
	}
]);
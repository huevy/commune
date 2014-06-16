'use strict';

//Cottons service used to communicate Cottons REST endpoints
angular.module('cottons').factory('Cottons', ['$resource',
	function($resource) {
		return $resource('cottons/:cottonId', { cottonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
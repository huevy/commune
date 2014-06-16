'use strict';

// Cottons controller
angular.module('cottons').controller('CottonsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cottons',
	function($scope, $stateParams, $location, Authentication, Cottons) {
		$scope.authentication = Authentication;

		// Create new Cotton
		$scope.create = function() {
			// Create new Cotton object
			var cotton = new Cottons({
				ref: this.ref
			});

			// Redirect after save

			cotton.$save(function(response) {
				$location.path('cottons/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.ref = '';
		};

		// Remove existing Cotton
		$scope.remove = function(cotton) {
			if (cotton) {
				cotton.$remove();

				for (var i in $scope.cottons) {
					if ($scope.cottons[i] === cotton) {
						$scope.cottons.splice(i, 1);
					}
				}
			} else {
				$scope.cotton.$remove(function() {
					$location.path('cottons');
				});
			}
		};

		// Update existing Cotton
		$scope.update = function() {
			var cotton = $scope.cotton;

			cotton.$update(function() {
				$location.path('cottons/' + cotton._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cottons
		$scope.find = function() {
			$scope.cottons = Cottons.query();
		};

		// Find existing Cotton
		$scope.findOne = function() {
			$scope.cotton = Cottons.get({
				cottonId: $stateParams.cottonId
			});
		};
	}
]);
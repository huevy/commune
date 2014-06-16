'use strict';

(function() {
	// Cottons Controller Spec
	describe('Cottons Controller Tests', function() {
		// Initialize global variables
		var CottonsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Cottons controller.
			CottonsController = $controller('CottonsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Cotton object fetched from XHR', inject(function(Cottons) {
			// Create sample Cotton using the Cottons service
			var sampleCotton = new Cottons({
				name: 'New Cotton'
			});

			// Create a sample Cottons array that includes the new Cotton
			var sampleCottons = [sampleCotton];

			// Set GET response
			$httpBackend.expectGET('cottons').respond(sampleCottons);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cottons).toEqualData(sampleCottons);
		}));

		it('$scope.findOne() should create an array with one Cotton object fetched from XHR using a cottonId URL parameter', inject(function(Cottons) {
			// Define a sample Cotton object
			var sampleCotton = new Cottons({
				name: 'New Cotton'
			});

			// Set the URL parameter
			$stateParams.cottonId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/cottons\/([0-9a-fA-F]{24})$/).respond(sampleCotton);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cotton).toEqualData(sampleCotton);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Cottons) {
			// Create a sample Cotton object
			var sampleCottonPostData = new Cottons({
				name: 'New Cotton'
			});

			// Create a sample Cotton response
			var sampleCottonResponse = new Cottons({
				_id: '525cf20451979dea2c000001',
				name: 'New Cotton'
			});

			// Fixture mock form input values
			scope.name = 'New Cotton';

			// Set POST response
			$httpBackend.expectPOST('cottons', sampleCottonPostData).respond(sampleCottonResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Cotton was created
			expect($location.path()).toBe('/cottons/' + sampleCottonResponse._id);
		}));

		it('$scope.update() should update a valid Cotton', inject(function(Cottons) {
			// Define a sample Cotton put data
			var sampleCottonPutData = new Cottons({
				_id: '525cf20451979dea2c000001',
				name: 'New Cotton'
			});

			// Mock Cotton in scope
			scope.cotton = sampleCottonPutData;

			// Set PUT response
			$httpBackend.expectPUT(/cottons\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/cottons/' + sampleCottonPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid cottonId and remove the Cotton from the scope', inject(function(Cottons) {
			// Create new Cotton object
			var sampleCotton = new Cottons({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Cottons array and include the Cotton
			scope.cottons = [sampleCotton];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/cottons\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCotton);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.cottons.length).toBe(0);
		}));
	});
}());
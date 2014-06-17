'use strict';

angular.module('core').factory('Infinitesource', [

	function() {
		var InfiniteSource = function InfiniteSource(options) {
			this.resource = options.resource;
			this.breakdownField = options.breakdownField;
			this.breakdownParam = options.breakdownParam;

			this.busy = false;
		};

		InfiniteSource.prototype.onError = function() {
			this.busy = false;
		};

		InfiniteSource.prototype.onSuccess = function(items) {
			this.busy = false;
			this.items = items;
		};

		InfiniteSource.prototype.getLastBreakdown = function() {
			if (!this.items || !this.items.length) {
				return null;
			}
			var item = this.items[this.items.length - 1];
			if (item) {
				return item[this.breakdownField];
			}
			return null;
		};

		InfiniteSource.prototype.nextPage = function() {
			var self = this;
			this.busy = true;
			var params = {};
			params[this.breakdownParam] = this.getLastBreakdown();
			var items = this.resource.query(params, function() {
				self.onSuccess(items);
			}, function() {
				self.onError();
			});
		};

		return InfiniteSource;
	}
]);
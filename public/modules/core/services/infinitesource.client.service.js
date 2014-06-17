'use strict';

angular.module('core').factory('Infinitesource', [

	function() {
		var InfiniteSource = function InfiniteSource(options) {
			this.resource = options.resource;
			this.breakdownField = options.breakdownField;
			this.breakdownParam = options.breakdownParam;

			this.end = false;
			this.busy = false;
			this.items = [];
		};

		InfiniteSource.prototype.onError = function() {
			this.busy = false;
		};

		InfiniteSource.prototype.onSuccess = function(items) {
			this.busy = false;
			if (!items || !items.length) {
				this.end = true;
			}
			this.items = this.items.concat(items);
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
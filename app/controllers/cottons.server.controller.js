'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Cotton = mongoose.model('Cotton'),
	_ = require('lodash'),
	twisolver = require('twisolver');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Cotton already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Cotton
 */
exports.create = function(req, res) {
	twisolver
		.fetchByRef(req.body.ref)
		.then(function(result) {
			if (result.status === 'OK') {
				var cotton = new Cotton(_.extend({}, result.profile, {
					user: req.user
				}));
				cotton.save(function(err) {
					if (err) {
						return res.send(400, {
							message: getErrorMessage(err)
						});
					} else {
						res.jsonp(cotton);
					}
				});
			} else if (result.status === 'NOTFOUND') {
				return res.send(400, {
					message: 'Twitter profile not found'
				});
			}
		});
};

/**
 * Show the current Cotton
 */
exports.read = function(req, res) {
	res.jsonp(req.cotton);
};

/**
 * Update a Cotton
 */
exports.update = function(req, res) {
	var cotton = req.cotton;

	cotton = _.extend(cotton, req.body);

	cotton.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(cotton);
		}
	});
};

/**
 * Delete an Cotton
 */
exports.delete = function(req, res) {
	var cotton = req.cotton;

	cotton.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(cotton);
		}
	});
};

/**
 * List of Cottons
 */
exports.list = function(req, res) {
	var q = Cotton.find().limit(10);

	if (req.query.before) {
		q.where('created').lt(req.query.before);
	}

	q.sort('-created')
		.populate('user', 'displayName')
		.exec(function(err, cottons) {
			if (err) {
				return res.send(400, {
					message: getErrorMessage(err)
				});
			} else {
				res.jsonp(cottons);
			}
		});
};

/**
 * Cotton middleware
 */
exports.cottonByID = function(req, res, next, id) {
	Cotton.findById(id).populate('user', 'displayName').exec(function(err, cotton) {
		if (err) return next(err);
		if (!cotton) return next(new Error('Failed to load Cotton ' + id));
		req.cotton = cotton;
		next();
	});
};

/**
 * Cotton authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.cotton.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};
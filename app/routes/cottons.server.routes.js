'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var cottons = require('../../app/controllers/cottons');

	// Cottons Routes
	app.route('/cottons')
		.get(cottons.list)
		.post(users.requiresLogin, cottons.create);

	app.route('/cottons/:cottonId')
		.get(cottons.read)
		.put(users.requiresLogin, cottons.hasAuthorization, cottons.update)
		.delete(users.requiresLogin, cottons.hasAuthorization, cottons.delete);

	// Finish by binding the Cotton middleware
	app.param('cottonId', cottons.cottonByID);
};
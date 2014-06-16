'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Cotton Schema
 */
var CottonSchema = new Schema({
	screenName: {
		type: String,
		'default': '',
		required: 'empty screen name',
		trim: true
	},
	name: {
		type: String,
		'default': '',
		required: 'empty name',
		trim: true
	},
	location: {
		type: String,
		trim: true
	},
	avatar: {
		type: String,
		trim: true
	},
	bio: {
		type: String,
		trim: true
	},
	tweetsCount: {
		type: Number
	},
	friendsCount: {
		type: Number
	},
	followersCount: {
		type: Number
	},
	created: {
		type: Date,
		'default': Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Cotton', CottonSchema);
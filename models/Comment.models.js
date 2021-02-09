const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types
const timeId = require('../configurations/timeID.js');

const commentSchema = new mongoose.Schema({
	stars: {
		type: Number,
		min: 1,
		max: 5
	},
	text: {
		type: String
	},
	room: { type: ObjectId, ref: 'Rooms'},
	costumer: { type: ObjectId, ref: "costumers"},
	createAt: {
		type: String,
		default: timeId
	},
	lastUpdate: {
		type: String,
		default: timeId
	}
});

const Comment = mongoose.model('Comments', commentSchema);

module.exports = Comment;
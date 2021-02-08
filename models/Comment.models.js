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
	costumer: { type: ObjectId, ref: "Costumers"},
	createAt: {
		type: Date,
		default: timeId
	},
	lastUpdate: {
		type: Date,
		default: timeId
	}
});

const Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;
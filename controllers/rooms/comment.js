
const mongoose = require('mongoose');
const createError = require('http-errors')

const { Comment, Room } = require('../../models/');
const timeId = require('../../configurations/timeID.js');

const postComment = async (req, res, next) => {
	const idRoom = req.params.idRoom;

	const room = await Room.findById(idRoom);

	if (!idRoom) {
		return next(createError.BadRequest())
	};

	const user = req.user;

	const data = {
		stars: req.body.stars,
		text: req.body.text,
		room: idRoom,
		costumer: req.user._id
	};


	await Comment.create(data, async (err, response) => {
		if (err) return next(err);

		const pushComment = await Room.findByIdAndUpdate(idRoom, {
			$push: {
				reviews: response._id
			}
		})

		res.json({
			message: 'Post comment successfully'
		});
	})
};

const updateComment = async (req, res, next) => {
	try {

		// Get all params
		const idRoom = req.params.idRoom;
		const idComment = req.params.idComment;

		// Check params
		const room = await Room.findById(idRoom);
		const comment = await Comment.findById(idComment);

		if (!room || !comment) {
			return next(createError.BadRequest())
		};

		// Req User
		const user = req.user;

		const data = {
			stars: req.body.stars,
			text: req.body.text,
			room: idRoom,
			costumer: req.user._id,
			lastUpdate: timeId
		};

		await Comment.findByIdAndUpdate(idComment, data, async (err, response) => {
			res.json({
				message: "Update successfully"
			});
		})

	} catch(error) {
		next(error)
	}
};

const deleteComment = async (req, res, next) => {
	// Get all params
	const idRoom = req.params.idRoom;
	const idComment = req.params.idComment;

	const room = await Room.findById(idRoom);
	const comment = await Comment.findById(idComment);

	// Check params
	if (!room || !comment) {
		return next(createError.BadRequest())
	};

	await Comment.findByIdAndRemove(idComment, (err, response) => {
		if (err) return next(err);

		res.json({
			message: "Comment deleted successfully"
		});
	})
};

const getComment = async (req, res, next) => {
	const idRoom = req.params.idRoom;

	// Check _Id Room
	const room = await Room.findById(idRoom);
	if (!room) {
		return next(createError.BadRequest())
	};

	await Comment.find({room: idRoom}, (err, response) => {
		if (err) return next(createError.InternalServerError());

		res.json({ Comments: response })
	});
}


module.exports = {
	postComment,
	updateComment,
	deleteComment,
	getComment
}
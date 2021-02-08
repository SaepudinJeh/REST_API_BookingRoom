const postCommentKosRoom = async (req, res, next) => {
	const idRoom = req.params.idRoom;

	const room = await Room.findById(idRoom);

	if (!idRoom) {
		return next(createError.InternalServerError())
	};



};


module.exports = {
	postCommentKosRoom
}
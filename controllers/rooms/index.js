const { postRoom, allRooms, getRoomByType, getRoomById, updateRoom, deleteRoom } = require('./rooms.js')
const { postComment, updateComment, deleteComment } = require('./comment.js')

module.exports = {
	postRoom,
	allRooms,
	getRoomByType,
	getRoomById,
	updateRoom,
	deleteRoom,
	postComment,
	updateComment,
	deleteComment
}
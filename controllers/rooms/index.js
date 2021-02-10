const { postRoom, allRooms, getRoomByType, getRoomById, updateRoom, deleteRoom } = require('./rooms.js')
const { postComment, updateComment, deleteComment, getComment } = require('./comment.js')
const { postBooking, getBooking, cancelledBookingCostumer, cancelledBookingOwner, roomAccepted } = require('./booking.js')

module.exports = {
	postRoom,
	allRooms,
	getRoomByType,
	getRoomById,
	updateRoom,
	deleteRoom,
	postComment,
	updateComment,
	deleteComment,
	getComment,
	postBooking,
	getBooking,
	cancelledBookingCostumer,
	cancelledBookingOwner,
	roomAccepted
}
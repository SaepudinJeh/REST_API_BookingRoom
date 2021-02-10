const router = require('express').Router();

const { Rooms } = require('../controllers/')

router
	.post('/:idRoom/post', Rooms.postBooking)
	.get('/:idRoom/get/:idUser', Rooms.getBooking)
	.get('/:idBooking/cancelled-costumer/:idCostumer', Rooms.cancelledBookingCostumer)
	.get('/:idBooking/cancelled-owner/:idOwner', Rooms.cancelledBookingOwner)
	.get('/:idBooking/accepted', Rooms.roomAccepted)



module.exports = router;
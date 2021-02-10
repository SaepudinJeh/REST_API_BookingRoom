const router = require('express').Router();

const { Rooms } = require('../controllers/');
const { isAuth, isCostumer, isOwner} = require('../middlewares/')

router
	.post('/:idRoom/post', isAuth, isCostumer, Rooms.postBooking)
	.get('/:idRoom/get/:idCostumer', isAuth, isCostumer, Rooms.getBooking)
	.get('/:idBooking/cancelled-costumer/:idCostumer', isAuth, isCostumer, Rooms.cancelledBookingCostumer)
	.get('/:idBooking/cancelled-owner/:idOwner', isAuth, isOwner, Rooms.cancelledBookingOwner)
	.get('/:idBooking/accepted/:idOwner', isAuth, isOwner, Rooms.roomAccepted)



module.exports = router;
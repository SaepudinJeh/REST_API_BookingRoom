const router = require('express').Router();

const { Rooms } = require('../controllers/');
const { uploadImageRoom } = require('../middlewares/')
const { isAuth, isOwner } = require('../middlewares/')

router
	.get('/all-Rooms', Rooms.allRooms)
	.get('/all-rooms/:typeRoom', Rooms.getRoomByType)
	.get('/:idRoom', Rooms.getRoomById)
	.post('/post-room', isAuth, isOwner, uploadImageRoom.array('roomImages'), Rooms.postRoom)
	.put('/update-room/:idRoom', uploadImageRoom.array('roomImages'), isAuth, isOwner, Rooms.updateRoom)
	.delete('/delete-room/:idRoom', isAuth, isOwner, Rooms.deleteRoom)



 module.exports = router;

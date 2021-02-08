const router = require('express').Router();

const {Rooms} = require('../controllers/');
const {uploadImageRoom} = require('../middlewares/')

router
	.get('/all-Rooms', Rooms.allRooms)
	.get('/all-rooms/:typeRoom', Rooms.getRoomByType)
	.get('/:idRoom', Rooms.getRoomById)
	.post('/post-room', uploadImageRoom.array('roomImages'), Rooms.postRoom)
	.put('/update-room/:idRoom', uploadImageRoom.array('roomImages'), Rooms.updateRoom)
	.delete('/delete-room/:idRoom', Rooms.deleteRoom)



 module.exports = router;

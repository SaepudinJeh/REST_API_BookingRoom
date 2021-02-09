const router = require("express").Router();

const { Rooms } = require('../controllers/')

router
	.post('/:idRoom/post', Rooms.postComment)
	.put('/:idRoom/update/:idComment', Rooms.updateComment)
	.delete('/:idRoom/delete/:idComment', Rooms.deleteComment)



module.exports = router;
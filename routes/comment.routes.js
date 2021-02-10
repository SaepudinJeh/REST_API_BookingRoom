const router = require("express").Router();

const { Rooms } = require('../controllers/');
const { isAuth, isCostumer } = require('../middlewares/')

router
	.post('/:idRoom/post', isAuth, isCostumer, Rooms.postComment)
	.put('/:idRoom/update/:idComment', isAuth, isCostumer, Rooms.updateComment)
	.delete('/:idRoom/delete/:idComment', isAuth, isCostumer, Rooms.deleteComment)
	.get('/:idRoom/allComment', Rooms.getComment)



module.exports = router;
const cloudinary = require('cloudinary');
const createError = require('http-errors');

const {Room, Comment} = require('../../models/');
const timeId = require('../../configurations/timeID.js')

// Post Kos
const postRoom = async (req, res, next) => {
	try{

		// Req File
		const files = req.files;

		const file = files.map((file) => {
			 const data = {
			 	image: file.path,
			 	imageId: file.filename 
			 }

			 return data;
		})	 

		// req User   
		const user = req.user;

		const data = {
			name: req.body.name,
			postedBy: {
				_id: user._id
			},
			roomType: req.body.roomType,
			costumerType: req.body.costumerType,
			images: file,
			facilities: req.body.facilities,
			description: req.body.description,
			rules: req.body.rules,
			location:
				{
					city: req.body.city,
					address: req.body.address,
					coords: req.body.coords
				},
			pricing:
				{
					price: req.body.price,
					rent: req.body.rent
				},
			availableRooms: req.body.availableRooms
		};

		const response = await Room.create(data);
		
		res.json({
			message: "Post published successfully"
		})

	} catch(err) {
		next(err)
	}
};

// Get All Room

const allRooms = async (req, res, next) => {
	try {

		const rooms = Room.find({}).populate('postedBy', '_id avatar fullName')

		rooms.exec((err, post) => {
			if (err) console.log(err)

			res.json(post)
		})

	} catch (error) {
		next(error)
	}
};

// Get Room By TypeRoom Room kos
const getRoomByType = async (req, res, next) => {
	try {

		const idTypeRoom = req.params.typeRoom;

		const typeRoom = idTypeRoom[0].toUpperCase() + idTypeRoom.slice(1);

		const rooms = await Room.find({ roomType: typeRoom }).populate('postedBy', '_id avatar fullName');

		if (!rooms) {
			return next(createError.InternalServerError())
		}

		res.json({rooms});

	} catch (error) {
		next(error)
	}
};

// Get room by Id
const getRoomById = async (req, res, next) => {

	try {

		const idRoom = req.params.idRoom;

		const room = await Room.findById(idRoom).populate('postedBy', '_id avatar fullName')

		if (!room) {
			return next(createError.InternalServerError());
		};

		res.json(room)

	} catch (error) {
		next(error)
	}
};

// Update Kos
const updateRoom = async (req, res, next) => {
	try {
		const idRoom = req.params.idRoom;

		const room = await Room.findById(idRoom);

		if (!room) {
			return next(createError.InternalServerError());
		};

		// Req File
		const files = req.files;


		const file = files.map((file) => {
			 const data = {
			 	image: file.path,
			 	imageId: file.filename 
			 }

			 return data;
		});

		// Parse Image in database
		const images = room.images;

		// Check if array is empty
		const saveImages = (typeof files === undefined || files.length == 0) ? images : file;

		const data = {
			name: req.body.name || room.name,
			roomType: req.body.roomType || room.roomType,
			costumerType: req.body.costumerType || room.costumerType,
			images: saveImages,
			facilities: req.body.facilities || room.facilities,
			description: req.body.description || room.description,
			rules: req.body.rules || room.rules,
			location:
				{
					city: req.body.city || room.location.city,
					address: req.body.address || room.location.address,
					coords: req.body.coords || room.location.coords
				},
			pricing:
				{
					price: req.body.price || room.pricing.price,
					rent: req.body.rent || room.pricing.rent
				},
			availableRooms: req.body.availableRooms || room.availableRooms,
			lastUpdate: timeId
		};


		const updateRoom = await Room.findByIdAndUpdate(idRoom, {$set: data});

		res.json({
			message: 'Update Room successfully'
		})

	} catch (error) {
		next(error)
	}
};

// Delete Kos
const deleteRoom = async (req, res, next) => {
	try {
		const idRoom = req.params.idRoom;

		const room = await Room.findById(idRoom);

		if (!room) {
			return next(createError.InternalServerError());
		};

		await Room.findByIdAndDelete(idRoom, async (err, response) => {
			if (err) return next(err);

			await Comment.findById(idRoom, (err, response) => {
				if (err) return next(err);

				res.json({
					message: "Delete room successfully"
				});
			});
		});

	} catch (error) {
		next(error)
	};
};


module.exports = {
	postRoom,
	allRooms,
	getRoomByType,
	getRoomById,
	updateRoom,
	deleteRoom
}
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

		// Parse data
		const data = {
			nameRoom: req.body.nameRoom,
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

		const rooms = await Room.find({}, 
			{
				name: 1, 
				roomType: 1, 
				costumerType:1, 
				lastUpdate: 1, 
				location: {city: 1, address: 1},
				pricing: { price: 1}, 
				images: { $arrayElemAt: [ "$images", 0 ] } 
			}
		)

		res.json(rooms);

	} catch (error) {
		next(error)
	}
};

// Get Room By TypeRoom Room kos
const getRoomByType = async (req, res, next) => {
	try {

		const idTypeRoom = req.params.typeRoom;

		const typeRoom = idTypeRoom[0].toUpperCase() + idTypeRoom.slice(1);

		const rooms = await Room.find({ roomType: typeRoom }, 
			{
				name: 1, 
				roomType: 1, 
				costumerType:1, 
				lastUpdate: 1, 
				location: {city: 1, address: 1},
				pricing: { price: 1}, 
				images: { $arrayElemAt: [ "$images", 0 ] } 
			}
		);

		res.json({rooms});

	} catch (error) {
		next(error)
	}
};

// Get room by Id
const getRoomById = async (req, res, next) => {

	try {

		const idRoom = req.params.idRoom;

		const room = await Room.findById(idRoom)
			.populate({
				path: 'postedBy',
				select: '_id avatar fullName'
			})
			.populate({
				path: 'reviews',
				select: '_id stars text lastUpdate',
				populate: {
					path: 'costumer',
					select: '_id fullName'
				}
			});

		if (!room) {
			return next(createError.BadRequest());
		};

		res.json(room);

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
			return next(createError.BadRequest());
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
			nameRoom: req.body.nameRoom || room.nameRoom,
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
			return next(createError.BadRequest());
		};

		await Room.findByIdAndRemove(idRoom, async (err, response) => {
			if (err) return next(err);

			await Comment.findByIdAndRemove(idRoom, (err, result) => {
				console.log(result)

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
const createError = require('http-errors');
const referralCodeGenerator = require('referral-code-generator');

const { Room, Booking, Owner } = require('../../models/');
const timeId = require('../../configurations/timeID.js')

const postBooking = async (req, res, next) => {
	try {
		const idRoom = req.params.idRoom;
		const user = req.user;

		// Create Referral Code
		const referralCode = referralCodeGenerator.alpha('lowercase', 25);

		//Check Room
		const room = await Room.findById(idRoom);

		if (!idRoom) {
			return next(createError.BadRequest())
		};

		const data = {
			bookingCode: referralCode,
			costumer: user._id,
			paymentTotal: req.body.paymentTotal,
			paymentType: req.body.paymentType,
			room: idRoom,
			roomCount: req.body.roomCount,
			bookingTime: timeId,
			rentType: req.body.rentType
		};

		await Booking.create(data, (err, response) => {
			if (err) return next(createError.InternalServerError());

			res.json(response);
		});

	} catch(error) {
		next(error)
	}
};

// Get All Booking Costumer
const getBooking = async (req, res, next) => {
	const idRoom =  req.params.idRoom;
	const idUser = req.params.idUser

	const room = await Room.findById(idRoom);
	const costumer = await Owner.findById(idCostumer);

	// Check params
	if (!room || !costumer) {
		return next(createError.BadRequest())
	};

	const booking = await Booking.find({ costumer: idUser }).populate('room', '_id name');

	res.json(booking)
};

const cancelledBookingCostumer = async (req, res, next) => {
	const idCostumer = req.params.idCostumer;
	const idBooking = req.params.idBooking

	const costumer = await Costumer.findById(idCostumer);
	const booking = await Booking.findById(idBooking);

	// Check params
	if (!booking) {
		return next(createError.BadRequest('room not available'))
	};

	if (!costumer) {
		return next(createError.BadRequest('You are not Costumer!'))
	}
	const updateBooking = await Booking.findByIdAndUpdate(idBooking, {
		$set: {
			status: "Booking dibatalkan"
		}
	})

	res.json({
		message: "Booking cancelled"
	});
};

const cancelledBookingOwner = async (req, res, next) => {
	const idOwner = req.params.idOwner;
	const idBooking = req.params.idBooking

	const owner = await Owner.findById(idOwner);
	const booking = await Booking.findById(idBooking);

	// Check params
	if (!booking) {
		return next(createError.BadRequest('room not available'))
	};

	if (!owner) {
		return next(createError.BadRequest('You are not Owner!'))
	}

	const updateBooking = await Booking.findByIdAndUpdate(idBooking, {
		$set: {
			status: "Booking dibatalkan"
		}
	})

	res.json({
		message: "Booking cancelled"
	});
};

const roomAccepted = async (req, res, next) => {
	const idBooking = req.params.idBooking

	const booking = await Booking.findById(idBooking);

	// Check params
	if (!booking) {
		return next(createError.BadRequest('room not available'))
	};

	const updateBooking = await Booking.findByIdAndUpdate(idBooking, {
		$set: {
			status: "Booking diterima"
		}
	})

	res.json(updateBooking)
}

module.exports = {
	postBooking,
	getBooking,
	cancelledBookingCostumer,
	cancelledBookingOwner,
	roomAccepted
}
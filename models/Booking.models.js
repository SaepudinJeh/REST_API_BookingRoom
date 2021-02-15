const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;
const timeId = require('../configurations/timeID.js')

const BookingSchema = new mongoose.Schema({
	bookingCode: {
		type: String,
		require: true
	},
	bookingTime: {
		type: String,
		defalult: timeId,
		require: true
	},
	rentType: {
		type: String,
		require: true
	},
	cancelledTime: String,
	finishedTime: String,
	costumer: {
		type: ObjectId,
		ref: 'costumers'
	},
	paymentTotal: {
		type: Number,
		require: true
	},
	paymentType: {
		type: String,
		require: true
	},
	room: {
		type: ObjectId,
		ref: 'rooms'
	},
	roomCount: {
		type: Number,
		require: true
	},
	status: {
		type: String,
		default: 'Menunggu Konfirmasi'
	}
})

const Booking = mongoose.model('bookings', BookingSchema);

module.exports = Booking;
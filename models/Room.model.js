const mongoose = require('mongoose');

const timeId = require('../configurations/timeID.js')
const roomType = require('../configurations/roomType.js')
const costumerType = require('../configurations/costumerType.js')

const { ObjectId} = mongoose.Schema.Types


const RoomSchema = new mongoose.Schema({
	postedBy: {
		type: ObjectId, 
		ref: 'owners'
	},
	nameRoom: {
		type: String,
		required: true
	},
	images: [
		{
			image: {
				type: String,
				default: ''
			},
			imageId: {
				type: String,
				default: ''
			}
		}
	],
	roomType: {
		type: String,
		required: true
	},
	costumerType: {
		type: String,
		default: costumerType.mixed
	},
	description: {
		type: String
	},
	rules: {
		type: String,
	},
	location: {
		city: {
			type: String,
			default: ''
		},
		address: {
			type: String,
			default: ''
		},
		coords: [
			{
				type: Number
			}
		]
	},
	pricing: {
		price: Number,
		rent: String
	},
	facilities: [ 
		{ type: String } 
	],
	availableRooms: {
		type: Number,
		required:true
	},
	CreateAt: {
		type: String,
		default: timeId
	},
	lastUpdate: {
		type: String,
		default: timeId
	}
});


const Room = mongoose.model('rooms', RoomSchema);

module.exports = Room
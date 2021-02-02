const mongoose = require("mongoose");

const { roles } = require("../configurations/role");
const timeId = require("../configurations/timeID");

// User FB Schema
const FbSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  userType: {
    type: String,
    enum: [roles.admin, roles.creator, roles.costumer],
    default: roles.costumer,
  },
  avatar: {
    type: String,
    default: null,
  },
  avatarId: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: Number,
    default: null,
  },
  emailVertification: {
    type: Boolean,
    default: true,
  },
  phoneNumber: {
    type: Number,
    default: null,
  },
  registerTime: {
    type: Date,
    default: timeId,
  },
});

// User Google Schema
const GoogleSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    default: null
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  userType: {
    type: String,
    enum: [roles.admin, roles.creator, roles.costumer],
    default: roles.costumer,
  },
  avatar: {
    type: String,
    default: null,
  },
  avatarId: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: Number,
    default: null,
  },
  emailVertification: {
    type: Boolean,
    default: true,
  },
  phoneNumber: {
    type: Number,
    default: null,
  },
  registerTime: {
    type: Date,
    default: timeId,
  },
});

const UserFbSchema = mongoose.model("UserFacebooks", FbSchema, "costumers");
const UserGoogleSchema = mongoose.model(
  "UserGoogles",
  GoogleSchema,
  "costumers"
);

module.exports = {
  UserFbSchema,
  UserGoogleSchema,
};

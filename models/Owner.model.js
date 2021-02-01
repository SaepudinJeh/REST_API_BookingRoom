const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const timeId = require("../configurations/timeID");
const { roles } = require("../configurations/role");

const OwnerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: [true, "You must provide a password!"],
  },
  userType: {
    type: String,
    default: roles.owner,
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
  fullAdress: {
    type: String,
    default: null,
  },
  emailVertification: {
    type: Boolean,
    default: false,
  },
  registerTime: {
    type: Date,
    default: timeId,
  },
});

OwnerSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Check Password Valid
OwnerSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw createError.InternalServerError(error.message);
  }
};

const Owner = mongoose.model("Owners", OwnerSchema);
module.exports = Owner;

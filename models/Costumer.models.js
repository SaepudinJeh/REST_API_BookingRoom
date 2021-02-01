const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const { roles } = require("../configurations/role");
const timeId = require("../configurations/timeID");

const CostumerSchema = new mongoose.Schema({
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
  emailVertification: {
    type: Boolean,
    default: false,
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

CostumerSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;

      if (this.email === process.env.ADMIN_KOSKU) {
        this.userType = roles.admin;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Check Password Valid
CostumerSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw createError.InternalServerError(error.message);
  }
};

const Costumer = mongoose.model("Costumers", CostumerSchema);
module.exports = Costumer;

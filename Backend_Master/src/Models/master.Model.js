import mongoose from "mongoose";
import bcrypt from "bcrypt";

const masterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    enum: ["Admin"],
  },

  schoolCode: {
    type: String,
    required: true,
  },
  frontendUrl: {
    type: String,
    required: true,
  },

  refreshToken: {
    type: String,
    default: "",
  },
});

masterSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

masterSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

export const Master = mongoose.model("Master", masterSchema);

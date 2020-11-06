import { Schema, model } from "mongoose";
import argon2 from "argon2";
import logger from "../loaders/logger";

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  surname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type:Number,
    default:Date.now()
  },
  updatedAt: {
    type:Number,
    default:Date.now()
  },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  let isValid;
  try {
    isValid = await argon2.verify(this.password, candidatePassword);
  } catch (e) {
    logger.error(e);
    return false;
  }
  return isValid;
};
userSchema.methods.getPublicFields = function () {
  const { name, email, surname, role, cart, history } = this;
  return { name, email, surname, role, cart, history };
};

userSchema.statics.generateHashedPassword = async function (password) {
  let hashedPassword;
  try {
    hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
    });
  } catch (e) {
    logger.error(e);
    return false;
  }
  return hashedPassword;
};

const User = model("User", userSchema);

export default User;

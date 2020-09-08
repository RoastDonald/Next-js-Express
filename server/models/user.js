import { Schema, model } from "mongoose";
import argon2 from "argon2";
import { sign, verify } from "jsonwebtoken";

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
  lastname: {
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
  token: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword;
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isValid = await argon2.verify(this.password, candidatePassword);
  return isValid;
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = sign(user._id.toHexString(), process.env.JWT_SECRET);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  verify(token, process.env.SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = model("User", userSchema);

export default { User };

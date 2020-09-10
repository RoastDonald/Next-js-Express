const joi = require("joi");

const userCredentials = {
  email: joi.string().email().required(),
  password: joi.string().min(6).max(16).required(),
};

const schemas = {
  register: joi.object().keys({
    ...userCredentials,
    name: joi.string().min(3).required(),
    surname: joi.string().min(3).required(),
  }),
  login: joi.object().keys({
    ...userCredentials,
  }),

  product: joi.object().keys({
    name: joi.string().required(),
    description: joi.string().max(10000).required(),
    price: joi.number().max(255),
    brand: joi.string().required(),
    shipping: joi.boolean().required(),
    available: joi.boolean().required(),
    woods: joi.string().required(),
    frets: joi.number().required(),
    publish: joi.boolean().required(),
  }),
  wood: joi.object().keys({
    name: joi.string().max(100).required(),
  }),
  brand: joi.object().keys({
    name: joi.string().max(100).required(),
  }),
};

module.exports = schemas;

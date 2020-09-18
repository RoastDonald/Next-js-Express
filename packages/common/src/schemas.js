const yup = require("yup");

const userCredentials = {
  email: yup.string().email().required(),
  password: yup.string().min(6).max(16).required(),
};

const schemas = {
  register: yup.object({
    ...userCredentials,
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    name: yup.string().min(3).required(),
    surname: yup.string().min(3).required(),
  }),
  login: yup.object({
    ...userCredentials,
  }),

  product: yup.object({
    name: yup.string().required(),
    description: yup.string().max(10000).required(),
    price: yup.number().max(255),
    brand: yup.string().required(),
    shipping: yup.boolean().required(),
    available: yup.boolean().required(),
    woods: yup.string().required(),
    frets: yup.number().required(),
    publish: yup.boolean().required(),
  }),
  wood: yup.object({
    name: yup.string().max(100).required(),
  }),
  brand: yup.object({
    name: yup.string().max(100).required(),
  }),
};

module.exports = schemas;

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
  email: yup.object({
    email: yup.string().email().required(),
  }),
  editUser: {
    name: yup.string().min(3).required(),
    surname: yup.string().min(3).required(),
    email: yup.string().email().required(),
    role: yup.number().min(0).max(1),
  },

  product: yup.object({
    name: yup.string().required(),
    description: yup.string().max(10000).required(),
    price: yup.number().max(10000000).min(0, "Not negative number").required(),
    brand: yup.string().required(),
    shipping: yup.boolean().required(),
    available: yup.boolean().required(),
    wood: yup.string().required(),
    frets: yup.number().required(),
    publish: yup.boolean().required(),
  }),
  wood: yup.object({
    name: yup.string().max(100).required(),
  }),
  brand: yup.object({
    name: yup.string().max(100).required(),
  }),
  filters: yup.object({
    skip: yup.number(),
    limit: yup.number(),
    filters: yup.object().required(),
  }),
};

module.exports = schemas;

import logger from "../../loaders/logger";

const validateDTO = (schema, _) => {
  return (req, res, next) => {
    let errors = [];
    try {
      const isValid = schema.validateSync(req.body, { abortEarly: false });
      if (isValid) return next();
    } catch (e) {
      e.inner.forEach(({ path, message }) => {
        errors.push({ [path]: message });
      });

      logger.info(errors);
      res.status(422).json({
        errors,
      });
    }
  };
};

export default validateDTO;

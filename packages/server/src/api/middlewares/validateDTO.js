import logger from "../../loaders/logger";

const validateDTO = (schema, config) => {
  return (req, res, next) => {
    let data = req.body;
    if(config && config.query){
      data = req.query;
    }
    let errors = [];
    try {
      const isValid = schema.validateSync(data, { abortEarly: false });
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

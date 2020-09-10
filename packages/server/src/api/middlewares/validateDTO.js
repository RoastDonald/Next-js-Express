import logger from "../../loaders/logger";

const validateDTO = (schema, _) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    const isValid = error == null;
    if (!isValid) {
      const { details } = error;
      const usefulErrors = {};
      details.map((error) => {
        if (!usefulErrors.hasOwnProperty(error.path.join("_"))) {
          usefulErrors[error.path.join("_")] = {
            type: error.type,
            msg: `error.${error.path.join("_")}.${error.type}`,
          };
        }
      });
      logger.info(usefulErrors);
      res.status(422).json({
        errors: usefulErrors,
      });
    } else {
      next();
    }
  };
};

export default validateDTO;

import Cloudinary from "../../services/Cloudinary";
import logger from "../../loaders/logger";

class FileController {
  constructor() {}

  handleFileUpload = (req, res) => {
    const cloudinary = new Cloudinary();
    Promise.resolve(cloudinary.uploadFile(req["files"]["file"]["path"]))
      .then((response) => {
        logger.info(response);
        if (response) {
          const { public_id, url } = response;
          res.status(200).json({
            public_id,
            url,
          });
        } else {
          res.status(422).json({
            message: "Image was\nt uploaded, try later",
          });
        }
      })
      .catch((error) => {
        logger.error(error);
        res.status(422).json({
          message: "Image was\nt uploaded, try later",
        });
      });
  };
  handleFileDelete = (req, res) => {
    const cloudinary = new Cloudinary();
    console.log(req["body"]["id"]);
    Promise.resolve(cloudinary.deleteFile(req["body"]["id"]))
      .then((status) => {
        if (status) {
          logger.info("deleted");
          res.status(200).json({
            message: "Image had been deleted",
          });
        } else {
          res.status(422).json({
            message: "Image was\nt uploaded, try later",
          });
        }
      })
      .catch((error) => {
        logger.error(error);
        res.status(422).json({
          message: "Image was\nt uploaded, try later",
        });
      });
  };
}

export default FileController;

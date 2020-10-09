import cloudinary from 'cloudinary';
import logger from '../loaders/logger';

class Cloudinary {
    constructor() {}

    uploadFile = (file) => {
        return new Promise((res, rej) => {
            if (!file) {
                logger.error('file wasn\'t set');
                return null;
            }
            cloudinary.uploader.upload(file, (response) => {
                return res(response);
            });
        });
    }
    deleteFile = (id) => {
        return new Promise((res, rej) => {
            if (!id) {
                logger.error('file id wasn\'t set');
                return null;
            }
            cloudinary.uploader.destroy(id, (response) => {
                return res(true);
            });
        });
    }
}

export default Cloudinary;
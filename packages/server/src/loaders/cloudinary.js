import cloudinary from 'cloudinary';
import config from '../config';

export default async () => {
    try {
        await cloudinary.config(config.cloudinary);
    } catch (error) {
        logger.error(error);
    }
}
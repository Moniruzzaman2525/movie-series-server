import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

cloudinary.config({
    cloud_name: config.cloud.cloud_name,
    api_key: config.cloud.api_key,
    api_secret: config.cloud.api_secret,
});

export const cloudinaryUpload = cloudinary;

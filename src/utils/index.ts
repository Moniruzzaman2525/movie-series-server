import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import config from '../config';


cloudinary.config({
  cloud_name: config.cloud.cloud_name,
  api_key: config.cloud.api_key,
  api_secret: config.cloud.api_secret,
});


const removeExtension = (filename: string) => {
  return filename.split('.').slice(0, -1).join('.');
};


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    public_id: (_req, file) =>
      Math.random().toString(36).substring(2) +
      '-' +
      Date.now() +
      '-' +
      file.fieldname +
      '-' +
      removeExtension(file.originalname),
  },
});

export const multerUpload = multer({ storage });

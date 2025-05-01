import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import path from 'path';
import { TCloudinary, TFile } from '../app/interface/cloudeinary';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

cloudinary.config({
  cloud_name: config.cloud.cloud_name,
  api_key: config.cloud.api_key,
  api_secret: config.cloud.api_secret,
});

//* Upload to Cloudinary
export const uploadToCloudinary = async (file: TFile): Promise<TCloudinary> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error: Error, result: TCloudinary) => {
      fs.unlinkSync(file.path);
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
  // cloudinary.uploader.upload
};

export const upload = multer({ storage: storage });

import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadsFilder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

interface UploadConfigInterface {
  driver: 's3' | 'disk';

  config: {
    disk: {
      storage: StorageEngine;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadsFolder: uploadsFilder,

  config: {
    disk: {
      storage: multer.diskStorage({
        destination: tempFolder,
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(10).toString('hex');
          const fileName = `${fileHash}-${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    },
  },
} as UploadConfigInterface;

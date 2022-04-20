import multer from 'multer';
import path from 'path';
import crypto from 'crypto';


interface IUploadConfig {
  // driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: multer.StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

interface IUploadFile {
  file: Express.Multer.File;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

class UploadConfig implements IUploadConfig {
  // driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: multer.StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };

  constructor() {
    // this.driver = String(process.env.STORAGE_DRIVER) || 'disk';
    this.tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
    this.uploadsFolder = path.resolve(this.tmpFolder, 'uploads');
    this.multer = {
      storage: multer.diskStorage({
        destination: this.tmpFolder,
        filename: (request, file, callback) => {
          // const fileHash = crypto.randomBytes(10).toString('HEX');
          // const fileName = `${fileHash}-${file.originalname}`;

          // return callback(null, fileName);
        },
      }),
    };
    this.config = {
      disk: {},
      aws: {
        bucket: 'app-gobarber-2',
      },
    };
  }
}

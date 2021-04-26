import { Req, Res, Injectable, Logger } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { json } from 'express';
import { S3 } from 'aws-sdk';

const AWS_S3_BUCKET_NAME = 'fotos-pagina-s3';
const s3 = new AWS.S3();
const AWS_SECRET_ACCESS_KEY = 'M4OztwOdFuymL25xG34ed70r4mc0u5BvJOQKmBmk';

const AWS_ACCESS_KEY_ID = 'AKIA2QIXGAKQHN4UDVWK';
AWS.config.update({
  accessKeyId: 'AKIA2QIXGAKQHN4UDVWK',
  secretAccessKey: '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',
});

@Injectable()
export class ImageUploadService {
  //constructor
  async upload(file) {
    const { originalname } = file;
    const bucketS3 = 'fotos-pagina-s3';
    await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    });
  }
}

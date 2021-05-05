import { Req, Res, Injectable, Logger } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { json } from 'express';
import { S3 } from 'aws-sdk';

const AWS_S3_BUCKET_NAME = 'fotos-pagina-s3';
const s3 = new AWS.S3();
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});


const params = {
  Bucket: AWS_S3_BUCKET_NAME,
  Delimiter: '/',
  Prefix: '',
};

s3.listObjects(params, function (err, data) {
  if (err) throw err;
  //console.log(data.Name);
});
s3.listObjectsV2(params, function (err, data) {
  if (err) {
    //console.log(err, err.stack); // an error occurred
  } else {
    const contents = data.Contents;
    let allKeys = [];
    contents.forEach(function (content) {
      allKeys.push(content.Key);
    });
    console.log(allKeys);
  }
});
@Injectable()
export class ImageUploadService {
  //constructor
  private allKeys: Promise<any>;
  async upload(file) {
    const { originalname } = file;
    const bucketS3 = 'fotos-pagina-s3';
    console.log();
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

  async ImgKeys() {
    let allKeys = [];
    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Delimiter: '/',
      Prefix: '',
    };
    return new Promise<any>((resolve) => {
      s3.listObjectsV2(params, function (err, data) {
        if (err) {
          //console.log(err, err.stack); // an error occurred
        } else {
          const contents = data.Contents;
          contents.forEach(function (content) {
            allKeys.push(content.Key);
          });
          //console.log(allKeys);
          resolve(allKeys);
        }
      });
    });
  }
}

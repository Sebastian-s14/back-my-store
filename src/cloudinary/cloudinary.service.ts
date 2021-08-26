import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteImage(
    // publicId: string,
    image: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const nombreArr = image.split('/');
      const nombre = nombreArr[nombreArr.length - 1];
      const [public_id] = nombre.split('.');
      v2.uploader.destroy(public_id, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  async updateImage(
    file: Express.Multer.File,
    image: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    // return new Promise(async (resolve, reject) => {
    //   await this.deleteImage(image);
    //   await this.uploadImage(file);
    //   resolve();
    // });
    if (image) await this.deleteImage(image);
    return this.uploadImage(file);
  }
}

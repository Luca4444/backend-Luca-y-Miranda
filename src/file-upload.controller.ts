import * as fs from 'fs';
import {
  Controller,
  Post,
  Req,
  Res,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('fileupload')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file) {
    return await this.imageUploadService.upload(file);
  }
  @Get('images')
  ImgKeys(): Promise<any> {
    return this.imageUploadService.ImgKeys();
  }
}

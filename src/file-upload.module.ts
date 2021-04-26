import { Module } from '@nestjs/common';
import { ImageUploadController } from './file-upload.controller';
import { ImageUploadService } from './file-upload.service';

@Module({
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}

import { Module } from '@nestjs/common';
import { ImageUploadModule } from './file-upload.module';
@Module({
  imports: [ImageUploadModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from './car/cars.entity';
import { CarModule } from './car/car.module';
import { Flights } from './flights/flights.entity';
import { FlightsModule } from './flights/flights.module';

import { AppController } from './app.controller';
import { ImageUploadModule } from './file-upload.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'lucabg',
      password: 'LucaBoschetti',
      database: 'postgres',
      entities: [Cars, Flights],
      synchronize: true,
    }),
    CarModule,
    FlightsModule,
    ImageUploadModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from './cars.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cars])],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}

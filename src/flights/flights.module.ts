import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flights } from './flights.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flights]),
    MulterModule.register({ dest: './uploads' }),
  ],
  providers: [FlightsService],
  controllers: [FlightsController],
})
export class FlightsModule {}

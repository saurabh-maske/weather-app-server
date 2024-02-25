import { WeatherApiService } from 'src/services/weather-api.service';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { Module } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Location} from '../locations/entity/location.entity'
import { RedisService } from 'src/services/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService, WeatherApiService,LocationRepository,RedisService],
  exports: [LocationRepository],

})
export class LocationModule {}

import { RedisService } from 'src/services/redis/redis.service';
import { WeatherService } from './weather.service';
import { Module } from '@nestjs/common';
import { RedisModule } from 'src/services/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [],
  providers: [WeatherService],
})
export class WeatherModule {}

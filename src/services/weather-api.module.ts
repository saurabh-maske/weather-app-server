/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WeatherApiService } from './weather-api.service';
import { RedisService } from './redis/redis.service';

@Module({
    imports: [],
    controllers: [],
    providers: [WeatherApiService,RedisService],
})
export class WeatherApiModule {}

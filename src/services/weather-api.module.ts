/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { WeatherApiService } from './weather-api.service';

@Module({
    imports: [],
    controllers: [],
    providers: [WeatherApiService],
})
export class WeatherApiModule {}

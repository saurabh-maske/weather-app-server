import { RedisModule } from './services/redis/redis.module';
import { WeateherController } from './modules/weather/weateher.controller';
import { WeatherModule } from './modules/weather/weather.module';
import { WeatherApiModule } from './services/weather-api.module';
import { LocationModule } from './modules/locations/location.module';
import { WeatherApiService } from './services/weather-api.service';
import { ConnectionModule } from './connection/connection.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationService } from './modules/locations/location.service';
import { ThrottlerModule } from 'nestjs-throttler';
import { RedisService } from './services/redis/redis.service';
@Module({
  imports: [
    RedisModule,
    ThrottlerModule.forRoot({
      ttl: 60, // Time to live in seconds
      limit: 10, // Number of requests allowed within the TTL window
    }),
    WeatherModule,
    WeatherApiModule,
    LocationModule,
    ConnectionModule,
  ],
  controllers: [WeateherController, AppController],
  providers: [WeatherApiService, AppService, LocationService,RedisService],
})
export class AppModule {}

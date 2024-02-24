import { WeatherApiModule } from './services/weather-api.module';
import { LocationModule } from './modules/locations/location.module';
import { WeatherApiService } from './services/weather-api.service';
import { ConnectionModule } from './connection/connection.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [WeatherApiModule, LocationModule, ConnectionModule],
  controllers: [AppController],
  providers: [WeatherApiService, AppService],
})
export class AppModule {}

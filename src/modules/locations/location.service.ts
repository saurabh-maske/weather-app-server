/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { LocationInputDto } from './dto/location.dto';
import { WeatherApiService } from '../../services/weather-api.service';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(
    private readonly weatherAPI: WeatherApiService,
    private readonly locationRepository: LocationRepository,
  ) {}
  async addNewLocation(locationData: LocationInputDto) {
    const { name, latitude, longitude } = locationData;

    if (name && latitude && longitude) {
      // check if lat long is valid or not if not throw error lat long does not match with any location
      const isValidLatLog = await this.weatherAPI.getWeatherData(
        latitude,
        longitude,
      );
      if (isValidLatLog) {
        const saveLocation = await this.locationRepository.saveLocation(locationData);
      } else {
        throw new Error('Invalid Lat Log ');
      }
    }
  }
}

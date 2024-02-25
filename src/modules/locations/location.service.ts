import { Injectable,Res } from '@nestjs/common';
import { LocationInputDto } from './dto/location.dto';
import { WeatherApiService } from '../../services/weather-api.service';
import { LocationRepository } from './location.repository';
import { Location } from './entity/location.entity';
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
        return await this.locationRepository.saveLocation(locationData);
        
      } else {
        throw new Error('Invalid Lat Log ');
      }
    }
  }

  async getLocationDetails(){
    return await this.locationRepository.find({})
  }

  // In location.service.ts

async getLocationById(locationId: string): Promise<Location> {
  return await this.locationRepository.findOne({where:{id:locationId}});
}

async updateLocationById(locationId: string, updateData: Partial<Location>): Promise<Location> {
 await this.locationRepository.update(locationId,updateData);
 return await this.locationRepository.findOne({where:{id:locationId}});

}

async deleteLocationById(locationId: string): Promise<void> {
 await this.locationRepository.delete(locationId)
}
}

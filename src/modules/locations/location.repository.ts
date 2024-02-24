import { Injectable } from '@nestjs/common';
import { LocationInputDto } from './dto/location.dto';
import { Repository, DataSource, DeepPartial } from 'typeorm';
import { Location } from '../../modules/locations/entity/location.entity';

@Injectable()
export class LocationRepository extends Repository<Location> {
  constructor(dataSource: DataSource) {
    super(Location, dataSource.createEntityManager());
  }
  async saveLocation(locationData: LocationInputDto) {
    return this.save(locationData);
  }
}

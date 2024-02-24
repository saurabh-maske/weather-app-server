import { Body, Controller, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationInputDto } from './dto/location.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('weather')
@Controller("locations")
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Post() 
    @ApiBody({
        type:LocationInputDto,
        description:'Location Data'
    })
    async addLocation(@Body() locationData: LocationInputDto) { 
        return this.locationService.addNewLocation(locationData);
    }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationInputDto } from './dto/location.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('CURD-Locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiBody({
    type: LocationInputDto,
    description: 'Location Data',
  })
  async addLocation(
    @Body() locationData: LocationInputDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.locationService.addNewLocation(locationData);
      if (result) {
        res
          .status(200)
          .json({ code: 200, message: 'location saved sucessfully', result });
      }
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.getStatus()).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  @Get()
  async getLocationDetais(@Res() res: Response) {
    try {
      const LocationData = await this.locationService.getLocationDetails();
      if (LocationData) {
        res.status(200).json({
          code: 200,
          message: 'location data fetch sucessfully',
          data: LocationData,
        });
      }
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.getStatus()).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  @Get(':location_id')
  @ApiOperation({ summary: 'Get a specific location by ID' })
  async getLocationById(
    @Param('location_id') locationId: string,
    @Res() res: Response,
  ) {
    const location = await this.locationService.getLocationById(locationId);
    if (location) {
      res
        .status(200)
        .json({ code: 200, message: 'location fetch sucessfully', location });
    } else {
      res.status(404).json({ message: 'Location not found.' });
    }
  }

  @Put(':location_id')
  @ApiOperation({ summary: 'Update a specific location by ID' })
  @ApiBody({
    type: LocationInputDto,
    description: 'Location Data',
  })
  async updateLocationById(
    @Param('location_id') locationId: string,
    @Body() updateData: LocationInputDto,
    @Res() res: Response,
  ) {
    const updatedLocation = await this.locationService.updateLocationById(
      locationId,
      updateData,
    );
    if (updatedLocation) {
      res.status(200).json({
        code: 200,
        message: 'location details updated  sucessfully',
        updatedLocation,
      });
    } else {
      res.status(404).json({ message: 'Location not found.' });
    }
  }

  @Delete(':location_id')
  @ApiOperation({ summary: 'Delete a specific location by ID' })
  async deleteLocationById(
    @Param('location_id') locationId: string,
    @Res() res: Response,
  ) {
    await this.locationService.deleteLocationById(locationId);
    res
      .status(200)
      .json({ message: 'Location has been successfully deleted.' });
  }
}

import { Controller, Get, HttpException, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeatherApiService } from 'src/services/weather-api.service';
import { LocationService } from '../locations/location.service';
import { Response } from 'express';
import { getUTCDayRange } from 'src/functions/getDates';

@ApiTags('Weather-Data')
@Controller('weather')
export class WeateherController {
  constructor(
    private readonly weatherAPI: WeatherApiService,
    private readonly locationService: LocationService,
  ) {}

  @Get(':location_id')
  @ApiOperation({ summary: 'Get a specific location by ID' })
  async getWeatherByLocationId(
    @Param('location_id') locationId: string,
    @Res() res: Response,
  ) {
    try {
      let weatherData;
      const data = await this.locationService.getLocationById(locationId);
      if (data) {
        const weatherDetails = await this.weatherAPI.getWeatherData(
          data.latitude,
          data.longitude,
        );
        if (weatherDetails) {
          weatherData = {
            location: weatherDetails?.name,
            country: weatherDetails?.sys.country,
            weateher: weatherDetails.weather[0]?.main,
            description: weatherDetails.weather[0]?.description,
            temprature: weatherDetails.main.temp,
            pressure: weatherDetails.main.pressure,
            humidity: weatherDetails.main.humidity,
            WindSpeed: weatherDetails.wind.speed,
          };
          res.status(200).json({
            code: 200,
            message: 'Weather details fetch sucessfully',
            weatherData: weatherData,
          });
        } else {
          res.status(404).json({
            code: 404,
            message: ` failed to fetch weather details for locationId : ${locationId}`,
            weatherData: weatherData ? weatherData : {},
          });
        }
      } else {
        res.status(404).json({
          code: 404,
          message: 'No location details found for given locationId',
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

  @Get('history/:location_id')
  @ApiOperation({ summary: 'Get historical data of location by locationID' })
  async getHistory(
    @Param('location_id') locationId: string,
    @Query('days') days: number,
    @Res() res: Response,
  ) {
    try {
      let data;
      let summary;
      if (locationId) {
        data = await this.locationService.getLocationById(locationId);
      }
      if(!data){
        if (!data) {
          throw new HttpException('No data found for locationId. Please check locationId.', HttpStatus.NOT_FOUND);
        }
      }
      let dateRange = getUTCDayRange(days);
      if (dateRange && data) {
        let historyData = await this.weatherAPI.getHistory(
          data.latitude,
          data.longitude,
          dateRange.start,
          dateRange.end,
        );

        if (historyData) {
          summary = historyData.list.map((item: any) => {
            return {
              date: item.dt,
              weather: item.weather[0]?.main,
              temperature: item.main.temp,
              pressure: item.main.pressure,
              humidity: item.main.humidity,
              windSpeed: item.wind.speed,
            };
          });
          res.status(200).json({
            code: 200,
            message: 'Summary fetch sucessfully',
            weatherSummary: summary,
          });
        } else {
          res.status(200).json({
            code: 400,
            message: `History summary not found for locationId,${locationId}`,
            weatherSummary: summary ? summary : {},
          });
        }
      }
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.getStatus()).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}

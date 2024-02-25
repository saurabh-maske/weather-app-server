import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import axios from 'axios';
import { error } from 'console';
import { RedisService } from './redis/redis.service';
import { ThrottlerGuard } from 'nestjs-throttler';


@Injectable()
export class WeatherApiService {

  constructor(private readonly redisService: RedisService) {}

  @UseGuards(ThrottlerGuard)
  async getWeatherData(lat: string, lon: string) {
    const url = `${process.env.WEATHER_API}?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}&units=metric`;
    const cacheKey = `weather-${lat}-${lon}`;
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
    try {
      if (lat && lon) {
        const response = await axios.get(url);
        if (response.status === 200) {
          const data = response.data;
          await this.redisService.set(cacheKey, JSON.stringify(data), 60 * 60); // Cache for  1 hour
          return data;
        } else {
          throw new HttpException(
            'Failed to fetch weather data',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      } else {
        throw error('No lat lon input provided');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        if ((error.response.status = 400)) {
          throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        } else if (error.request) {
          throw new HttpException(
            'No response received from the server',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        } else {
          throw new HttpException(
            'Error setting up the request',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      } else {
        // Handle other types of errors
        throw new HttpException(
          'Unknown error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @UseGuards(ThrottlerGuard)
  async getHistory(lat: string, lon: string, start: string, end: string) {
    const cacheKey = `weather-${lat}-${lon}`;
    const cachedData = await this.redisService.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
    try {
      const url = `${process.env.HISTORY_API}?lat=${lat}&lon=${lon}&type=hour&start=${start}&end=${end}&appid=${process.env.API_KEY}`;

      const response = await axios.get(url);
      if (response.status === 200) {
        const data = response.data;
        await this.redisService.set(cacheKey, JSON.stringify(data), 60 * 60); // Cache for  1 hour
        return data;
      }
    } catch (error) {
      throw new HttpException(
        'Unauthorized to access resource , please check your API key',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

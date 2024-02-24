import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { error } from 'console';

@Injectable()
export class WeatherApiService {
  async getWeatherData(lat: string, lon: string) {
    const url = `${process.env.WEATHER_API}?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`;
    try {
      if (lat && lon) {
        const response = await axios.get(url);
        if (response.status === 200) {
          return response.data;
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
          // The request was made but no response was received
          throw new HttpException(
            'No response received from the server',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        } else {
          // Something happened in setting up the request that triggered an Error
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
}

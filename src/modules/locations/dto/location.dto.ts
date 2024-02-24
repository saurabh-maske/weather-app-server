import { ApiProperty } from '@nestjs/swagger';

export class LocationInputDto {
  @ApiProperty({
    description: 'The name of the location',
    example: 'New York',
  })
  name: string;

  @ApiProperty({
    description: 'The latitude of the location',
    example:  "40.7128",
  })
  latitude: string;

  @ApiProperty({
    description: 'The longitude of the location',
    example: "-74.0060",
  })
  longitude: string;
}
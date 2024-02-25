/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
    imports: [],
    controllers: [],
    providers: [RedisService],
})
export class RedisModule {}

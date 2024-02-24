import { Module } from '@nestjs/common';
import {ConfigModule,ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import {datasourceOptions} from '../connection/dataSource'



@Module({
    imports: [ConfigModule.forRoot({isGlobal:true}),
        TypeOrmModule.forRootAsync({
        useFactory: ()=> datasourceOptions,
        inject :[ConfigService]
    })],
    controllers: [],
    providers: [],
})
export class ConnectionModule {}

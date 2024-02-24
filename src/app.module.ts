import { ConnectionModule } from './connection/connection.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

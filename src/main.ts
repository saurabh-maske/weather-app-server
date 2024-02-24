import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.port ?? 3000;
  const app = await NestFactory.create(AppModule);
  await app
    .listen(port)
    .then(() => console.log('Weather app BE server started sucessfully'));
}
bootstrap();

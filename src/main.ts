import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/httpExceptionFIlter';

async function bootstrap() {
  const port = process.env.port ?? 3000;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Weather App API')
    .setDescription('api set to get weather data based on lat lon')
    .setVersion('1.0')
    .addTag('weather')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app
    .listen(port)
    .then(() =>
      console.log('Weather app BE server started sucessfully on', port),
    );
}
bootstrap();

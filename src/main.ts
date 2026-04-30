/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/kpi');
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
  origin: '*' /*[
    
    //'https://your-frontend.com',
    // 'https://admin.your-frontend.com',
  ]*/,
  methods: 'GET,POST,PUT,PATCH',
  credentials: true,
});
  const config = new DocumentBuilder()
    .setTitle('KPI System API')
    .setDescription('API for KPI System')
    .setVersion('1.0')
    .addTag('Strategy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

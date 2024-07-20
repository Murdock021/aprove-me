import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shareds/exceptions/all-excrptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const globalPrefix = 'backend';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Documentação  Swagger - Bankme API')
    .setDescription('API de autenticação Bankme')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/api-docs`, app, document);

  await app.listen(process.env.BACKEND_PORT || 3000);
}
bootstrap();

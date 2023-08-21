import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  // uncomment to check uncaughtException handler
  // throw Error('Test Error!');
  // uncomment to check unhandledRejection handler
  // Promise.reject(new Error('Resource not yet loaded!'));
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home Library Service API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 4000);
}

const logger = new LoggingService();

process.on('uncaughtException', async (err, origin) => {
  await logger.error(`Caught exception: ${err}, Exception origin: ${origin}`);
});

process.on('unhandledRejection', async (reason, promise) => {
  await logger.error(`Unhandled rejection at: ${promise}, reason: ${reason}`);
});

bootstrap();

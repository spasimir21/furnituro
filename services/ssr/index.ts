import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { SSRModule } from './ssr.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(SSRModule, new FastifyAdapter());
  app.enableCors({ origin: ['http://furnituro.com'] });

  await app.listen(parseInt(process.env.SERVER_PORT as string), '0.0.0.0');
}

bootstrap();


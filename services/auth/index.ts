import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AuthModule, new FastifyAdapter());
  app.enableCors({ origin: ['http://dialogic.com'] });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: './proto/auth.proto',
      url: `0.0.0.0:${process.env.SERVICE_PORT}`
    }
  });

  await app.startAllMicroservices();
  await app.listen(parseInt(process.env.SERVER_PORT as string), '0.0.0.0');
}

bootstrap();

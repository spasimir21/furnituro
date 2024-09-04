import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(UserModule, new FastifyAdapter());
  app.enableCors({ origin: ['http://furnituro.com'] });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'user',
  //     protoPath: './proto/user.proto',
  //     url: `0.0.0.0:${process.env.SERVICE_PORT}`
  //   }
  // });

  // await app.startAllMicroservices();
  await app.listen(parseInt(process.env.SERVER_PORT as string), '0.0.0.0');
}

bootstrap();


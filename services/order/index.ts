import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrderModule } from './order.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(OrderModule, new FastifyAdapter());
  app.enableCors({ origin: ['http://furnituro.com'] });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'order',
  //     protoPath: './proto/order.proto',
  //     url: `0.0.0.0:${process.env.SERVICE_PORT}`
  //   }
  // });

  // await app.startAllMicroservices();
  await app.listen(parseInt(process.env.SERVER_PORT as string), '0.0.0.0');
}

bootstrap();


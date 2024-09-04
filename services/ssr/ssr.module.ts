import { SSRController } from './ssr.controller';
import { SSRConfigProvider } from './config';
import { PageService } from './page.service';
import { SSRService } from './ssr.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [SSRController],
  providers: [SSRConfigProvider, PageService, SSRService]
})
class SSRModule {}

export { SSRModule };

import { Controller, Get, Header, Inject, Param, Req } from '@nestjs/common';
import { getDataFromRequest, renderSSRWithRequestData } from './requestData';
import { PageService } from './page.service';
import { SSRService } from './ssr.service';

@Controller()
class SSRController {
  constructor(
    @Inject(PageService) private readonly pageService: PageService,
    @Inject(SSRService) private readonly ssrService: SSRService
  ) {}

  // @Get('/products')
  // @Header('Content-Type', 'text/html')
  // async products(@Req() request: any) {
  //   const data = await this.ssrService.getProductsSSRData();

  //   return renderSSRWithRequestData(request, {
  //     page: this.pageService.pages.products,
  //     data,
  //     title: `Products`
  //   });
  // }

  @Get('/*')
  @Header('Content-Type', 'text/html')
  fallbackHandler(@Req() request: any) {
    return this.pageService.indexSource.replace('NO_THEME', getDataFromRequest(request).theme);
  }
}

export { SSRController };

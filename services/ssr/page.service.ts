import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { parseIndexHtml } from '@libs/shared/ssr';
import { createPages } from './pages';
import { SSRConfig } from './config';
import * as fs from 'fs/promises';

@Injectable()
class PageService implements OnModuleInit {
  public readonly pages = {} as ReturnType<typeof createPages>;
  public indexSource: string = '';

  constructor(@Inject(SSRConfig) private readonly ssrConfig: SSRConfig) {}

  async onModuleInit() {
    await this.loadPages();
  }

  async loadPages() {
    const indexSource = (await fs.readFile(this.ssrConfig.indexHtmlDist)).toString();

    let indexPage;
    [this.indexSource, indexPage] = parseIndexHtml(indexSource);

    const pages = createPages(indexPage);

    Object.assign(this.pages, pages);
  }
}

export { PageService };

import { unwrapResultWithNull } from '@libs/shared/utils/result';
import { FilesInterceptor } from '@nest-lab/fastify-multer';
import { TokenGuard } from '@libs/server/token';
import { ImageService } from './image.service';
import { ImageConfig } from './config';
import { FastifyReply } from 'fastify';
import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';

@Controller()
class ImageHTTPController {
  constructor(
    @Inject(ImageService) private readonly imageService: ImageService,
    @Inject(ImageConfig) private readonly config: ImageConfig
  ) {}

  @Get('/:size/:hash')
  @HttpCode(HttpStatus.OK)
  async getImage(@Res() res: FastifyReply, @Param('size') size: string, @Param('hash') hash: string) {
    const stream = unwrapResultWithNull(await this.imageService.getImage(hash, size));

    if (stream == null) throw new HttpException('Image not found!', HttpStatus.NOT_FOUND);

    res.header('Content-Type', `image/${this.config.format}`);
    res.send(stream);
  }

  @Post('/upload')
  @HttpCode(HttpStatus.OK)
  @UseGuards(TokenGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async uploadImage(@UploadedFiles() images: Express.Multer.File[]) {
    return { hashes: await this.imageService.saveImages(images) };
  }
}

export { ImageHTTPController };


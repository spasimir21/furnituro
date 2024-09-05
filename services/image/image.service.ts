import { unwrapResultSafe, wrapResultAsync } from '@libs/shared/utils/result';
import { mkdir, stat, writeFile } from 'fs/promises';
import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { ImageConfig } from './config';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import sharp from 'sharp';
import path from 'path';

@Injectable()
class ImageService {
  constructor(
    @Inject(ImageConfig) private readonly config: ImageConfig,
    private readonly prismaService: PrismaService
  ) {}

  private getImagePath(hash: string, size: string): string {
    return path.join(
      this.config.image_path,
      `${hash.substring(0, this.config.hash_grouping)}/${size}:${hash}.${this.config.format}`
    );
  }

  getImage(hash: string, size: string) {
    return wrapResultAsync(async () => {
      const filePath = this.getImagePath(hash, size);
      await stat(filePath); // Make sure file exists
      return createReadStream(filePath);
    });
  }

  private saveImage(file: Express.Multer.File, size: string, isMain: boolean) {
    return wrapResultAsync(async () => {
      const hash = createHash(this.config.hash).update(file.buffer).digest('hex');
      const imagePath = this.getImagePath(hash, size);

      const image = sharp(file.buffer);

      const maxDimension = this.config.sizes[size];

      const metadata = await image.metadata();
      if ((metadata.width ?? 0) > maxDimension || (metadata.height ?? 0) > maxDimension)
        image.resize({ width: maxDimension, height: maxDimension, fit: 'inside' });

      const buffer = await image
        .flatten({ background: this.config.background })
        .toFormat(this.config.format)
        .toBuffer();

      let exists = false;

      // Only write the file if it doesn't exist
      try {
        await stat(imagePath);
        exists = true;
      } catch (err) {
        // prettier-ignore
        await mkdir(path.join(this.config.image_path, hash.substring(0, this.config.hash_grouping)), { recursive: true });
        await writeFile(imagePath, buffer);

        if (isMain) await this.prismaService.image.create({ data: { hash } });
      }

      return [hash, exists] as const;
    });
  }

  async saveImages(images: Express.Multer.File[]) {
    const hashes = [] as (string | null)[];

    const mainSize = Object.keys(this.config.sizes)[0];

    for (const image of images) {
      let hash: string | null = null;

      for (const size in this.config.sizes) {
        const isMain = size === mainSize;

        const [imageHash, exsists] = unwrapResultSafe(
          await this.saveImage(image, size, isMain),
          value => value,
          () => [null, false] as const
        );

        hash = imageHash;

        if (imageHash == null || exsists) break;
      }

      hashes.push(hash);
    }

    return hashes;
  }
}

export { ImageService };


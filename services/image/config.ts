import { ConfigProvider, ConfigSymbol } from '@libs/server/config';
import { FormatEnum } from 'sharp';

interface ImageConfig {
  image_path: string;
  background: string;
  hash_grouping: number;
  hash: string;
  format: keyof FormatEnum;
  sizes: Record<string, number>;
}

const ImageConfig = ConfigSymbol('image');

const ImageConfigProvider = ConfigProvider('./config/image.yml', ImageConfig);

export { ImageConfig, ImageConfigProvider };


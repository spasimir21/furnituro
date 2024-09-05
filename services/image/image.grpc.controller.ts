import { Controller, Inject } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller()
class ImageGRPCController {
  constructor(@Inject(ImageService) private readonly imageService: ImageService) {}
}

export { ImageGRPCController };


import { Controller, Inject } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller()
class RatingGRPCController {
  constructor(@Inject(RatingService) private readonly ratingService: RatingService) {}
}

export { RatingGRPCController };

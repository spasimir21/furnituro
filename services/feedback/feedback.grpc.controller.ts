import { Controller, Inject } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller()
class FeedbackGRPCController {
  constructor(@Inject(FeedbackService) private readonly feedbackService: FeedbackService) {}
}

export { FeedbackGRPCController };


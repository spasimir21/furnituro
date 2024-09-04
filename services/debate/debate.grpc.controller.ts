import { Controller, Inject } from '@nestjs/common';
import { DebateService } from './debate.service';

@Controller()
class DebateGRPCController {
  constructor(@Inject(DebateService) private readonly debateService: DebateService) {}
}

export { DebateGRPCController };

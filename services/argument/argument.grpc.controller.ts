import { ArgumentService } from './argument.service';
import { Controller, Inject } from '@nestjs/common';

@Controller()
class ArgumentGRPCController {
  constructor(@Inject(ArgumentService) private readonly argumentService: ArgumentService) {}
}

export { ArgumentGRPCController };

import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
class UserGRPCController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}
}

export { UserGRPCController };

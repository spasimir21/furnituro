import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { TokenGuard } from '@libs/server/token';
import { UserService } from './user.service';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class UserHTTPController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}
}

export { UserHTTPController };

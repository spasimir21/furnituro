import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { DebateService } from './debate.service';
import { TokenGuard } from '@libs/server/token';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class DebateHTTPController {
  constructor(@Inject(DebateService) private readonly debateService: DebateService) {}
}

export { DebateHTTPController };

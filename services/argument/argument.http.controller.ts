import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ArgumentService } from './argument.service';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class ArgumentHTTPController {
  constructor(@Inject(ArgumentService) private readonly argumentService: ArgumentService) {}
}

export { ArgumentHTTPController };

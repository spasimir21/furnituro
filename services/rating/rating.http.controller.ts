import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { TokenGuard } from '@libs/server/token';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class RatingHTTPController {
  constructor(@Inject(RatingService) private readonly ratingService: RatingService) {}
}

export { RatingHTTPController };

import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { CreateRatingDto } from './dto/CreateRating.dto';
import { RatingService } from './rating.service';
import { TokenGuard } from '@libs/server/token';
import { UseZodGuard } from 'nestjs-zod';

@Controller()
class RatingHTTPController {
  constructor(@Inject(RatingService) private readonly ratingService: RatingService) {}

  @Get('/:productId')
  get(@Param('productId') productId: string) {
    return this.ratingService.get(productId);
  }

  @UseZodGuard('body', CreateRatingDto)
  @Post('/:productId')
  create(@Param('productId') productId: string, @Body() input: CreateRatingDto) {
    return this.ratingService.create(productId, input);
  }

  @UseGuards(TokenGuard)
  @Delete('/:productId/:id')
  delete(@Param('productId') productId: string, @Param('id') id: string) {
    return this.ratingService.delete(productId, id);
  }
}

export { RatingHTTPController };

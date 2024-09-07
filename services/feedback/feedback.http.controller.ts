import { Body, Controller, Delete, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/CreateFeedback.dto';
import { FeedbackService } from './feedback.service';
import { TokenGuard } from '@libs/server/token';
import { UseZodGuard } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

@Controller()
class FeedbackHTTPController {
  constructor(@Inject(FeedbackService) private readonly feedbackService: FeedbackService) {}

  @Get('/')
  get() {
    return this.feedbackService.get();
  }

  @UseZodGuard('body', CreateFeedbackDto)
  @Post('/')
  create(@Body() input: CreateFeedbackDto) {
    return this.feedbackService.create(input);
  }

  @UseGuards(TokenGuard)
  @Delete('/archive/:id')
  archive(@Param('id') id: string) {
    return this.feedbackService.archive(id);
  }

  @UseZodGuard('body', z.object({ email: z.string().email() }))
  @Post('/email-list')
  subscribeToMailList(@Body() input: { email: string }) {
    return this.feedbackService.subscribeToMailList(input.email);
  }

  @UseZodGuard('query', z.object({ email: z.string().email() }))
  @Delete('/email-list')
  unsubscribeFromMailList(@Query('email') email: string) {
    return this.feedbackService.unsubscribeFromMailList(email);
  }
}

export { FeedbackHTTPController };


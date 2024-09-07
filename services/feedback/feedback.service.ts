import { CreateFeedbackDto } from './dto/CreateFeedback.dto';
import { wrapResultAsync } from '@libs/shared/utils/result';
import { Feedback } from './interface/Feedback.interface';
import { PrismaService } from '@libs/server/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { FeedbackConfig } from './config';

@Injectable()
class FeedbackService {
  constructor(
    @Inject(FeedbackConfig) private readonly config: FeedbackConfig,
    private readonly prismaService: PrismaService
  ) {}

  async get(): Promise<Feedback[]> {
    const messages = await this.prismaService.feedback.findMany({
      where: { is_archived: false }
    });

    return messages.map(message => ({
      id: message.id,
      name: message.name,
      email: message.email,
      subject: message.subject,
      comment: message.message
    }));
  }

  async create(input: CreateFeedbackDto) {
    const message = await this.prismaService.feedback.create({
      data: {
        name: input.name,
        email: input.email,
        subject: input.subject,
        message: input.comment
      }
    });

    return {
      id: message.id,
      name: message.name,
      email: message.email,
      subject: message.subject,
      comment: message.message
    };
  }

  async archive(id: string) {
    await this.prismaService.feedback.update({
      where: { id },
      data: { is_archived: true }
    });
  }

  subscribeToMailList(email: string) {
    return wrapResultAsync(async () => {
      await this.prismaService.subscribedEmail.create({
        data: { email }
      });
    });
  }

  unsubscribeFromMailList(email: string) {
    return wrapResultAsync(async () => {
      await this.prismaService.subscribedEmail.delete({
        where: { email }
      });
    });
  }
}

export { FeedbackService };


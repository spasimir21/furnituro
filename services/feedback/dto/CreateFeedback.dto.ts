import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateFeedbackSchema = z.object({
  name: z.string().min(2).max(256),
  email: z.string().min(2).max(256).email(),
  subject: z.string().min(2).max(256),
  comment: z.string().min(2).max(2048)
});

class CreateFeedbackDto extends createZodDto(CreateFeedbackSchema) {}

export { CreateFeedbackDto };


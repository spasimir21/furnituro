import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateRatingSchema = z.object({
  rating: z.number().min(1).max(5).int(),
  comment: z.string().min(2).max(256).optional()
});

class CreateRatingDto extends createZodDto(CreateRatingSchema) {}

export { CreateRatingDto };


import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateCategorySchema = z.object({
  name: z.string().min(3).max(256),
  coverPhoto: z.string().optional()
});

class CreateCategoryDto extends createZodDto(CreateCategorySchema) {}

export { CreateCategoryDto };


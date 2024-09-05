import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const EditCategorySchema = z.object({
  name: z.string().min(3).max(256).optional(),
  coverPhoto: z.string().optional()
});

class EditCategoryDto extends createZodDto(EditCategorySchema) {}

export { EditCategoryDto };


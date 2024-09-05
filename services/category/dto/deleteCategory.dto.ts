import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const DeleteCategorySchema = z.object({
  id: z.string().uuid()
});

class DeleteCategoryDto extends createZodDto(DeleteCategorySchema) {}

export { DeleteCategoryDto };


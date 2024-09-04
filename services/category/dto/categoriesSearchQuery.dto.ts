import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CategoriesSearchQuerySchema = z.object({
  search: z.string().trim().max(64).optional()
});

class CategoriesSearchQueryDto extends createZodDto(CategoriesSearchQuerySchema) {}

export { CategoriesSearchQueryDto };

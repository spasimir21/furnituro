import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CategoryNamesSchema = z.object({
  names: z.array(z.string().trim().min(3).max(64))
});

class CategoryNamesDto extends createZodDto(CategoryNamesSchema) {}

export { CategoryNamesDto };

import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ProductQuerySchema = z.object({
  page: z.number().min(0).int(),
  perPage: z.number().min(1).max(20).int(),
  category: z.string().optional(),
  sortBy: z.enum(['newest', 'name', 'price']),
  sortOrder: z.enum(['asc', 'desc'])
});

class ProductQueryDto extends createZodDto(ProductQuerySchema) {}

export { ProductQueryDto };


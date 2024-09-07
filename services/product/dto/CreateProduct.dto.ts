import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateProductSchema = z.object({
  name: z.string().min(3).max(512),
  shortDescription: z.string().min(3).max(512),
  description: z.string().min(32),
  originalPrice: z.number().min(0).int(),
  discount: z.number().min(0).max(100).int().optional(),
  quantity: z.number().min(0).int(),
  isNew: z.boolean().optional(),
  coverPhoto: z.string(),
  additionalPhotos: z.array(z.string()).optional(),
  sizes: z.array(z.string()),
  colors: z.array(z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)),
  categories: z.array(z.string()).optional()
});

class CreateProductDto extends createZodDto(CreateProductSchema) {}

export { CreateProductDto, CreateProductSchema };


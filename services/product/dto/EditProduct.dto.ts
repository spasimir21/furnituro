import { CreateProductSchema } from './CreateProduct.dto';
import { createZodDto } from 'nestjs-zod';

const EditProductSchema = CreateProductSchema.partial();

class EditProductDto extends createZodDto(EditProductSchema) {}

export { EditProductDto };

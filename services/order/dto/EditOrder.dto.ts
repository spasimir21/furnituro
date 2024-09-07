import { CreateOrderSchema } from './CreateOrder.dto';
import { createZodDto } from 'nestjs-zod';

const EditOrderSchema = CreateOrderSchema.partial();

class EditOrderDto extends createZodDto(EditOrderSchema) {}

export { EditOrderDto };

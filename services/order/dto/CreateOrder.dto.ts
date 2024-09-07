import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateOrderSchema = z.object({
  customer: z.object({
    name: z.object({
      first: z.string().min(2).max(256),
      last: z.string().min(2).max(256)
    }),
    company: z.string().min(2).max(256).optional(),
    phoneNumber: z.string().regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
    email: z.string().email()
  }),
  address: z.object({
    country: z.string().min(2).max(256),
    city: z.string().min(2).max(256),
    address: z.string().min(2).max(512),
    postalCode: z.number().int().min(0)
  }),
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1).int(),
      size: z.string(),
      color: z.string()
    })
  ),
  extraInformation: z.string().max(1024).optional()
});

class CreateOrderDto extends createZodDto(CreateOrderSchema) {}

export { CreateOrderDto, CreateOrderSchema };


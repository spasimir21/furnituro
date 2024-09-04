import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const EmailLoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4).max(64)
  })
  .strict();

class EmailLoginDto extends createZodDto(EmailLoginSchema) {}

export { EmailLoginDto, EmailLoginSchema };

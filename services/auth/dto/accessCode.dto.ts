import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const AccessCodeSchema = z
  .object({
    accessCode: z.string()
  })
  .strict();

class AccessCodeDto extends createZodDto(AccessCodeSchema) {}

export { AccessCodeDto };

import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RefreshSecretSchema = z
  .object({
    refreshSecret: z.string().length(32)
  })
  .strict();

class RefreshSecretDto extends createZodDto(RefreshSecretSchema) {}

export { RefreshSecretDto };

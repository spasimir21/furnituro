import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UserInfoSchema = z
  .object({
    fullname: z.string().min(4).max(64).optional()
  })
  .strict();

class UserInfoDto extends createZodDto(UserInfoSchema) {}

export { UserInfoSchema, UserInfoDto };

import { AuthProvider } from '@prisma/client';
import { z } from 'nestjs-zod/z';

const UserDataSchema = z.object({
  id: z.string(),
  authProvider: z.enum([AuthProvider.EMAIL, AuthProvider.GOOGLE]),
  email: z.string().email(),
  fullname: z.string(),
  profilePictureURL: z.string().url()
});

type UserData = z.infer<typeof UserDataSchema>;

export { UserData, UserDataSchema };

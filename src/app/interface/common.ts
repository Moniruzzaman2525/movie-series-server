import { UserRole } from '@prisma/client';

export type IAuthUser = {
  email: string;
  id: string;
  role: UserRole;
} | null;

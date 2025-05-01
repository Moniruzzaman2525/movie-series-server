import prisma from '../../../helpers/prisma';
import bcrypt from 'bcrypt';

const createUser = async (payload: any) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const hashPassword: string = await bcrypt.hash(payload.password, 12);
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createAt: true,
      updateAt: true,
    },
  });

  return result;
};

export const UserServices = {
  createUser,
};

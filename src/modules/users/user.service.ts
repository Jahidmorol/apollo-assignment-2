import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDb = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

export const userServices = {
  createUserIntoDb,
};

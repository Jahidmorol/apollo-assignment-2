import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDb = async (userData: TUser) => {
  const result = await UserModel.create(userData);
  return result;
};

//----------------------------------------------------------------
const getAllUsersFromDb = async () => {
  const result = await UserModel.find(
    {},
    {
      username: 1,
      'fullName.firstName': 1,
      'fullName.lastName': 1,
      age: 1,
      email: 1,
      'address.street': 1,
      'address.city': 1,
      'address.country': 1,
    },
  );
  return result;
};

//-------------------------------------------------------
const getSingleUserFormDb = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

//-------------------------------------------------------
const updateUserFormDb = async (userId: string, updatingData: TUser) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatingData, {
    new: true,
    projection: { password: 0 },
  });
  return result;
};

//------------------------------------------------------
const deleteUserFormDb = async (userId: string) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

//------------------------------------------------------
const addProductForSingleUserFromDb = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

//------------------------------------------------------
const getAllOrdersForUserFormDb = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

//------------------------------------------------------
// const getTotalOrdersPriceForUserFormDb = async (userId: string) => {
//   const result = await UserModel.findOne({ userId });
//   if (result.orders.length > 0) {
//   }
//   return result;
// };

//-------------*********************************--------------------
export const userServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFormDb,
  updateUserFormDb,
  deleteUserFormDb,
  addProductForSingleUserFromDb,
  getAllOrdersForUserFormDb,
  //   getTotalOrdersPriceForUserFormDb,
};

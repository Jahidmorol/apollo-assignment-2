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
    projection: { password: 0, _id: 0 },
  });
  return result;
};

//------------------------------------------------------
const deleteUserFormDb = async (userId: string) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

//------------------------------------------------------
const addProductForSingleUserFromDb = async (
  userId: string,
  productName: string,
  price: number,
  quantity: number,
) => {
  const id = Number(userId);

  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    {
      $push: {
        orders: {
          productName,
          price,
          quantity,
        },
      },
    },
    { upsert: true },
  );
  return result;
};

//------------------------------------------------------
const getAllOrdersForUserFormDb = async (userId: string) => {
  const id = Number(userId);
  const result = await UserModel.findOne({ userId: id }, { orders: 1 });
  return result;
};

//------------------------------------------------------
const getTotalPriceForUserOrderFormDb = async (userId: string) => {
  const id = Number(userId);
  const result = await UserModel.aggregate([
    { $match: { userId: id } },
    {
      $project: {
        totalOrdersPrice: {
          $reduce: {
            input: '$orders',
            initialValue: 0,
            in: {
              $add: [
                '$$value',
                { $multiply: ['$$this.price', '$$this.quantity'] },
              ],
            },
          },
        },
      },
    },
  ]);
  return result;
};

//-------------*********************************--------------------
export const userServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFormDb,
  updateUserFormDb,
  deleteUserFormDb,
  addProductForSingleUserFromDb,
  getAllOrdersForUserFormDb,
  getTotalPriceForUserOrderFormDb,
};

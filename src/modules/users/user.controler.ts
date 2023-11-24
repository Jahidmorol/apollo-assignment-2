import { Request, Response } from 'express';
import { userServices } from './user.service';
import { validatedUser } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const validationDataWithZod = validatedUser.parse(userData);
    const result = await userServices.createUserIntoDb(validationDataWithZod);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//----------------
const findUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDb();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//----------------
const findSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFormDb(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//------------------
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;
    const result = await userServices.updateUserFormDb(userId, updatedData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

//----------------------
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteUserFormDb(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null || result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userController = {
  createUser,
  findUsers,
  findSingleUser,
  updateUser,
  deleteUser,
};

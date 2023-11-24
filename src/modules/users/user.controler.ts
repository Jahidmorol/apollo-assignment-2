/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { userServices } from './user.service';
import { validatedUser } from './user.validation';

//----------------
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const validationDataWithZod = validatedUser.parse(userData);
    const result = await userServices.createUserIntoDb(validationDataWithZod);

    const resultWithoutPass = {
      ...result.toObject(),
      password: undefined,
      _id: undefined,
    };

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: resultWithoutPass,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

//----------------
const findSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userServices.getSingleUserFormDb(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

//-----------------
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;
    const validationDataWithZod = validatedUser.parse(updatedData);
    const result = await userServices.updateUserFormDb(
      userId,
      validationDataWithZod,
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

//-----------------
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userServices.deleteUserFormDb(userId);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

//---------------------**************-------------------------//
export const userController = {
  createUser,
  findUsers,
  findSingleUser,
  updateUser,
  deleteUser,
};

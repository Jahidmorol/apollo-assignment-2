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

    // const resultWithoutPass = {
    //   ...result.toObject(),
    //   password: undefined,
    //   _id: undefined,
    //   orders: undefined,
    // };

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
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

//-----------------
const addProductForSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productName, price, quantity } = req.body;

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

    await userServices.addProductForSingleUserFromDb(
      userId,
      productName,
      price,
      quantity,
    );
    // user.orders = user.orders || [];

    // user.orders.push({
    //   productName,
    //   price,
    //   quantity,
    // });
    // await user.save();

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
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

//-----------------
const getAllOrdersForUser = async (req: Request, res: Response) => {
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

    if (!user.orders || user.orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No orders found for the user',
        data: {
          orders: [],
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: {
        orders: user.orders,
      },
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
const getTotalOrdersPriceForUser = async (req: Request, res: Response) => {
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

    if (!user.orders || user.orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No orders found for the user',
        data: {
          orders: [],
        },
      });
    }

    const totalPrice =
      await userServices.getTotalPriceForUserOrderFormDb(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: totalPrice,
      },
    });

    res.status(200).json();
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
  addProductForSingleUser,
  getAllOrdersForUser,
  getTotalOrdersPriceForUser,
};

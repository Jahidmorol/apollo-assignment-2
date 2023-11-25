"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
//----------------
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: userData } = req.body;
        const validationDataWithZod = user_validation_1.validatedUser.parse(userData);
        const result = yield user_service_1.userServices.createUserIntoDb(validationDataWithZod);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
        });
    }
});
//----------------
const findUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsersFromDb();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
        });
    }
});
//----------------
const findSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_service_1.userServices.getSingleUserFormDb(userId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
        });
    }
});
//-----------------
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const validationDataWithZod = user_validation_1.validatedUpdateUser.parse(updatedData);
        const result = yield user_service_1.userServices.updateUserFormDb(userId, validationDataWithZod);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
        });
    }
});
//-----------------
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const deletedUser = yield user_service_1.userServices.deleteUserFormDb(userId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
        });
    }
});
//-----------------
const addProductForSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { productName, price, quantity } = req.body;
        const user = yield user_service_1.userServices.getSingleUserFormDb(userId);
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
        yield user_service_1.userServices.addProductForSingleUserFromDb(userId, productName, price, quantity);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
        });
    }
});
//-----------------
const getAllOrdersForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        const user = yield user_service_1.userServices.getSingleUserFormDb(userId);
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
        const orders = yield user_service_1.userServices.getAllOrdersForUserFormDb(userId);
        if (!orders || ((_a = orders.orders) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            return res.status(200).json({
                success: true,
                message: 'No orders found for the user',
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: { orders: orders.orders },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
        });
    }
});
//-----------------
const getTotalOrdersPriceForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    try {
        const { userId } = req.params;
        const user = yield user_service_1.userServices.getSingleUserFormDb(userId);
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
        const orders = yield user_service_1.userServices.getTotalPriceForUserOrderFormDb(userId);
        if (!orders || !((_b = orders[0]) === null || _b === void 0 ? void 0 : _b.orders) || ((_c = orders[0]) === null || _c === void 0 ? void 0 : _c.orders.length) === 0) {
            return res.status(200).json({
                success: true,
                message: 'No orders found for the user',
                data: {
                    orders: 'No orders found',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice: (_d = orders[0]) === null || _d === void 0 ? void 0 : _d.totalOrdersPrice,
            },
        });
        res.status(200).json();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            data: error,
        });
    }
});
//---------------------**************-------------------------//
exports.userController = {
    createUser,
    findUsers,
    findSingleUser,
    updateUser,
    deleteUser,
    addProductForSingleUser,
    getAllOrdersForUser,
    getTotalOrdersPriceForUser,
};

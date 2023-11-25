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
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(userData);
    const userWithoutSensitiveInfo = yield user_model_1.UserModel.findById(result._id).select('-password -_id -orders');
    return userWithoutSensitiveInfo;
});
//----------------------------------------------------------------
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find({}, {
        username: 1,
        'fullName.firstName': 1,
        'fullName.lastName': 1,
        age: 1,
        email: 1,
        'address.street': 1,
        'address.city': 1,
        'address.country': 1,
    });
    return result;
});
//-------------------------------------------------------
const getSingleUserFormDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId }, { password: 0, 'fullName._id': 0, _id: 0, 'address._id': 0, orders: 0 });
    return result;
});
//-------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUserFormDb = (userId, updatingData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId }, { $set: updatingData }, {
        new: true,
        projection: {
            password: 0,
            'fullName._id': 0,
            _id: 0,
            'address._id': 0,
            orders: 0,
        },
    });
    return result;
});
//------------------------------------------------------
const deleteUserFormDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOneAndDelete({ userId });
    return result;
});
//------------------------------------------------------
const addProductForSingleUserFromDb = (userId, productName, price, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    const result = yield user_model_1.UserModel.findOneAndUpdate({ userId: id }, {
        $push: {
            orders: {
                productName,
                price,
                quantity,
            },
        },
    }, { upsert: true });
    return result;
});
//------------------------------------------------------
const getAllOrdersForUserFormDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: userId }, { orders: 1 });
    return result;
});
//------------------------------------------------------
const getTotalPriceForUserOrderFormDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    const result = yield user_model_1.UserModel.aggregate([
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
});
//-------------*********************************--------------------
exports.userServices = {
    createUserIntoDb,
    getAllUsersFromDb,
    getSingleUserFormDb,
    updateUserFormDb,
    deleteUserFormDb,
    addProductForSingleUserFromDb,
    getAllOrdersForUserFormDb,
    getTotalPriceForUserOrderFormDb,
};

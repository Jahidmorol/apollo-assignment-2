"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
const userAddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: {
        type: userNameSchema,
        required: true,
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: {
        type: userAddressSchema,
        required: true,
    },
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);

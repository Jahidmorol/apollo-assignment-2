"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatedUser = exports.validatedUpdateUser = void 0;
const zod_1 = require("zod");
const validatedFullName = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name must not be empty'),
    lastName: zod_1.z.string().min(1, 'Last name must not be empty'),
});
const validatedUserAddress = zod_1.z.object({
    street: zod_1.z.string().min(1, 'Street must not be empty'),
    city: zod_1.z.string().min(1, 'City must not be empty'),
    country: zod_1.z.string().min(1, 'Country must not be empty'),
});
const validatedUserOrders = zod_1.z.object({
    productName: zod_1.z.string().min(1, 'Product Name must not be empty'),
    price: zod_1.z.number().min(1, 'Price must not be empty'),
    quantity: zod_1.z.number().min(1, 'Quantity must not be empty'),
});
const validatedUser = zod_1.z.object({
    userId: zod_1.z.number().positive('User ID must be a positive number'),
    username: zod_1.z.string().min(1, 'Username must not be empty'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    fullName: validatedFullName,
    age: zod_1.z.number().positive('Age must be a positive number'),
    email: zod_1.z.string().email('Invalid email format'),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string().min(1, 'Hobby must not be empty')),
    address: validatedUserAddress,
    orders: zod_1.z.array(validatedUserOrders).optional().default([]),
});
exports.validatedUser = validatedUser;
exports.validatedUpdateUser = zod_1.z.object({
    userId: zod_1.z.number().optional(),
    username: zod_1.z.string().optional(),
    fullName: zod_1.z
        .object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
    })
        .optional(),
    age: zod_1.z.number().optional(),
    email: zod_1.z.string().email().optional(),
    isActive: zod_1.z.boolean().optional(),
    hobbies: zod_1.z.array(zod_1.z.string()).optional(),
    address: zod_1.z
        .object({
        street: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
    })
        .optional(),
});

import { Schema, model } from 'mongoose';
import { TUser, TUserAddress, TFullName, TOrders } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userOrdersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    type: fullNameSchema,
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
  orders: [userOrdersSchema],
});

userSchema.pre('save', async function (next) {
  const user = this as TUser;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.Bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<TUser>('User', userSchema);

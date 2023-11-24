import { z } from 'zod';

const validatedFullName = z.object({
  firstName: z.string().min(1, 'First name must not be empty'),
  lastName: z.string().min(1, 'Last name must not be empty'),
});

const validatedUserAddress = z.object({
  street: z.string().min(1, 'Street must not be empty'),
  city: z.string().min(1, 'City must not be empty'),
  country: z.string().min(1, 'Country must not be empty'),
});

const validatedUser = z.object({
  userId: z.number().positive('User ID must be a positive number'),
  username: z.string().min(1, 'Username must not be empty'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  fullName: validatedFullName,
  age: z.number().positive('Age must be a positive number'),
  email: z.string().email('Invalid email format'),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1, 'Hobby must not be empty')),
  address: validatedUserAddress,
});

export { validatedUser };

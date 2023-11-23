import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  Database_Uri: process.env.MONGODB_URI,
  Bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
};

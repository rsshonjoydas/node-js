import dotenv from 'dotenv';

dotenv.config();

export default {
  APP_PORT: process.env.APP_PORT || 5000,
  APP_ENVIRONMENT: process.env.APP_ENVIRONMENT || 'production',

  // ? MongoDB localhost connection configuration
  MONGODB_HOST: process.env.MONGODB_HOST || 'localhost',
  MONGODB_PORT: process.env.MONGODB_PORT || 27017,
  MONGODB_NAME: process.env.MONGODB_NAME || 'test',

  // ? MongoDB live server connection configuration
  MONGODB_IP: process.env.MONGODB_IP || 'mongo',
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,

  // ? Redis connection configuration
  REDIS_HOST: process.env.REDIS_HOST || 'redis',
  REDIS_PORT: process.env.REDIS_PORT || 6379,

  SESSION_SECRET: process.env.SESSION_SECRET,
}
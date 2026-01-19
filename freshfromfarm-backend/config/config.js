import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: 8080,
  MONGO_URI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV,
  DB: process.env.DB,
  ACCESS_TOKEN_SECRET: process.env.SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_SECRET,
  GOOGLE_CLIENT_ID: process.env.CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.CALLBACK_URL,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};

export default config;

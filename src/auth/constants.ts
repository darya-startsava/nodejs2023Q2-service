import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  expireTime: process.env.TOKEN_EXPIRE_TIME,
};

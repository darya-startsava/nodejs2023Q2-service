import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const cryptSalt = Number.parseInt(process.env.CRYPT_SALT);

export function getHashPassword(password: string) {
  const saltRounds = cryptSalt;
  return bcrypt.hash(password, saltRounds);
}

export function isPasswordCorrect(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

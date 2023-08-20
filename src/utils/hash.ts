import * as bcrypt from 'bcrypt';
import 'dotenv/config';

export function getHashPassword(password: string) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export function isPasswordCorrect(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import User from 'src/types/user';
import { CreateUser, UpdatePassword } from 'src/utils/types';
import { UserResponse } from './userResponse';

@Injectable()
export class UserService {
  users: User[] = [];

  getUsers() {
    return this.users.map((user) => new UserResponse(user));
  }

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return new UserResponse(user);
    }
    return null;
  }

  createUser(createUserDto: CreateUser) {
    const timestamp = Date.now();
    const additionalInformation = {
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push({ ...createUserDto, ...additionalInformation });
    return { login: createUserDto.login, ...additionalInformation };
  }

  deleteUserById(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return index;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePassword) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return { index, user: null, updatedUserWithoutPassword: null };
    }
    const user = this.users[index];
    const timestamp = Date.now();
    const updatedUserWithoutPassword = {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      version: user.version + 1,
      updatedAt: timestamp,
    };
    this.users[index] = {
      ...updatedUserWithoutPassword,
      password: updatePasswordDto.newPassword,
    };
    return { index, user, updatedUserWithoutPassword };
  }
}

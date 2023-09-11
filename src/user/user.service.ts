import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { getHashPassword, isPasswordCorrect } from 'src/utils/hash';
import { CreateUser, UpdatePassword } from 'src/utils/types';
import { UserResponse } from './userResponse';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers.map((u) => new UserResponse(u));
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) {
      return new UserResponse(user);
    }
    return null;
  }

  async getUserByLogin(login: string) {
    const user = await this.prisma.user.findFirst({ where: { login } });
    if (user) {
      return user;
    }
    return null;
  }

  async createUser(createUserDto: CreateUser) {
    const hashPassword = await getHashPassword(createUserDto.password);
    const user = await this.prisma.user.create({
      data: {
        ...{ ...createUserDto, password: hashPassword },
        version: 1,
      },
    });
    return new UserResponse(user);
  }

  async deleteUserById(id: string) {
    const user = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return new UserResponse(user);
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePassword) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) {
      return null;
    }
    if (await isPasswordCorrect(updatePasswordDto.oldPassword, user.password)) {
      const newPassword = await getHashPassword(updatePasswordDto.newPassword);
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          password: newPassword,
          version: {
            increment: 1,
          },
        },
      });
      return new UserResponse(updatedUser);
    }
    return null;
  }
}

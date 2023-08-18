import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
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
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
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
    const user = await this.prisma.user.update({
      where: { id, password: updatePasswordDto.oldPassword },
      data: {
        password: updatePasswordDto.newPassword,
        version: {
          increment: 1,
        },
      },
    });

    return new UserResponse(user);
  }
}

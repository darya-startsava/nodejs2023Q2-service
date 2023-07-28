import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Body,
  Delete,
  HttpException,
  Put,
} from '@nestjs/common';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { StatusCodes } from 'http-status-codes';

import database from 'src/database';
import { CreateUserDto } from 'src/dto/createUser.dto';
import User from 'src/types/user';
import { UpdatePasswordDto } from 'src/dto/updatePassword.dto';

@Controller('user')
export class UserController {
  @Get()
  getUsers() {
    return database.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'User id is not valid uuid',
        StatusCodes.BAD_REQUEST,
      );
    }
    const user = database.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): User {
    if (!createUserDto.login || !createUserDto.password) {
      throw new HttpException(
        'Fields login and password are required',
        StatusCodes.BAD_REQUEST,
      );
    }
    const timestamp = Date.now();
    const additionalInformation = {
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    database.users.push({ ...createUserDto, ...additionalInformation });
    return { login: createUserDto.login, ...additionalInformation };
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUserById(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'User id is not valid uuid',
        StatusCodes.BAD_REQUEST,
      );
    }
    const index = database.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new HttpException(
        'User with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    database.users.splice(index, 1);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!uuidValidate(id)) {
      throw new HttpException(
        'User id is not valid uuid',
        StatusCodes.BAD_REQUEST,
      );
    }
    if (!updatePasswordDto.oldPassword || !updatePasswordDto.newPassword) {
      throw new HttpException(
        'Fields newPassword and oldPassword are required',
        StatusCodes.BAD_REQUEST,
      );
    }
    const index = database.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new HttpException(
        'User with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    const user = database.users[index];
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Wrong old password', StatusCodes.FORBIDDEN);
    }
    const timestamp = Date.now();
    const updatedUserWithoutPassword = {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      version: user.version + 1,
      updatedAt: timestamp,
    };
    database.users[index] = {
      ...updatedUserWithoutPassword,
      password: updatePasswordDto.newPassword,
    };
    return updatedUserWithoutPassword;
  }
}

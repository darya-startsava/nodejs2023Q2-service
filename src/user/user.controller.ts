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
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import User from 'src/types/user';
import { UpdatePasswordDto } from 'src/user/dtos/updatePassword.dto';
import { UserService } from 'src/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.userService.getUserById(id);
    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.userService.deleteUserById(id);
    if (index === -1) {
      throw new HttpException(
        'User with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { index, user, updatedUserWithoutPassword } =
      this.userService.updatePassword(id, updatePasswordDto);
    if (index === -1) {
      throw new HttpException(
        'User with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Wrong old password', StatusCodes.FORBIDDEN);
    }
    return updatedUserWithoutPassword;
  }
}

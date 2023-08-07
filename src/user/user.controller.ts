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
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import User from 'src/types/user';
import { UpdatePasswordDto } from 'src/user/dtos/updatePassword.dto';
import { UserService } from 'src/user/user.service';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UserResponse } from './userResponse';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Get all users
   */

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: UserResponse,
    isArray: true,
  })
  getUsers() {
    return this.userService.getUsers();
  }

  /**
   * Get user by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User with this id does not exist' })
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

  /**
   * Create new user
   */
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'The user has been created',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: ' Bad request. Body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Delete user by id
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @ApiNoContentResponse({
    description: 'The user has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User with this id does not exist' })
  deleteUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.userService.deleteUserById(id);
    if (index === -1) {
      throw new HttpException(
        'User with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  /**
   * Update user by id
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({
    description: 'The user has been updated',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User with this id does not exist' })
  @ApiForbiddenResponse({ description: 'Wrong old password' })
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

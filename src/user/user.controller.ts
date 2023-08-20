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
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

import { CreateUserDto } from 'src/user/dtos/createUser.dto';
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
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthGuard } from 'src/auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Get all users
   */
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getUserById(id);
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
  @UseGuards(AuthGuard)
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
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  /**
   * Delete user by id
   */
  @UseGuards(AuthGuard)
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
  async deleteUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const user = await this.userService.deleteUserById(id);
      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'User with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }

  /**
   * Update user by id
   */
  @UseGuards(AuthGuard)
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
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      const user = await this.userService.updatePassword(id, updatePasswordDto);
      if (!user) {
        const user = await this.userService.getUserById(id);
        if (!user) {
          throw new HttpException(
            'User with this id does not exist',
            StatusCodes.NOT_FOUND,
          );
        }
        throw new HttpException('Wrong old password', StatusCodes.FORBIDDEN);
      }
      return user;
    } catch (e) {
      throw e;
    }
  }
}

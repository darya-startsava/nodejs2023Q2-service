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
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import Album from 'src/types/album';
import { AuthGuard } from 'src/auth/auth.guard';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dtos/createAlbumDto.dto';
import { UpdateAlbumDto } from './dtos/updateAlbumDto.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AlbumResponse } from './albumResponse';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@ApiBearerAuth()
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  /**
   * Get all albums
   */
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: AlbumResponse,
    isArray: true,
  })
  getAlbums() {
    return this.albumService.getAlbums();
  }

  /**
   * Get album by id
   */
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get album' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: AlbumResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album with this id does not exist' })
  async getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumService.getAlbumById(id);
    if (!album) {
      throw new HttpException(
        'Album with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return album;
  }

  /**
   * Create new album
   */
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiCreatedResponse({
    description: 'The album has been created',
    type: AlbumResponse,
  })
  @ApiBadRequestResponse({
    description: ' Bad request. Body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDto);
  }

  /**
   * Delete album by id
   */
  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album' })
  @ApiNoContentResponse({
    description: 'The album has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album with this id does not exist' })
  async deleteAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const album = await this.albumService.deleteAlbumById(id);
      return album;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Album with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }

  /**
   * Update album by id
   */
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiOkResponse({
    description: 'The album has been updated',
    type: AlbumResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album with this id does not exist' })
  @UsePipes(new ValidationPipe())
  async updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      const album = await this.albumService.updateAlbum(id, updateAlbumDto);
      return album;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Album with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }
}

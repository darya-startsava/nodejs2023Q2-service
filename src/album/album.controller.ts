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
import { TrackService } from 'src/track/track.service';
import Album from 'src/types/album';

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
} from '@nestjs/swagger';
import { AlbumResponse } from './albumResponse';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  /**
   * Get all albums
   */
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
  getAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.getAlbumById(id);
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
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }

  /**
   * Delete album by id
   */
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
  deleteAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.albumService.deleteAlbumById(id);
    if (index === -1) {
      throw new HttpException(
        'Album with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    this.trackService.updateAlbumId(id);
  }
  /**
   * Update album by id
   */
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
  updateAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const { index, updatedAlbum } = this.albumService.updateAlbum(
      id,
      updateAlbumDto,
    );
    if (index === -1) {
      throw new HttpException(
        'Album with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return updatedAlbum;
  }
}

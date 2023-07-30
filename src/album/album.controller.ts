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
import Album from 'src/types/album';

import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dtos/createAlbumDto';
import { UpdateAlbumDto } from './dtos/updateAlbumDto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
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

  @Post()
  @UsePipes(new ValidationPipe())
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbumById(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.albumService.deleteAlbumById(id);
    if (index === -1) {
      throw new HttpException(
        'Album with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  @Put(':id')
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

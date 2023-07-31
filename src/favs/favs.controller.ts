import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Delete,
  HttpException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  getFavs() {
    return this.favsService.getFavs();
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.addTrackToFavs(id);
    if (result) {
      return;
    }
    throw new HttpException(
      'Track with this id does not exist',
      StatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.favsService.deleteTrackFromFavs(id);
    if (index === -1) {
      throw new HttpException(
        'Track with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.addAlbumToFavs(id);
    if (result) {
      return;
    }
    throw new HttpException(
      'Album with this id does not exist',
      StatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.favsService.deleteAlbumFromFavs(id);
    if (index === -1) {
      throw new HttpException(
        'Album with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  @Post('artist/:id')
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = this.favsService.addArtistToFavs(id);
    if (result) {
      return;
    }
    throw new HttpException(
      'Artist with this id does not exist',
      StatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.favsService.deleteArtistFromFavs(id);
    if (index === -1) {
      throw new HttpException(
        'Artist with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }
}

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
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AlbumResponse } from 'src/album/AlbumResponse';
import { FavoritesResponse } from './favsResponse';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  /**
   * Get all favorites tracks, artists, albums
   */
  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: FavoritesResponse,
  })
  getFavs() {
    return this.favsService.getFavs();
  }

  /**
   * Add track to favorites by track id
   */
  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiCreatedResponse({
    description: 'The track was added to favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track with this id does not exist',
  })
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

  /**
   * Delete track from favorites by track id
   */
  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiNoContentResponse({
    description: 'The track has been deleted from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track with this id does not exist' })
  deleteTrackFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.favsService.deleteTrackFromFavs(id);
    if (index === -1) {
      throw new HttpException(
        'Track with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  /**
   * Add album to favorites by album id
   */
  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiCreatedResponse({
    description: 'The album was added to favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album with this id does not exist',
  })
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

  /**
   * Delete album from favorites by album id
   */
  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiNoContentResponse({
    description: 'The album has been deleted from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album with this id does not exist' })
  deleteAlbumFromFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.favsService.deleteAlbumFromFavs(id);
    if (index === -1) {
      throw new HttpException(
        'Album with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  /**
   * Add artist to favorites by artist id
   */
  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiCreatedResponse({
    description: 'The artist was added to favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist with this id does not exist',
  })
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

  /**
   * Delete artist from favorites by artist id
   */
  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiNoContentResponse({
    description: 'The artist has been deleted from favorites',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist with this id does not exist' })
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

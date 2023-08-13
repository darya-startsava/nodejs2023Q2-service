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
import { AlbumService } from 'src/album/album.service';
import { CreateArtistDto } from 'src/artist/dtos/createArtistDto.dto';
import { UpdateArtistDto } from 'src/artist/dtos/updateArtistDto.dto';
import { ArtistService } from 'src/artist/artist.service';
import Artist from 'src/types/artist';
import { TrackService } from 'src/track/track.service';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ArtistResponse } from './artistResponse';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  /**
   * Get all artists
   */
  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: ArtistResponse,
    isArray: true,
  })
  getArtists() {
    return this.artistService.getArtists();
  }

  /**
   * Get artist by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get artist' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: ArtistResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist with this id does not exist' })
  async getArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException(
        'Artist with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return artist;
  }

  /**
   * Create new artist
   */
  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiCreatedResponse({
    description: 'The artist has been created',
    type: ArtistResponse,
  })
  @ApiBadRequestResponse({
    description: ' Bad request. Body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  createArtist(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(createArtistDto);
  }

  /**
   * Delete artist by id
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiNoContentResponse({
    description: 'The artist has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist with this id does not exist' })
  async deleteArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const artist = await this.artistService.deleteArtistById(id);
      //!TODO
      //this.albumService.updateArtistId(id);
      //this.trackService.updateArtistId(id);
      return artist;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Artist with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }

  /**
   * Update artist by id
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiOkResponse({
    description: 'The artist has been updated',
    type: ArtistResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist with this id does not exist' })
  @UsePipes(new ValidationPipe())
  async updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      const artist = await this.artistService.updateArtist(id, updateArtistDto);
      return artist;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Artist with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }
}

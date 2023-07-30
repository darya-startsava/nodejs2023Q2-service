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
import { CreateArtistDto } from 'src/artist/dtos/createArtistDto';
import { UpdateArtistDto } from 'src/artist/dtos/updateArtistDto';
import { ArtistService } from 'src/artist/artist.service';
import Artist from 'src/types/artist';
import { TrackService } from 'src/track/track.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistService.getArtistById(id);
    if (!artist) {
      throw new HttpException(
        'Artist with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return artist;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createArtist(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.createArtist(createArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtistById(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.artistService.deleteArtistById(id);
    if (index === -1) {
      throw new HttpException(
        'Artist with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    this.albumService.updateArtistId(id);
    this.trackService.updateArtistId(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const { index, updatedArtist } = this.artistService.updateArtist(
      id,
      updateArtistDto,
    );
    if (index === -1) {
      throw new HttpException(
        'Artist with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return updatedArtist;
  }
}

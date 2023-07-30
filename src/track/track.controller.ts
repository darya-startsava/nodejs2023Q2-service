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
import Track from 'src/types/track';
import { CreateTrackDto } from './dtos/createTrackDto';
import { UpdateTrackDto } from './dtos/updateTrackDto';

import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.getTrackById(id);
    if (!track) {
      throw new HttpException(
        'Track with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return track;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.trackService.deleteTrackById(id);
    if (index === -1) {
      throw new HttpException(
        'Track with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updaterack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const { index, updatedTrack } = this.trackService.updateTrack(
      id,
      updateTrackDto,
    );
    if (index === -1) {
      throw new HttpException(
        'Track with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
    return updatedTrack;
  }
}

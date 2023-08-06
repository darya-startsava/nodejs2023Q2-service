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
import { CreateTrackDto } from './dtos/createTrackDto.dto';
import { UpdateTrackDto } from './dtos/updateTrackDto.dto';
import { TrackService } from './track.service';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { TrackResponse } from './trackResponse';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  /**
   * Get all tracks
   */
  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: TrackResponse,
    isArray: true,
  })
  getTracks() {
    return this.trackService.getTracks();
  }

  /**
   * Get track by id
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get track' })
  @ApiOkResponse({
    description: 'Successful operation',
    type: TrackResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track with this id does not exist' })
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

  /**
   * Create new track
   */
  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiCreatedResponse({
    description: 'The track has been created',
    type: TrackResponse,
  })
  @ApiBadRequestResponse({
    description: ' Bad request. Body does not contain required fields',
  })
  @UsePipes(new ValidationPipe())
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  /**
   * Delete track by id
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track' })
  @ApiNoContentResponse({
    description: 'The track has been deleted',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track with this id does not exist' })
  deleteTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const index = this.trackService.deleteTrackById(id);
    if (index === -1) {
      throw new HttpException(
        'Track with this id does not exist',
        StatusCodes.NOT_FOUND,
      );
    }
  }

  /**
   * Update track by id
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiOkResponse({
    description: 'The track has been updated',
    type: TrackResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Id is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track with this id does not exist' })
  @UsePipes(new ValidationPipe())
  updateTrack(
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

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
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  /**
   * Get all tracks
   */
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  async getTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.trackService.getTrackById(id);
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
  @UseGuards(AuthGuard)
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
  createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackService.createTrack(createTrackDto);
  }

  /**
   * Delete track by id
   */
  @UseGuards(AuthGuard)
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
  async deleteTrackById(@Param('id', new ParseUUIDPipe()) id: string) {
    try {
      const track = await this.trackService.deleteTrackById(id);
      return track;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Track with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }

  /**
   * Update track by id
   */
  @UseGuards(AuthGuard)
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
  async updateTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      const track = await this.trackService.updateTrack(id, updateTrackDto);
      return track;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          'Track with this id does not exist',
          StatusCodes.NOT_FOUND,
        );
      }
      throw e;
    }
  }
}

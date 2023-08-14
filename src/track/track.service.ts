import { Injectable } from '@nestjs/common';
import Track from 'src/types/track';
import { CreateTrack, UpdateTrack } from 'src/utils/types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrackService {
  tracks: Track[] = [];
  constructor(private prisma: PrismaService) {}

  getTracks() {
    return this.prisma.track.findMany();
  }

  getTrackById(id: string) {
    return this.prisma.track.findFirst({
      where: {
        id,
      },
    });
  }

  createTrack(createTrackDto: CreateTrack) {
    return this.prisma.track.create({ data: createTrackDto });
  }

  async deleteTrackById(id: string) {
    return await this.prisma.track.delete({
      where: {
        id,
      },
    });
  }

  updateTrack(id: string, updateTrackDto: UpdateTrack) {
    return this.prisma.track.update({
      where: {
        id,
      },
      data: updateTrackDto,
    });
  }
}

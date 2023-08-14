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

  deleteTrackById(id: string) {
    return this.prisma.track.delete({
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

  // TODO update with db
  // updateArtistId(id: string) {
  //   this.tracks.forEach((track) => {
  //     if (track.artistId === id) {
  //       track.artistId = null;
  //     }
  //   });
  // }

  // TODO update with db
  // updateAlbumId(id: string) {
  //   this.tracks.forEach((track) => {
  //     if (track.albumId === id) {
  //       track.albumId = null;
  //     }
  //   });
  // }
}

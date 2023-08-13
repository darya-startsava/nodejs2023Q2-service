import { Injectable } from '@nestjs/common';
import Artist from 'src/types/artist';
import { CreateArtist, UpdateArtist } from 'src/utils/types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistService {
  artists: Artist[] = [];
  constructor(private prisma: PrismaService) {}

  getArtists() {
    return this.prisma.artist.findMany();
  }

  getArtistById(id: string) {
    return this.prisma.artist.findFirst({
      where: {
        id,
      },
    });
  }

  createArtist(createArtistDto: CreateArtist) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  deleteArtistById(id: string) {
    return this.prisma.artist.delete({
      where: {
        id,
      },
    });
  }

  updateArtist(id: string, updateArtistDto: UpdateArtist) {
    return this.prisma.artist.update({
      where: {
        id,
      },
      data: updateArtistDto,
    });
  }
}

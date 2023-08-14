import { Injectable } from '@nestjs/common';
import Album from 'src/types/album';
import { CreateAlbum, UpdateAlbum } from 'src/utils/types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumService {
  albums: Album[] = [];
  constructor(private prisma: PrismaService) {}

  getAlbums() {
    return this.prisma.album.findMany();
  }

  getAlbumById(id: string) {
    return this.prisma.album.findFirst({
      where: {
        id,
      },
    });
  }

  createAlbum(createAlbumDto: CreateAlbum) {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  deleteAlbumById(id: string) {
    return this.prisma.album.delete({
      where: {
        id,
      },
    });
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbum) {
    return this.prisma.album.update({
      where: {
        id,
      },
      data: updateAlbumDto,
    });
  }

  // TODO update this method to db
  // updateArtistId(id: string) {
  //   this.albums.forEach((album) => {
  //     if (album.artistId === id) {
  //       album.artistId = null;
  //     }
  //   });
  // }
}

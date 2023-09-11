import { Injectable } from '@nestjs/common';
import Favorites from 'src/types/favs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavsService {
  favs: Favorites = { artists: [], albums: [], tracks: [] };
  constructor(private prisma: PrismaService) {}

  async getFavs() {
    const favArtistsRecords = await this.prisma.favArtist.findMany({
      include: {
        artist: true,
      },
    });
    const favArtists = favArtistsRecords.map((r) => r.artist);

    const favAlbumsRecords = await this.prisma.favAlbum.findMany({
      include: {
        album: true,
      },
    });
    const favAlbums = favAlbumsRecords.map((r) => r.album);

    const favTracksRecords = await this.prisma.favTrack.findMany({
      include: {
        track: true,
      },
    });
    const favTracks = favTracksRecords.map((r) => r.track);

    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }

  async addTrackToFavs(id: string) {
    const track = await this.prisma.favTrack.create({
      data: {
        trackId: id,
      },
    });

    return track;
  }

  async deleteTrackFromFavs(id: string) {
    return await this.prisma.favTrack.delete({
      where: {
        trackId: id,
      },
    });
  }

  async addAlbumToFavs(id: string) {
    const album = await this.prisma.favAlbum.create({
      data: {
        albumId: id,
      },
    });

    return album;
  }

  async deleteAlbumFromFavs(id: string) {
    return await this.prisma.favAlbum.delete({
      where: {
        albumId: id,
      },
    });
  }

  async addArtistToFavs(id: string) {
    const artist = await this.prisma.favArtist.create({
      data: {
        artistId: id,
      },
    });

    return artist;
  }

  async deleteArtistFromFavs(id: string) {
    return await this.prisma.favArtist.delete({
      where: {
        artistId: id,
      },
    });
  }
}

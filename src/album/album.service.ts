import { Injectable } from '@nestjs/common';
import Album from 'src/types/album';
import { CreateAlbum, UpdateAlbum } from 'src/utils/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  albums: Album[] = [];

  getAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  createAlbum(createAlbumDto: CreateAlbum) {
    const newAlbum = {
      ...createAlbumDto,
      id: uuidv4(),
      artistId: createAlbumDto.artistId ? createAlbumDto.artistId : null,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  deleteAlbumById(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.albums.splice(index, 1);
    }
    return index;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbum) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) {
      return { index, updatedAlbum: null };
    }
    const album = this.albums[index];
    const updatedAlbum = {
      id: album.id,
      ...updateAlbumDto,
      artistId: updateAlbumDto.artistId ? updateAlbumDto.artistId : null,
    };
    this.albums[index] = updatedAlbum;
    return { index, updatedAlbum };
  }

  updateArtistId(id: string) {
    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }
}

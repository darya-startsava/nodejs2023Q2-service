import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import Artist from 'src/types/artist';
import { CreateArtist, UpdateArtist } from 'src/utils/types';

@Injectable()
export class ArtistService {
  artists: Artist[] = [];

  getArtists() {
    return this.artists;
  }

  getArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(createArtistDto: CreateArtist) {
    const newArtist = { ...createArtistDto, id: uuidv4() };
    this.artists.push(newArtist);
    return newArtist;
  }

  deleteArtistById(id: string) {
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.artists.splice(index, 1);
    }
    return index;
  }

  updateArtist(id: string, updateArtistDto: UpdateArtist) {
    const index = this.artists.findIndex((user) => user.id === id);
    if (index === -1) {
      return { index, artist: null, updatedArtist: null };
    }
    const artist = this.artists[index];
    const updatedArtist = {
      id: artist.id,
      ...updateArtistDto,
    };
    this.artists[index] = updatedArtist;
    return { index, updatedArtist };
  }
}

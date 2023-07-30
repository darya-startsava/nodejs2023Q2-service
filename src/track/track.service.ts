import { Injectable } from '@nestjs/common';
import Track from 'src/types/track';
import { CreateTrack, UpdateTrack } from 'src/utils/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  tracks: Track[] = [];

  getTracks() {
    return this.tracks;
  }

  getTrackById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(createTrackDto: CreateTrack) {
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
      artistId: createTrackDto.artistId ? createTrackDto.artistId : null,
      albumId: createTrackDto.albumId ? createTrackDto.albumId : null,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  deleteTrackById(id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      this.tracks.splice(index, 1);
    }
    return index;
  }

  updateTrack(id: string, updateTrackDto: UpdateTrack) {
    const index = this.tracks.findIndex((album) => album.id === id);
    if (index === -1) {
      return { index, updatedTrack: null };
    }
    const track = this.tracks[index];
    const updatedTrack = {
      id: track.id,
      ...updateTrackDto,
      artistId: updateTrackDto.artistId ? updateTrackDto.artistId : null,
      albumId: updateTrackDto.albumId ? updateTrackDto.albumId : null,
    };
    this.tracks[index] = updatedTrack;
    return { index, updatedTrack };
  }

  updateArtistId(id: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }

  updateAlbumId(id: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}

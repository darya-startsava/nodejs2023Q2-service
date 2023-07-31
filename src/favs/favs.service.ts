import { Inject, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';
import Favorites from 'src/types/favs';

@Injectable()
export class FavsService {
  @Inject(ArtistService)
  private readonly artistService: ArtistService;
  @Inject(AlbumService)
  private readonly albumService: AlbumService;
  @Inject(TrackService)
  private readonly trackService: TrackService;
  favs: Favorites = { artists: [], albums: [], tracks: [] };

  getFavs() {
    const artistsFullData = [];
    this.favs.artists.forEach((item) => {
      const artist = this.artistService.artists.find((i) => i.id === item);
      if (artist) {
        artistsFullData.push(artist);
      }
    });
    const albumsFullData = [];
    this.favs.albums.forEach((item) => {
      const album = this.albumService.albums.find((i) => i.id === item);
      if (album) {
        albumsFullData.push(album);
      }
    });
    const tracksFullData = [];
    this.favs.tracks.forEach((item) => {
      const track = this.trackService.tracks.find((i) => i.id === item);
      if (track) {
        tracksFullData.push(track);
      }
    });
    return {
      artists: artistsFullData,
      albums: albumsFullData,
      tracks: tracksFullData,
    };
  }

  addTrackToFavs(id: string) {
    const track = this.trackService.tracks.find((i) => i.id === id);
    if (track) {
      this.favs.tracks.push(id);
    }
    return track;
  }

  deleteTrackFromFavs(id: string) {
    const index = this.favs.tracks.findIndex((i) => i === id);
    if (index !== -1) {
      this.favs.tracks.splice(index, 1);
    }
    return index;
  }

  addAlbumToFavs(id: string) {
    const album = this.albumService.albums.find((i) => i.id === id);
    if (album) {
      this.favs.albums.push(id);
    }
    return album;
  }

  deleteAlbumFromFavs(id: string) {
    const index = this.favs.albums.findIndex((i) => i === id);
    if (index !== -1) {
      this.favs.albums.splice(index, 1);
    }
    return index;
  }

  addArtistToFavs(id: string) {
    const artist = this.artistService.artists.find((i) => i.id === id);
    if (artist) {
      this.favs.artists.push(id);
    }
    return artist;
  }

  deleteArtistFromFavs(id: string) {
    const index = this.favs.artists.findIndex((i) => i === id);
    if (index !== -1) {
      this.favs.artists.splice(index, 1);
    }
    return index;
  }
}

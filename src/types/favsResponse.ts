import Artist from './artist';
import Album from './album';
import Track from './track';

type FavoritesResponse = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};

export default FavoritesResponse;

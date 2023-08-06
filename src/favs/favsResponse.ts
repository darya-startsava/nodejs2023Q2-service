import { ApiProperty } from '@nestjs/swagger';

import { ArtistResponse } from 'src/artist/artistResponse';
import { AlbumResponse } from 'src/album/AlbumResponse';
import { TrackResponse } from 'src/track/trackResponse';

export class FavoritesResponse {
  @ApiProperty({ isArray: true, type: ArtistResponse })
  artists: ArtistResponse[];
  @ApiProperty({ isArray: true, type: AlbumResponse })
  albums: AlbumResponse[];
  @ApiProperty({ isArray: true, type: TrackResponse })
  tracks: TrackResponse[];
}

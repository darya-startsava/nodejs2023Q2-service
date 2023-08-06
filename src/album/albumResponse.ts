import { ApiProperty } from '@nestjs/swagger';

export class AlbumResponse {
  @ApiProperty({ example: '262dd8be-0579-4b39-b3f3-ebf547f76ba4' })
  id: string;
  @ApiProperty({ example: 'TestAlbum' })
  name: string;
  @ApiProperty({ example: 1990 })
  year: number;
  @ApiProperty({ example: 'dac97eb3-b1e0-447f-8016-60789c2f8ba2' })
  artistId: string | null;
}

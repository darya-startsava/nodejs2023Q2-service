import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponse {
  @ApiProperty({ example: 'dac97eb3-b1e0-447f-8016-60789c2f8ba2' })
  id: string;
  @ApiProperty({ example: 'TestArtist' })
  name: string;
  @ApiProperty({ example: true })
  grammy: boolean;
}

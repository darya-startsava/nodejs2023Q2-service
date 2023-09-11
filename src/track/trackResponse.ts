import { ApiProperty } from '@nestjs/swagger';

export class TrackResponse {
  @ApiProperty({ example: '8f3b2630-11f6-4e6f-a1df-5be82f11efe2' })
  id: string;
  @ApiProperty({ example: 'TestTrack' })
  name: string;
  @ApiProperty({ example: 'dac97eb3-b1e0-447f-8016-60789c2f8ba2' })
  artistId: string | null;
  @ApiProperty({ example: '262dd8be-0579-4b39-b3f3-ebf547f76ba4' })
  albumId: string | null;
  @ApiProperty({ example: 5 })
  duration: number;
}

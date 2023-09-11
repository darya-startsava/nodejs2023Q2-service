import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  artistId?: string | null;
  albumId?: string | null;
  @IsInt()
  @IsNotEmpty()
  duration: number;
}

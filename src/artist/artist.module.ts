import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [AlbumModule],
})
export class ArtistModule {}

import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { PrismaService } from 'src/prisma.service';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
  imports: [AlbumModule, TrackModule],
  exports: [ArtistService],
})
export class ArtistModule {}

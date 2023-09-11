import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, PrismaService],
  imports: [ArtistModule, AlbumModule, TrackModule],
})
export class FavsModule {}

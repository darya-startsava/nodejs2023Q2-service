import { Module } from '@nestjs/common';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService],
  exports: [AlbumService],
  imports: [TrackModule],
})
export class AlbumModule {}

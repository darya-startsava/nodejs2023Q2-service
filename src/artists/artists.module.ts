import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist/artist.controller';
import { ArtistService } from './services/artist/artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService]
})
export class ArtistsModule {}

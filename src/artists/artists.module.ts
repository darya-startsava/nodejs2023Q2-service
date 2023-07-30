import { Module } from '@nestjs/common';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistController } from './controllers/artist/artist.controller';
import { ArtistService } from './services/artist/artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [AlbumsModule],
})
export class ArtistsModule {}

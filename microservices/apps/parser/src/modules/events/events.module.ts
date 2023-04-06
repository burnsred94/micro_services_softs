import { Module } from '@nestjs/common';
import { GeneratorDataModule } from '../generator-data/generator-data.module';
import { SearchModule } from '../search/search.module';
import { EventsService } from './events.service';
import { KeysModule } from '../keys/keys.module';

@Module({
  providers: [EventsService],
  imports: [GeneratorDataModule, SearchModule, KeysModule],
})
export class EventsModule { }
